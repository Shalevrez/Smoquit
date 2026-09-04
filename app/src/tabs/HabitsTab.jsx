// ─────────────────────────────────────────────────────────────────────────
//  Cue → routine → reward, and whether the swap actually worked.
//
//  This page used to be six cards of advice that never found out anything.
//  It still opens with the same idea, because the idea is right — you
//  cannot delete a cue, you can only give it something else to do — but the
//  swap is now something you start, and the app measures it against the
//  cigarettes you were already logging.
//
//  Order matters here: what you are in the middle of comes first, what is
//  worth starting next comes second, and the full library of swaps stays at
//  the bottom for anyone who just wants to read them.
//
//  The suggestions come off the real trigger ranking rather than the order
//  somebody wrote the cards in, so the first thing offered is the cue
//  costing the most cigarettes a day right now.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { HABITS } from "../data/habits.js";
import {
  activeExperiments,
  experimentProgress,
  suggestExperiments,
  TRIAL_DAYS,
} from "../domain/experiments.js";
import { formatHour } from "../i18n/format.js";
import { sqT, useSqLang } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  beforeAfterStyle,
  emptyBoxStyle,
  experimentCardStyle,
  habitCardStyle,
  habitTagStyle,
  noteStyle,
  reasonLineStyle,
  sectionHeadingStyle,
  smallPrintStyle,
  startButtonStyle,
  stopButtonStyle,
} from "../theme/styles.js";

/** How many swaps to offer at once. More than this is a menu, not a nudge. */
const SUGGESTIONS = 2;

export function HabitsTab({ profile, habits, logs, onStart, onStop }) {
  const lang = useSqLang();
  const running = activeExperiments(habits);
  const suggestions = React.useMemo(
    () => suggestExperiments(profile, habits).slice(0, SUGGESTIONS),
    [profile, habits],
  );
  // The cues already on screen above, so the library below does not repeat
  // them straight back.
  const shown = new Set([
    ...running.map((experiment) => experiment.cue),
    ...suggestions.map((candidate) => candidate.cue),
  ]);

  return (
    <div>
      <p style={noteStyle}>
        {sqT("A habit is a loop: ")}
        <strong>{sqT("cue → routine → reward")}</strong>
        {sqT(
          ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.",
        )}
      </p>

      {running.length > 0 && (
        <>
          <h3 style={sectionHeadingStyle}>{sqT("What you're trying")}</h3>
          {running.map((experiment) => (
            <RunningCard
              key={experiment.id}
              experiment={experiment}
              logs={logs}
              lang={lang}
              onStop={onStop}
            />
          ))}
        </>
      )}

      {suggestions.length > 0 && (
        <>
          <h3 style={sectionHeadingStyle}>{sqT("Worth trying next")}</h3>
          {suggestions.map((candidate) => (
            <SuggestionCard key={candidate.trigger} candidate={candidate} onStart={onStart} />
          ))}
        </>
      )}

      {running.length === 0 && suggestions.length === 0 && (
        <div style={{ ...emptyBoxStyle, marginTop: 16 }}>
          {sqT(
            "Tag a few cigarettes with what set them off, and this page will suggest the swap worth trying first — then measure it for you.",
          )}
        </div>
      )}

      <h3 style={sectionHeadingStyle}>{sqT("Every swap")}</h3>
      {HABITS.filter((habit) => !shown.has(habit.cue)).map((habit) => (
        <div key={habit.cue} style={habitCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={habitTagStyle}>{sqT("Cue")}</span>
            <span style={{ fontWeight: 700, color: colors.ink }}>{sqT(habit.cue)}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ ...habitTagStyle, background: colors.mossSoft, color: colors.moss }}>
              {sqT("Swap")}
            </span>
            <span style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
              {sqT(habit.swap)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * One swap in progress.
 *
 * Both numbers are shown, always. A card that only ever showed the good
 * news would be worth nothing the first time somebody's week went badly,
 * and the whole point of measuring a swap is that it can come out the other
 * way — which is information, not failure.
 */
function RunningCard({ experiment, logs, lang, onStop }) {
  const progress = React.useMemo(
    () => experimentProgress(experiment, logs),
    [experiment, logs, lang],
  );
  const done = Math.min(100, (progress.daysIn / TRIAL_DAYS) * 100);

  return (
    <div style={experimentCardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={habitTagStyle}>{sqT("Cue")}</span>
        <span style={{ fontWeight: 700, color: colors.ink }}>{sqT(experiment.cue)}</span>
      </div>
      <div style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
        {sqT(experiment.swap)}
      </div>

      <div style={beforeAfterStyle}>
        <span style={{ color: colors.ash }}>{progress.baselinePerDay.toFixed(1)}</span>
        <span style={{ color: colors.ash, fontSize: 16 }}>→</span>
        <span style={{ color: progress.verdict === "working" ? colors.moss : colors.ink }}>
          {progress.sincePerDay.toFixed(1)}
        </span>
      </div>
      <div style={smallPrintStyle}>
        {sqT("a day with this cue, before and since")}
        {" · "}
        {sqT("{n} of {days} days clear", { n: progress.cleanDays, days: progress.daysIn })}
      </div>

      <div style={barTrackStyle}>
        <div style={{ ...barFillStyle, width: `${done}%`, background: colors.moss }} />
      </div>
      <div style={smallPrintStyle}>
        {sqT("Day {n} of {total}", { n: progress.daysIn, total: TRIAL_DAYS })}
      </div>

      <div style={{ ...reasonLineStyle, color: verdictColour(progress.verdict) }}>
        {verdictText(progress)}
      </div>

      <button className="sq-btn" style={stopButtonStyle} onClick={() => onStop(experiment.id)}>
        {sqT("Stop this one")}
      </button>
    </div>
  );
}

/** A swap the log says is worth starting, with the evidence for it. */
function SuggestionCard({ candidate, onStart }) {
  return (
    <div style={experimentCardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={habitTagStyle}>{sqT("Cue")}</span>
        <span style={{ fontWeight: 700, color: colors.ink }}>{sqT(candidate.cue)}</span>
      </div>
      <div style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
        {sqT(candidate.swap)}
      </div>
      <div style={reasonLineStyle}>
        {candidate.peakHour == null
          ? sqT("{trigger}: about {n} a day lately.", {
              trigger: sqT(candidate.trigger),
              n: candidate.perDay.toFixed(1),
            })
          : sqT("{trigger}: about {n} a day lately, most often around {hour}.", {
              trigger: sqT(candidate.trigger),
              n: candidate.perDay.toFixed(1),
              hour: formatHour(candidate.peakHour),
            })}
      </div>
      <button className="sq-btn" style={startButtonStyle} onClick={() => onStart(candidate)}>
        {sqT("Try this for a week")}
      </button>
    </div>
  );
}

function verdictColour(verdict) {
  if (verdict === "working") return colors.moss;
  if (verdict === "worse") return colors.ember;
  return colors.ash;
}

function verdictText(progress) {
  const pct = progress.changePct == null ? null : Math.round(Math.abs(progress.changePct) * 100);
  if (progress.verdict === "early") return sqT("Too early to call. Check back in a day or two.");
  if (progress.verdict === "working")
    return sqT("Down {pct}% on this cue since you started.", { pct });
  if (progress.verdict === "worse")
    return sqT("Up on this cue since you started — another swap may fit better.");
  return sqT("No real change on this cue yet. Give it the full week.");
}
