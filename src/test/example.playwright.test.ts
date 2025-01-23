// tests/pages.test.ts
const { test, expect } = require('@playwright/test');

const pages = [
    '/',
    '/about',
    '/contact',
    '/news',
    '/coin-details',
    '/all-coins',
    '/coin-details/bitcoin'
];

pages.forEach((page) => {
    test(`Page ${page} should have correct title`, async ({ page: browserPage }) => {
        await browserPage.goto(`http://localhost:3000${page}`);
        const title = await browserPage.title();
        expect(title).not.toBe('');  // Überprüfe, dass der Seitentitel nicht leer ist
        expect(title).not.toContain('404');  // Überprüfe, dass der Seitentitel kein '404' enthält
    });
});// tests/example.spec.js

