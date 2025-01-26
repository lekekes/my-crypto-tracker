import { test, expect } from '@playwright/test';

test.describe('All Coins Tests', () => {
  test('Title is "Alle Coins" and Navigation is working', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'Coins' }).click();
    await expect(page).toHaveTitle('Alle Coins');
  });

  test('Searchbar is visible and working', async ({ page }) => {
    await page.goto('http://localhost:3000/all-coins');
    await expect(
      page.getByPlaceholder('Suche nach Name oder Symbol'),
    ).toBeVisible();

    await page.getByPlaceholder('Suche nach Name oder Symbol').click();
    await page
      .getByPlaceholder('Suche nach Name oder Symbol')
      .fill('treeplanting');
    await expect(
      page.getByText(
        '/treeplantingSymbol: TREEDetailsDetails ansehenAuf Merkliste speichern',
      ),
    ).toBeVisible();
  });

  test('Navigation from All Coins to Details Page', async ({ page }) => {
    await page.goto('http://localhost:3000/all-coins');
    await page.getByPlaceholder('Suche nach Name oder Symbol').click();
    await page
      .getByPlaceholder('Suche nach Name oder Symbol')
      .fill('treeplanting');
    await page.getByRole('button', { name: 'Details ansehen' }).click();
    await expect(page).toHaveTitle('Details: treeplanting');
  });
});
