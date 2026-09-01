// ─────────────────────────────────────────────────────────────────────────
//  Your own pattern, drawn back at you.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { HourChart } from "../components/HourChart.jsx";
import { Stat } from "../components/Stat.jsx";
import { WeekChart } from "../components/WeekChart.jsx";
import { computeInsights } from "../domain/insights.js";
import { sqT, useSqLang } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  emptyBoxStyle,
  sectionHeadingStyle,
  statGridStyle,
} from "../theme/styles.js";
export function InsightsTab({ logs, meta }) {
  const lang = useSqLang(),
    insights = React.useMemo(() => computeInsights(logs, meta), [logs, meta, lang]);
  if (insights.total === 0)
    return (
      <div style={emptyBoxStyle}>
        {sqT(
          "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.",
        )}
      </div>
    );
  return (
    <div>
      <div style={statGridStyle}>
        <Stat label={sqT("Logged total")} value={insights.total} />
        <Stat label={sqT("Daily average")} value={insights.avgPerDay.toFixed(1)} />
        <Stat label={sqT("Days tracked")} value={insights.days} />
        <Stat label={sqT("Smoke-free days")} value={insights.smokeFreeDays} accent={colors.moss} />
        <Stat label={sqT("Best (lowest) day")} value={insights.bestDay} accent={colors.moss} />
      </div>
      <h3 style={sectionHeadingStyle}>{sqT("When you smoke")}</h3>
      <div
        style={{
          fontSize: 13,
          color: colors.ash,
          marginBottom: 12,
        }}
      >
        {sqT("Your peak is around ")}
        <strong
          style={{
            color: colors.ember,
          }}
        >
          {insights.peakHourLabel}
        </strong>
        {sqT(". Plan a replacement for that window — a walk, water, a piece of gum.")}
      </div>
      <HourChart byHour={insights.byHour} peakHour={insights.peakHour} />
      <h3 style={sectionHeadingStyle}>{sqT("Top triggers")}</h3>
      {insights.topTriggers.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: colors.ash,
          }}
        >
          {sqT("No triggers tagged yet.")}
        </div>
      ) : (
        <div>
          {insights.topTriggers.map(([trigger, count]) => (
            <div
              key={trigger}
              style={{
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: colors.smoke,
                }}
              >
                <span>{sqT(trigger)}</span>
                <span
                  style={{
                    color: colors.ash,
                  }}
                >
                  {count}
                </span>
              </div>
              <div style={barTrackStyle}>
                <div
                  style={{
                    ...barFillStyle,
                    width: `${(count / insights.total) * 100}%`,
                    background: colors.smoke,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <h3 style={sectionHeadingStyle}>{sqT("Last 7 days")}</h3>
      <WeekChart days={insights.last7} />
    </div>
  );
}
