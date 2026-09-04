// ─────────────────────────────────────────────────────────────────────────
//  Hebrew.
//
//  The ENGLISH STRING IS THE KEY. That is deliberate: a string with no
//  entry here falls through to itself, so a missing translation shows
//  readable English instead of a blank or a raw identifier. The cost is
//  that editing an English string is also a key change — the entry here
//  has to be re-keyed to match, or it goes orphaned and the new text goes
//  untranslated.
//
//  Some values start with \u200f, a right-to-left mark. Hebrew that opens
//  with a Latin letter, a digit or a + would otherwise have that first
//  glyph flung to the wrong end of the line.
// ─────────────────────────────────────────────────────────────────────────

export const SQ_HE = {
  Today: "היום",
  Insights: "תובנות",
  Tips: "טיפים",
  Habits: "הרגלים",
  Goal: "יעד",
  Settings: "הגדרות",
  "Clearing the air…": "מפזרים את העשן…",
  "Smoquit — quit smoking, one logged craving at a time":
    "Smoquit — נגמלים מעישון, סיגריה מתועדת אחת בכל פעם",
  "Track what you smoke. Notice the pattern. Loosen its grip.":
    "עקבו אחרי מה שאתם מעשנים. שימו לב לדפוס. שחררו את האחיזה.",
  "Continue with Google": "התחברות עם Google",
  "Continue with Apple": "התחברות עם Apple",
  or: "או",
  Password: "סיסמה",
  "Create account": "יצירת חשבון",
  "Sign in": "כניסה",
  "Already have an account? Sign in": "כבר יש לכם חשבון? כניסה",
  "New here? Create an account": "חדשים כאן? יצירת חשבון",
  "Check your email to confirm your account, then sign in.":
    "שלחנו לכם מייל לאישור החשבון — אשרו אותו ואז היכנסו.",
  "Forgot your password?": "שכחתם את הסיסמה?",
  "Back to sign in": "חזרה למסך הכניסה",
  "Send reset link": "שליחת קישור לאיפוס",
  "Enter your email and we'll send you a link to set a new password.":
    "הזינו את כתובת הדוא״ל ונשלח לכם קישור לקביעת סיסמה חדשה.",
  "If that address has an account, a reset link is on its way. It works once, and expires in an hour.":
    "אם קיים חשבון עם הכתובת הזו, קישור לאיפוס בדרך. הקישור פועל פעם אחת, ופג תוקף בתוך שעה.",
  "This account hasn't been confirmed yet. Open the confirmation link in the email we sent you.":
    "החשבון עדיין לא אושר. פתחו את קישור האישור במייל ששלחנו לכם.",
  "That link didn't work — it may have expired or already been used. Ask for a new one.":
    "הקישור לא עבד — ייתכן שפג תוקפו או שכבר נעשה בו שימוש. בקשו קישור חדש.",
  "Choose a new password.": "בחרו סיסמה חדשה.",
  "New password": "סיסמה חדשה",
  "Repeat new password": "אימות הסיסמה החדשה",
  "Save new password": "שמירת הסיסמה החדשה",
  "Pick a password of at least 6 characters.": "בחרו סיסמה באורך 6 תווים לפחות.",
  "The two passwords don't match.": "שתי הסיסמאות אינן זהות.",
  "Password changed. Opening the app…": "הסיסמה שונתה. פותחים את האפליקציה…",
  "Something went wrong.": "משהו השתבש.",
  "That sign-in option isn't switched on for this app yet. Use your email and password below.":
    "אפשרות ההתחברות הזו עדיין לא מופעלת באפליקציה. השתמשו בדוא״ל ובסיסמה שלמטה.",
  "Your data is stored privately in your own account and is visible only to you. We don't sell it, share it, or analyze it.":
    "הנתונים שלכם נשמרים באופן פרטי בחשבון שלכם וגלויים רק לכם. איננו מוכרים, משתפים או מנתחים אותם.",
  "Sign out": "התנתקות",
  "Log what you smoke. Notice the pattern. Loosen its grip.":
    "תעדו כל סיגריה. שימו לב לדפוס. שחררו את האחיזה.",
  "Today: {count}. Over your {target}/day target — tomorrow's a fresh start.":
    "היום: {count}. מעל היעד של {target} ליום — מחר מתחילים מחדש.",
  "Today: {count} of {target} allowed. Every skipped one counts.":
    "היום: {count} מתוך {target} מותרות. כל אחת שדילגתם עליה נחשבת.",
  "Cigarettes today": "סיגריות היום",
  "{n} over target": "{n} מעל היעד",
  "{n} left before target": "נשארו {n} עד היעד",
  "≈ {currency}{amount} saved today vs. your usual":
    "≈ {currency}{amount} נחסכו היום לעומת יום רגיל",
  "+ I just smoked one": "\u200f+ עישנתי עכשיו אחת",
  "I haven't smoked today": "\u200fלא עישנתי היום",
  "Counted as a smoke-free day ✓": "\u200fנספר כיום נקי ✓",
  "Smoke-free days": "ימים נקיים",
  "Logging honestly is how the insights get useful.": "תיעוד כן הוא מה שהופך את התובנות למועילות.",

  // Riding out a craving.
  "I want one right now": "בא לי עכשיו",
  "1 craving ridden out today": "דחף אחד שעבר היום",
  "{n} cravings ridden out today": "‏{n} דחפים שעברו היום",
  "Ride it out": "רכבו על הגל",
  "The wave has passed": "הגל עבר",
  "A craving peaks and fades in a few minutes, smoked or not.":
    "דחף מגיע לשיא ודועך תוך כמה דקות, בין אם עישנתם ובין אם לא.",
  "You didn't smoke for five minutes. That is the whole trick.": "חמש דקות בלי לעשן. זה כל הסוד.",
  "Breathe in": "שאיפה",
  Hold: "החזקה",
  "Breathe out": "נשיפה",
  "What's driving it?": "מה מניע את זה?",
  "It passed": "עבר לי",
  "I smoked one anyway": "עישנתי בכל זאת",
  "Today's timeline": "ציר הזמן של היום",
  "Nothing logged yet today. If a craving comes, try waiting it out — most pass in 3–5 minutes. If you do smoke, tap the button above so you can see your own pattern later.":
    "עדיין לא תועד כלום היום. אם עולה דחף, נסו לחכות שיחלוף — רובם עוברים תוך 3–5 דקות. אם בכל זאת עישנתם, לחצו על הכפתור למעלה כדי שתוכלו לראות בהמשך את הדפוס שלכם.",
  "Remove this entry": "הסרת הרשומה",
  Undo: "ביטול",
  "What set this one off?": "מה גרם לזו?",
  "Naming the trigger is half of unlearning it.": "לתת שם לטריגר זה חצי מהעבודה.",
  Stress: "לחץ",
  Boredom: "שעמום",
  Coffee: "קפה",
  "After a meal": "אחרי ארוחה",
  Social: "חברה",
  Craving: "דחף",
  Habit: "הרגל",
  Unlogged: "ללא תיוג",
  "Skip — just count it": "דילוג — רק לספור",
  "When did you actually smoke it?": "מתי באמת עישנתם אותה?",
  "Logged just now. Nudge it back if this one was earlier today.":
    "תועדה עכשיו. הזיזו אחורה אם זה קרה מוקדם יותר היום.",
  "Logged at the current time": "תועדה בשעה הנוכחית",
  "{n} min earlier": "{n} דקות קודם לכן",
  "{h}h {m}m earlier": "{h} שעות ו-{m} דקות קודם לכן",
  "−{n}m": "−{n} דק׳",
  "−{n}h": "−{n} שע׳",
  Reset: "איפוס",
  "Or set an exact time": "או קבעו שעה מדויקת",
  "Save time": "שמירת השעה",
  "Keep current time": "להשאיר את השעה הנוכחית",
  "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.":
    "אחרי שתתעדו כמה סיגריות, העמוד הזה יתמלא בדפוסים שלכם — השעות העמוסות, הטריגרים המובילים, המגמה היומית וכמה ימים הצלחתם לצמצם.",
  "Logged total": "סה״כ תועדו",
  "Daily average": "ממוצע יומי",
  "Days tracked": "ימים במעקב",
  "Best (lowest) day": "היום הכי טוב",
  "When you smoke": "מתי אתם מעשנים",
  "{count} at {hour}:00": "{count} בשעה {hour}:00",
  "Top triggers": "טריגרים מובילים",
  "No triggers tagged yet.": "עדיין לא תויגו טריגרים.",
  "Last 7 days": "7 הימים האחרונים",
  "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.":
    "צעדים קטנים שחוזרים על עצמם עדיפים על כוח רצון. בחרו שניים שמתאימים ליום שלכם והישענו עליהם.",
  "Ride the 5-minute wave": "רכבו על הגל של 5 הדקות",
  "A craving peaks and fades in about 3–5 minutes whether or not you smoke. Set a timer and do anything else until it rings.":
    "דחף מגיע לשיא ודועך תוך 3–5 דקות, בין אם עישנתם ובין אם לא. הפעילו טיימר ועשו כל דבר אחר עד שיצלצל.",
  "Delay, don't decide": "לדחות, לא להחליט",
  "Don't tell yourself 'never again' in the moment. Tell yourself 'not right now.' Push the next one 10 minutes later each time.":
    "אל תגידו לעצמכם ברגע האמת ״אף פעם יותר״. תגידו ״לא עכשיו״. דחו כל סיגריה בעוד 10 דקות בכל פעם.",
  "Change your hands' job": "תנו לידיים תפקיד אחר",
  "Cravings are partly muscle memory. Hold a pen, a coin, or a stress ball. Keep your hands busy and the urge loses its ritual.":
    "דחפים הם גם זיכרון שרירי. החזיקו עט, מטבע או כדור לחיץ. כשהידיים עסוקות, הדחף מאבד את הטקס שלו.",
  "Drink cold water slowly": "שתו מים קרים לאט",
  "Sipping water mimics the hand-to-mouth motion and dulls the urge. Keep a full glass or bottle within reach.":
    "לגימות מים מחקות את תנועת היד לפה ומעמעמות את הדחף. החזיקו כוס או בקבוק מלאים בהישג יד.",
  "Break the pairings": "שברו את הצימודים",
  "Coffee, alcohol, and the after-meal moment are cues, not needs. Change the setting: brush your teeth, step outside, switch chairs.":
    "קפה, אלכוהול והרגע שאחרי הארוחה הם רמזים, לא צרכים. שנו את הסביבה: צחצחו שיניים, צאו החוצה, החליפו כיסא.",
  "Make it inconvenient": "הפכו את זה למסורבל",
  "Don't carry a lighter. Leave cigarettes in another room or the car. Every extra step is a chance to reconsider.":
    "אל תסתובבו עם מצית. השאירו את הסיגריות בחדר אחר או ברכב. כל צעד נוסף הוא הזדמנות להתחרט.",
  "Breathe like you're smoking": "נשמו כאילו אתם מעשנים",
  "The deep inhale is part of what relaxes you. Try four slow breaths — in for 4, hold for 4, out for 6 — without the cigarette.":
    "השאיפה העמוקה היא חלק ממה שמרגיע. נסו ארבע נשימות איטיות — שאיפה 4, החזקה 4, נשיפה 6 — בלי הסיגריה.",
  "Reward the skips": "תגמלו את הדילוגים",
  "Move the cigarette money into a jar or a savings note each day. Watching it grow makes the benefit concrete.":
    "העבירו את כסף הסיגריות לצנצנת או להוראת חיסכון בכל יום. לראות אותו גדל הופך את הרווח למוחשי.",
  "Smoquit is a self-help tracker, not medical advice. For nicotine replacement, prescriptions, or a quit plan tailored to you, talk to a doctor or a free quitline.":
    "Smoquit הוא כלי מעקב לעזרה עצמית, לא ייעוץ רפואי. לתחליפי ניקוטין, מרשמים או תוכנית גמילה מותאמת אישית — פנו לרופא או למוקד גמילה.",
  "A habit is a loop: ": "הרגל הוא לולאה: ",
  "cue → routine → reward": "רמז ← שגרה ← תגמול",
  ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.":
    ". קשה למחוק את הרמז, אבל אפשר להחליף את השגרה ועדיין לקבל תגמול. מצאו למטה את הרמז שלכם ונסו את התחליף שלו.",
  Cue: "רמז",
  Swap: "תחליף",
  "Morning coffee": "קפה של הבוקר",
  "Drink it standing at a window, or switch to tea for a week so the pairing breaks.":
    "שתו אותו בעמידה ליד החלון, או עברו לתה לשבוע כדי לשבור את הצימוד.",
  "The commute": "הנסיעה לעבודה",
  "Chew gum or queue a podcast the moment you sit down — fill the hand and the head.":
    "לעסו מסטיק או הפעילו פודקאסט ברגע שאתם מתיישבים — תעסיקו את היד ואת הראש.",
  "Work stress break": "הפסקת לחץ בעבודה",
  "Take the break, drop the cigarette. Walk to get water or do 10 slow breaths outside.":
    "קחו את ההפסקה, ותרו על הסיגריה. לכו להביא מים או קחו 10 נשימות איטיות בחוץ.",
  "After eating": "אחרי האוכל",
  "Stand up and brush your teeth or leave the table immediately. The clean-mouth feeling fights the urge.":
    "קומו וצחצחו שיניים, או עזבו את השולחן מיד. תחושת הפה הנקי נלחמת בדחף.",
  "With a drink": "עם משקה",
  "Hold the glass in your smoking hand and keep it full. Sit with non-smokers when you can.":
    "החזיקו את הכוס ביד המעשנת ודאגו שתישאר מלאה. שבו ליד לא־מעשנים כשאפשר.",
  "Keep a 5-minute list ready: text a friend, stretch, a quick game — anything to bridge the gap.":
    "החזיקו רשימת 5 דקות מוכנה: הודעה לחבר, מתיחות, משחק קצר — כל דבר שיגשר על הפער.",
  "Why you're doing this": "למה אתם עושים את זה",
  "Days to quit date": "ימים לתאריך הגמילה",
  "Days since quit date": "ימים מאז תאריך הגמילה",
  "Est. total saved": "חיסכון כולל מוערך",
  "Cigarettes on a typical day (before quitting)": "סיגריות ביום רגיל (לפני הגמילה)",
  "Daily target for now": "יעד יומי לעכשיו",
  "Target quit date": "תאריך יעד לגמילה",
  "Your reason (you'll see it every time you open this)":
    "הסיבה שלכם (תראו אותה בכל פעם שתפתחו את זה)",
  "e.g. 15": "למשל 15",
  "e.g. 8": "למשל 8",
  "e.g. Be there for my kids without getting winded.": "למשל: להיות שם בשביל הילדים בלי להתנשף.",
  "Save my goal": "שמירת היעד",
  Language: "שפה",
  "Saved to your account, so it follows you to every device you sign in on.":
    "נשמרת בחשבון שלכם, כך שהיא מתלווה לכל מכשיר שתתחברו ממנו.",
  "We set your country automatically when you first opened Smoquit":
    "קבענו את המדינה שלכם אוטומטית כשפתחתם את Smoquit בפעם הראשונה",
  " (you've since changed it)": " (מאז שיניתם אותה)",
  ". Currency and the product list follow from it. All of it is saved privately in your account.":
    ". המטבע ורשימת המוצרים נגזרים ממנה. כל מה שכאן נשמר בחשבון הפרטי שלכם.",
  Country: "מדינה",
  "Other ($ USD)": "אחר (\u200e$ USD)",
  "What do you smoke?": "מה אתם מעשנים?",
  Cigarettes: "סיגריות",
  "Roll-your-own": "טבק לגלגול",
  "Heated tobacco": "טבק מחומם",
  "Price per pack ({currency})": "מחיר לחפיסה ({currency})",
  "Prefilled from your brand. Adjust it to match what you actually pay — the savings numbers on Today and Goal use this (÷20 per cigarette).":
    "מולא לפי המותג שלכם. התאימו למה שאתם באמת משלמים — חישובי החיסכון בלשוניות היום והיעד מסתמכים על זה (חלקי 20 לסיגריה).",
  "Your setup": "המצב שלכם",
  "{currency}{price} per pack · ≈ {currency}{each} per cigarette":
    "{currency}{price} לחפיסה · ≈ {currency}{each} לסיגריה",
  "Product prices are rough 2026 estimates to get you started, not live retail prices — always trust the value you enter yourself.":
    "מחירי המוצרים הם הערכות גסות לשנת 2026 כנקודת פתיחה, לא מחירים בזמן אמת — סמכו תמיד על הסכום שאתם מזינים בעצמכם.",
  "Your account & privacy": "החשבון והפרטיות שלכם",
  "Everything you log is stored privately in your own account and is visible only to you. We don't sell, share, or analyze it.":
    "כל מה שאתם מתעדים נשמר באופן פרטי בחשבון שלכם וגלוי רק לכם. איננו מוכרים, משתפים או מנתחים אותו.",
  "Permanently delete all your Smoquit data? This can't be undone.":
    "למחוק לצמיתות את כל הנתונים שלכם ב־Smoquit? אי אפשר לבטל את זה.",
  "Delete all my data": "מחיקת כל הנתונים שלי",
  Israel: "ישראל",
  "United States": "ארצות הברית",
  "United Kingdom": "בריטניה",
  Germany: "גרמניה",
  France: "צרפת",
  Italy: "איטליה",
  Spain: "ספרד",
  Australia: "אוסטרליה",
  Canada: "קנדה",
  India: "הודו",
  Other: "אחר",
  "Almost there": "כמעט שם",
  "Open ": "פתחו את ",
  " in this folder and paste in your Supabase Project URL and anon key (from Supabase → Settings → API), then reload this page.":
    " בתיקייה הזו, הדביקו את כתובת הפרויקט ומפתח ה־anon מ־Supabase (דרך Supabase ← Settings ← API), ואז רעננו את הדף.",
  "Prices show in {currency} {code}.": "המחירים מוצגים ב־\u200e{currency} {code}.",
  // ── The tips written for a signal, and the coaching around them ───────
  "Decide the last one before the evening starts": "החליטו על האחרונה עוד לפני שהערב מתחיל",
  "Late cigarettes are usually about winding down, not nicotine. Pick the hour you stop, and put the pack somewhere you'd have to get up for.":
    "סיגריות מאוחרות הן בדרך כלל עניין של הרגעה, לא של ניקוטין. בחרו את השעה שבה אתם מפסיקים, ושימו את החפיסה במקום שצריך לקום בשבילו.",
  "Push the first one back": "דחו את הראשונה של היום",
  "The first cigarette sets the pace of the whole day. Move it fifteen minutes later each morning — shower first, eat first, leave the house first.":
    "הסיגריה הראשונה קובעת את הקצב של כל היום. דחו אותה בחמש עשרה דקות בכל בוקר — קודם מקלחת, קודם אוכל, קודם לצאת מהבית.",
  "Aim at the day you actually have": "כוונו ליום שבאמת יש לכם",
  "A target you miss most days stops being a target. Set it one below your real average, hold it for a week, then take another one off.":
    "יעד שמפספסים ברוב הימים מפסיק להיות יעד. קבעו אותו אחת מתחת לממוצע האמיתי שלכם, החזיקו שבוע, ואז הורידו עוד אחת.",
  "Decide the number before you go out": "החליטו על המספר לפני שאתם יוצאים",
  "Pick how many you'll have before you leave, say it out loud to someone, and stand where the smokers aren't. Deciding in the moment is the part that fails.":
    "בחרו כמה תעשנו לפני שאתם יוצאים, אמרו את המספר בקול למישהו, ועמדו במקום שבו לא מעשנים. ההחלטה ברגע עצמו היא החלק שנכשל.",
  "Bank the ones you win": "אספו את הפעמים שניצחתם",
  "You've ridden urges out before, and they passed. Keep count of them on purpose — the proof that they pass is most of what gets you through the next one.":
    "כבר עברתם דחפים והם חלפו. ספרו אותם בכוונה — ההוכחה שהם חולפים היא רוב מה שיעביר אתכם את הבא בתור.",

  // The sentence under a recommendation, which is the whole reason it is
  // there. Several open with a number or a trigger name, so they carry a
  // right-to-left mark to stop that first glyph jumping to the far end.
  "{n} of the cigarettes you logged in the last two weeks came with {trigger}.":
    "\u200f{n} מהסיגריות שתיעדתם בשבועיים האחרונים הגיעו עם {trigger}.",
  "{trigger} is behind more of your cigarettes than it was a fortnight ago.":
    "\u200f{trigger} עומד מאחורי יותר מהסיגריות שלכם מאשר לפני שבועיים.",
  "Most of your cigarettes lately are {part} ones.":
    "רוב הסיגריות שלכם לאחרונה הן סיגריות של {part}.",
  "Your first cigarette of the day is usually around {hour}.":
    "הסיגריה הראשונה שלכם ביום היא בדרך כלל בסביבות {hour}.",
  "Most of the urges you sat with lately ended in a cigarette anyway.":
    "רוב הדחפים שישבתם איתם לאחרונה הסתיימו בכל זאת בסיגריה.",
  "You rode out {held} of the {faced} urges you sat with in the last two weeks.":
    "עמדתם ב־{held} מתוך {faced} הדחפים שישבתם איתם בשבועיים האחרונים.",
  "You were over your daily target on {n} of the last {days} days.":
    "הייתם מעל היעד היומי ב־{n} מתוך {days} הימים האחרונים.",
  "That is about {n} cigarettes you did not smoke in the last two weeks.":
    "זה בערך {n} סיגריות שלא עישנתם בשבועיים האחרונים.",
  "You marked this one as something that works for you.": "סימנתם שזה עובד בשבילכם.",
  morning: "בוקר",
  afternoon: "צהריים",
  evening: "ערב",
  night: "לילה",

  // The tips screen around the recommendations.
  "For you right now": "בשבילכם עכשיו",
  "These are in the order they were written. Once you've logged a few days, this page leads with the ones that match your own pattern.":
    "אלה מופיעים בסדר שבו נכתבו. אחרי שתתעדו כמה ימים, הדף הזה יפתח בטיפים שמתאימים לדפוס שלכם.",
  "Everything else": "כל השאר",
  "This helps me": "זה עוזר לי",
  "Not for me": "לא בשבילי",

  // The habits screen, once a swap is something you start and measure.
  "What you're trying": "מה אתם מנסים",
  "Worth trying next": "שווה לנסות עכשיו",
  "Every swap": "כל התחליפים",
  "Tag a few cigarettes with what set them off, and this page will suggest the swap worth trying first — then measure it for you.":
    "תייגו כמה סיגריות עם מה שהצית אותן, והדף הזה יציע את התחליף ששווה לנסות ראשון — ואז ימדוד אותו בשבילכם.",
  "a day with this cue, before and since": "ביום עם הרמז הזה, לפני ומאז",
  "{n} of {days} days clear": "\u200f{n} מתוך {days} ימים נקיים",
  "Day {n} of {total}": "יום {n} מתוך {total}",
  "Stop this one": "לעצור את זה",
  "{trigger}: about {n} a day lately.": "\u200f{trigger}: בערך {n} ביום לאחרונה.",
  "{trigger}: about {n} a day lately, most often around {hour}.":
    "\u200f{trigger}: בערך {n} ביום לאחרונה, לרוב סביב {hour}.",
  "Try this for a week": "לנסות את זה לשבוע",
  "Too early to call. Check back in a day or two.": "מוקדם מדי להכריע. חזרו לבדוק בעוד יום־יומיים.",
  "Down {pct}% on this cue since you started.": "ירידה של {pct}% ברמז הזה מאז שהתחלתם.",
  "Up on this cue since you started — another swap may fit better.":
    "עלייה ברמז הזה מאז שהתחלתם — אולי תחליף אחר יתאים יותר.",
  "No real change on this cue yet. Give it the full week.":
    "עדיין אין שינוי אמיתי ברמז הזה. תנו לזה את כל השבוע.",
  // ── Insights, once the page leads with a direction rather than a wall ──
  "The last two weeks": "השבועיים האחרונים",
  "a day, on average.": "ביום, בממוצע.",
  "Too early to compare fortnights — this is your first.":
    "מוקדם מדי להשוות שבועיים — אלה השבועיים הראשונים שלכם.",
  "Down from {n} a day the fortnight before.": "ירידה מ־{n} ביום בשבועיים שלפני.",
  "Up from {n} a day the fortnight before.": "עלייה מ־{n} ביום בשבועיים שלפני.",
  "About the same as the fortnight before.": "בערך כמו בשבועיים שלפני.",
  "Urges you sat with": "דחפים שישבתם איתם",
  "Nothing recorded yet. Next time one comes, use \u201cI want one right now\u201d on the Today tab — what happens either way gets counted here.":
    "עדיין לא תועד כלום. בפעם הבאה שיגיע דחף, השתמשו ב\u201eבא לי עכשיו\u201d בטאב היום — מה שיקרה, לכאן או לכאן, ייספר כאן.",
  "{pct}% ridden out": "\u200f{pct}% שעברו בלי סיגריה",
  "Your heaviest stretch is {from}–{to}, which carries {pct}% of everything you've logged. Plan a replacement for that window — a walk, water, a piece of gum.":
    "הקטע העמוס ביותר שלכם הוא {from}–{to}, ובו {pct}% מכל מה שתיעדתם. תכננו תחליף לחלון הזה — הליכה, מים, מסטיק.",
  "{day} is your heaviest day of the week, at about {n} a day.":
    "\u200f{day} הוא היום העמוס בשבוע שלכם, עם בערך {n} ביום.",
  "up on the fortnight before": "עלייה ביחס לשבועיים שלפני",
  "down on the fortnight before": "ירידה ביחס לשבועיים שלפני",
  Streaks: "רצפים",
  "Smoke-free run": "רצף בלי עישון",
  "Longest run": "הרצף הארוך ביותר",
  "Days at or under target": "ימים בתוך היעד",

  // ── Alerts: the nudges, and the switches that turn them off ──────────
  Dismiss: "סגירה",
  Nudges: "תזכורות",
  "These appear at the top of the app while you have it open. Nothing is sent to your phone.":
    "אלו מופיעות בראש האפליקציה כל עוד היא פתוחה אצלכם. שום דבר לא נשלח לטלפון שלכם.",
  "Remind me at": "הזכירו לי בשעה",
  "Only on a day you have not answered for yet. Marking a day smoke-free counts as answering.":
    "רק ביום שעדיין לא עניתם עליו. סימון יום כנקי מעישון נחשב תשובה.",
  Reminder: "תזכורת",
  "Heads up": "שימו לב",
  Milestone: "אבן דרך",
  "Nothing logged today": "לא תועד כלום היום",
  "Your heavy stretch is coming up": "הקטע העמוס שלכם מתקרב",
  "Your first one usually lands around now": "הראשונה שלכם נוחתת בדרכ כלל בערך עכשיו",
  "A full day, nothing logged": "יום שלם, בלי שנרשם כלום",
  "{days} days smoke-free": "\u200f{days} ימים בלי עישון",
  "A new personal best": "שיא אישי חדש",
  "A pack's worth, not smoked": "חבילה שלמה שלא עושנה",
  "A week inside your target": "שבוע בתוך היעד שלכם",
  "Over today's target": "מעל היעד של היום",
  "Two taps and the day is on the record — even if the answer is none.":
    "שתי נגיעות והיום מתועד — גם אם התשובה היא אף אחת.",
  "{from}–{to} carries {pct}% of everything you have logged. Line something up now.":
    "\u200f{from}–{to} נושא {pct}% מכל מה שתיעדתם. תכננו משהו עכשיו.",
  "Most days your first cigarette is around {hour}, and nothing is logged yet.":
    "ברוב הימים הסיגריה הראשונה שלכם היא בערך ב־{hour}, ועדיין לא תועד כלום.",
  "That is the one that takes the most deciding. It is on the record now.":
    "זה היום שדורש את מרבית ההחלטות. עכשיו הוא מתועד.",
  "{days} days with nothing logged against them.": "\u200f{days} ימים שלא נרשם עליהם כלום.",
  "{days} days is the longest run you have recorded.":
    "\u200f{days} ימים הם הרצף הארוך ביותר שתיעדתם.",
  "{n} cigarettes you did not smoke — about {currency}{amount} of them.":
    "\u200f{n} סיגריות שלא עישנתם — שווי כ־{currency}{amount}.",
  "{days} days running at or under {target} a day.":
    "\u200f{days} ימים ברצף של {target} או פחות ביום.",
  "{n} over your {target} a day. The rest of the evening is still yours.":
    "\u200f{n} מעל ה־{target} היומיות שלכם. שאר הערב עדיין שלכם.",
  "Open Today": "פתחו את היום",
  "See the numbers": "לראות את המספרים",
  "When I go over my daily target": "כשאני עובר/ת את היעד היומי",
  "Streaks, records and money saved": "רצפים, שיאים וכסף שנחסך",
  "Before my heaviest stretch of the day": "לפני הקטע העמוס ביום שלי",
  "If I have not logged anything by evening": "אם לא תיעדתי כלום עד הערב",
};
