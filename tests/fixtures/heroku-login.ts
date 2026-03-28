import { test as base, expect, type Locator } from '@playwright/test';

const HEROKU_LOGIN_URL = 'https://the-internet.herokuapp.com/login';

type HerokuLoginPage = {
  goto(): Promise<void>;
  loginAs(username: string, password: string): Promise<void>;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  flashMessage: Locator;
};

export const test = base.extend<{ herokuLoginPage: HerokuLoginPage }>({
  herokuLoginPage: async ({ page }, use) => {
    const herokuLoginPage: HerokuLoginPage = {
      async goto() {
        await page.goto(HEROKU_LOGIN_URL, { waitUntil: 'domcontentloaded' });
        await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
      },
      async loginAs(username: string, password: string) {
        await herokuLoginPage.usernameInput.fill(username);
        await herokuLoginPage.passwordInput.fill(password);
        await herokuLoginPage.loginButton.click();
      },
      usernameInput: page.getByLabel('Username'),
      passwordInput: page.getByLabel('Password'),
      loginButton: page.getByRole('button', { name: /Login/ }),
      flashMessage: page.locator('#flash'),
    };

    await use(herokuLoginPage);
  },
});

export { expect };
