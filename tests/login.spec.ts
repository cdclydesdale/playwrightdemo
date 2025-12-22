import {test, expect, Browser, Page} from '@playwright/test';
import {chrommium, firefox, webkit} from 'playwright';

test('Login Test', async() => {
const browser:Browser = await webkit.launch({ headless: false });
const page:Page = await browser.newPage();
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
await page.fill('input#input-email', 'pwtest@opencart.com');
await page.fill('input#input-password', 'playwright@123');
await page.click('input[value="Login"]');
await expect(page).toHaveTitle('Account Login');
await browser.close();

});

