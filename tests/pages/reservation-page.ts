import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ReservationPage {
    readonly page: Page;
    readonly pageName: Locator;
    readonly createReservationButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.pageName = page.locator('#app > div > h2 > div');
      this.createReservationButton = page.locator('#app > div > h2 > a');

    }

    async verifyBillDetails() {
        const element = this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    }
}
