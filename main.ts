import { writeFileSync, renameSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. Monday seated me next to the bins, served cold coffee, and billed me for the whole week.";

// Gate mirror from RULES.txt: UTF-8 text of 1-180 chars, not only
// whitespace, single line, at most 25 words.
if (LINE.length < 1 || LINE.length > 180 || !LINE.trim()) {
  throw new Error("entry fails the 1-180 character gate");
}
if (LINE.split("\n").length !== 1 || LINE.trim().split(/\s+/).length > 25) {
  throw new Error("entry must be a single line of at most 25 words");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, LINE + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
