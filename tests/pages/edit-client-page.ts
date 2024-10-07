import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class EditClientPage {
  readonly page: Page;
  readonly telephone: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.telephone = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=text]')
    this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');
  }

  async editClientNumber(userPhoneNo: string) {
    await this.telephone.clear();
    await this.telephone.fill(userPhoneNo);
    await this.saveButton.click();
  } 

}