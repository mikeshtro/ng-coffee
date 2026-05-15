# AGENTS.md

Multi-agent development guide for ng-coffee.

## Agents

| Agent | Skill file | Role |
|---|---|---|
| `angular-developer` | `.agents/skills/angular-developer/SKILL.md` | Implements new chapters (starter files, Markdown, file dictionary) |
| `reviewer` | `.agents/skills/reviewer/SKILL.md` | Reviews changes for Angular patterns, ESLint rules, and exercise quality |

## Invoking agents from Claude Code CLI

Pass the skill file as additional context using `--append-system-prompt` or simply include it in your prompt. The recommended pattern is:

```bash
# Developer agent — implement a new chapter
claude --print \
  "$(cat .agents/skills/angular-developer/SKILL.md)" \
  "Add a new chapter '15-router-basics' to the angular-basics-2025 course. The lesson should introduce RouterLink and basic navigation between two views."

# Reviewer agent — review the work just done
claude --print \
  "$(cat .agents/skills/reviewer/SKILL.md)" \
  "Review the changes made for chapter 15-router-basics: src/files/angular-basics-2025/15-router-basics/, src/content/angular-basics-2025/15-router-basics.md, and the file dictionary update."
```

Or interactively, start a Claude Code session and paste the skill file contents at the top of your first message.

## Typical workflow

```
1. Open a Claude Code session for the developer agent
   → Give it the SKILL.md + your chapter spec
   → It creates starter files, Markdown, and updates the dictionary
   → It runs npm run bundle-files

2. Open a second Claude Code session for the reviewer agent
   → Give it the SKILL.md + the list of changed files
   → It produces a structured review (blocking issues / suggestions / verdict)

3. If changes are requested, return to the developer session with the review output
```

## What each agent reads

Both agents should read `CLAUDE.md` first (it's at the project root and Claude Code loads it automatically). The skill files add role-specific instructions on top.

```
CLAUDE.md                          ← loaded automatically by Claude Code
.agents/skills/angular-developer/SKILL.md   ← developer role instructions
.agents/skills/reviewer/SKILL.md            ← reviewer role instructions
```
