// ─────────────────────────────────────────────────────────────────────────
//  Your own pattern, drawn back at you.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { Stat } from "../components/Stat.jsx";
import { computeInsights } from "../domain/insights.js";
import { sqT, useSqLang } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  emptyBoxStyle,
  hourChartStyle,
  sectionHeadingStyle,
  statGridStyle,
} from "../theme/styles.js";
export function InsightsTab({ logs }) {
  const lang = useSqLang(),
    insights = React.useMemo(() => computeInsights(logs), [logs, lang]);
  if (insights.total === 0)
    return (
      <div style={emptyBoxStyle}>
        {sqT(
          "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.",
        )}
      </div>
    );
  // Both charts are drawn as percentages of their own tallest bar.
  const tallestHour = Math.max(...insights.byHour, 1);
  const tallestDay = Math.max(...insights.last7.map((day) => day.count), 1);
  return (
    <div>
      <div style={statGridStyle}>
        <Stat label={sqT("Logged total")} value={insights.total} />
        <Stat label={sqT("Daily average")} value={insights.avgPerDay.toFixed(1)} />
        <Stat label={sqT("Days tracked")} value={insights.days} />
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
      <div style={hourChartStyle}>
        {insights.byHour.map((count, hour) => (
          <div
            key={hour}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              title={sqT("{count} at {hour}:00", {
                count,
                hour,
              })}
              style={{
                width: "70%",
                height: `${(count / tallestHour) * 90 + (count ? 6 : 0)}px`,
                background: count === tallestHour && count > 0 ? colors.ember : colors.emberSoft,
                borderRadius: "3px 3px 0 0",
                transition: "height .3s",
              }}
            />
            {hour % 6 === 0 && (
              <span
                style={{
                  fontSize: 9,
                  color: colors.ash,
                  marginTop: 3,
                }}
              >
                {hour}
              </span>
            )}
          </div>
        ))}
      </div>
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
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "flex-end",
          height: 90,
        }}
      >
        {insights.last7.map((day) => (
          <div
            key={day.date}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: colors.smoke,
                marginBottom: 2,
                fontWeight: 600,
              }}
            >
              {day.count}
            </span>
            <div
              style={{
                width: "68%",
                height: `${(day.count / tallestDay) * 70 + 2}px`,
                background: colors.moss,
                borderRadius: "3px 3px 0 0",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: colors.ash,
                marginTop: 4,
              }}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
