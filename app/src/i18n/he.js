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
  "Your peak is around ": "השיא שלכם הוא בסביבות ",
  ". Plan a replacement for that window — a walk, water, a piece of gum.":
    " — תכננו תחליף לשעה הזו: הליכה, מים, מסטיק.",
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
};
