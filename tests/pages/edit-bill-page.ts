import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class EditBillPage {
  readonly page: Page;
  readonly value: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.value = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]')
    this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');
  }

  async editBillValue() {
    await this.value.clear();
    const billValue = Math.floor(Number(faker.finance.amount({ min: 1, max: 50000 }))).toString();
    await this.value.fill(billValue, { force: true });
    await this.saveButton.click();
  } 

}