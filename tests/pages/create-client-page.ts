import { Page, Locator, expect } from '@playwright/test';

export class CreateClientPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
    this.emailInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]');
    this.phoneInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]');
    this.saveButton = page.locator('#app > div > div.actions > a.btn.blue')
  }

  async createClient(fullName: string, userEmail: string, userPhoneNo: string) {
    await this.nameInput.fill(fullName);
    await this.emailInput.fill(userEmail);
    await this.phoneInput.fill(userPhoneNo);
    await this.saveButton.click();
  } 

}