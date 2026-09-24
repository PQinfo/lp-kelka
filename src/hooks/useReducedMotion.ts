import { useMediaQuery } from './useMediaQuery';
// Keep the server and first hydration render identical. CSS already honors the
// preference before hydration; subsequent animations use the live media query.
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
