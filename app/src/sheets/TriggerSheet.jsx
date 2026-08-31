// ─────────────────────────────────────────────────────────────────────────
//  "What set this one off?" — asked right after logging.
//
//  Naming the trigger is the part that makes the insights worth anything,
//  but it is never compulsory: "Skip — just count it" files the entry as
//  Unlogged rather than dropping it.
// ─────────────────────────────────────────────────────────────────────────

import { TRIGGERS } from "../data/triggers.js";
import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import { chipButtonStyle, sheetBackdropStyle, sheetPanelStyle } from "../theme/styles.js";
export function TriggerSheet({ onPick, onClose }) {
  return (
    <div style={sheetBackdropStyle} onClick={onClose}>
      <div style={sheetPanelStyle} onClick={(event) => event.stopPropagation()}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.ink,
            marginBottom: 4,
          }}
        >
          {sqT("What set this one off?")}
        </div>
        <div
          style={{
            fontSize: 13,
            color: colors.ash,
            marginBottom: 14,
          }}
        >
          {sqT("Naming the trigger is half of unlearning it.")}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {TRIGGERS.map((trigger) => (
            <button
              key={trigger}
              className="sq-btn"
              style={chipButtonStyle}
              onClick={() => onPick(trigger)}
            >
              {sqT(trigger)}
            </button>
          ))}
        </div>
        <button
          className="sq-btn"
          style={{
            ...chipButtonStyle,
            marginTop: 14,
            width: "100%",
          }}
          onClick={() => onPick("Unlogged")}
        >
          {sqT("Skip — just count it")}
        </button>
      </div>
    </div>
  );
}
