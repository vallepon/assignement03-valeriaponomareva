import { type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateReservationPage {
    readonly page: Page;
    readonly startInput: Locator;
    readonly endInput: Locator;
    readonly clientSelect: Locator;
    readonly roomSelect: Locator;
    readonly billSelect: Locator;
    readonly saveButton: Locator;
  
    constructor(page: Page) {
        this.page = page;

        this.startInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
        this.endInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=text]');        
        this.clientSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select')
        this.roomSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select')
        this.billSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select')
        this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');

    }

    async CreateReservations() {

        const startDate = faker.date.future();
        const endDate = faker.date.future();

        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];

        await this.startInput.fill(startDateString);
        await this.endInput.fill(endDateString);        
        await this.clientSelect.selectOption({ index: 1 });
        await this.roomSelect.selectOption({ index: 1 });
        await this.billSelect.selectOption({ index: 1 });
        await this.saveButton.click();
    }
    
}