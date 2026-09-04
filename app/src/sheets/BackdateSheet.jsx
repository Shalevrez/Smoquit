// ─────────────────────────────────────────────────────────────────────────
//  "When did you actually smoke it?"
//
//  People log late — the cigarette is finished, the phone comes out after.
//  An hour-of-day chart is only worth reading if the times in it are true,
//  so this offers a few quick nudges backwards and an exact time field.
//
//  The time is clamped between local midnight and the moment it was logged:
//  an entry cannot land in the future, or in yesterday.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { sqT } from "../i18n/index.js";
import { formatTime } from "../i18n/format.js";
import { colors } from "../theme/colors.js";
import {
  chipButtonStyle,
  fieldLabelStyle,
  inputStyle,
  primaryButtonStyle,
  sheetBackdropStyle,
  sheetPanelStyle,
} from "../theme/styles.js";
export function BackdateSheet({ entry, onSave, onClose }) {
  // loggedAt is the moment the button was pressed, and the latest the entry
  // is allowed to be: you cannot have smoked it in the future.
  const loggedAt = entry.ts;
  const [ts, setTs] = React.useState(entry.ts);

  const timeValue = React.useMemo(() => {
    const at = new Date(ts);
    return `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}`;
  }, [ts]);

  // Nudging back stops at local midnight rather than spilling into
  // yesterday, whose entries live under a different key.
  const nudgeBack = (minutes) => {
    setTs((prev) => {
      const earlier = prev - minutes * 60000;
      const midnight = new Date(prev);
      midnight.setHours(0, 0, 0, 0);
      return Math.max(midnight.getTime(), earlier);
    });
  };

  const setExactTime = (value) => {
    if (!value) return;
    const [hours, minutes] = value.split(":").map(Number);
    const at = new Date(loggedAt);
    at.setHours(hours, minutes, 0, 0);
    setTs(Math.min(at.getTime(), loggedAt));
  };

  const minutesEarlier = Math.round((loggedAt - ts) / 60000);
  const caption =
    minutesEarlier <= 0
      ? sqT("Logged at the current time")
      : minutesEarlier < 60
        ? sqT("{n} min earlier", { n: minutesEarlier })
        : sqT("{h}h {m}m earlier", {
            h: Math.floor(minutesEarlier / 60),
            m: minutesEarlier % 60,
          });

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
          {sqT("When did you actually smoke it?")}
        </div>
        <div
          style={{
            fontSize: 13,
            color: colors.ash,
            marginBottom: 16,
          }}
        >
          {sqT("Logged just now. Nudge it back if this one was earlier today.")}
        </div>
        <div
          style={{
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 40,
              fontWeight: 700,
              color: colors.ink,
            }}
          >
            {formatTime(ts)}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: minutesEarlier > 0 ? colors.ember : colors.ash,
              marginTop: 2,
            }}
          >
            {caption}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {[5, 15, 30, 60, 120].map((minutes) => (
            <button
              key={minutes}
              className="sq-btn"
              style={chipButtonStyle}
              onClick={() => nudgeBack(minutes)}
            >
              {minutes < 60 ? sqT("−{n}m", { n: minutes }) : sqT("−{n}h", { n: minutes / 60 })}
            </button>
          ))}
          <button
            className="sq-btn"
            style={{
              ...chipButtonStyle,
              color: colors.ash,
            }}
            onClick={() => setTs(loggedAt)}
          >
            {sqT("Reset")}
          </button>
        </div>
        <label
          style={{
            ...fieldLabelStyle,
            marginTop: 18,
          }}
        >
          {sqT("Or set an exact time")}
          <input
            type="time"
            value={timeValue}
            max={new Date(loggedAt).toTimeString().slice(0, 5)}
            onChange={(event) => setExactTime(event.target.value)}
            style={inputStyle}
          />
        </label>
        <button
          className="sq-btn"
          style={{
            ...primaryButtonStyle,
            background: colors.moss,
            marginTop: 20,
          }}
          onClick={() => onSave(ts)}
        >
          {sqT("Save time")}
        </button>
        <button
          className="sq-btn"
          style={{
            ...chipButtonStyle,
            width: "100%",
            marginTop: 8,
            border: "none",
            background: "none",
            color: colors.ash,
          }}
          onClick={() => onSave(loggedAt)}
        >
          {sqT("Keep current time")}
        </button>
      </div>
    </div>
  );
}
