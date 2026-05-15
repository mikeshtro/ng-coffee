# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server (alias: npm start)
npm run build         # Bundle exercise files then build Angular app
npm run bundle-files  # Only re-bundle src/files → public/**/*.json
npx ng lint           # Run ESLint across the project
```

There are no tests configured in this project yet.

When adding a new course or modifying exercise files, always run `npm run bundle-files` before `ng serve` — the dev server serves the pre-built JSON snapshots from `public/`, not `src/files/` directly.

## Architecture

### What this app is

**ng-coffee** ("MorniNG coffee") is an in-browser interactive Angular tutorial platform. Each lesson shows Markdown instructions alongside a live Angular playground powered by [WebContainer](https://webcontainers.io/), so learners run real `npm install` / `ng serve` commands without leaving the browser.

### Routing (AnalogJS file-based routing)

```
/                            → src/app/pages/(home).page.ts
/courses                     → src/app/pages/courses.page.ts       ← IDE shell
/courses/[course]/[slug]     → src/app/pages/courses/[course].[slug].page.ts  ← Markdown
```

`courses.page.ts` is the persistent IDE shell. It owns the WebContainer lifecycle and renders:
- `<ngc-multi-editor>` — tabbed CodeMirror editor
- `<ngc-preview>` — iframe pointing at the WebContainer dev server
- `<ngc-terminal>` — xterm.js terminal wired to a `jsh` shell inside WebContainer
- `<router-outlet>` — where the per-slug Markdown instructions are injected

### Exercise file pipeline

Each course slug has a complete Angular starter project stored under `src/files/{course}/{slug}/`. The build script `tools/build-files.ts` walks those directories and serialises them into a `FileSystemTree` JSON at `public/{course}/{slug}.json`.

At runtime, `FileLoaderService` fetches the relevant JSON via HTTP, then `WebContainerService.mount()` loads it into the WebContainer filesystem. Changes the user makes in the editor are written back with `WebContainerService.writeFile()`.

### File dictionary

`src/app/file-loader/file-dictionary/` controls **which files from the JSON snapshot are surfaced in the editor**. Each course has its own dictionary (`angular-basics-2025.ts`, `angular-for-backend-developers.ts`) mapping `slug → string[]` of file paths.

If you add a new slug or new editable files to an existing slug, you must update the matching dictionary file — otherwise those files won't appear in the editor even though they exist in the WebContainer.

### Services

| Service | Responsibility |
|---|---|
| `WebContainerService` | Singleton. Boots/owns the WebContainer instance, exposes signals for state (`isReady`, `url`), mounts file trees, reads/writes files, owns the `jsh` shell process. |
| `FileLoaderService` | Fetches `public/{course}/{slug}.json` via HTTP, emits a `files$` observable consumed by `courses.page.ts`. |

### Content (Markdown)

Lesson text lives in `src/content/{course}/{slug}.md`. AnalogJS processes these at build time and serves them via `injectContent()` in `[course].[slug].page.ts`. Markdown is rendered with `<analog-markdown>` and syntax-highlighted with Prism (including diff highlighting via `prism-diff-highlight`).

### Naming conventions

- Component selector prefix: `ngc-` (kebab-case elements, camelCase attributes)
- Use Angular 21 signals API throughout: `signal()`, `computed()`, `effect()`, `linkedSignal()`
- Prefer `inject()` over constructor injection
- Member ordering enforced by ESLint: static fields → instance fields → constructor → static methods → instance methods
- No `public` access modifier (ESLint enforces `no-public`)
- Explicit return types required on all non-expression functions
- Max line length: 140 chars (TS), 100 chars (Prettier)
- Single quotes, trailing commas in ES5 positions

### Adding a new course

1. Create `src/files/{course-slug}/{chapter-slug}/` with a full Angular project starter
2. Create `src/content/{course-slug}/{chapter-slug}.md` with the lesson text
3. Add `src/app/file-loader/file-dictionary/{course-slug}.ts` mapping slugs to editable file paths
4. Register the new dictionary in `src/app/file-loader/file-dictionary/file-dictionary.ts`
5. Add a link on the home page (`src/app/pages/(home).page.ts`)
6. Run `npm run bundle-files` to generate the JSON snapshots
