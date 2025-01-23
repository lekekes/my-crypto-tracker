// playwright.config.js
module.exports = {
  timeout: 30000, // Timeout für jeden Test (optional)
  testDir: './src/test', // Verzeichnis für die Tests
  testMatch: '**/*.playwright.test.ts', // Nur Playwright-Testdateien
  use: {
    browserName: 'firefox', // Verwende Chromium (oder Firefox/Webkit)
    headless: true, // Wenn du Headless testen möchtest (false für sichtbare Tests)
    screenshot: 'only-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
};
