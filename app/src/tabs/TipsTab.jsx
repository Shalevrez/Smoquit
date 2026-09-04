// ─────────────────────────────────────────────────────────────────────────
//  Things to lean on — the ones that match this person first.
//
//  The list itself has not changed much. What has changed is that the top
//  of it is now an argument rather than an order: three tips, each with the
//  fact out of the log that put it there, and two buttons for saying
//  whether it actually helped. The rest stay below in the order they were
//  written, so nothing has been hidden and the page still reads as a list
//  somebody can go through.
//
//  The reason line is the part that has to be true. It is built from
//  numbers computed in domain/profile.js and phrased in domain/coach.js as
//  a translation key plus its values, so the sentence is assembled here and
//  only here — never stored, never guessed, and never shown at all when
//  there is not enough logged to say it honestly.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { pickForYou, rankTips } from "../domain/coach.js";
import { sqPhrase, sqT, useSqLang } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  disclaimerStyle,
  forYouCardStyle,
  noteStyle,
  reasonLineStyle,
  sectionHeadingStyle,
  tipNumberStyle,
  tipRowStyle,
  verdictButtonStyle,
  verdictRowStyle,
} from "../theme/styles.js";

/**
 * A reason, in the reader's language.
 *
 * The numbers in it are the same in every language and go through
 * untouched. The names of things are not: a trigger is stored in English
 * whatever the app is being read in, so it is translated on the way to the
 * screen here, exactly as it is everywhere else it is shown.
 */
export function TipsTab({ profile, feedback, onFeedback }) {
  const lang = useSqLang();
  // Depends on the language because a reason can carry a formatted hour,
  // which reads differently on a twelve-hour clock.
  const ranked = React.useMemo(() => rankTips(profile, feedback), [profile, feedback, lang]);
  const forYou = pickForYou(ranked);
  const chosen = new Set(forYou.map((entry) => entry.tip.id));
  // The library keeps the written order, so the numbers down the side stay
  // put from one visit to the next even as the recommendations move.
  const rest = ranked
    .filter((entry) => !chosen.has(entry.tip.id))
    .sort((a, b) => a.index - b.index);

  return (
    <div>
      <p style={noteStyle}>
        {sqT(
          "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.",
        )}
      </p>

      {forYou.length > 0 && (
        <>
          <h3 style={sectionHeadingStyle}>{sqT("For you right now")}</h3>
          {forYou.map((entry) => (
            <TipCard key={entry.tip.id} entry={entry} onFeedback={onFeedback} />
          ))}
        </>
      )}

      {/*
        Said once, at the point where somebody would otherwise wonder why
        the page looks the same as it did on day one. Not an apology: the
        list is still worth reading, it just is not about them yet.
      */}
      {!profile?.enoughData && (
        <p style={{ ...noteStyle, marginTop: 14 }}>
          {sqT(
            "These are in the order they were written. Once you've logged a few days, this page leads with the ones that match your own pattern.",
          )}
        </p>
      )}

      {forYou.length > 0 && <h3 style={sectionHeadingStyle}>{sqT("Everything else")}</h3>}

      {rest.map((entry) => (
        <div key={entry.tip.id} style={tipRowStyle}>
          <div style={tipNumberStyle}>{String(entry.index + 1).padStart(2, "0")}</div>
          <div>
            <div style={{ fontWeight: 700, color: colors.ink, marginBottom: 4 }}>
              {sqT(entry.tip.t)}
            </div>
            <div style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
              {sqT(entry.tip.d)}
            </div>
            <Verdict entry={entry} onFeedback={onFeedback} />
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

function TipCard({ entry, onFeedback }) {
  return (
    <div style={forYouCardStyle}>
      <div style={{ fontWeight: 700, color: colors.ink, marginBottom: 4 }}>{sqT(entry.tip.t)}</div>
      <div style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
        {sqT(entry.tip.d)}
      </div>
      <div style={reasonLineStyle}>{sqPhrase(entry.reason)}</div>
      <Verdict entry={entry} onFeedback={onFeedback} />
    </div>
  );
}

/** Two buttons and no third: "I haven't tried it" is the absence of both. */
function Verdict({ entry, onFeedback }) {
  return (
    <div style={verdictRowStyle}>
      <button
        className="sq-btn"
        style={verdictButtonStyle(entry.verdict === "worked", true)}
        aria-pressed={entry.verdict === "worked"}
        onClick={() => onFeedback(entry.tip.id, "worked")}
      >
        {sqT("This helps me")}
      </button>
      <button
        className="sq-btn"
        style={verdictButtonStyle(entry.verdict === "didnt", false)}
        aria-pressed={entry.verdict === "didnt"}
        onClick={() => onFeedback(entry.tip.id, "didnt")}
      >
        {sqT("Not for me")}
      </button>
    </div>
  );
}
