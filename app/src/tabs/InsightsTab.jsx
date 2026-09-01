// ─────────────────────────────────────────────────────────────────────────
//  Your own pattern, drawn back at you.
//
//  This page used to be a wall of five equal-weight numbers, a chart, some
//  bars and a week. All of it true, none of it answering the question
//  somebody actually opens this tab with, which is "is this getting better
//  or not". So it opens with that: the last fortnight against the one
//  before it, in one number, before anything else.
//
//  Two things that were being recorded and never shown are now here. The
//  urges: the app has counted every craving somebody sat with, and both
//  outcomes, since the day that feature shipped, and this page said nothing
//  about any of it — the one number in the whole app that is unambiguously
//  about winning. And the trend on each trigger, which is what turns a bar
//  chart of what you smoke into a report on whether the thing you changed
//  last month worked.
//
//  The peak is a three-hour stretch rather than a single hour, because a
//  single hour moves with one cigarette and nobody organises their day to
//  the hour. Everything here is read off domain/profile.js — this file
//  decides how to say it and nothing else.
// ─────────────────────────────────────────────────────────────────────────

import { HourChart } from "../components/HourChart.jsx";
import { Stat } from "../components/Stat.jsx";
import { WeekChart } from "../components/WeekChart.jsx";
import { countryFor } from "../data/countries.js";
import { formatHour } from "../domain/insights.js";
import { sqLocale, sqT, useSqLang } from "../i18n/index.js";
import { colors } from "../theme/colors.js";
import {
  barFillStyle,
  barTrackStyle,
  emptyBoxStyle,
  eyebrowStyle,
  headlineCaptionStyle,
  headlineCardStyle,
  headlineNumberStyle,
  sectionHeadingStyle,
  smallPrintStyle,
  statGridStyle,
  trendMarkStyle,
} from "../theme/styles.js";

/** A Sunday, so a weekday number can be turned into the reader's word for it. */
const A_SUNDAY = new Date(2024, 0, 7);

const pct = (share) => Math.round(share * 100);
const rate = (n) => n.toFixed(1);

function weekdayName(weekday, long = true) {
  const date = new Date(A_SUNDAY);
  date.setDate(date.getDate() + weekday);
  return date.toLocaleDateString(sqLocale(), { weekday: long ? "long" : "narrow" });
}

export function InsightsTab({ profile, settings }) {
  useSqLang();

  const { allTime, recent, previous, cravings, streak, money } = profile;
  const currency = settings?.country ? countryFor(settings.country).currency : "$";

  if (allTime.total === 0)
    return (
      <div style={emptyBoxStyle}>
        {sqT(
          "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.",
        )}
      </div>
    );

  return (
    <div>
      <Headline recent={recent} previous={previous} />

      <div style={statGridStyle}>
        <Stat label={sqT("Logged total")} value={allTime.total} />
        <Stat label={sqT("Daily average")} value={rate(allTime.avgPerDay)} />
        <Stat label={sqT("Days tracked")} value={allTime.days} />
        <Stat label={sqT("Smoke-free days")} value={allTime.smokeFreeDays} accent={colors.moss} />
        <Stat label={sqT("Best (lowest) day")} value={allTime.bestDay} accent={colors.moss} />
        {money.allTime.saved != null && (
          <Stat
            label={sqT("Est. total saved")}
            value={`${currency}${Math.round(money.allTime.saved)}`}
            accent={colors.moss}
          />
        )}
      </div>

      <Urges cravings={cravings} />

      <h3 style={sectionHeadingStyle}>{sqT("When you smoke")}</h3>
      <Stretch profile={profile} />
      <HourChart byHour={profile.byHour} peakHour={profile.peakHour} />

      <h3 style={sectionHeadingStyle}>{sqT("Top triggers")}</h3>
      <Triggers profile={profile} />

      <h3 style={sectionHeadingStyle}>{sqT("Last 7 days")}</h3>
      <WeekChart
        days={profile.last7.map((day) => ({
          ...day,
          label: weekdayName(new Date(`${day.date}T00:00:00`).getDay(), false),
        }))}
      />

      <h3 style={sectionHeadingStyle}>{sqT("Streaks")}</h3>
      <div style={statGridStyle}>
        <Stat label={sqT("Smoke-free run")} value={streak.currentSmokeFree} accent={colors.moss} />
        <Stat label={sqT("Longest run")} value={streak.longestSmokeFree} accent={colors.moss} />
        {streak.currentUnderTarget != null && (
          <Stat
            label={sqT("Days at or under target")}
            value={streak.currentUnderTarget}
            accent={colors.moss}
          />
        )}
      </div>
    </div>
  );
}

/**
 * The one number worth leading with.
 *
 * A fortnight against the fortnight before it, and never against a fortnight
 * that was not tracked — an account three weeks old has one comparison to
 * make and an account three days old has none, and saying so is better than
 * comparing somebody against zeroes they never lived.
 */
function Headline({ recent, previous }) {
  const change = previous ? recent.perDay - previous.perDay : null;
  const moved = change != null && Math.abs(change) >= 0.05;

  return (
    <div style={headlineCardStyle}>
      <div style={eyebrowStyle}>{sqT("The last two weeks")}</div>
      <div style={headlineNumberStyle}>{rate(recent.perDay)}</div>
      <div style={headlineCaptionStyle}>
        {sqT("a day, on average.")}{" "}
        {previous == null ? (
          sqT("Too early to compare fortnights — this is your first.")
        ) : moved ? (
          <strong style={{ color: change < 0 ? colors.moss : colors.ember }}>
            {sqT(
              change < 0
                ? "Down from {n} a day the fortnight before."
                : "Up from {n} a day the fortnight before.",
              { n: rate(previous.perDay) },
            )}
          </strong>
        ) : (
          sqT("About the same as the fortnight before.")
        )}
      </div>
    </div>
  );
}

/**
 * The urges, which are the only thing on this page that counts a win.
 *
 * Both halves, as everywhere else: "seven of eleven" is the fact worth
 * having, and a count of the wins alone would be flattering and useless.
 */
function Urges({ cravings }) {
  return (
    <>
      <h3 style={sectionHeadingStyle}>{sqT("Urges you sat with")}</h3>
      {cravings.faced === 0 ? (
        <div style={emptyBoxStyle}>
          {sqT(
            "Nothing recorded yet. Next time one comes, use “I want one right now” on the Today tab — what happens either way gets counted here.",
          )}
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13.5, color: colors.smoke, lineHeight: 1.55 }}>
            {sqT("You rode out {held} of the {faced} urges you sat with in the last two weeks.", {
              held: cravings.held,
              faced: cravings.faced,
            })}
          </div>
          <div style={barTrackStyle}>
            <div
              style={{
                ...barFillStyle,
                width: `${pct(cravings.rate)}%`,
                background: colors.moss,
              }}
            />
          </div>
          <div style={smallPrintStyle}>{sqT("{pct}% ridden out", { pct: pct(cravings.rate) })}</div>
        </div>
      )}
    </>
  );
}

/** The stretch of the day to plan around, and the day of the week if there is one. */
function Stretch({ profile }) {
  const window = profile.peakWindow;
  const worst = profile.worstWeekday;

  return (
    <div style={{ fontSize: 13, color: colors.ash, marginBottom: 12, lineHeight: 1.55 }}>
      {window && (
        <div>
          {sqT(
            "Your heaviest stretch is {from}–{to}, which carries {pct}% of everything you've logged. Plan a replacement for that window — a walk, water, a piece of gum.",
            { from: formatHour(window.from), to: formatHour(window.to), pct: pct(window.share) },
          )}
        </div>
      )}
      {worst && (
        <div style={{ marginTop: 6 }}>
          {sqT("{day} is your heaviest day of the week, at about {n} a day.", {
            day: weekdayName(worst.weekday),
            n: rate(worst.perDay),
          })}
        </div>
      )}
    </div>
  );
}

/**
 * What sets them off, worst first, with which way each one is going.
 *
 * The bar is that trigger's share of the fortnight; the arrow is against
 * the fortnight before. Only a change big enough to be a direction gets an
 * arrow — see the deadband in domain/profile.js — because an arrow on every
 * row is an arrow that means nothing.
 */
function Triggers({ profile }) {
  const ranked = profile.triggerRank.slice(0, 5);
  if (ranked.length === 0)
    return <div style={{ fontSize: 13, color: colors.ash }}>{sqT("No triggers tagged yet.")}</div>;

  return (
    <div>
      {ranked.map((rank) => (
        <div key={rank.trigger} style={{ marginBottom: 8 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: colors.smoke,
            }}
          >
            <span>{sqT(rank.trigger)}</span>
            <span style={{ color: colors.ash }}>
              {rank.count}
              {rank.trend === 1 && (
                <span style={trendMarkStyle(true)} title={sqT("up on the fortnight before")}>
                  ↑
                </span>
              )}
              {rank.trend === -1 && (
                <span style={trendMarkStyle(false)} title={sqT("down on the fortnight before")}>
                  ↓
                </span>
              )}
            </span>
          </div>
          <div style={barTrackStyle}>
            <div
              style={{
                ...barFillStyle,
                width: `${pct(rank.share)}%`,
                background: colors.smoke,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
