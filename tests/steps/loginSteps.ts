import { Before, After, Given, When, Then } from "@cucumber/cucumber";
import { chromium, expect, Browser, Page } from "@playwright/test";
import { LoginPage } from "../POM/login.page.pom";

const loginUrl = "https://binaryville.com/account/";
const validEmail = "happy_gilmore@gmail.com";
const validPassword = "Happy@123";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});

Given("the user is on the login page", async () => {
  await page.goto(loginUrl, { waitUntil: "domcontentloaded" });
});

When("the user enters valid email and password", async () => {
  await loginPage.emailId.fill(validEmail);
  await loginPage.password.fill(validPassword);
});

When("clicks the login button", async () => {
  await loginPage.loginButton.click();
});

Then("the url should contain the email and password information", async () => {
  await expect(page).toHaveURL(/email=.+&password=.+/);

  const currentUrl = new URL(page.url());
  expect(currentUrl.searchParams.get("email")).toBe(validEmail);
  expect(currentUrl.searchParams.get("password")).toBe(validPassword);
});
