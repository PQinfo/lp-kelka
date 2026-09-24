import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flows } from '../src/data/simulator';
import { canContinue, initialSimulator, selectionLabels, simulatorReducer as reduce, type FlowId, type SimulatorState } from '../src/lib/simulator';

function start(flowId: FlowId) {
  const interest = flowId === 'consumidor' ? 'comprar' : flowId === 'marca_propria' ? 'terceirizar' : 'revender';
  let state = reduce(reduce(initialSimulator,{type:'interest',id:interest}),{type:'next'});
  if (interest === 'revender') state = reduce(reduce(state,{type:'profile',id:flowId}),{type:'next'});
  return state;
}
for (const flow of flows) test(`${flow.id}: requires each answer and generates readable messages`, () => {
  let state = start(flow.id as FlowId);
  for (const step of flow.steps) {
    assert.equal(canContinue(state),false);
    assert.equal(reduce(state,{type:'next'}),state);
    assert.equal(reduce(state,{type:'answer',value:'not-an-option'}),state);
    state = reduce(state,{type:'answer',value:step.options[0].value});
    assert.equal(canContinue(state),true);
    state = reduce(state,{type:'next'});
  }
  assert.equal(state.phase,'result');
  const labels = selectionLabels(flow,state.selections);
  const message = flow.buildMessage(labels);
  for (const step of flow.steps) assert.ok(message.includes(step.options[0].label));
  assert.ok(!message.includes('nao informado'));
  assert.equal(reduce(state,{type:'back'}).phase,'steps');
  assert.deepEqual(reduce(state,{type:'reset'}),initialSimulator);
});
test('back preserves answers; switching profile or interest clears stale data', () => {
  let state = start('distribuidor');
  state = reduce(state,{type:'answer',value:'sc'});
  state = reduce(state,{type:'next'});
  state = reduce(state,{type:'back'});
  assert.equal(state.selections.estado,'sc');
  state = reduce(state,{type:'back'});
  state = reduce(state,{type:'profile',id:'revendedor'});
  assert.deepEqual(state.selections,{});
  state = reduce(state,{type:'interest',id:'comprar'});
  assert.equal(state.flowId,null);
  assert.equal(state.stepIndex,0);
});
test('multi-select toggles without duplicates and renders labels in selection order', () => {
  let state: SimulatorState = {...start('representante'),stepIndex:4};
  for (const value of ['agro','petshops','agro']) state = reduce(state,{type:'answer',value});
  assert.deepEqual(state.selections.segmentos,['petshops']);
  assert.deepEqual(selectionLabels(flows.find(flow=>flow.id==='representante')!,state.selections).segmentos,['Pet shops']);
  state = reduce(state,{type:'answer',value:'petshops'});
  assert.equal(canContinue(state),false);
});


test('automatic choices commit the answer and advance once; multi-select waits for confirmation', () => {
  for (const flow of flows) {
    const interest=flow.id==='consumidor'?'comprar':flow.id==='marca_propria'?'terceirizar':'revender';
    let state=reduce(initialSimulator,{type:'interest',id:interest,advance:true});
    if(interest==='revender') state=reduce(state,{type:'profile',id:flow.id as FlowId,advance:true});
    for(const [index,step] of flow.steps.entries()) {
      assert.equal(state.stepIndex,index);
      assert.equal(reduce(state,{type:'answer',value:'invalid',advance:true}),state);
      state=reduce(state,{type:'answer',value:step.options[0].value,advance:true});
      if(step.multiSelect) {
        assert.equal(state.phase,'steps');
        assert.equal(state.stepIndex,index);
        state=reduce(state,{type:'answer',value:step.options[1].value,advance:true});
        assert.deepEqual(state.selections[step.field],[step.options[0].value,step.options[1].value]);
        state=reduce(state,{type:'next'});
      }else assert.equal(state.selections[step.field],step.options[0].value);
    }
    assert.equal(state.phase,'result');
    state=reduce(state,{type:'back'});
    const last=flow.steps[flow.steps.length-1];
    if(!last.multiSelect) {
      state=reduce(state,{type:'answer',value:last.options[0].value,advance:true});
      assert.equal(state.phase,'result');
    }
  }
});
