import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {
  test('Skapa en klient', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    
    // Logga ut användaren
    await page.getByRole('button', { name: 'Logout' }).click();  // Modifiera knappen om nödvändigt
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();  // Bekräfta att man ser inloggningsknappen
  });

  test('Navigera till rumslistan och logga ut', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Rumslista' }).click(); // Modifiera om nödvändigt
    await expect(page.getByRole('heading', { name: 'Rumslista' })).toBeVisible();

    // Logga ut användaren
    await page.getByRole('button', { name: 'Logout' }).click();  // Modifiera om nödvändigt
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Backend tests', () => {
  test('Skapa en klient', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data: {
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  test('Hämta alla rum och logga ut', async ({ page, request }) => {
    const response = await request.get('http://localhost:3000/api/rooms');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();

    // Logga ut från backend
    const logoutResponse = await request.post('http://localhost:3000/api/logout');
    expect(logoutResponse.ok()).toBeTruthy();
  });
  
});


/*test.describe('Front-end tests', () => {
  test('Create a client', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    // Include the rest of the code...

  });
});9


test.describe('Backend tests', () => {
  test('Create a client', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data:{
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }
    });
    expect (response.ok()).toBeTruthy();
    // Include the rest of the code...
  });*/
