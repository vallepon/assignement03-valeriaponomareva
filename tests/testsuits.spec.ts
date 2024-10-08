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
  test('Create a client', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data:{
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }      
    });
    expect (response.ok()).toBeTruthy();    
    // Include the rest of the code...
  });  
  });  
});



