// ─────────────────────────────────────────────────────────────────────────
//  Today: the count, the target, and what has been logged so far.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { countryFor } from "../data/countries.js";
import { avoidedOn, pricePerCigarette } from "../domain/money.js";
import { sqT } from "../i18n/index.js";
import { formatTime } from "../lib/dates.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  bigNumberStyle,
  counterCardStyle,
  emptyBoxStyle,
  primaryButtonStyle,
  sectionHeadingStyle,
  timelineRowStyle,
  triggerChipStyle,
  undoButtonStyle,
} from "../theme/styles.js";
export function TodayTab({
  todayLogs,
  goal,
  settings,
  onAsk,
  onRemove,
  onRideItOut,
  heldToday,
  onNoneToday,
  markedNoneToday,
}) {
  const count = todayLogs.length,
    target = goal?.target ?? null,
    percentOfTarget = target ? Math.min(100, (count / Math.max(1, target)) * 100) : 0,
    currency = settings != null && settings.country ? countryFor(settings.country).currency : "$",
    // Same arithmetic as the running total on the goal and insights tabs,
    // from the same place, so today's figure and the total it feeds can
    // never be computed two different ways.
    savedToday = React.useMemo(
      () => (goal?.baseline ? avoidedOn(count, goal.baseline) * pricePerCigarette(settings) : null),
      [goal, count, settings],
    );
  return (
    <div>
      <div style={counterCardStyle}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: colors.ash,
          }}
        >
          {sqT("Cigarettes today")}
        </div>
        <div style={bigNumberStyle}>{count}</div>
        {target != null && (
          <>
            <div style={barTrackStyle}>
              <div
                style={{
                  ...barFillStyle,
                  width: `${percentOfTarget}%`,
                  background: count > target ? colors.ember : colors.moss,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 13,
                color: colors.ash,
                marginTop: 6,
              }}
            >
              {count > target
                ? sqT("{n} over target", {
                    n: count - target,
                  })
                : sqT("{n} left before target", {
                    n: target - count,
                  })}
            </div>
          </>
        )}
        {savedToday != null && (
          <div
            style={{
              fontSize: 13,
              color: colors.moss,
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            {sqT("≈ {currency}{amount} saved today vs. your usual", {
              currency: currency,
              amount: savedToday.toFixed(2),
            })}
          </div>
        )}
        <button className="sq-btn" style={primaryButtonStyle} onClick={onAsk}>
          {sqT("+ I just smoked one")}
        </button>
        {/*
          The other half of the story, and the only button here that is
          pressed BEFORE a decision rather than after one. Deliberately
          quieter than the primary action — moss rather than ember — because
          this is not an alarm, and because the app should not look like it
          is nagging somebody who came here for help.
        */}
        <button
          className="sq-btn"
          onClick={onRideItOut}
          style={{
            marginTop: 8,
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            border: `1px solid ${colors.moss}`,
            background: colors.mossSoft,
            color: colors.moss,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {sqT("I want one right now")}
        </button>
        <div
          style={{
            fontSize: 12,
            color: colors.ash,
            marginTop: 8,
          }}
        >
          {sqT("Logging honestly is how the insights get useful.")}
        </div>
        {heldToday > 0 && (
          <div
            style={{
              fontSize: 13,
              color: colors.moss,
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            {heldToday === 1
              ? sqT("1 craving ridden out today")
              : sqT("{n} cravings ridden out today", { n: heldToday })}
          </div>
        )}
        {/*
          Without this, a clean day is indistinguishable from a day nobody
          opened the app — so a day of not smoking could never be counted,
          and never be the best day. Only offered while the day is still
          empty; the moment anything is logged the question is answered.
        */}
        {count === 0 && (
          <button
            className="sq-btn"
            onClick={onNoneToday}
            disabled={markedNoneToday}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "11px",
              borderRadius: 10,
              border: `1px solid ${markedNoneToday ? colors.moss : colors.line}`,
              background: markedNoneToday ? colors.mossSoft : "none",
              color: markedNoneToday ? colors.moss : colors.smoke,
              fontSize: 14,
              fontWeight: 600,
              cursor: markedNoneToday ? "default" : "pointer",
            }}
          >
            {markedNoneToday ? sqT("Counted as a smoke-free day ✓") : sqT("I haven't smoked today")}
          </button>
        )}
      </div>
      <h3 style={sectionHeadingStyle}>{sqT("Today's timeline")}</h3>
      {count === 0 ? (
        <div style={emptyBoxStyle}>
          {sqT(
            "Nothing logged yet today. If a craving comes, try waiting it out — most pass in 3–5 minutes. If you do smoke, tap the button above so you can see your own pattern later.",
          )}
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {/*
            Newest first on screen, but onRemove takes the entry's real
            index in the stored array — so carry it along before reversing.
          */}
          {todayLogs
            .map((entry, index) => ({ ...entry, index }))
            .reverse()
            .map((entry) => (
              <li key={entry.ts} style={timelineRowStyle}>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    color: colors.smoke,
                    fontWeight: 600,
                  }}
                >
                  {formatTime(entry.ts)}
                </span>
                <span style={triggerChipStyle}>{sqT(entry.trigger)}</span>
                <button
                  className="sq-btn"
                  onClick={() => onRemove(entry.index)}
                  style={undoButtonStyle}
                  aria-label={sqT("Remove this entry")}
                >
                  {sqT("Undo")}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
