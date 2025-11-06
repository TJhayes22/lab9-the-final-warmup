import { test, expect } from '@playwright/test';

test('add todo works', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.fill('input[name="todo-input"]', 'Buy milk');
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-item')).toContainText('Buy milk');
});

// Additional end-to-end tests would go here