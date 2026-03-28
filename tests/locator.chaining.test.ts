import { test, expect } from '@playwright/test';
import { gotoOpencartOrSkip } from './helpers/opencart';

test('@locatorchaining - Locator Chaining Test', async ({ page }) => {
  await gotoOpencartOrSkip(
    page,
    'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
  );

  const firstName = page.locator('id=account >> id=input-firstname');
  const lastName = page.locator('id=account >> id=input-lastname');
  const email = page.locator('id=account >> id=input-email');
  const telephone = page.locator('id=account >> id=input-telephone');

  await firstName.fill('Clyde');
  await lastName.fill('Dsouza');
  await email.fill('cdclydesdale@yahoo.com');
  await telephone.fill('1212552522');

  await expect(firstName).toHaveValue('Clyde');
  await expect(lastName).toHaveValue('Dsouza');
  await expect(email).toHaveValue('cdclydesdale@yahoo.com');
  await expect(telephone).toHaveValue('1212552522');

  const password = page.getByRole('textbox', { name: '* Password', exact: true });
  const confirmPassword = page.getByRole('textbox', { name: '* Password Confirm' });
  await password.fill('password');
  await confirmPassword.fill('password');
  await expect(password).toHaveValue('password');
  await expect(confirmPassword).toHaveValue('password');

  const newsletterYes = page.getByRole('radio', { name: 'Yes' });
  await newsletterYes.check();
  await expect(newsletterYes).toBeChecked();
});
