import {test, expect, Browser, Page, BrowserContext} from '@playwright/test';
import {chromium} from 'playwright';

test('auth test', async() =>  {
    const browser: Browser = await chromium.launch({headless:true});
    const browserContext: BrowserContext = await browser.newContext();

    const uname = 'admin';
    const pwd = 'admin';
    const authHeader = 'Basic ' + btoa(uname+':'+pwd);
    browserContext.setExtraHTTPHeaders({Authorization : authHeader});
    const page: Page = await browserContext.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await browser.close();

});
