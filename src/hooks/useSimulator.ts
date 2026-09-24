import { useReducer } from 'react';
import { canContinue, flowFor, initialSimulator, selectionLabels, simulatorReducer } from '../lib/simulator';

export function useSimulator() {
  const [state, dispatch] = useReducer(simulatorReducer, initialSimulator);
  const currentFlow = flowFor(state) ?? null;
  return {
    ...state, dispatch, currentFlow,
    currentStep: currentFlow?.steps[state.stepIndex] ?? null,
    canContinue: canContinue(state),
    labels: currentFlow ? selectionLabels(currentFlow, state.selections) : {},
  };
}
