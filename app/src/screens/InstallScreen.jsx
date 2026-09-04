// ─────────────────────────────────────────────────────────────────────────
//  "Why can't I turn notifications on?" — for the half of this app's
//  readers who are on an iPhone.
//
//  Safari will not give a web page a PushManager at all until the site has
//  been added to the Home Screen. There is no prompt for this, no error, and
//  no hint: the switch simply does nothing, and the honest conclusion for
//  anybody it happens to is that the feature is broken.
//
//  So it gets a screen rather than a line of small print. Three steps, the
//  share icon drawn rather than described (it has no name most people know,
//  and "the square with the arrow" is what everybody actually calls it),
//  and no dead end — there is a way back, because somebody who does not
//  want to install anything should not be trapped here.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  eyebrowStyle,
  noteStyle,
  primaryButtonStyle,
  sectionHeadingStyle,
} from "../theme/styles.js";

/**
 * iOS's share glyph, drawn rather than named.
 *
 * Inline SVG because the whole app ships no images and this one has to sit
 * inside a sentence at text size and follow the text colour. currentColor
 * does that for free.
 */
function ShareGlyph() {
  return (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ verticalAlign: "-3px", margin: "0 2px" }}
    >
      <path d="M7.5 1.2 V11" />
      <path d="M4.4 4.1 L7.5 1 L10.6 4.1" />
      <path d="M3.4 7.6 H2.2 A1.2 1.2 0 0 0 1 8.8 V16.3 A1.2 1.2 0 0 0 2.2 17.5 H12.8 A1.2 1.2 0 0 0 14 16.3 V8.8 A1.2 1.2 0 0 0 12.8 7.6 H11.6" />
    </svg>
  );
}

function Step({ n, children }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        marginBottom: 16,
        fontSize: 14.5,
        color: colors.smoke,
        lineHeight: 1.6,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: 12,
          background: colors.emberSoft,
          color: colors.ember,
          fontWeight: 700,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // The numerals stay the way the reader counts, whichever way the
          // sentence beside them runs.
          direction: "ltr",
        }}
      >
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function InstallScreen({ onBack }) {
  return (
    <div>
      <div style={eyebrowStyle}>{sqT("On iPhone")}</div>
      <h3 style={{ ...sectionHeadingStyle, marginTop: 0 }}>
        {sqT("Add Smoquit to your Home Screen")}
      </h3>
      <p style={noteStyle}>
        {sqT(
          "Apple only lets a website send notifications once it has been added to the Home Screen. It takes about ten seconds, and afterwards Smoquit opens like any other app — same account, same history.",
        )}
      </p>

      <ol style={{ listStyle: "none", padding: 0, margin: "22px 0 0" }}>
        <Step n={1}>
          {sqT("Tap the share button")} <ShareGlyph /> {sqT("at the bottom of Safari.")}
        </Step>
        <Step n={2}>{sqT('Scroll down and choose "Add to Home Screen".')}</Step>
        <Step n={3}>
          {sqT(
            "Open Smoquit from your Home Screen, then come back to Settings and turn the switch on.",
          )}
        </Step>
      </ol>

      <div
        style={{
          marginTop: 20,
          padding: "12px 14px",
          borderRadius: 10,
          background: colors.breath,
          border: `1px solid ${colors.line}`,
          fontSize: 13,
          color: colors.ash,
          lineHeight: 1.6,
        }}
      >
        {sqT(
          "If you are reading this in Chrome or another browser on your iPhone, open the site in Safari first — Apple only offers this from there.",
        )}
      </div>

      <button className="sq-btn" style={primaryButtonStyle} onClick={onBack}>
        {sqT("Back to settings")}
      </button>
    </div>
  );
}
