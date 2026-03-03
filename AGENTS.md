# AGENTS.md

## Cursor Cloud specific instructions

This is a static Next.js 14 marketing/landing page site ("Consortium Factory"). No backend, database, or external services are needed.

### Commands

Standard commands are in `package.json` scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm start`.

### Known dev-mode caveat

The homepage (`/`) uses `next/image` while `next.config.js` sets `output: 'export'` without `images: { unoptimized: true }`. This causes a runtime error on `/` in dev mode (`npm run dev`). The `/org` route works fine in dev mode. The static build (`npm run build`) succeeds for all pages. To fix, add `images: { unoptimized: true }` to `next.config.js`.

### Lint setup

ESLint is not bundled in `dependencies`/`devDependencies` by default. The dev environment installs `eslint@^8` and `eslint-config-next@14.2.35` as devDependencies, and an `.eslintrc.json` (extending `next/core-web-vitals`) is required for `npm run lint` to work non-interactively.
