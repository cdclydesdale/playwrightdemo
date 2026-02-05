import { test, expect } from '@playwright/test';
import { gotoOpencartOrSkip } from './helpers/opencart';

test('Accessibility Test', async ({ page }) => {
  await gotoOpencartOrSkip(
    page,
    'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
  );

  await expect(page.getByRole('heading', { name: 'Register Account' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Downloads' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Yes' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'No' })).toBeVisible();
  await expect(page.getByRole('checkbox')).toBeVisible();
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('checkbox')).toBeChecked();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});
