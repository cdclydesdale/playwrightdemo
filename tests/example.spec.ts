import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page.getByRole('link', { name: 'Docs', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MCP', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API', exact: true })).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get started button is present and clickable', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const getStarted = page.getByRole('link', { name: 'Get started' });

  await expect(getStarted).toBeVisible();
  await expect(getStarted).toBeEnabled();

  await getStarted.click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
