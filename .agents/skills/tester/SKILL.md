---
name: tester
description: >
  Verify code changes in a running web app using Playwright MCP. Use this skill proactively
  after making code changes, when the user says things like "verify this", "test my changes",
  "does this look right", "check the app", "take a screenshot", "run a quick test", "does it work",
  "make sure nothing broke", or is about to commit/push. Also trigger when the user asks you to
  look at the browser, inspect the UI, or confirm that a fix worked. This skill runs a structured
  check: screenshot, console errors, and targeted interactions — then reports what's working and
  what isn't.
---

# Tester Skill

Use Playwright MCP to verify that recent code changes work correctly in the browser. Your goal is to give the user a clear, honest summary of what's working and what isn't — not just a list of steps you took.

## Before you start

Default to `http://localhost:4200`. If the server is not running, tell the user to run `npm run dev` and re-invoke once it's up — do not ask for the URL.

## What to check

Work through these in order. Skip steps that clearly don't apply (e.g. if the user only changed a CSS file, deep interaction testing may be overkill — use judgment).

### 1. Navigate and screenshot

Open the relevant URL with Playwright's navigate tool, then take a screenshot. If the user just changed a specific route, navigate directly there. This gives an immediate visual pass/fail: does the page render? Does it look right at a glance?

### 2. Console errors

Read the browser console messages. You're looking for:
- **Errors** (red) — always flag these
- **Warnings** that look like Angular errors (e.g. `NG0`, `ExpressionChangedAfterItHasBeenChecked`) — flag these too
- Noise to ignore: favicon 404s, unrelated third-party warnings

### 3. Targeted interactions

Based on what changed, interact with the relevant parts of the UI. Think about what the user most needs verified:
- Changed a component? Find it, click it, interact with it.
- Changed a route? Navigate to it, check it renders.
- Changed a form? Fill it in and submit.
- Changed shared state or a service? Try actions that exercise it.
- Not sure what changed? Click through the main navigation and a few key interactions.

Don't try to exhaustively test everything — focus on what's most likely to be broken by the recent change.

### 4. Screenshot again (if you interacted)

After interactions, take another screenshot to show the resulting state. This is especially useful for confirming that UI updates, error states, or transitions work correctly.

## How to report

End with a clear, honest summary structured like this:

**What looks good**
- List what you verified and confirmed working

**Issues found** (if any)
- Describe each problem concisely, with what you saw (include the screenshot reference if helpful)
- If it's an obvious fix, suggest it

**Not checked**
- If there are things you couldn't verify (e.g. server-side behavior, authenticated flows), say so briefly

Keep the tone direct. The user just made changes — they want to know quickly if something broke and what to do about it.

## Playwright MCP tools reference

The key tools you'll use:
- **navigate** — go to a URL
- **screenshot** — capture what the browser shows
- **click** — click an element (use CSS selectors or descriptive text)
- **fill** / **type** — enter text into inputs
- **console_messages** (or equivalent) — read browser console output
- **evaluate** — run JavaScript in the page if needed for deeper inspection

If a tool name isn't quite right, try variations — MCP server implementations differ slightly.
