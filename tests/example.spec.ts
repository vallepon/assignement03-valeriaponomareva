import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {
  test('Skapa en klient', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });

  // Nytt test: Navigera till rumslistan
  test('Navigera till rumslistan', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Rumslista' }).click(); // Modifiera namnet om det behövs
    await expect(page.getByRole('heading', { name: 'Rumslista' })).toBeVisible();
  });

  // Nytt test: Skapa en ny klient
  test('Skapa en ny klient', async ({ page }) => {
    await page.goto('http://localhost:3000/clients/create');
    await page.locator('input[name="clientName"]').fill('Ny Klient'); // Modifiera namnet vid behov
    await page.locator('input[name="clientEmail"]').fill('nyklient@example.com'); // Modifiera namnet vid behov
    await page.getByRole('button', { name: 'Skapa Klient' }).click();
    await expect(page.getByText('Klienten har skapats!')).toBeVisible(); // Modifiera meddelandet vid behov
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

  // Nytt test: Hämta alla rum
  test('Hämta alla rum', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/rooms');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy(); // Kontrollera att svaret är en array
  });

  // Nytt test: Uppdatera en klient
  test('Uppdatera en klient', async ({ request }) => {
    const response = await request.put('http://localhost:3000/api/clients/1', { // Modifiera ID:t vid behov
      data: {
        "name": "Uppdaterad Klient",
        "email": "uppdateradklient@example.com"
      }
    });
    expect(response.ok()).toBeTruthy();
    const updatedData = await response.json();
    expect(updatedData.name).toBe("Uppdaterad Klient"); // Kontrollera att namnet uppdaterades korrekt
  });
});
