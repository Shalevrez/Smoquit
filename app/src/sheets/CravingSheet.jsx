// ─────────────────────────────────────────────────────────────────────────
//  "I want one right now."
//
//  The one screen in this app that is used before a decision rather than
//  after it. Everything about it is arranged around that:
//
//    • The timer starts the instant the sheet opens. No question comes
//      first — asking anything at the moment somebody is standing outside
//      deciding is friction where friction costs the most.
//    • Four things are on offer at once, because different ones work for
//      different people: the clock running down, something to do with your
//      breath, the reason you wrote yourself, and a swap for whatever set
//      this off. Naming the trigger is optional and can happen at any point.
//    • Both ways out are always available and neither is punished. "I
//      smoked one anyway" hands straight over to the normal logging flow
//      with the trigger already chosen, so giving in is never a dead end
//      and never costs you the entry.
//
//  The five minutes is not arbitrary: it is the claim the tips tab has been
//  making all along — a craving peaks and passes in about three to five
//  minutes whether or not you smoke. This is that claim, made usable.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { breathPhaseAt } from "../data/breathing.js";
import { TRIGGERS } from "../data/triggers.js";
import { swapForTrigger } from "../data/habits.js";
import { WAVE_MS } from "../domain/cravings.js";
import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  chipButtonStyle,
  habitTagStyle,
  primaryButtonStyle,
  reasonCardStyle,
  sheetBackdropStyle,
  sheetPanelStyle,
} from "../theme/styles.js";

const mmss = (ms) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

export function CravingSheet({ goal, onHeld, onSmoked, onClose }) {
  const startedAt = React.useRef(Date.now()).current;
  const [elapsed, setElapsed] = React.useState(0);
  const [trigger, setTrigger] = React.useState(null);

  React.useEffect(() => {
    const tick = () => setElapsed(Date.now() - startedAt);
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, [startedAt]);

  const remaining = Math.max(0, WAVE_MS - elapsed);
  const rode = remaining === 0;

  // Where in the breathing cycle we are, derived from the clock rather than
  // held in state — nothing to fall out of step, and it survives a re-render.
  const phase = breathPhaseAt(elapsed);
  const swap = trigger ? swapForTrigger(trigger) : null;

  return (
    <div style={sheetBackdropStyle} onClick={onClose}>
      <div
        style={{ ...sheetPanelStyle, maxHeight: "92vh", overflowY: "auto" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink }}>
            {rode ? sqT("The wave has passed") : sqT("Ride it out")}
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 46,
              fontWeight: 700,
              color: rode ? colors.moss : colors.ink,
              fontVariantNumeric: "tabular-nums",
              direction: "ltr",
              lineHeight: 1.2,
              marginTop: 6,
            }}
          >
            {mmss(remaining)}
          </div>
          <div style={{ fontSize: 12.5, color: colors.ash, marginTop: 2 }}>
            {rode
              ? sqT("You didn't smoke for five minutes. That is the whole trick.")
              : sqT("A craving peaks and fades in a few minutes, smoked or not.")}
          </div>
        </div>

        {/* Something for the hands and the lungs to do while the clock runs. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            margin: "18px 0",
          }}
        >
          <div
            className="sq-breath"
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              background: colors.mossSoft,
              border: `2px solid ${colors.moss}`,
              transform: `scale(${phase.scale})`,
              transition: `transform ${phase.ms}ms ease-in-out`,
            }}
          />
          <div style={{ fontSize: 13, color: colors.moss, fontWeight: 600 }}>
            {sqT(phase.label)}
          </div>
        </div>

        {goal?.reason && (
          <div style={reasonCardStyle}>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: colors.ash,
                marginBottom: 6,
              }}
            >
              {sqT("Why you're doing this")}
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 17,
                fontStyle: "italic",
                color: colors.ink,
                lineHeight: 1.4,
              }}
            >
              {/* Isolated, for the reason spelled out in GoalTab. */}
              {'"'}
              <bdi>{goal.reason}</bdi>
              {'"'}
            </div>
          </div>
        )}

        <div style={{ fontSize: 13, color: colors.ash, margin: "16px 0 8px" }}>
          {sqT("What's driving it?")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TRIGGERS.map((name) => (
            <button
              key={name}
              className="sq-btn"
              onClick={() => setTrigger(name)}
              style={{
                ...chipButtonStyle,
                ...(trigger === name
                  ? { background: colors.emberSoft, borderColor: colors.ember, color: colors.ink }
                  : null),
              }}
            >
              {sqT(name)}
            </button>
          ))}
        </div>

        {swap && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              marginTop: 14,
              padding: "12px 14px",
              background: colors.mossSoft,
              borderRadius: 12,
            }}
          >
            <span style={{ ...habitTagStyle, background: colors.paper, color: colors.moss }}>
              {sqT("Swap")}
            </span>
            <span style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
              {sqT(swap.swap)}
            </span>
          </div>
        )}

        <button
          className="sq-btn"
          style={{ ...primaryButtonStyle, background: colors.moss, marginTop: 22 }}
          onClick={() => onHeld({ trigger, heldMs: Date.now() - startedAt })}
        >
          {sqT("It passed")}
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
          onClick={() => onSmoked({ trigger, heldMs: Date.now() - startedAt })}
        >
          {sqT("I smoked one anyway")}
        </button>
      </div>
    </div>
  );
}
