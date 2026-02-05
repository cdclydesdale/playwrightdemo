import { test, type Page } from '@playwright/test';

const NET_ERROR_URL_PREFIXES = ['chrome-error://', 'about:neterror'];
const CONNECTION_ERROR_HEADING =
  /Unable to connect|This site can(?:'|’)t be reached|Cannot Open Page|Safari can(?:'|’)t open the page/i;

export async function gotoOpencartOrSkip(
  page: Page,
  url: string,
  options?: { maxAttempts?: number }
) {
  const maxAttempts = options?.maxAttempts ?? 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
    } catch (error) {
      if (attempt === maxAttempts) {
        test.skip(true, `Opencart unreachable after ${maxAttempts} attempts: ${url}`);
        return;
      }
      await page.waitForTimeout(500);
      continue;
    }

    const currentUrl = page.url();
    const isNetErrorUrl = NET_ERROR_URL_PREFIXES.some((prefix) => currentUrl.startsWith(prefix));
    const errorHeadingVisible = await page
      .getByRole('heading', { name: CONNECTION_ERROR_HEADING })
      .isVisible()
      .catch(() => false);

    if (isNetErrorUrl || errorHeadingVisible) {
      if (attempt === maxAttempts) {
        test.skip(true, `Opencart unreachable after ${maxAttempts} attempts: ${url}`);
        return;
      }
      await page.waitForTimeout(500);
      continue;
    }

    return;
  }
}
