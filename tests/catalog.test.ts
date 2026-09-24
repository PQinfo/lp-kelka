import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getVariant, formatSize, parseProductSelection, productHref, sizeGuide, variantById } from '../src/data/catalog';

test('guide directs each size to its actual package; medium is 70 × 60', () => {
  assert.deepEqual(sizeGuide.map(size => formatSize(variantById(size.variantId))), ['60 × 55 cm', '70 × 60 cm', '80 × 60 cm']);
  assert.equal(variantById(sizeGuide[1].variantId).units, 30);
  assert.equal(formatSize(getVariant('fofuxao',7)), '60 × 55 cm');
});
test('product links round-trip and reject unknown selections', () => {
  assert.deepEqual(parseProductSelection(productHref('fofuxao',30).split('#')[0]), {lineId:'fofuxao',units:30});
  assert.equal(parseProductSelection('?linha=unknown'), null);
  assert.deepEqual(parseProductSelection('?linha=pipizao&embalagem=invalid'), {lineId:'pipizao',units:7});
});
