import { test, expect } from '@playwright/test';

test.describe('Front-end tests', () => {
  test('Log in and log out', async ({ page }) => {
    await page.goto('http://localhost:3000/login/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview'})).toBeVisible();
    
    //Logga ut
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
    
    test('Create client', async ({ page }) => {
      await page.goto('http://localhost:3000/login/');
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
      await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
      await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForTimeout(10000);
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview'})).toBeVisible();
    
      await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
    
      await page.getByRole('link', { name: 'Create Client' }).click();
    
      await expect(page.getByRole('heading', { name: 'New Client'})).toBeVisible();
      await page.fill('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]', "Lena Handen");
      await page.fill('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]', "Lena@Handen.se");
      await page.fill('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]', "12345678");
      await page.getByText('Save').click()
      await expect(page.getByRole('heading', { name: 'Lena Handen'})).toBeVisible();
    });

    test.describe('Backend tests', () => {
      test('Create a room', async ({ request }) => {
        // Logga in och hämta token
        const loginResponse = await request.post('http://localhost:3000/api/login', {
          data: {
            "username": `${process.env.TEST_USERNAME}`,
            "password": `${process.env.TEST_PASSWORD}`
          }
        });
        expect(loginResponse.ok()).toBeTruthy();
    
        // Extrahera token från svaret
        const jsonResponse = await loginResponse.json();
        const accessToken = jsonResponse.token;
        const username = process.env.TEST_USERNAME;
        // Skapa ett nytt rum med token i headers
        const createRoomResponse = await request.post('http://localhost:3000/api/room/new', {
          data: {
            number: 1,
            floor: 1,
            price:150,
            available: true,
            features:'sea view',
            category:'single'
          
          },
          headers: {
            'x-user-auth': JSON.stringify({
              username: username,
              token: accessToken
            }),
            'Content-Type': 'application/json'
          }
        });
    
        expect(createRoomResponse.ok()).toBeTruthy();
        const responseBody = await createRoomResponse.json();
      });
    });


  // Hämta access-token och gör en DELETE-begäran för att ta bort en klient
  test('Delete a room', async ({ request }) => {
    // Logga in för att få access-token
    const loginResponse = await request.post('http://localhost:3000/api/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
      }
    });
    
    expect(loginResponse.ok()).toBeTruthy();
    const jsonResponse = await loginResponse.json();
    const accessToken = jsonResponse.token;
    const username = process.env.TEST_USERNAME;

    // Ange id för den klient som ska raderas
    const clientIdToDelete = 2; // Ändra detta till ett giltigt klient-ID
    
    // Gör DELETE-begäran
    const deleteResponse = await request.delete('http://localhost:3000/api/room/2', {
      headers: {
        'x-user-auth': JSON.stringify({
          username: username,
          token: accessToken
        }),
        'Content-Type': 'application/json'
      }
    });
    
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200); // Kontrollera att statusen är 200 eller den status du förväntar dig vid framgång
    
    // Validera att klienten verkligen har tagits bort genom att försöka hämta klienten igen
    const checkResponse = await request.get('http://localhost:3000/api/room/2', {
      headers: {
        'x-user-auth': JSON.stringify({
          username: username,
          token: accessToken
        }),
        'Content-Type': 'application/json'
      }
    });

    expect(checkResponse.status()).toBe(401); // Förvänta dig 404 om klienten har raderats
  });
  
  // Ditt tidigare GET-test kan fortsätta här...
});


