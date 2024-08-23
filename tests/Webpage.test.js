import {test,expect} from '@playwright/test'

test('This should be running', async () => {

})

test('Should navigate to homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
});
test('Should navigate to founders page', async ({ page }) => {
await page.goto('http://localhost:3000/founder');
});
test('Should navigate to about Design Booking page', async ({ page }) => {
  await page.goto('http://localhost:3000/DesignBooking');
  });

test('Should navigate to Add review page', async ({ page }) => {
await page.goto('http://localhost:3000/Reviews');
      });

// You can use Playwright's device emulation to test your site on different devices.
// Here's an example of how you can add a test to check if your site is mobile-friendly.

test('Should be mobile-friendly', async ({ page }) => {
  const devices = require('@playwright/test').devices;
  const iPhone = devices['iPhone 12'];

  await page.emulate(iPhone);
  await page.goto('http://localhost:3000');

  // Add assertions to verify the mobile-friendliness of your site.
  // For example, you can check if the navigation menu collapses or if the layout adjusts properly.
});
    