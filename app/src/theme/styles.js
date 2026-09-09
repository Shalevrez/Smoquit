// ─────────────────────────────────────────────────────────────────────────
//  Every shared style object in the app.
//
//  There is no CSS framework and almost no stylesheet — a little over 200
//  bytes of reset, and everything else is a plain object handed to a style
//  prop. Keeping the shared ones together is what the built bundle did too;
//  the difference is that here they have names.
//
//  Two consequences worth knowing:
//    • layout uses flex and gap rather than margin-left, so right-to-left
//      mirrors for free;
//    • anything that must NOT mirror — the Latin wordmark, a time axis —
//      sets direction: "ltr" explicitly.
// ─────────────────────────────────────────────────────────────────────────

import { colors } from "./colors.js";
export const pageStyle = {
  minHeight: "100vh",
  background: colors.breath,
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: colors.ink,
  padding: "0",
};
export const shellStyle = {
  maxWidth: 480,
  margin: "0 auto",
  minHeight: "100vh",
  background: colors.paper,
  boxShadow: "0 0 40px rgba(0,0,0,.04)",
};
export const headerStyle = {
  padding: "26px 20px 16px",
  borderBottom: `1px solid ${colors.line}`,
};
export const wordmarkStyle = {
  direction: "ltr",
  fontSize: 30,
  fontWeight: 800,
  letterSpacing: -1,
  fontFamily: "Georgia, serif",
};
export const taglineStyle = {
  margin: "10px 0 0",
  fontSize: 13.5,
  color: colors.ash,
  lineHeight: 1.5,
};
export const navStyle = {
  display: "flex",
  gap: 4,
  padding: "0 12px",
  borderBottom: `1px solid ${colors.line}`,
  position: "sticky",
  top: 0,
  background: colors.paper,
  zIndex: 5,
  overflowX: "auto",
};
export const tabStyle = {
  background: "none",
  border: "none",
  padding: "13px 12px 11px",
  fontSize: 14,
  cursor: "pointer",
  whiteSpace: "nowrap",
};
export const counterCardStyle = {
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 14,
  padding: "22px 20px",
  textAlign: "center",
  marginBottom: 26,
};
export const bigNumberStyle = {
  fontSize: 64,
  fontWeight: 800,
  lineHeight: 1,
  margin: "6px 0 14px",
  fontFamily: "Georgia, serif",
  color: colors.ink,
};
export const barTrackStyle = {
  height: 8,
  background: colors.line,
  borderRadius: 6,
  overflow: "hidden",
  marginTop: 4,
};
export const barFillStyle = {
  height: "100%",
  borderRadius: 6,
  transition: "width .4s ease",
};
export const primaryButtonStyle = {
  marginTop: 18,
  width: "100%",
  background: colors.ember,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "14px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};
export const sectionHeadingStyle = {
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: 1.2,
  color: colors.ash,
  margin: "26px 0 12px",
  fontWeight: 700,
};
export const emptyBoxStyle = {
  fontSize: 14,
  color: colors.smoke,
  lineHeight: 1.6,
  background: colors.breath,
  border: `1px dashed ${colors.line}`,
  borderRadius: 12,
  padding: "18px 16px",
};
export const timelineRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 4px",
  borderBottom: `1px solid ${colors.line}`,
};
export const triggerChipStyle = {
  fontSize: 12,
  color: colors.smoke,
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 20,
  padding: "3px 10px",
  flex: 1,
};
// A craving that was ridden out, in among the cigarettes. Filled rather than
// ruled, so a win is visible at a glance in a list of admissions — but in the
// faintest moss there is, because the button that produced it is already moss
// and the row should not shout over it.
export const heldRowStyle = {
  ...timelineRowStyle,
  background: colors.mossFaint,
  borderRadius: 8,
  padding: "12px 8px",
};
// Unfilled, so the row's own green stays the only green surface here.
export const heldChipStyle = {
  ...triggerChipStyle,
  background: "none",
  border: `1px solid ${colors.mossSoft}`,
  color: colors.moss,
  fontWeight: 600,
};
export const undoButtonStyle = {
  background: "none",
  border: "none",
  color: colors.ash,
  fontSize: 12,
  cursor: "pointer",
  textDecoration: "underline",
};
export const sheetBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(28,27,24,.4)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  zIndex: 50,
};
export const sheetPanelStyle = {
  background: colors.paper,
  borderRadius: "18px 18px 0 0",
  padding: "22px 20px 30px",
  width: "100%",
  maxWidth: 480,
  animation: "rise .25s ease",
};
export const chipButtonStyle = {
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 22,
  padding: "9px 16px",
  fontSize: 14,
  color: colors.smoke,
  cursor: "pointer",
};
export const statGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 6,
};
export const statCardStyle = {
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 12,
  padding: "14px 16px",
};
export const hourChartStyle = {
  display: "flex",
  alignItems: "flex-end",
  gap: 3,
  borderBottom: `1px solid ${colors.line}`,
  paddingBottom: 3,
};
export const hourColumnStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};
// The count over the tallest bar, in the headroom the other columns leave
// empty — so labelling it costs the chart no height.
export const peakCountStyle = {
  fontSize: 10,
  fontWeight: 700,
  color: colors.ember,
  textAlign: "center",
  lineHeight: "14px",
  height: 14,
};
export const hourAxisStyle = {
  display: "flex",
  gap: 3,
  height: 16,
  marginTop: 5,
};
export const hourAxisLabelStyle = {
  position: "absolute",
  top: 0,
  fontSize: 10,
  whiteSpace: "nowrap",
};
// The bar itself: how tall it stands in its track, and how round its cap is.
// A one-cigarette bar is only a few pixels high, and a five-pixel radius on
// a four-pixel bar draws a lozenge rather than a bar — so the corner never
// exceeds half the height.
export function barShape(count, scale, trackHeight) {
  // A non-zero hour never disappears: it is always worth at least a few
  // pixels, however quiet it was next to the peak.
  const height = count === 0 ? 0 : Math.max(4, Math.round((count / scale) * trackHeight));
  const radius = Math.min(5, Math.max(2, Math.round(height / 2)));
  return {
    height,
    borderRadius: `${radius}px ${radius}px 2px 2px`,
  };
}

// The slot a bar grows inside: an hour with nothing in it still occupies
// its place on the chart instead of leaving a gap.
export const chartTrackStyle = {
  width: "100%",
  background: colors.breath,
  borderRadius: 5,
  display: "flex",
  alignItems: "flex-end",
  overflow: "hidden",
};
export const weekChartStyle = {
  display: "flex",
  gap: 6,
  alignItems: "flex-end",
};
export const weekColumnStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};
export const weekCountStyle = {
  fontSize: 11,
  fontWeight: 600,
  textAlign: "center",
  lineHeight: "16px",
  height: 16,
};
export const weekLabelStyle = {
  fontSize: 11,
  textAlign: "center",
  marginTop: 6,
};
export const tipRowStyle = {
  display: "flex",
  gap: 14,
  padding: "16px 0",
  borderBottom: `1px solid ${colors.line}`,
  alignItems: "flex-start",
};
export const tipNumberStyle = {
  fontFamily: "Georgia, serif",
  fontSize: 20,
  fontWeight: 700,
  color: colors.emberSoft,
  minWidth: 30,
};
export const disclaimerStyle = {
  marginTop: 22,
  fontSize: 12,
  color: colors.ash,
  lineHeight: 1.55,
  borderTop: `1px solid ${colors.line}`,
  paddingTop: 16,
};
export const habitCardStyle = {
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 12,
  padding: "14px 16px",
  marginBottom: 10,
};
export const habitTagStyle = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: 1,
  fontWeight: 700,
  background: colors.emberSoft,
  color: colors.ember,
  borderRadius: 6,
  padding: "3px 7px",
  whiteSpace: "nowrap",
};
export const reasonCardStyle = {
  background: colors.mossSoft,
  borderRadius: 14,
  padding: "18px 20px",
  marginBottom: 16,
};
export const formStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginTop: 8,
};
export const fieldLabelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: colors.smoke,
};
export const inputStyle = {
  border: `1px solid ${colors.line}`,
  borderRadius: 10,
  padding: "11px 12px",
  fontSize: 15,
  color: colors.ink,
  background: colors.paper,
  fontWeight: 400,
};
export const saveButtonStyle = {
  background: colors.moss,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "14px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  marginTop: 4,
};
export const hintStyle = {
  fontSize: 12.5,
  color: colors.ash,
  lineHeight: 1.5,
  marginTop: 8,
};
export const centerPage = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  background: "#F5F3EE",
};
export const configCard = {
  maxWidth: 420,
  background: "#fff",
  border: "1px solid #E3DFD5",
  borderRadius: 16,
  padding: "28px 24px",
};
export const authPageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  background: colors.breath,
};
export const authCardStyle = {
  width: "100%",
  maxWidth: 380,
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderRadius: 18,
  padding: "32px 26px",
  boxShadow: "0 10px 40px rgba(0,0,0,.05)",
};
export const authWordmarkStyle = {
  direction: "ltr",
  fontSize: 34,
  fontWeight: 800,
  letterSpacing: -1,
  fontFamily: "Georgia, serif",
  color: colors.ink,
};
export const authTaglineStyle = {
  textAlign: "center",
  fontSize: 13.5,
  color: colors.ash,
  lineHeight: 1.5,
  margin: "4px 0 0",
};
export const authProviderButtonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: `1px solid ${colors.line}`,
  background: colors.paper,
  color: colors.ink,
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};
export const authDividerStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  margin: "18px 0",
  borderTop: `1px solid ${colors.line}`,
  position: "relative",
};
export const authDividerLabelStyle = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: colors.paper,
  padding: "0 10px",
  fontSize: 12,
  color: colors.ash,
};
export const authInputStyle = {
  width: "100%",
  padding: "12px",
  border: `1px solid ${colors.line}`,
  borderRadius: 10,
  fontSize: 15,
  marginBottom: 10,
  color: colors.ink,
  background: colors.paper,
};
export const authSubmitStyle = {
  width: "100%",
  padding: "13px",
  borderRadius: 10,
  border: "none",
  background: colors.ember,
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  marginTop: 2,
};
export const authToggleStyle = {
  width: "100%",
  marginTop: 14,
  background: "none",
  border: "none",
  color: colors.smoke,
  fontSize: 13,
  cursor: "pointer",
  textDecoration: "underline",
};
export const authPrivacyStyle = {
  fontSize: 11.5,
  color: colors.ash,
  lineHeight: 1.5,
  marginTop: 18,
  textAlign: "center",
};

// ── The coached tips, and the habit experiments ──────────────────────────
//
// The recommendations sit in cards and the rest of the tips stay in the
// plain numbered list they were always in. That contrast is the whole
// design: a card says "this one is about you", and if everything were a
// card nothing would be.
//
// borderInlineStart rather than borderLeft, so the accent stripe stays on
// the side the reading starts from when the page flips to Hebrew.
export const forYouCardStyle = {
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderInlineStart: `3px solid ${colors.ember}`,
  borderRadius: 12,
  padding: "14px 16px",
  marginBottom: 10,
};
/**
 * The alert banner, and the accent that says which kind it is.
 *
 * Modelled on forYouCardStyle below, because an alert and a "for you" tip
 * are the same gesture — the app saying it noticed something specific about
 * this person — and they should not arrive looking like two different
 * products. Same borderInlineStart trick, for the same reason: the stripe
 * stays on the side the reading starts from when the page flips to Hebrew.
 *
 * The margin matches main's 20px gutter, so the banner lines up with the
 * cards below it even though it sits outside main.
 */
export const alertBannerStyle = {
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderInlineStart: `3px solid ${colors.ash}`,
  borderRadius: 12,
  padding: "13px 15px",
  margin: "14px 20px 0",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  animation: "rise .3s ease",
};

/**
 * The colour an alert arrives in.
 *
 * A function, like verdictButtonStyle and trendMarkStyle above, because the
 * tone is data rather than a place. It obeys the palette's one rule
 * (colors.js): ember is the warning colour and moss is the reassuring one.
 * Dressing a milestone in ember to make it louder would break the only thing
 * keeping this app's colour language coherent without a framework.
 */
export const alertToneStyle = (tone) =>
  tone === "good"
    ? { borderInlineStartColor: colors.moss, background: colors.mossSoft }
    : tone === "warn"
      ? { borderInlineStartColor: colors.ember, background: colors.paper }
      : { borderInlineStartColor: colors.ash, background: colors.breath };

/**
 * A hint that is also a button.
 *
 * Used where the explanation IS the action — "add it to your home screen
 * first" is not information, it is the next step — so it reads as a line of
 * small print and behaves as a link.
 */
export const linkNoteStyle = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  textAlign: "start",
  color: colors.ember,
  textDecoration: "underline",
  cursor: "pointer",
  font: "inherit",
};

/** The × that dismisses one. Sized for a thumb, not for a mouse. */
export const alertDismissStyle = {
  background: "none",
  border: "none",
  color: colors.ash,
  fontSize: 20,
  lineHeight: 1,
  padding: "2px 6px",
  marginTop: -2,
  cursor: "pointer",
  flexShrink: 0,
};

export const reasonLineStyle = {
  fontSize: 12.5,
  color: colors.ember,
  lineHeight: 1.5,
  marginTop: 8,
  fontWeight: 600,
};
export const noteStyle = {
  fontSize: 13,
  color: colors.ash,
  lineHeight: 1.6,
  marginTop: 0,
};
export const verdictRowStyle = {
  display: "flex",
  gap: 8,
  marginTop: 12,
};

/**
 * One of the two "did this help?" buttons. Chosen is filled, unchosen is an
 * outline — and the chosen one keeps looking like a button rather than
 * becoming a label, because pressing it again is how somebody takes it back.
 */
export function verdictButtonStyle(chosen, good) {
  const tone = good ? colors.moss : colors.ash;
  return {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    border: `1px solid ${chosen ? tone : colors.line}`,
    background: chosen ? (good ? colors.mossSoft : colors.breath) : "none",
    color: chosen ? tone : colors.ash,
  };
}
export const experimentCardStyle = {
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderRadius: 12,
  padding: "16px",
  marginBottom: 10,
};
export const beforeAfterStyle = {
  display: "flex",
  alignItems: "baseline",
  gap: 8,
  fontFamily: "Georgia, serif",
  fontSize: 22,
  fontWeight: 700,
  color: colors.ink,
  direction: "ltr",
  marginTop: 10,
};
export const smallPrintStyle = {
  fontSize: 12,
  color: colors.ash,
  lineHeight: 1.5,
  marginTop: 8,
};
export const startButtonStyle = {
  marginTop: 12,
  width: "100%",
  padding: "11px",
  borderRadius: 10,
  border: `1px solid ${colors.moss}`,
  background: colors.mossSoft,
  color: colors.moss,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};
export const stopButtonStyle = {
  marginTop: 12,
  padding: "8px 14px",
  borderRadius: 8,
  border: `1px solid ${colors.line}`,
  background: "none",
  color: colors.ash,
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
};

// ── Insights ─────────────────────────────────────────────────────────────
//
// The page opens with one number rather than a grid of them, because the
// question somebody comes here with is "is this getting better or not" and
// a wall of five equal-weight stats answers it last.
export const headlineCardStyle = {
  background: colors.breath,
  border: `1px solid ${colors.line}`,
  borderRadius: 14,
  padding: "18px 20px",
  marginBottom: 14,
};
export const headlineNumberStyle = {
  fontFamily: "Georgia, serif",
  fontSize: 40,
  fontWeight: 700,
  color: colors.ink,
  lineHeight: 1.1,
  // Numerals read left-to-right in Hebrew too, and this one is large enough
  // that the bidi algorithm getting it wrong would be unmissable.
  direction: "ltr",
};
export const headlineCaptionStyle = {
  fontSize: 13,
  color: colors.smoke,
  lineHeight: 1.5,
  marginTop: 6,
};
export const eyebrowStyle = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1,
  color: colors.ash,
  marginBottom: 8,
};

/**
 * The little arrow beside a trigger. Vertical on purpose: an arrow that
 * points sideways has to be mirrored in Hebrew and is a standing invitation
 * to forget to, whereas up and down mean the same thing in both directions.
 */
export function trendMarkStyle(rising) {
  return {
    fontSize: 12,
    fontWeight: 700,
    color: rising ? colors.ember : colors.moss,
    marginInlineStart: 6,
  };
}
