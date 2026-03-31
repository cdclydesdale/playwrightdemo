import {Locator, Page } from '@playwright/test';

export class LoginPage{
    public readonly emailId: Locator;
    public readonly password: Locator;
    public readonly loginButton: Locator;

    constructor(page: Page){
        this.emailId = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    async login(email: string, password: string){
        await this.emailId.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}