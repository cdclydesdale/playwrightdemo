
import { test, expect } from '@playwright/test';

const OPENCART_LOGIN_URL =
  'https://naveenautomationlabs.com/opencart/index.php?route=account/login';

test('opencart login page loads', async ({ page }) => {
  await page.goto(OPENCART_LOGIN_URL, { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Account Login');
  await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
});

test('opencart login succeeds', async ({ page }) => {
  await page.goto(OPENCART_LOGIN_URL, { waitUntil: 'domcontentloaded' });

  await page.fill('input#input-email', 'pwtest@opencart.com');
  await page.fill('input#input-password', 'playwright@123');
  await page.click('input[value="Login"]');

  await expect(page).toHaveURL(/route=account\/account/);
  await expect(page).toHaveTitle('My Account');
  await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
});

test('herokuapp login page accepts username input', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'domcontentloaded' });

  const username = page.locator('#username');
  await username.fill('clydesdale');
  await expect(username).toHaveValue('clydesdale');
});
