import { expect, test as base } from '@playwright/test';
import { LoginPage } from './POM/login.page.pom';

const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        await page.goto('https://binaryville.com/account/');
        await use(new LoginPage(page));
    },
});

test('@login - Login Test', async ({ loginPage, page }) => {
    await loginPage.login('happy_gilmore@gmail.com', 'Happy@123');
    await expect(page).toHaveURL('https://binaryville.com/account/?email=happy_gilmore%40gmail.com&password=Happy%40123#');
});
