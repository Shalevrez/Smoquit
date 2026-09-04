// ─────────────────────────────────────────────────────────────────────────
//  One thing the app wants to say, above whichever tab is showing.
//
//  A banner rather than a sheet, and that is a decision rather than a
//  default. None of these four things is worth blocking the app for, and the
//  target one especially: interrupting somebody with a modal the instant
//  they logged a cigarette honestly is how you teach them to stop logging,
//  and every number in this app is downstream of them not doing that.
//
//  One at a time, too. A stack of these is a notification centre, and a
//  notification centre is a place people go to dismiss things.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

import { KIND_LABELS } from "../domain/alerts.js";
import { formatHour } from "../domain/insights.js";
import { sqPhrase, sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  alertBannerStyle,
  alertDismissStyle,
  alertToneStyle,
  chipButtonStyle,
  eyebrowStyle,
  noteStyle,
} from "../theme/styles.js";

/**
 * The engine hands out raw hour NUMBERS, on purpose — it has no language and
 * is meant to be runnable somewhere that has none either. This is where they
 * become something a person reads, through the same formatHour() the hour
 * axis and the tips use, so the three can never disagree about what to call
 * four in the afternoon.
 */
function phrase(part) {
  if (!part) return null;
  const params = { ...part.params };
  for (const name of ["hour", "from", "to"]) {
    if (name in params) params[name] = formatHour(params[name]);
  }
  return sqPhrase({ key: part.key, params });
}

export function AlertBanner({ alert, onAction, onDismiss }) {
  if (!alert) return null;

  return (
    <div
      style={{ ...alertBannerStyle, ...alertToneStyle(alert.tone) }}
      role="status"
      aria-live="polite"
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...eyebrowStyle, marginBottom: 0 }}>{sqT(KIND_LABELS[alert.kind])}</div>
        <div style={{ fontWeight: 700, color: colors.ink, marginTop: 2 }}>
          {phrase(alert.title)}
        </div>
        {/*
          <bdi> because the body carries the person's own numbers and hours
          into a sentence that may be running right to left, and a bare digit
          at a boundary gets flung to the wrong end of the line.
        */}
        <p style={{ ...noteStyle, marginTop: 4 }}>
          <bdi>{phrase(alert.body)}</bdi>
        </p>
        {alert.action && (
          <button
            className="sq-btn"
            onClick={() => onAction(alert)}
            style={{ ...chipButtonStyle, marginTop: 10 }}
          >
            {sqT(alert.action.label)}
          </button>
        )}
      </div>
      {/*
        No marginLeft and no absolute positioning: the row is flex with a
        gap, so this lands at the end of the line the reader finishes on,
        whichever end that is.
      */}
      <button
        className="sq-btn"
        onClick={() => onDismiss(alert)}
        style={alertDismissStyle}
        aria-label={sqT("Dismiss")}
      >
        ×
      </button>
    </div>
  );
}
