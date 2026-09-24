type EventName = 'product_select' | 'package_select' | 'size_select' | 'simulator_start' | 'simulator_step' | 'simulator_complete' | 'contact_click' | 'web_vital' | 'client_error';
type EventData = Record<string, string | number>;
// Only controlled IDs and numeric metrics belong here. Never send answers, names,
// page query strings, full URLs, or WhatsApp message text.
export function track(name: EventName, data: EventData = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('kelka:metric', {detail:{name,data}}));
}
export async function startTelemetry() {
  const endpoint = import.meta.env.VITE_METRICS_ENDPOINT;
  if (!endpoint || navigator.doNotTrack === '1' || (navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl) return;
  let destination: URL;
  try { destination = new URL(endpoint, window.location.origin); } catch { return; }
  if (destination.origin !== window.location.origin) return;
  const rate = Math.min(1, Math.max(0, Number(import.meta.env.VITE_METRICS_SAMPLE_RATE || '0.1')));
  if (!Number.isFinite(rate) || Math.random() >= rate) return;
  const send = (event: Event) => {
    const {name,data} = (event as CustomEvent<{name:EventName;data:EventData}>).detail;
    try {
      navigator.sendBeacon(destination.href, new Blob([JSON.stringify({name,data,path:window.location.pathname})],{type:'application/json'}));
    } catch { /* Collection failure must not affect interactions. */ }
  };
  window.addEventListener('kelka:metric', send);
  window.addEventListener('error', () => track('client_error', {kind:'runtime'}));
  window.addEventListener('unhandledrejection', () => track('client_error', {kind:'promise'}));
  const {onCLS,onINP,onLCP} = await import('web-vitals');
  const record = ({name,value,rating}: {name:string;value:number;rating:string}) => track('web_vital',{metric:name,value,rating});
  onCLS(record); onINP(record); onLCP(record);
}
