# playwrightDemo

Small Playwright Test (TypeScript) demo project.

## What’s in here

- Tests live in `tests/`
- Config in `playwright.config.ts` (runs Chromium/Firefox/WebKit, HTML reporter)
- Reports output to `playwright-report/` and artifacts to `test-results/`

## Setup

```bash
npm ci
npx playwright install
```

## Run tests

```bash
# run all tests across configured browsers
npx playwright test

# run a single spec file
npx playwright test tests/login.spec.ts

# open the HTML report
npx playwright show-report
```

Note: `tests/login.spec.ts` navigates to a public demo site and runs headed by default, so it requires internet access and will open a browser window.
