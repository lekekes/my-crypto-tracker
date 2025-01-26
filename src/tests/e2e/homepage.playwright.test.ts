import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('Title is "Startseite"', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle('Startseite');
  });

  test('Navbar is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const navbar = page.getByRole('navigation');
    await expect(navbar).toBeVisible();
  });

  test('Dark mode toggles correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const button = page.getByRole('navigation').getByRole('button');

    await expect(button).toBeVisible();

    const initialBackground = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );

    await button.click();

    await page.waitForTimeout(300); // CSS-Übergangsdauer

    const darkModeBackground = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(darkModeBackground).not.toBe(initialBackground);

    await button.click();

    await page.waitForTimeout(300);

    const revertedBackground = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(revertedBackground).toBe(initialBackground);
  });

  test('Navigation from Card to Details Page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('.rounded').first().click();
    await expect(page).toHaveTitle('Details: bitcoin');
  });

  test('Saving Coin to Watchlist is working properly', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('.absolute > .svg-inline--fa > path').first().click();
    await page.getByRole('link', { name: 'Merkliste' }).click();
    await expect(page.locator('canvas')).toBeVisible();
  });
});
