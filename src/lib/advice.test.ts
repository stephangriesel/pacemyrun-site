import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReport, bmi } from './advice.ts';
import type { Answers } from './questionnaire.ts';

const base: Answers = {
  height: 175, weight: 70, age: 30, walk: '30-45', experience: 'intermediate',
  goal: '10k', exercise: '2', sleep: 'good', conditions: [],
};
const find = (r: ReturnType<typeof buildReport>, t: string) => r.find((s) => s.title === t)!;

test('report has all eight sections in order', () => {
  assert.deepEqual(buildReport(base).map((s) => s.title),
    ['Introduction', 'Exercise', 'Experience', 'Goal', 'Sleep', 'Health Risks', 'Conclusion', 'Sources and caveats']);
});

test('conditions trigger a doctor recommendation and specific notes', () => {
  const h = find(buildReport({ ...base, conditions: ['heart', 'bp'] }), 'Health Risks');
  assert.match(h.paragraphs[0], /see your doctor/);
  assert.equal(h.bullets!.length, 3);
});

test('age alone does not trigger a clearance warning', () => {
  const h = find(buildReport({ ...base, age: 55, experience: 'beginner' }), 'Health Risks');
  assert.doesNotMatch(h.paragraphs[0], /see your doctor before/);
});

test('sources section links to https sources only', () => {
  const s = find(buildReport(base), 'Sources and caveats');
  assert.ok(s.links!.length > 0 && s.links!.every((l) => l.href.startsWith('https://')));
});

test('marathon for non-advanced runners suggests a shorter race first', () => {
  const g = find(buildReport({ ...base, goal: '42k' }), 'Goal');
  assert.ok(g.bullets!.some((b) => /half marathon first/.test(b)));
});

test('bmi', () => assert.ok(Math.abs(bmi({ height: 100, weight: 25 }) - 25) < 1e-9));
