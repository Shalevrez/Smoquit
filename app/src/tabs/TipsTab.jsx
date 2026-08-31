// ─────────────────────────────────────────────────────────────────────────
//  Eight things to lean on.
// ─────────────────────────────────────────────────────────────────────────

import { TIPS } from "../data/tips.js";
import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import { disclaimerStyle, tipNumberStyle, tipRowStyle } from "../theme/styles.js";
export function TipsTab() {
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
        {sqT(
          "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.",
        )}
      </p>
      {TIPS.map((tip, index) => (
        <div key={index} style={tipRowStyle}>
          <div style={tipNumberStyle}>{String(index + 1).padStart(2, "0")}</div>
          <div>
            <div
              style={{
                fontWeight: 700,
                color: colors.ink,
                marginBottom: 4,
              }}
            >
              {sqT(tip.t)}
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: colors.smoke,
                lineHeight: 1.55,
              }}
            >
              {sqT(tip.d)}
            </div>
          </div>
        </div>
      ))}
      <div style={disclaimerStyle}>
        {sqT(
          "Smoquit is a self-help tracker, not medical advice. For nicotine replacement, prescriptions, or a quit plan tailored to you, talk to a doctor or a free quitline.",
        )}
      </div>
    </div>
  );
}
