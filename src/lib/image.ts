export interface ResponsiveImage { src: string; srcSet: string; width: number; height: number }
export function imageProps(image: ResponsiveImage, sizes: string) {
  return { ...image, sizes };
}

// Vite emits absolute SSR asset URLs and module-relative client URLs. Normalize
// both to the document directory so the same build hydrates in root or subfolders.
export function assetUrl(url: string) {
  return import.meta.env.PROD && !url.startsWith('data:') ? `./assets/${url.slice(url.lastIndexOf('/') + 1)}` : url;
}
