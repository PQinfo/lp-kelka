import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultSizeFor, formatSize, formatSizeId, getVariant, lines, parseProductSelection, productHref, sizeGuide, sizesFor, variantById, variants } from '../src/data/catalog';

test('guide directs each size to its actual package; medium is 70 × 60', () => {
  assert.deepEqual(sizeGuide.map(size => formatSize(variantById(size.variantId))), ['60 × 55 cm', '70 × 60 cm', '80 × 60 cm']);
  assert.equal(variantById(sizeGuide[1].variantId).units, 30);
  assert.equal(formatSize(getVariant('fofuxao', '60x55', 7)), '60 × 55 cm');
});
test('every line offers two sizes, and every size both packages', () => {
  for (const line of lines) {
    const sizes = sizesFor(line.id);
    assert.equal(sizes.length, 2, `${line.id} should offer two sizes`);
    for (const size of sizes) for (const units of [7, 30] as const) {
      assert.equal(getVariant(line.id, size, units).units, units);
    }
  }
  assert.equal(variants.length, 12);
});
test('sizes requested by the brief are present', () => {
  assert.deepEqual(sizesFor('pipizao'), ['80x60', '60x60']);
  assert.deepEqual(sizesFor('fofuxao'), ['60x55', '70x60']);
  assert.deepEqual(sizesFor('xixicao'), ['80x60', '60x60']);
  assert.equal(formatSizeId('60x60'), '60 × 60 cm');
});
test('each variant carries its own artwork', () => {
  assert.equal(new Set(variants.map(variant => variant.image)).size, variants.length);
});
test('product links round-trip and reject unknown selections', () => {
  assert.deepEqual(parseProductSelection(productHref('fofuxao', 30, '70x60').split('#')[0]), {lineId: 'fofuxao', sizeId: '70x60', units: 30});
  assert.equal(parseProductSelection('?linha=unknown'), null);
  assert.deepEqual(parseProductSelection('?linha=pipizao&embalagem=invalid'), {lineId: 'pipizao', sizeId: '80x60', units: 7});
});
test('a size that does not belong to the line falls back instead of throwing', () => {
  assert.equal(parseProductSelection('?linha=pipizao&tamanho=70x60')?.sizeId, defaultSizeFor('pipizao'));
});
