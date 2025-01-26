import { test, expect } from '@playwright/test';

test.describe('Detailspage Tests', () => {
  test('Title is "Detailseite" and Navigation is working', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'Detailseite' }).click();
    await expect(page).toHaveTitle('Details: bitcoin');
  });

  test('Charts are visible', async ({ page }) => {
    await page.goto('http://localhost:3000/coin-details/bitcoin');
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Preisverlauf1 Jahr$/ })
        .first(),
    ).toBeVisible();
    await expect(
      page.locator('div').filter({ hasText: /^Handelsvolumen letzte 7 Tage$/ }),
    ).toBeVisible();
    await expect(page.getByText('KennzahlenAktueller Preis$3.')).toBeVisible();
  });

  test('Changing coin is working', async ({ page }) => {
    await page.goto('http://localhost:3000/coin-details/bitcoin');
    await page.locator('#react-select-3-input').fill('ethereum');
    await page.getByRole('option', { name: 'Ethereum (ETH)' }).click();
    await expect(page).toHaveTitle('Details: ethereum');
  });
});
