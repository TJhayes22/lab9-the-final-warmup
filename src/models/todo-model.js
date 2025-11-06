/**
 * @fileoverview TodoModel manages the todo list data and business logic.
 * Implements the Observer pattern to allow reactive updates for UI components.
 */

/**
 * Manages a collection of todos, including CRUD operations and state persistence.
 * Notifies subscribers whenever the list changes.
 */
export class TodoModel {
  constructor(storageService) {
    this.storage = storageService;
    this.todos = this.storage.load('items', []);
    this.listeners = [];
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Subscribe to model changes.
   * The listener will be called whenever the todo list changes.
   * @param {Function} listener Callback function to invoke on changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all subscribers of changes to the todo list.
   * @private
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Add a new todo item.
   * Ignores empty or whitespace-only strings.
   * @param {string} text The text of the new todo
   */
  addTodo(text) {
    if (!text || text.trim() === '') {
      return;
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.push(todo);
    this.save();
    this.notify();
  }

  /**
   * Toggle completion status of a todo by its ID.
   * @param {number} id The unique ID of the todo to toggle
   */
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  /**
   * Delete a todo by its ID.
   * @param {number} id The unique ID of the todo to delete
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Update todo text
   * Ignores empty or whitespace-only strings.
   * @param {number} id The unique ID of the todo to update
   * @param {string} newText The new text for the todo
   */
  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (todo && newText && newText.trim() !== '') {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Clear all completed todos from the list.
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }

  /**
   * Clear all todos from the list.
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Get count of active (not completed) todos
   * @type {number}
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Get count of completed todos
   * @type {number}
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Save todos and next available ID to storage.
   * @private
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}
