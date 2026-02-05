import { test, expect, type Page } from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/challenging_dom';

async function gotoChallengingDom(page: Page) {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    await page.goto(URL);

    const errorHeading = page.getByRole('heading', { name: /Internal Server Error/i });
    if (await errorHeading.isVisible()) {
      if (attempt === maxAttempts) {
        test.skip(true, 'Challenging DOM returned Internal Server Error after multiple attempts');
      }
      await page.waitForTimeout(500);
      continue;
    }

    await expect(page.getByRole('heading', { name: 'Challenging DOM' })).toBeVisible();
    return;
  }
}

test.describe('@smoke Challenging DOM', () => {
  test('page loads and main heading is visible', async ({ page }) => {
    await gotoChallengingDom(page);
  });

  test('action buttons exist and have expected labels', async ({ page }) => {
    await gotoChallengingDom(page);

    const buttons = page.locator('a.button');
    await expect(buttons).toHaveCount(3);
    await expect(page.locator('a.button.alert')).toHaveCount(1);
    await expect(page.locator('a.button.success')).toHaveCount(1);

    const buttonTexts = await buttons.allTextContents();
    expect(buttonTexts).toHaveLength(3);
    for (const text of buttonTexts) {
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test('canvas exists and has non-zero size', async ({ page }) => {
    await gotoChallengingDom(page);

    const canvas = page.locator('#canvas');
    await expect(canvas).toBeVisible();

    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });

  test('table headers are present and correct', async ({ page }) => {
    await gotoChallengingDom(page);

    const headers = page.locator('table thead th');
    await expect(headers).toHaveText(['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action']);
  });

  test('table body rows and action links are present', async ({ page }) => {
    await gotoChallengingDom(page);

    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(10);
    await expect(page.getByRole('link', { name: 'edit' })).toHaveCount(10);
    await expect(page.getByRole('link', { name: 'delete' })).toHaveCount(10);
  });
});
