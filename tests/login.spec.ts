// Import necessary modules from fixture-aware test wrapper
import { test, expect } from './fixtures/heroku-login';
// Import helper function to navigate OpenCart or skip it if not needed
import { gotoOpencartOrSkip } from './helpers/opencart';

// URL for OpenCart login page
const OPENCART_LOGIN_URL =
  'https://naveenautomationlabs.com/opencart/index.php?route=account/login';

/**
 * Test that the OpenCart login page loads correctly.
 */
test('opencart login page loads', async ({ page }) => {
  await gotoOpencartOrSkip(page, OPENCART_LOGIN_URL);

  // Verify page title and heading are visible
  await expect(page).toHaveTitle('Account Login');
  await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
});

/**
 * Test that the OpenCart login is successful.
 */
test.skip(
  'opencart login succeeds',
  'Temporarily skipped: external site/account state is unstable',
  async ({ page }) => {
    await gotoOpencartOrSkip(page, OPENCART_LOGIN_URL);

    // Fill in email and password fields
    await page.fill('input#input-email', 'pwtest@opencart.com');
    await page.fill('input#input-password', 'playwright@123');

    // Click login button and assert account landing page
    await page.click('input[value="Login"]');
    await expect(page).toHaveURL(/route=account\/account/);
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
  }
);

/**
 * Test that the Herokuapp login page accepts username input.
 */
test('herokuapp login page accepts username input', async ({ herokuLoginPage }) => {
  await herokuLoginPage.goto();
  await herokuLoginPage.usernameInput.fill('clydesdale');
  await expect(herokuLoginPage.usernameInput).toHaveValue('clydesdale');
});
