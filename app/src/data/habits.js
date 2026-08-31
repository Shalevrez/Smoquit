// ─────────────────────────────────────────────────────────────────────────
//  Cue → routine → reward, one card per cue.
//
//  You cannot easily delete a cue, but you can swap the routine and still
//  get the reward. Each entry pairs the cue with something to do instead.
// ─────────────────────────────────────────────────────────────────────────

export const HABITS = [
  {
    cue: "Morning coffee",
    swap: "Drink it standing at a window, or switch to tea for a week so the pairing breaks.",
  },
  {
    cue: "The commute",
    swap: "Chew gum or queue a podcast the moment you sit down — fill the hand and the head.",
  },
  {
    cue: "Work stress break",
    swap: "Take the break, drop the cigarette. Walk to get water or do 10 slow breaths outside.",
  },
  {
    cue: "After eating",
    swap: "Stand up and brush your teeth or leave the table immediately. The clean-mouth feeling fights the urge.",
  },
  {
    cue: "With a drink",
    swap: "Hold the glass in your smoking hand and keep it full. Sit with non-smokers when you can.",
  },
  {
    cue: "Boredom",
    swap: "Keep a 5-minute list ready: text a friend, stretch, a quick game — anything to bridge the gap.",
  },
];

/**
 * Which habit cue a trigger corresponds to.
 *
 * The two lists were written separately and do not share names, so this is
 * spelled out rather than matched. Craving and Habit map to nothing on
 * purpose: they describe the urge itself rather than a situation that set
 * it off, so there is no routine to swap — those fall back to riding it out.
 */
export const TRIGGER_TO_CUE = {
  Coffee: "Morning coffee",
  Stress: "Work stress break",
  "After a meal": "After eating",
  Social: "With a drink",
  Boredom: "Boredom",
  Craving: null,
  Habit: null,
};

/** The swap to suggest for a trigger, if there is one. */
export function swapForTrigger(trigger) {
  const cue = TRIGGER_TO_CUE[trigger];
  return cue ? (HABITS.find((habit) => habit.cue === cue) ?? null) : null;
}
