export type LineId = 'pipizao' | 'fofuxao' | 'xixicao';
export type PackageUnits = 7 | 30;
/** Tamanho do tapete, em centimetros, no formato usado na URL e no nome do arquivo. */
export type SizeId = '80x60' | '60x60' | '60x55' | '70x60';
export type VariantId = `${LineId}-${SizeId}-${PackageUnits}`;
type ImageKey = keyof typeof import('../generated/images').images;
export interface ProductVariant {
  id: VariantId;
  lineId: LineId;
  sizeId: SizeId;
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
  { id: 'xixicao', name: 'Xixicão', accent: '#b94d09', bright: '#ed751e', tint: '#fcf0e6', description: 'Proteção pensada para o cuidado diário com seu pet. Superabsorvente e com barreira antivazamento, o Xixicão ajuda a proteger o piso e deixa a rotina mais prática.' },
] as const satisfies readonly ProductLine[];
export const variants: readonly ProductVariant[] = [
  { id: 'pipizao-80x60-7',  lineId: 'pipizao', sizeId: '80x60', units: 7,  widthCm: 80, heightCm: 60, image: 'pipizao_80x60_7',  format: 'landscape' },
  { id: 'pipizao-80x60-30', lineId: 'pipizao', sizeId: '80x60', units: 30, widthCm: 80, heightCm: 60, image: 'pipizao_80x60_30', format: 'portrait' },
  { id: 'pipizao-60x60-7',  lineId: 'pipizao', sizeId: '60x60', units: 7,  widthCm: 60, heightCm: 60, image: 'pipizao_60x60_7',  format: 'landscape' },
  { id: 'pipizao-60x60-30', lineId: 'pipizao', sizeId: '60x60', units: 30, widthCm: 60, heightCm: 60, image: 'pipizao_60x60_30', format: 'portrait' },
  { id: 'fofuxao-60x55-7',  lineId: 'fofuxao', sizeId: '60x55', units: 7,  widthCm: 60, heightCm: 55, image: 'fofuxao_60x55_7',  format: 'portrait' },
  { id: 'fofuxao-60x55-30', lineId: 'fofuxao', sizeId: '60x55', units: 30, widthCm: 60, heightCm: 55, image: 'fofuxao_60x55_30', format: 'portrait' },
  { id: 'fofuxao-70x60-7',  lineId: 'fofuxao', sizeId: '70x60', units: 7,  widthCm: 70, heightCm: 60, image: 'fofuxao_70x60_7',  format: 'portrait' },
  { id: 'fofuxao-70x60-30', lineId: 'fofuxao', sizeId: '70x60', units: 30, widthCm: 70, heightCm: 60, image: 'fofuxao_70x60_30', format: 'portrait' },
  { id: 'xixicao-80x60-7',  lineId: 'xixicao', sizeId: '80x60', units: 7,  widthCm: 80, heightCm: 60, image: 'xixicao_80x60_7',  format: 'landscape' },
  { id: 'xixicao-80x60-30', lineId: 'xixicao', sizeId: '80x60', units: 30, widthCm: 80, heightCm: 60, image: 'xixicao_80x60_30', format: 'portrait' },
  { id: 'xixicao-60x60-7',  lineId: 'xixicao', sizeId: '60x60', units: 7,  widthCm: 60, heightCm: 60, image: 'xixicao_60x60_7',  format: 'landscape' },
  { id: 'xixicao-60x60-30', lineId: 'xixicao', sizeId: '60x60', units: 30, widthCm: 60, heightCm: 60, image: 'xixicao_60x60_30', format: 'landscape' },
];
export const sizeGuide = [
  { id: 'small', letter: 'P', name: 'Pequeno porte', variantId: 'fofuxao-60x55-7', image: 'smallDog', alt: 'Cachorro pequeno sobre um tapete higiênico' },
  { id: 'medium', letter: 'M', name: 'Médio porte', variantId: 'fofuxao-70x60-30', image: 'mediumDog', alt: 'Cachorro de porte médio sobre um tapete higiênico' },
  { id: 'large', letter: 'G', name: 'Grande porte', variantId: 'pipizao-80x60-7', image: 'largeDog', alt: 'Cachorro grande sobre um tapete higiênico' },
] as const satisfies readonly {id: string; letter: string; name: string; variantId: VariantId; image: ImageKey; alt: string}[];
/** Tamanhos oferecidos por linha, na ordem em que aparecem nos botões. */
export function sizesFor(lineId: LineId): SizeId[] {
  const seen: SizeId[] = [];
  for (const variant of variants) if (variant.lineId === lineId && !seen.includes(variant.sizeId)) seen.push(variant.sizeId);
  return seen;
}
export const defaultSizeFor = (lineId: LineId): SizeId => sizesFor(lineId)[0];
export function getVariant(lineId: LineId, sizeId: SizeId, units: PackageUnits): ProductVariant {
  const variant = variants.find(item => item.lineId === lineId && item.sizeId === sizeId && item.units === units);
  if (!variant) throw new Error(`Unknown variant: ${lineId}-${sizeId}-${units}`);
  return variant;
}
export function variantById(id: VariantId): ProductVariant {
  const variant = variants.find(item => item.id === id);
  if (!variant) throw new Error(`Unknown variant: ${id}`);
  return variant;
}
export const formatSize = (variant: ProductVariant) => `${variant.widthCm} × ${variant.heightCm} cm`;
/** Rótulo curto do botão de tamanho: mesma grafia da embalagem. */
export const formatSizeId = (sizeId: SizeId) => sizeId.replace('x', ' × ') + ' cm';
export function productHref(lineId: LineId, units: PackageUnits = 7, sizeId: SizeId = defaultSizeFor(lineId)) {
  return `?linha=${lineId}&tamanho=${sizeId}&embalagem=${units}#produtos`;
}
export function parseProductSelection(search: string): {lineId: LineId; sizeId: SizeId; units: PackageUnits} | null {
  const params = new URLSearchParams(search);
  const line = lines.find(item => item.id === params.get('linha'));
  if (!line) return null;
  const offered = sizesFor(line.id);
  const requested = params.get('tamanho');
  const sizeId = offered.find(size => size === requested) ?? offered[0];
  return {lineId: line.id, sizeId, units: params.get('embalagem') === '30' ? 30 : 7};
}
