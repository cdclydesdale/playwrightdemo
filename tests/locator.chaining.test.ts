import { test } from '@playwright/test';

test('locator chaining test', async ({ page }) => {
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
  await page.locator('id=account >> id=input-firstname').fill('Clyde');
  await page.locator('id=account >> id=input-lastname').fill('Dsouza');
  await page.locator('id=account >> id=input-email').fill('cdclydesdale@yahoo.com');
  await page.locator('id=account >> id=input-telephone').fill('1212552522');

  await page.getByRole('textbox', { name: '* Password', exact: true }).fill('password');
  await page.getByRole('textbox', { name: '* Password Confirm' }).fill('password');

  await page.getByRole('radio', { name: 'Yes' }).click();

  await page.waitForTimeout(3000);
});
