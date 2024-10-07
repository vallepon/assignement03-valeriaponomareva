import { Page, Locator, expect } from '@playwright/test';

export class BillPage {
  readonly page: Page;
  readonly pageName: Locator;
  readonly createBillButton: Locator;
  readonly dots: Locator;
  readonly edit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageName = page.locator('#app > div > h2 > div');
    this.createBillButton = page.locator('#app > div > h2 > a')
    this.dots = page.locator('#app > div > div.bills > div:nth-child(1) > div.action > img')
    this.edit = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(1)')
  }

  async verifyBillDetails() {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
  }

  async editBill() {
    await this.dots.click();
    await this.edit.click();

  }
}
