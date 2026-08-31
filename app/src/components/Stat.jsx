// ─────────────────────────────────────────────────────────────────────────
//  One number with a caption under it.
// ─────────────────────────────────────────────────────────────────────────

import { colors } from "../theme/colors.js";
import { statCardStyle } from "../theme/styles.js";
export function Stat({ label, value, accent }) {
  return (
    <div style={statCardStyle}>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: accent || colors.ink,
          fontFamily: "Georgia, serif",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: colors.ash,
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        {label}
      </div>
    </div>
  );
}
