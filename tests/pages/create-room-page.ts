import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateRoomPage {

    readonly page: Page;
    readonly categoryElement: Locator; 
    readonly numberInput: Locator;
    readonly floorInput: Locator;
    readonly availableCheckbox: Locator;
    readonly priceInput: Locator;
    readonly featuresSelect: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryElement = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > select');
        this.numberInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=number]');
        this.floorInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=number]');
        this.availableCheckbox = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > div');
        this.priceInput = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=number]');
        this.featuresSelect = page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select');
        this.saveButton = page.locator('#app > div > div.actions > a.btn.blue');
     }

        async CreateRooms() {
            const number = faker.number.int({ min: 100, max: 999 }).toString();
            const floorNumber = faker.number.int({ min: 0, max: 10}).toString()
            const roomPrice = faker.number.int({ min: 100000, max: 50000000 }).toString();
            const features = ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'];
            const selectedFeatures = features.filter(() => Math.random());
            for (const feature of selectedFeatures)
              await this.featuresSelect.selectOption({ label: feature });
            await this.categoryElement.selectOption({ index: 1 });
            await this.numberInput.fill(number);
            await this.floorInput.fill(floorNumber);
            await this.availableCheckbox.click();
            await this.priceInput.fill(roomPrice);
            await this.saveButton.click();
          }
          
        }