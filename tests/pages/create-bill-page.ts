import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateBillPage {
    readonly page: Page;
    readonly valueInput: Locator;
    readonly paidCheckbox: Locator;
    readonly saveButton: Locator;
  
    constructor(page: Page) {
        this.page = page;

        this.valueInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=number]');
        this.paidCheckbox = page.locator('div.checkbox');
        this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');

    }

    async CreateBills() {
        const billValue = Math.floor(Number(faker.finance.amount({ min: 1, max: 50000 }))).toString();
        await this.paidCheckbox.click();
        await this.valueInput.fill(billValue, { force: true });
        await this.saveButton.click();
    }
    
}
