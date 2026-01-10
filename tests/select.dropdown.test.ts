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

test('mouse hover and click', async() => {
  const browser:Browser = await chromium.launch({headless:true});
  const browserContext1 = await browser.newContext();
  const page1:Page = await browserContext1.newPage();
  await page1.goto('https://www.wired.com/');
  const accountDropDown = page1.locator("(//span[@data-testid='identityDropdown'])[2]");
  await accountDropDown.click();
  await page1.getByText('SCIENCE').first().click();
  await page1.waitForTimeout(2000);
  await browserContext1.close();

  console.log('Testing out mouse right click')
  const browserContext2 = await browser.newContext();
  const page2:Page = await browserContext2.newPage();
  await page2.goto('https://the-internet.herokuapp.com/context_menu');
  page2.once('dialog', async (dialog) => {
    await dialog.accept();
  });
  await page2.locator('#hot-spot').click({button: 'right'});
  await page2.waitForTimeout(2000);
  await browserContext2.close();
  
  console.log('Testing out mouse hover')
  const browserContext3 = await browser.newContext();
  const page3:Page = await browserContext3.newPage();
  await page3.goto('https://the-internet.herokuapp.com/hovers');
  const figures = page3.locator('.figure');
  await figures.nth(0).hover();
  await figures.nth(1).hover();
  await figures.nth(2).hover();
  await page3.waitForTimeout(2000);
  await browserContext3.close();

  await browser.close();
});
