import { test } from '@playwright/test';
import { chromium, type BrowserContext, type Page } from 'playwright';

test('non incognito mode test', async ({}, testInfo) => {
  const userDataDir = testInfo.outputPath('persistent-user-data');
  const context: BrowserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
  });

  const existingPages: Page[] = context.pages();
  const page: Page = existingPages[0] ?? (await context.newPage());

  await page.goto('https://www.google.com/');
  await page.waitForTimeout(3000);
  await context.close();

});
