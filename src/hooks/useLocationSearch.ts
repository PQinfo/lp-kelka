import { useSyncExternalStore } from 'react';
import { NAVIGATION_EVENT } from '../lib/navigation';
const subscribe = (notify: () => void) => {
  window.addEventListener('popstate', notify);
  window.addEventListener(NAVIGATION_EVENT, notify);
  return () => { window.removeEventListener('popstate', notify); window.removeEventListener(NAVIGATION_EVENT, notify); };
};
export const useLocationSearch = () => useSyncExternalStore(subscribe, () => window.location.search, () => '');
