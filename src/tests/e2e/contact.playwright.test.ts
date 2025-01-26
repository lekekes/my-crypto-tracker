import { test, expect } from '@playwright/test';

test.describe('Contact Tests', () => {
  test('Title is "Kontakt" and Navigation is working', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'Konakt' }).click();
    await expect(page).toHaveTitle('Kontakt');
  });

  test('Sending form is working', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    await page.getByPlaceholder('Vorname').click();
    await page.getByPlaceholder('Vorname').fill('Max');
    await page.getByPlaceholder('Vorname').press('Tab');
    await page.getByPlaceholder('Nachname').fill('Mustermann');
    await page.getByPlaceholder('Nachname').press('Tab');
    await page.getByPlaceholder('E-Mail-Adresse').fill('max@mustermann.de');
    await page.getByPlaceholder('E-Mail-Adresse').press('Tab');
    await page.getByPlaceholder('Telefonnummer').fill('123456');
    await page.getByPlaceholder('Nachricht').click();
    await page
      .getByPlaceholder('Nachricht')
      .fill('Das ist eine Testnachricht!');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Nachricht gesendetVielen Dank')).toBeVisible();
  });

  // Wird schon über Jest Unit Test gestestet, aber wir wollten trotzdem mal mit Playwright validieren
  test('Form validation is working', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    await page.getByPlaceholder('Vorname').fill('122');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Der Vorname darf nur')).toBeVisible();
  });
});
