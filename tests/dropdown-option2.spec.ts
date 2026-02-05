import { test, expect } from '@playwright/test';

test('selects option 2 from dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption({ label: 'Option 2' });

  await expect(dropdown).toHaveValue('2');
  await expect(dropdown.locator('option:checked')).toHaveText('Option 2');
});
