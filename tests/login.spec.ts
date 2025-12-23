import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {chrommium, firefox, webkit} from 'playwright';

test('Login Test', async() => {
const browser:Browser = await webkit.launch({ headless: true });

const browserContext1 = await browser.newContext();


const page1:Page = await browserContext1.newPage();
await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
await page1.fill('input#input-email', 'pwtest@opencart.com');
await page1.fill('input#input-password', 'playwright@123');
await page1.click('input[value="Login"]');
await expect(page1).toHaveTitle('My Account');
await browserContext1.close();

//browserContext2
const browserContext2 = await browser.newContext();
const page2:Page = await browserContext2.newPage();
await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
await expect(page2).toHaveTitle("Account Login");
await browserContext2.close(); 

await browser.close();

});

