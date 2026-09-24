import { flows, type SimFlow } from '../data/simulator';

export type InterestId = 'comprar' | 'revender' | 'terceirizar';
export type FlowId = 'consumidor' | 'revendedor' | 'distribuidor' | 'representante' | 'marca_propria';
export type Selections = Record<string, string | string[]>;
export interface SimulatorState {
  phase: 'interest' | 'profile' | 'steps' | 'result';
  interestId: InterestId | null;
  flowId: FlowId | null;
  stepIndex: number;
  selections: Selections;
}
export type SimulatorAction =
  | {type: 'interest'; id: InterestId; advance?: boolean}
  | {type: 'profile'; id: FlowId; advance?: boolean}
  | {type: 'answer'; value: string; advance?: boolean}
  | {type: 'next' | 'back' | 'reset'};
export const initialSimulator: SimulatorState = {phase:'interest', interestId:null, flowId:null, stepIndex:0, selections:{}};
export const flowFor = (state: SimulatorState) => flows.find(flow => flow.id === state.flowId);
export function canContinue(state: SimulatorState): boolean {
  if (state.phase === 'interest') return state.interestId !== null;
  if (state.phase === 'profile') return state.flowId !== null;
  if (state.phase !== 'steps') return false;
  const step = flowFor(state)?.steps[state.stepIndex];
  if (!step) return false;
  const answer = state.selections[step.field];
  const values = Array.isArray(answer) ? answer : answer ? [answer] : [];
  return values.length > 0 && values.every(value => step.options.some(option => option.value === value));
}
export function simulatorReducer(state: SimulatorState, action: SimulatorAction): SimulatorState {
  switch (action.type) {
    case 'reset': return initialSimulator;
    case 'interest': {
      if ((action.advance && state.phase !== 'interest') || !['comprar', 'revender', 'terceirizar'].includes(action.id)) return state;
      const selected: SimulatorState = action.id === state.interestId ? {...state, phase:'interest'} : {...initialSimulator, interestId:action.id};
      return action.advance ? simulatorReducer(selected, {type:'next'}) : selected;
    }
    case 'profile': {
      if (state.phase !== 'profile' || !['revendedor', 'distribuidor', 'representante'].includes(action.id)) return state;
      const selected: SimulatorState = action.id === state.flowId ? state : {...state, flowId:action.id, stepIndex:0, selections:{}};
      return action.advance ? simulatorReducer(selected, {type:'next'}) : selected;
    }
    case 'answer': {
      const step = flowFor(state)?.steps[state.stepIndex];
      if (state.phase !== 'steps' || !step?.options.some(option => option.value === action.value)) return state;
      const previous = state.selections[step.field];
      const values = Array.isArray(previous) ? previous : [];
      const value = step.multiSelect ? values.includes(action.value) ? values.filter(item => item !== action.value) : [...values, action.value] : action.value;
      const selected = {...state, selections:{...state.selections, [step.field]:value}};
      return action.advance && !step.multiSelect ? simulatorReducer(selected, {type:'next'}) : selected;
    }
    case 'next':
      if (!canContinue(state)) return state;
      if (state.phase === 'interest') return state.interestId === 'revender' ? {...state, phase:'profile'} : {...state, phase:'steps', flowId:state.interestId === 'comprar' ? 'consumidor' : 'marca_propria'};
      if (state.phase === 'profile') return {...state, phase:'steps'};
      return state.stepIndex < (flowFor(state)?.steps.length ?? 0) - 1 ? {...state, stepIndex:state.stepIndex + 1} : {...state, phase:'result'};
    case 'back':
      if (state.phase === 'result') return {...state, phase:'steps'};
      if (state.phase === 'steps' && state.stepIndex > 0) return {...state, stepIndex:state.stepIndex - 1};
      return {...state, phase:state.phase === 'steps' && state.interestId === 'revender' ? 'profile' : 'interest'};
  }
}
// Stable option IDs stay in state. Human-readable labels are resolved only for display and WhatsApp.
export function selectionLabels(flow: SimFlow, selections: Selections): Selections {
  return Object.fromEntries(flow.steps.map(step => {
    const answer = selections[step.field];
    const label = (value: string) => step.options.find(option => option.value === value)?.label ?? '';
    return [step.field, Array.isArray(answer) ? answer.map(label).filter(Boolean) : answer ? label(answer) : ''];
  }));
}
