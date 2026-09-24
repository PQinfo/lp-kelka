export type LineId = 'pipizao' | 'fofuxao' | 'xixicao';
export type PackageUnits = 7 | 30;
export type VariantId = `${LineId}-${PackageUnits}`;
type ImageKey = keyof typeof import('../generated/images').images;
export interface ProductVariant {
  id: VariantId;
  lineId: LineId;
  units: PackageUnits;
  widthCm: number;
  heightCm: number;
  image: ImageKey;
  format: 'portrait' | 'landscape';
}
export interface ProductLine {
  id: LineId;
  name: string;
  accent: string;
  bright: string;
  tint: string;
  description: string;
}
export const lines = [
  { id: 'pipizao', name: 'Pipizão', accent: '#187d74', bright: '#2fb6a9', tint: '#e9f6f3', description: 'O tapete higiênico superabsorvente que oferece praticidade e proteção para o dia a dia do seu pet. Mais conforto, mais secura e mais tranquilidade para você e seu melhor amigo.' },
  { id: 'fofuxao', name: 'Fofuxão', accent: '#2268b6', bright: '#2872c5', tint: '#eaf2fa', description: 'Conforto e cuidado para a rotina dentro de casa. Com absorção, atrativo canino e fitas de fixação, o Fofuxão ajuda a manter o cantinho do seu pet limpo e protegido.' },
  { id: 'xixicao', name: 'Xixicão', accent: '#b94d09', bright: '#ed751e', tint: '#fcf0e6', description: 'Uma área de 80 × 60 cm para o cuidado diário com seu pet. Superabsorvente e com barreira antivazamento, o Xixicão ajuda a proteger o piso e deixa a rotina mais prática.' },
] as const satisfies readonly ProductLine[];
export const variants: readonly ProductVariant[] = [
  { id: 'pipizao-7', lineId: 'pipizao', units: 7, widthCm: 80, heightCm: 60, image: 'pipizao7', format: 'landscape' },
  { id: 'pipizao-30', lineId: 'pipizao', units: 30, widthCm: 80, heightCm: 60, image: 'pipizao30', format: 'portrait' },
  { id: 'fofuxao-7', lineId: 'fofuxao', units: 7, widthCm: 60, heightCm: 55, image: 'fofuxao7', format: 'portrait' },
  { id: 'fofuxao-30', lineId: 'fofuxao', units: 30, widthCm: 70, heightCm: 60, image: 'fofuxao30', format: 'portrait' },
  { id: 'xixicao-7', lineId: 'xixicao', units: 7, widthCm: 80, heightCm: 60, image: 'xixicao7', format: 'landscape' },
  { id: 'xixicao-30', lineId: 'xixicao', units: 30, widthCm: 80, heightCm: 60, image: 'xixicao30', format: 'portrait' },
];
export const sizeGuide = [
  { id: 'small', letter: 'P', name: 'Pequeno porte', variantId: 'fofuxao-7', image: 'smallDog', alt: 'Cachorro pequeno sobre um tapete higiênico' },
  { id: 'medium', letter: 'M', name: 'Médio porte', variantId: 'fofuxao-30', image: 'mediumDog', alt: 'Cachorro de porte médio sobre um tapete higiênico' },
  { id: 'large', letter: 'G', name: 'Grande porte', variantId: 'pipizao-7', image: 'largeDog', alt: 'Cachorro grande sobre um tapete higiênico' },
] as const satisfies readonly {id: string; letter: string; name: string; variantId: VariantId; image: ImageKey; alt: string}[];
export function getVariant(lineId: LineId, units: PackageUnits): ProductVariant {
  const variant = variants.find(item => item.lineId === lineId && item.units === units);
  if (!variant) throw new Error(`Unknown variant: ${lineId}-${units}`);
  return variant;
}
export function variantById(id: VariantId): ProductVariant {
  const variant = variants.find(item => item.id === id);
  if (!variant) throw new Error(`Unknown variant: ${id}`);
  return variant;
}
export const formatSize = (variant: ProductVariant) => `${variant.widthCm} × ${variant.heightCm} cm`;
export function productHref(lineId: LineId, units: PackageUnits = 7) {
  return `?linha=${lineId}&embalagem=${units}#produtos`;
}
export function parseProductSelection(search: string): {lineId: LineId; units: PackageUnits} | null {
  const params = new URLSearchParams(search);
  const line = lines.find(item => item.id === params.get('linha'));
  if (!line) return null;
  return {lineId: line.id, units: params.get('embalagem') === '30' ? 30 : 7};
}
