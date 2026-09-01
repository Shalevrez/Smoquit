// ─────────────────────────────────────────────────────────────────────────
//  Why you are doing this, and what you are aiming at.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { Stat } from "../components/Stat.jsx";
import { countryFor } from "../data/countries.js";
import { sqT } from "../i18n/index.js";
import { saveKey } from "../lib/storage.js";
import { colors } from "../theme/colors.js";
import {
  fieldLabelStyle,
  formStackStyle,
  inputStyle,
  reasonCardStyle,
  saveButtonStyle,
  statGridStyle,
} from "../theme/styles.js";
export function GoalTab({ goal, setGoal, profile, settings }) {
  const currency =
      settings != null && settings.country ? countryFor(settings.country).currency : "$",
    [baseline, setBaseline] = React.useState(goal?.baseline ?? ""),
    [target, setTarget] = React.useState(goal?.target ?? ""),
    [quitDate, setQuitDate] = React.useState(goal?.quitDate ?? ""),
    [reason, setReason] = React.useState(goal?.reason ?? ""),
    save = () => {
      const next = {
        baseline: baseline === "" ? null : Number(baseline),
        target: target === "" ? null : Number(target),
        quitDate: quitDate || null,
        reason: reason.trim(),
      };
      setGoal(next);
      saveKey("goal", next);
    },
    daysToQuitDate = React.useMemo(
      () =>
        goal != null && goal.quitDate
          ? Math.ceil((new Date(goal.quitDate) - new Date()) / 864e5)
          : null,
      [goal],
    ),
    // Every tracked day contributes the cigarettes NOT smoked that day
    // against the old baseline, priced one at a time — counted once, in
    // domain/money.js, over the same days everything else on the Insights
    // tab counts. This used to be summed here over the days that had a key
    // in the log, which silently skipped every day nobody opened the app —
    // the days with nothing on them, so the best ones.
    totalSaved = profile?.money?.allTime?.saved ?? null;
  return (
    <div>
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
              fontSize: 18,
              fontStyle: "italic",
              color: colors.ink,
              lineHeight: 1.4,
            }}
          >
            {/*
              <bdi>, because this is the one string on screen the app did
              not write. Somebody reading in Hebrew may well have typed
              their reason in English, and unquarantined it the bidi
              algorithm drags the quote marks to the wrong ends and splits
              the sentence. bdi isolates it and lets it run its own way.
            */}
            {'"'}
            <bdi>{goal.reason}</bdi>
            {'"'}
          </div>
        </div>
      )}
      {goal && (daysToQuitDate != null || totalSaved != null) && (
        <div style={statGridStyle}>
          {daysToQuitDate != null && (
            <Stat
              label={sqT(daysToQuitDate >= 0 ? "Days to quit date" : "Days since quit date")}
              value={Math.abs(daysToQuitDate)}
              accent={colors.moss}
            />
          )}
          {totalSaved != null && (
            <Stat
              label={sqT("Est. total saved")}
              value={`${currency}${totalSaved.toFixed(0)}`}
              accent={colors.moss}
            />
          )}
        </div>
      )}
      <div style={formStackStyle}>
        <label style={fieldLabelStyle}>
          {sqT("Cigarettes on a typical day (before quitting)")}
          <input
            type="number"
            min="0"
            value={baseline}
            onChange={(event) => setBaseline(event.target.value)}
            style={inputStyle}
            placeholder={sqT("e.g. 15")}
          />
        </label>
        <label style={fieldLabelStyle}>
          {sqT("Daily target for now")}
          <input
            type="number"
            min="0"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            style={inputStyle}
            placeholder={sqT("e.g. 8")}
          />
        </label>
        <label style={fieldLabelStyle}>
          {sqT("Target quit date")}
          <input
            type="date"
            value={quitDate}
            onChange={(event) => setQuitDate(event.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={fieldLabelStyle}>
          {sqT("Your reason (you'll see it every time you open this)")}
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            style={{
              ...inputStyle,
              minHeight: 70,
              resize: "vertical",
              fontFamily: "inherit",
            }}
            placeholder={sqT("e.g. Be there for my kids without getting winded.")}
          />
        </label>
        <button className="sq-btn" style={saveButtonStyle} onClick={save}>
          {sqT("Save my goal")}
        </button>
      </div>
    </div>
  );
}
