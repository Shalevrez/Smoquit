// ─────────────────────────────────────────────────────────────────────────
//  The last seven days, one column each.
//
//  A day with nothing logged used to be drawn as a two-pixel green line,
//  which looked like a smudge under the zero rather than like the good news
//  it is. Now every day is a full-height track, a clean day is an empty one,
//  and its zero is written in moss — the colour the rest of the app uses for
//  the numbers worth being pleased about.
// ─────────────────────────────────────────────────────────────────────────

import { colors } from "../theme/colors.js";
import {
  barShape,
  chartTrackStyle,
  weekChartStyle,
  weekColumnStyle,
  weekCountStyle,
  weekLabelStyle,
} from "../theme/styles.js";

const TRACK_HEIGHT = 82;
const MIN_SCALE = 3;

export function WeekChart({ days }) {
  const scale = Math.max(...days.map((day) => day.count), MIN_SCALE);
  return (
    <div style={weekChartStyle}>
      {days.map((day, index) => {
        const isToday = index === days.length - 1;
        return (
          <div key={day.date} style={weekColumnStyle}>
            <span
              style={{
                ...weekCountStyle,
                color: day.count === 0 ? colors.moss : colors.smoke,
              }}
            >
              {day.count}
            </span>
            <div
              style={{
                ...chartTrackStyle,
                height: TRACK_HEIGHT,
                maxWidth: 36,
                alignSelf: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  ...barShape(day.count, scale, TRACK_HEIGHT),
                  background: colors.moss,
                  transition: "height .3s",
                }}
              />
            </div>
            <span
              style={{
                ...weekLabelStyle,
                color: isToday ? colors.smoke : colors.ash,
                fontWeight: isToday ? 700 : 400,
              }}
            >
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
