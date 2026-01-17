import { test, expect, Browser, Page  } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('focus tests', async () => {
  const browser:Browser = await chromium.launch({headless:true});
  const browserContext1 = await browser.newContext();
  const page1:Page = await browserContext1.newPage();
  await page1.goto('https://www.orangehrm.com/en/book-a-free-demo#');
  const acceptBtn = page1.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
  await acceptBtn.click();
  const firstName = page1.locator('#Form_getForm_FullName');
  await firstName.focus();
  await page1.waitForTimeout(3000);
  await firstName.fill('Clyde G Dsouza');
  const companyName = page1.locator('#Form_getForm_CompanyName');
  companyName.focus();
  await page1.waitForTimeout(1000);
  await companyName.fill('WBD');
  await page1.waitForTimeout(2000);
  await browserContext1.close();
  await browser.close();
});