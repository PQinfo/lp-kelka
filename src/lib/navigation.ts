import type { MouseEvent } from 'react';
export const NAVIGATION_EVENT = 'kelka:navigation';
export function navigateWithinPage(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(event.currentTarget.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
  event.preventDefault();
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
  const target = document.getElementById(url.hash.slice(1));
  target?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  target?.querySelector<HTMLElement>('h2[tabindex], h3[tabindex]')?.focus({preventScroll:true});
}
