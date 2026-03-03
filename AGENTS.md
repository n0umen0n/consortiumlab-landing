# AGENTS.md

## Cursor Cloud specific instructions

This is a static Next.js 14 marketing/landing page site ("Consortium Factory"). No backend, database, or external services are needed.

### Commands

Standard commands are in `package.json` scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm start`.

### Notes

`next.config.js` uses `output: 'export'` with `images: { unoptimized: true }` for static site generation. Both `/` and `/org` routes work in dev mode and static build.

### Lint setup

ESLint is not bundled in `dependencies`/`devDependencies` by default. The dev environment installs `eslint@^8` and `eslint-config-next@14.2.35` as devDependencies, and an `.eslintrc.json` (extending `next/core-web-vitals`) is required for `npm run lint` to work non-interactively.
