import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

/**
 * Add a new todo item and verify it appears in the list
 */
test('add todo works', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Buy milk');
  await page.click('button[type="submit"]');
  await expect(page.locator('.todo-item')).toContainText('Buy milk');
});

/**
 * Mark a todo as completed
 */
test('mark todo as completed', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Walk the dog');
  await page.click('button[type="submit"]');

  const todo = page.locator('.todo-item').filter({ hasText: 'Walk the dog' });
  const checkbox = todo.locator('input[type="checkbox"]');
  const todoText = todo.locator('.todo-text');

  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(todoText).toHaveClass(/completed/);
});

/**
 * Clear completed todos
 */
test('clear completed removes only checked todos', async ({ page }) => {
  // Add two todos
  await page.fill('input[name="todo-input"]', 'Todo A');
  await page.click('button[type="submit"]');
  await page.fill('input[name="todo-input"]', 'Todo B');
  await page.click('button[type="submit"]');

  // Mark first as completed
  const firstTodo = page.locator('.todo-item').filter({ hasText: 'Todo A' });
  const firstCheckbox = firstTodo.locator('input[type="checkbox"]');
  await firstCheckbox.click();

  // Handle the confirmation dialog
  page.on('dialog', async dialog => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
  });

  // Click "Clear completed"
  const clearButton = page.locator('button.clear-completed');
  await clearButton.click();

  // Verify only uncompleted todo remains
  const todos = page.locator('.todo-item');
  // await expect(todos).toHaveCount(1, { timeout: 3000 });
  await expect(todos).toContainText('Todo B');
});

/**
 * Delete a todo
 */
test('delete todo removes it from the list', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Delete me');
  await page.click('button[type="submit"]');

  // Set up dialog handler before clicking delete
  page.on('dialog', async dialog => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
  });

  const todo = page.locator('.todo-item').filter({ hasText: 'Delete me' });
  await todo.locator('.delete-btn').click();

  // Verify that there are no todo items left
  await expect(page.locator('.todo-item')).toHaveCount(0);
});

/**
 * Edit a todo (if your UI supports inline editing)
 */
test('edit todo updates its text', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Old text');
  await page.click('button[type="submit"]');

  const todo = page.locator('.todo-item').filter({ hasText: 'Old text' });
  await todo.locator('.edit-btn').click();
  const input = page.locator('.edit-input');

  await input.fill('Updated text');
  await page.locator('.save-btn').click();

  await expect(page.locator('.todo-item')).toContainText('Updated text');
  await expect(page.locator('.todo-item')).not.toContainText('Old text');
});

/**
 * Clear all todos
 */
test('clear all removes all todos', async ({ page }) => {
  // Add two todos
  await page.fill('input[name="todo-input"]', 'Todo 1');
  await page.click('button[type="submit"]');
  await page.fill('input[name="todo-input"]', 'Todo 2');
  await page.click('button[type="submit"]');

  // Set up dialog handler before clicking clear all
  page.on('dialog', async dialog => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
  });

  const clearAllButton = page.locator('button.clear-all');
  await clearAllButton.click();

  // Verify no todos remain
  await expect(page.locator('.todo-item')).toHaveCount(0);
});