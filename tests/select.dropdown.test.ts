import { test, expect, Browser, Page  } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('dropdown tests', async () => {
  const browser:Browser = await chromium.launch({headless:true});
  const browserContext1 = await browser.newContext();
  const page1:Page = await browserContext1.newPage();
  await page1.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');
  //await page1.selectOption('select#Contact_CountryCode', { value: 'AQ' });
  //await page1.selectOption('select#Contact_CountryCode', {label:'United States of America'});
  //await page1.selectOption('select#Contact_CountryCode', {index: 0 });
  await page1.waitForTimeout(3000);


  const allOptions = await page1.$$('select#Contact_CountryCode > option');
  console.log(allOptions.length);
  for (const e of allOptions ) {
    const text = await e.textContent();
    console.log(text);
  }

  await browserContext1.close();
  await browser.close();
});
