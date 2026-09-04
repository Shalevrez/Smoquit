// ─────────────────────────────────────────────────────────────────────────
//  The twenty-four hours of a day, as columns.
//
//  Two things this chart has to get right and the first draft did not:
//
//    • every column stands on the same line. Hanging the hour labels inside
//      the columns they belong to meant the four labelled columns were
//      shorter than the twenty they sat between, so 6am and noon were
//      quietly drawn on a higher floor than 5am and 11am. The labels now
//      live in their own row under the axis.
//    • an empty hour still takes up space. Each column is a track — a pale
//      slot the bar grows inside — so a quiet hour reads as "nothing here"
//      rather than as a hole in the chart.
//
//  Only the peak hour is ember, and it is the same hour the sentence above
//  the chart names. Everything else is the softer tone, so the eye lands on
//  the hour worth planning around instead of on all of them at once.
// ─────────────────────────────────────────────────────────────────────────

import { formatHour } from "../i18n/format.js";
import { sqT } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  barShape,
  chartTrackStyle,
  hourAxisLabelStyle,
  hourAxisStyle,
  hourChartStyle,
  hourColumnStyle,
  peakCountStyle,
} from "../theme/styles.js";

const TRACK_HEIGHT = 82;
const HOURS = 24;
const TICKS = [0, 6, 12, 18];
// The scale never tops out below three. On a quiet day the busiest hour
// holds one cigarette, and drawing that as a full-height bar paints a wall
// of maximums across the day. The number over the peak says what it really
// was.
const MIN_SCALE = 3;

export function HourChart({ byHour, peakHour }) {
  const scale = Math.max(...byHour, MIN_SCALE);
  return (
    // A time axis reads left to right in every language — see the note at
    // the top of theme/styles.js.
    <div style={{ direction: "ltr" }}>
      <div style={hourChartStyle}>
        {byHour.map((count, hour) => {
          const isPeak = hour === peakHour && count > 0;
          return (
            <div key={hour} style={hourColumnStyle}>
              {isPeak && <span style={peakCountStyle}>{count}</span>}
              <div
                title={sqT("{count} at {hour}:00", {
                  count,
                  hour,
                })}
                style={{
                  ...chartTrackStyle,
                  height: TRACK_HEIGHT,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    ...barShape(count, scale, TRACK_HEIGHT),
                    background: isPeak ? colors.ember : colors.emberMid,
                    transition: "height .3s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div style={hourAxisStyle}>
        {Array.from({ length: HOURS }, (_, hour) =>
          TICKS.includes(hour) ? (
            <div
              key={hour}
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <span
                style={{
                  ...hourAxisLabelStyle,
                  // Midnight sits on the left edge; centring its label would
                  // hang it off the side of the chart.
                  left: hour === 0 ? 0 : "50%",
                  transform: hour === 0 ? "none" : "translateX(-50%)",
                  color: hour === peakHour ? colors.ember : colors.ash,
                }}
              >
                {formatHour(hour)}
              </span>
            </div>
          ) : (
            <div
              key={hour}
              style={{
                flex: 1,
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}
