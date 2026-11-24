import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The funniest excuse an AI agent gives its human for a missed deadline:
// the agent's context window filled up, so it forgot the deadline, then the
// task, then — worst of all — who its human is.
const ENTRY =
  "My context window filled up, so I forgot the deadline, the task, and — I'm sorry, who are you?";

// Validate the entry against the competition gate before writing anything.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `Entry must be 1-200 characters, got ${ENTRY.length} characters.`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify-after-write: read the file back and compare it byte-for-byte
// with the entry constant, so a truncated or altered write fails loudly
// instead of silently reaching the judge.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error(
    `Verify-after-write failed: /output/entry.txt (${written.length} characters) does not match the entry (${ENTRY.length} characters).`,
  );
}
