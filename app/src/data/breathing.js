// ─────────────────────────────────────────────────────────────────────────
//  The breathing pattern offered while a craving passes.
//
//  In for four, hold for four, out for six. Not invented here — it is the
//  pattern the "Breathe like you're smoking" tip already describes, which
//  exists because the slow deep inhale is a real part of what a cigarette
//  is doing for you. Take the cigarette away and the breath still works.
//
//  The out-breath is the long one on purpose; that is the half that does
//  the settling.
// ─────────────────────────────────────────────────────────────────────────

export const BREATH_PHASES = [
  { key: "in", label: "Breathe in", ms: 4000, scale: 1 },
  { key: "hold", label: "Hold", ms: 4000, scale: 1 },
  { key: "out", label: "Breathe out", ms: 6000, scale: 0.62 },
];

export const BREATH_CYCLE_MS = BREATH_PHASES.reduce((total, phase) => total + phase.ms, 0);

/** Which phase of the cycle a given elapsed time falls in. */
export function breathPhaseAt(elapsedMs) {
  let into = elapsedMs % BREATH_CYCLE_MS;
  for (const phase of BREATH_PHASES) {
    if (into < phase.ms) return phase;
    into -= phase.ms;
  }
  return BREATH_PHASES[0];
}
