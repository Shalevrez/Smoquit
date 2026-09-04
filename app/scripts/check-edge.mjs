// ─────────────────────────────────────────────────────────────────────────
//  Is the file you paste into Supabase still the code in this repository?
//
//  supabase-send-alerts.js is generated, committed, and deployed by hand.
//  That combination has exactly one failure mode and it is a bad one: you
//  change a rule in app/src/domain/alerts.js, the app picks it up on the
//  next build, and the sender keeps running last month's rules — silently,
//  on everybody's phone, in the one place nobody is looking.
//
//  This is the same contract the project already has between app/src and
//  index.html, enforced the same way: rebuild, compare, refuse.
// ─────────────────────────────────────────────────────────────────────────
import { bundle, committed } from "./build-edge.mjs";

const fresh = await bundle();
const onDisk = committed();

if (onDisk === null) {
  console.error(
    "\ncheck-edge: supabase-send-alerts.js is missing.\n\n" +
      "  Run: node scripts/build-edge.mjs\n",
  );
  process.exit(1);
}
if (onDisk !== fresh) {
  console.error(
    "\ncheck-edge: supabase-send-alerts.js is out of date.\n\n" +
      "  Something it is built from has changed — app/edge/send-alerts.js, or\n" +
      "  one of the domain rules it bundles in. The file pasted into Supabase\n" +
      "  would still be running the old logic.\n\n" +
      "  Run: node scripts/build-edge.mjs\n" +
      "  Then commit the result, and paste it into the dashboard.\n",
  );
  process.exit(1);
}
console.log("check-edge: supabase-send-alerts.js is in step with its sources");
