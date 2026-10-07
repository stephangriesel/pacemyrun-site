import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPace, negativeSplits } from './pace.ts';

test('formatPace pads seconds', () => {
  assert.equal(formatPace(332), '5:32');
  assert.equal(formatPace(305), '5:05');
});

test('splits average back to the target pace', () => {
  const { averageSecPerKm, splits } = negativeSplits(10, 50);
  const mean = splits.reduce((a, s) => a + s.paceSecPerKm, 0) / splits.length;
  assert.ok(Math.abs(mean - averageSecPerKm) < 1e-9);
  assert.ok(splits[0].paceSecPerKm > splits.at(-1)!.paceSecPerKm);
  assert.equal(splits.at(-1)!.km, 10);
});

test('rejects invalid input', () => {
  assert.throws(() => negativeSplits(0, 50), RangeError);
});
