import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../../src/models/todo-model.js';

/**
 * Mock storage service for testing
 */
class MockStorage {
  constructor() {
    this.data = {};
  }

  save(key, value) {
    this.data[key] = value;
  }

  load(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  remove(key) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
}

// Test for adding a new todo
test('TodoModel - addTodo should add a new todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('Test todo');

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);
});

// Test for adding empty todos
test('TodoModel - should not add empty todos', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('');
  model.addTodo('   ');

  assert.strictEqual(model.todos.length, 0);
});

// Test for toggleComplete method
test('TodoModel - toggleComplete should flip the completion state', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  model.addTodo('Task');
  
  const id = model.todos[0].id;
  model.toggleComplete(id);
  
  assert.strictEqual(model.todos[0].completed, true);
  
  model.toggleComplete(id);
  assert.strictEqual(model.todos[0].completed, false);
});

// Test for clearCompleted method
test('TodoModel - clearCompleted should remove only completed todos', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  
  model.addTodo('Task 1');
  model.addTodo('Task 2');
  model.toggleComplete(model.todos[0].id);
  
  model.clearCompleted();
  
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].completed, false);
});

// Test for deleteTodo and updateTodo methods
test('TodoModel - deleteTodo should remove the correct todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  model.addTodo('A');
  model.addTodo('B');

  const idToDelete = model.todos[0].id;
  model.deleteTodo(idToDelete);

  assert.strictEqual(model.todos.length, 1);
  assert.notStrictEqual(model.todos[0].id, idToDelete);
});

// Test for updateTodo method
test('TodoModel - updateTodo should change todo text', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  model.addTodo('Old');

  const id = model.todos[0].id;
  model.updateTodo(id, 'New');

  assert.strictEqual(model.todos[0].text, 'New');
});