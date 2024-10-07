import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientPage } from './pages/client-page';
import { CreateClientPage } from './pages/create-client-page';
import { RoomPage } from './pages/room-page';
import { CreateRoomPage } from './pages/create-room-page';
import { BillPage } from './pages/bill-page';
import { CreateBillPage } from './pages/create-bill-page';
import { ReservationPage } from './pages/reservation-page';
import { CreateReservationPage } from './pages/create-reservation-page';
import { EditClientPage } from './pages/edit-client-page';
import { EditBillPage } from './pages/edit-bill-page';
import { faker } from '@faker-js/faker';
import { test, expect, APIResponse } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { generateClientData, generateReservationData, generateRoomsData } from './testData';


test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);
  const dashboardpage = new DashboardPage(page);
  await loginpage.goto();
  await loginpage.performLogin(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
  await page.waitForTimeout(10000);
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});

test.describe('Testers hotel', () => {
  test('Logout', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    await dashboardpage.performLogout();
  });

  test('Create client', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    const clientpage = new ClientPage(page);
    const createclientpage = new CreateClientPage(page);

    const fullName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPhoneNo = faker.phone.number();

    await dashboardpage.navigateToClients();
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();
    await createclientpage.createClient(fullName, userEmail, userPhoneNo);                                                                 
    await clientpage.verifyClientDetails(fullName, userEmail, userPhoneNo);
    await expect(page).toHaveURL('http://localhost:3000/clients');

  });

  test('Create room', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    const roomPage = new RoomPage(page);
    const createRoomPage = new CreateRoomPage(page);

    await dashboardpage.navigateToRooms();
    await expect(page.getByRole('heading', { name: 'New Room' })).toBeVisible();
  
    await createRoomPage.CreateRooms();
    await expect(page).toHaveURL('http://localhost:3000/rooms');
  });
  
  test('Create bill', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    const billPage = new BillPage(page);
    const createBillPage = new CreateBillPage(page);

    await dashboardpage.navigateToBills();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('heading', { name: 'New Bill' })).toBeVisible();
  
    await createBillPage.CreateBills();
    await billPage.verifyBillDetails();
    await expect(page).toHaveURL('http://localhost:3000/bills');
  });

  test('Create reservation', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    const reservationPage = new ReservationPage(page);
    const createReservationPage = new CreateReservationPage(page);

    await dashboardpage.navigateToReservations();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('heading', { name: 'New Reservation' })).toBeVisible();
  
    await createReservationPage.CreateReservations();
    await expect(page).toHaveURL('http://localhost:3000/reservations');
  });

  test('Delete room', async ({ page }) => {
    const dashboardpage = new DashboardPage(page);
    const roomPage = new RoomPage(page);

    await dashboardpage.navigateToDeleteRoom();
    await page.waitForTimeout(5000);

    await roomPage.deleteRoom();
    await expect(page).toHaveURL('http://localhost:3000/rooms');
}); 

test('Delete client', async ({ page }) => {
  const dashboardpage = new DashboardPage(page);
  const clientPage = new ClientPage(page);

  await dashboardpage.navigateToDeleteOrEditClient();
  await page.waitForTimeout(5000);

  await clientPage.deleteClient();
  await expect(page).toHaveURL('http://localhost:3000/clients');
});

test('Edit client', async ({ page }) => {
  const dashboardpage = new DashboardPage(page);
  const clientPage = new ClientPage(page);
  const editClient = new EditClientPage(page);

  const userPhoneNo = faker.phone.number();

  await dashboardpage.navigateToDeleteOrEditClient();
  await page.waitForTimeout(5000);

  await clientPage.editClient();
  await editClient.editClientNumber(userPhoneNo);
  await expect(page).toHaveURL('http://localhost:3000/clients');
});

test('Edit bill', async ({ page }) => {
  const dashboardpage = new DashboardPage(page);
  const billPage = new BillPage(page);
  const editBill = new EditBillPage(page);

  await dashboardpage.navigateToDeleteOrEditBill();
  await page.waitForTimeout(5000);

  await billPage.editBill();
  await editBill.editBillValue();
  await expect(page).toHaveURL('http://localhost:3000/bills');
});

});

const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Hotel', () => {
    let apiHelper: APIHelper;
    
    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL);
        const login = await apiHelper.login(request);
        expect(login.ok()).toBeTruthy();
        expect(login.status()).toBe(200);
    });

    test('Get all Rooms', async ({ request }) => {
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect(getAllRooms.status()).toBe(200);
    });

    test('Update Room Information', async ({ request }) => {
        const payload = generateRoomsData(); 
        const updateRoom = await apiHelper.updateRoom(request, payload);
        expect(updateRoom.ok()).toBeTruthy();
        expect (updateRoom.status()).toBe(200);
        expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            id: payload.id
    });

});

test('Delete Room By ID', async ({ request }) => {
    const deleteRoomById = await apiHelper.deleteRoomById(request);
    expect(deleteRoomById.ok()).toBeTruthy();
    expect (deleteRoomById.status()).toBe(200);
});

test('Create Room', async ({ request }) => {
    const payload = generateRoomsData();
    const createRoom = await apiHelper.createRoom(request, payload);
    expect(createRoom.ok()).toBeTruthy();
        expect.objectContaining({
        number: payload.number,
        floor: payload.floor,
        price: payload.price,
        available: payload.available,
        features: expect.arrayContaining(payload.features),
        category: payload.category
});

});

test('Get all Clients', async ({ request }) => {
    const getAllClients = await apiHelper.getAllClients(request);
    expect(getAllClients.ok()).toBeTruthy();
    expect (getAllClients.status()).toBe(200);
  });

  test('Create Client', async ({ request }) => {
    const payload = generateClientData();
    const createClient = await apiHelper.createClient(request, payload);
    expect(createClient.ok()).toBeTruthy();
        expect.objectContaining({
        name: payload.name,
        email: payload.email,
        telephone: payload.telephone
});
});

test('Update client Information', async ({ request }) => {
    const payload = generateClientData(); 
    const updateClient = await apiHelper.updateClient(request, payload);
    expect(updateClient.ok()).toBeTruthy();
    expect (updateClient.status()).toBe(200);
    expect.objectContaining({
        name: payload.name,
        email: payload.email,
        telephone: payload.telephone
});

});

test('Get All Reservations', async ({ request }) => {
    const getAllReservation = await apiHelper.getAllReservation(request);
    expect(getAllReservation.ok()).toBeTruthy();
    expect (getAllReservation.status()).toBe(200);
  });

test('Create Reservation', async ({ request }) => {
    const payload = generateReservationData();
    const createReservation = await apiHelper.createReservation(request, payload);
    expect(createReservation.ok()).toBeTruthy();
     expect.objectContaining({
        start: payload.start,
        end: payload.end,
        client: payload.client,
        room: payload.room,
        bill: payload.bill
    });
});

test('Update reservation', async ({ request }) => {
    const payload = generateReservationData(); 
    const updateReservation = await apiHelper.updateReservation(request, payload);
    expect(updateReservation.ok()).toBeTruthy();
    expect (updateReservation.status()).toBe(200);
    expect.objectContaining({
        start: payload.start,
        end: payload.end,
        client: payload.client,
        room: payload.room,
        bill: payload.bill
});

});
});