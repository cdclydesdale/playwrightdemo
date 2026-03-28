// spec: Navigate to https://the-internet.herokuapp.com/login and validate invalid login error message
// seed: tests/seed.spec.ts

import { test, expect } from './fixtures/heroku-login';

test.describe('Navigate to https://the-internet.herokuapp.com/login and validate invalid login error message', () => {
  test('Invalid Login Shows Error', async ({ herokuLoginPage }) => {
    await herokuLoginPage.goto();
    await herokuLoginPage.loginAs('admin', 'admin');
    await expect(herokuLoginPage.flashMessage).toContainText('Your username is invalid!');
  });
});
