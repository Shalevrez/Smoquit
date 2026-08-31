// ─────────────────────────────────────────────────────────────────────────
//  Cue → routine → reward.
// ─────────────────────────────────────────────────────────────────────────

import { HABITS } from "../data/habits.js";
import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import { habitCardStyle, habitTagStyle } from "../theme/styles.js";
export function HabitsTab() {
  return (
    <div>
      <p
        style={{
          fontSize: 14,
          color: colors.smoke,
          lineHeight: 1.6,
          marginTop: 0,
        }}
      >
        {sqT("A habit is a loop: ")}
        <strong>{sqT("cue → routine → reward")}</strong>
        {sqT(
          ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.",
        )}
      </p>
      {HABITS.map((habit, index) => (
        <div key={index} style={habitCardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={habitTagStyle}>{sqT("Cue")}</span>
            <span
              style={{
                fontWeight: 700,
                color: colors.ink,
              }}
            >
              {sqT(habit.cue)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                ...habitTagStyle,
                background: colors.mossSoft,
                color: colors.moss,
              }}
            >
              {sqT("Swap")}
            </span>
            <span
              style={{
                fontSize: 13.5,
                color: colors.smoke,
                lineHeight: 1.55,
              }}
            >
              {sqT(habit.swap)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
