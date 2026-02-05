import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const repoRoot = process.cwd();
const htmlPath = path.join(repoRoot, 'tmp', 'pdfs', 'playwrightDemo-summary.html');
const pdfPath = path.join(repoRoot, 'output', 'pdf', 'playwrightDemo-summary.pdf');
const previewPath = path.join(repoRoot, 'tmp', 'pdfs', 'playwrightDemo-summary.preview.png');

const browser = await chromium.launch({
  headless: true,
  // Prefer using a locally installed Chrome to avoid downloading Playwright-managed browsers.
  channel: 'chrome',
});
try {
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 }, // 8.5x11in at 96 DPI
    deviceScaleFactor: 2,
  });

  await page.goto(pathToFileURL(htmlPath).toString(), { waitUntil: 'load' });
  await page.waitForTimeout(150);

  await page.screenshot({ path: previewPath, fullPage: true });
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
  });

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        htmlPath,
        previewPath,
        pdfPath,
      },
      null,
      2
    )
  );
} finally {
  await browser.close();
}
