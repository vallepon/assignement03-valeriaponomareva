import { Page, Locator, expect } from '@playwright/test';

export class ClientPage {
  readonly page: Page;
  readonly pageName: Locator;
  readonly createClientButton: Locator;
  readonly dots: Locator;
  readonly edit: Locator;
  readonly deleteClientButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageName = page.locator('#app > div > h2 > div');
    this.createClientButton = page.locator('#app > div > h2 > a')
    this.dots = page.locator('#app > div > div.clients > div:nth-child(1) > div.action > img')
    this.edit = page.locator('#app > div > div.clients > div > div.menu > a:nth-child(1)')
    this.deleteClientButton = page.locator('#app > div > div.clients > div:nth-child(1) > div.menu > a:nth-child(2)')
  }

  async verifyClientDetails(fullName: string, userEmail: string, userPhoneNo: string) {
    const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    await expect(element).toContainText(fullName);
    await expect(element).toContainText(userEmail);
    await expect(element).toContainText(userPhoneNo);
  }

  async deleteClient() {
    await this.dots.click();
    await this.deleteClientButton.click();
  }

  async editClient() {
    await this.dots.click();
    await this.edit.click();

  }
}