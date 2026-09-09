// ─────────────────────────────────────────────────────────────────────────
//  Today: the count, the target, and what has been logged so far.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { countryFor } from "../data/countries.js";
import { avoidedOn, pricePerCigarette } from "../domain/money.js";
import { sqT } from "../i18n/index.js";
import { formatTime } from "../i18n/format.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  bigNumberStyle,
  counterCardStyle,
  emptyBoxStyle,
  heldChipStyle,
  heldRowStyle,
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
  todayHeld,
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
  // One timeline, both halves of the story: the cigarettes and the cravings
  // that did not become one. Interleaved by when they happened, newest first.
  // A craving that was given in to is NOT here — that hands over to addLog and
  // is already in todayLogs, and listing it twice would make the day look
  // worse than it was.
  //
  // onRemove takes an entry's real index in the stored array, so carry it
  // along before the sort moves everything around.
  const rows = React.useMemo(
    () =>
      [
        ...todayLogs.map((entry, index) => ({ kind: "log", ts: entry.ts, entry, index })),
        ...todayHeld.map((session) => ({ kind: "held", ts: session.ts, session })),
      ].sort((a, b) => b.ts - a.ts),
    [todayLogs, todayHeld],
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
        {todayHeld.length > 0 && (
          <div
            style={{
              fontSize: 13,
              color: colors.moss,
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            {todayHeld.length === 1
              ? sqT("1 craving ridden out today")
              : sqT("{n} cravings ridden out today", { n: todayHeld.length })}
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
      {rows.length === 0 ? (
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
            Keys are prefixed by kind: a craving and the cigarette that ended
            it can land on the same millisecond.
          */}
          {rows.map((row) =>
            row.kind === "log" ? (
              <li key={`l${row.ts}`} style={timelineRowStyle}>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    color: colors.smoke,
                    fontWeight: 600,
                  }}
                >
                  {formatTime(row.ts)}
                </span>
                <span style={triggerChipStyle}>{sqT(row.entry.trigger)}</span>
                <button
                  className="sq-btn"
                  onClick={() => onRemove(row.index)}
                  style={undoButtonStyle}
                  aria-label={sqT("Remove this entry")}
                >
                  {sqT("Undo")}
                </button>
              </li>
            ) : (
              /*
                No Undo. A craving is immutable by design — there are no
                tombstones in the cravings blob and nothing to undo one with.
              */
              <li key={`h${row.ts}`} style={heldRowStyle}>
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    color: colors.moss,
                    fontWeight: 600,
                  }}
                >
                  {formatTime(row.ts)}
                </span>
                <span style={heldChipStyle}>
                  {row.session.trigger
                    ? sqT("Rode it out · {trigger}", { trigger: sqT(row.session.trigger) })
                    : sqT("Rode it out")}
                </span>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
