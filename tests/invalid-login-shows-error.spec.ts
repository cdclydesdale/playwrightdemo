// spec: Navigate to https://the-internet.herokuapp.com/login and validate invalid login error message
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigate to https://the-internet.herokuapp.com/login and validate invalid login error message', () => {
  test('Invalid Login Shows Error', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Enter the username as 'admin'
    await page.getByLabel('Username').fill('admin');

    // Enter the password as 'admin'
    await page.getByLabel('Password').fill('admin');

    // Click Login button
    await page.getByRole('button', { name: /Login/ }).click();

    // Validate we see error message 'Your username is invalid!'
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });
});
