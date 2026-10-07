export interface Split {
  km: number; // cumulative distance at the end of the split
  paceSecPerKm: number;
}

/** Format seconds as m:ss (e.g. 332 -> "5:32"). */
export function formatPace(secPerKm: number): string {
  const total = Math.round(secPerKm);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Negative-split plan: equal-length sections that start `spread` slower than
 * average pace and finish `spread` faster. The offsets are symmetric, so the
 * mean pace (and therefore the finish time) equals the target exactly.
 */
export function negativeSplits(
  distanceKm: number,
  timeMin: number,
  sections = 5,
  spread = 0.05,
): { averageSecPerKm: number; splits: Split[] } {
  if (!(distanceKm > 0) || !(timeMin > 0)) {
    throw new RangeError('distance and time must be positive numbers');
  }
  const avg = (timeMin * 60) / distanceKm;
  const splits = Array.from({ length: sections }, (_, i) => {
    const t = sections === 1 ? 0.5 : i / (sections - 1); // 0..1
    return {
      km: (distanceKm * (i + 1)) / sections,
      paceSecPerKm: avg * (1 + spread * (1 - 2 * t)),
    };
  });
  return { averageSecPerKm: avg, splits };
}
