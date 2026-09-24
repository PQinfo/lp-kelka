/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_METRICS_ENDPOINT?: string;
  readonly VITE_METRICS_SAMPLE_RATE?: string;
}
