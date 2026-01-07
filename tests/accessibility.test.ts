import {test, expect, Browser, Page} from '@playwright/test';
import {chromium, firefox, webkit} from 'playwright';

test('Accessibility Test', async() => {
const browser:Browser = await webkit.launch({ headless: true });

const browserContext1 = await browser.newContext();


const page1:Page = await browserContext1.newPage();
await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
await expect(page1.getByRole('heading', {name: 'Register Account'})).toBeVisible();
await expect(page1.getByRole('link', {name: 'Downloads'})).toBeVisible();
await expect(page1.getByRole('radio', {name: 'Yes'})).toBeVisible();
await expect(page1.getByRole('radio', {name: 'No'})).toBeVisible();
await expect(page1.getByRole('checkbox')).toBeVisible();
await page1.getByRole('checkbox').click();
await expect(page1.getByRole('button', {name: 'Continue'})).toBeVisible();
await browserContext1.close();

await browser.close();

});
