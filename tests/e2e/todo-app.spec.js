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
  await expect(todoText).toHaveClass(/completed/, { timeout: 2000 });
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
  const firstTodo = page.locator('.todo-item').first();
  await firstTodo.locator('input[type="checkbox"]').check();

  // Click "Clear completed"
  await page.click('button.clear-completed');

  // Verify only uncompleted todo remains
  const todos = page.locator('.todo-item');
  await expect(todos).toHaveCount(1);
  await expect(todos).toContainText('Todo B');
});

/**
 * Delete a todo
 */
test('delete todo removes it from the list', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Delete me');
  await page.click('button[type="submit"]');

  const todo = page.locator('.todo-item', { hasText: 'Delete me' });
  await todo.locator('.delete-button').click();

  await expect(page.locator('.todo-item')).not.toContainText('Delete me');
});

/**
 * Edit a todo (if your UI supports inline editing)
 */
test('edit todo updates its text', async ({ page }) => {
  await page.fill('input[name="todo-input"]', 'Old text');
  await page.click('button[type="submit"]');

  const todo = page.locator('.todo-item').filter({ hasText: 'Old text' });
  await todo.dblclick(); // simulate entering edit mode
  const input = todo.locator('input.edit');

  await input.fill('Updated text');
  await input.press('Enter');

  await expect(page.locator('.todo-item')).toContainText('Updated text');
  await expect(page.locator('.todo-item')).not.toContainText('Old text');
});