import {expect, test, Page} from '@playwright/test';
import { chromium, type Browser } from 'playwright';

test('@google - Google Images Searcg Test', async( { } ) => {
    const browser: Browser = await chromium.launch({headless:true});
    const context = await browser.newContext();
    const page1: Page = await context.newPage();
    await page1.goto('https://www.google.com/');
    const imageLink = page1.locator("[aria-label='Search for Images ']");
    await imageLink.click();
    await expect(page1.url()).toContain('https://www.google.com/imghp?hl=en&ogbl');
    await page1.waitForTimeout(1500);
    });