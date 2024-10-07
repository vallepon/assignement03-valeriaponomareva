import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {

  readonly page: Page;
  readonly logoutButton: Locator;
  readonly createClient: Locator;
  readonly createRoom: Locator;
  readonly createBill: Locator;
  readonly createReservation: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createClient = page.getByRole('link', { name: 'Create Client' });
    this.createRoom = page.getByRole('link', { name: 'Create Room' });
    this.createBill = page.getByRole('link', { name: 'Create Bill'});
    this.createReservation = page.getByRole('link', { name: 'Create Reservation'});
    this.logoutButton = page.getByRole('button', { name: 'Logout' });

  }

  async navigateToClients() {
    await this.page.locator('#app > div > div > div:nth-child(2) > a').click();
    await this.createClient.click();
  }

  async navigateToRooms() {
    await this.page.locator('#app > div > div > div:nth-child(1) > a').click();
    await this.createRoom.click();
  }

  async navigateToBills() {
    await this.page.locator('#app > div > div > div:nth-child(3) > a').click();
    await this.createBill.click();
  }

  async navigateToReservations() {
    await this.page.locator('#app > div > div > div:nth-child(4) > a').click();
    await this.createReservation.click();
  }

  async performLogout() {
    await this.logoutButton.click();
  }

  async navigateToDeleteRoom() {
    await this.page.locator('#app > div > div > div:nth-child(1) > a').click();

  }

  async navigateToDeleteOrEditClient() {
    await this.page.locator('#app > div > div > div:nth-child(2) > a').click();

  }
  async navigateToDeleteOrEditBill() {
    await this.page.locator('#app > div > div > div:nth-child(3) > a').click();

  }

}