/**
 * @fileoverview Main TodoApp component.
 * Coordinates between the TodoModel (data) and UI components (todo-form, todo-list).
 * Implements core app logic including add, update, toggle, and clear actions.
 */

import { LitElement, html, css } from 'lit';
import { TodoModel } from '../models/todo-model.js';
import { StorageService } from '../services/storage-service.js';
import './todo-form.js';
import './todo-list.js';

/**
 * TodoApp - Main application component, Controller in MVC pattern
 * Coordinates between Model and View components
 * @extends {LitElement}
 */
export class TodoApp extends LitElement {
  static properties = {
    todos: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      --clearbutton-bg: #ff9800;
      --clearbutton-bg-hover: #f57c00;
      --clearall-bg: #f44336;
      --clearall-bg-hover: #da190b;
      --stat-color: #3f51b5;
    }

    .app-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 32px;
      min-height: 400px;
    }

    h1 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 32px;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--stat-color);
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .actions {
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }

    button {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-completed {
      background: var(--clearbutton-bg);
      color: white;
    }

    .clear-completed:hover {
      background: var(--clearbutton-bg-hover);
    }

    .clear-all {
      background: var(--clearall-bg);
      color: white;
    }

    .clear-all:hover {
      background: var(--clearall-bg-hover);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  `;

  /**
   * Constructor - initializes the TodoApp component, sets up model, storage, and subscriptions
   * @constructor
   */
  constructor() {
    super();
    this.storageService = new StorageService();
    this.model = new TodoModel(this.storageService);
    this.todos = [...this.model.todos];

    // Subscribe to model changes and update local state
    this.model.subscribe(() => {
      this.todos = [...this.model.todos];
    });
  }

  /**
   * Handles adding a new todo item from the todo-form component.
   * @param {CustomEvent<{ text: string }>} e - Custom event containing the todo text.
   */
  handleAddTodo(e) {
    this.model.addTodo(e.detail.text);
  }

  /**
   * Handles toggling the completion state of a todo item.
   * @param {CustomEvent<{ id: number }>} e - Custom event containing the todo ID.
   */
  handleToggleTodo(e) {
    this.model.toggleComplete(e.detail.id);
    this.todos = [...this.model.todos];
  }

  /**
   * Handles deleting a todo item.
   * @param {CustomEvent<{ id: number }>} e - Custom event containing the todo ID.
   */
  handleDeleteTodo(e) {
    this.model.deleteTodo(e.detail.id);
  }

  /**
   * Handles updating a todo item’s text.
   * @param {CustomEvent<{ id: number, text: string }>} e - Custom event with updated text and ID.
   */
  handleUpdateTodo(e) {
    this.model.updateTodo(e.detail.id, e.detail.text);
  }

  /**
   * Clears all completed todos after user confirmation.
   */
  handleClearCompleted() {
    if (confirm('Clear all completed todos?')) {
      this.model.clearCompleted();
    }
  }

  /**
   * Clears all todos after user confirmation.
   * This action cannot be undone.
   */
  handleClearAll() {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
    }
  }

  /**
   * Renders the entire TodoApp UI.
   * Includes stats, form, todo list, and action buttons.
   * @returns {import('lit').TemplateResult} The rendered HTML template.
   */
  render() {
    return html`
      <div class="app-container">
        <h1>My Tasks</h1>
        <p class="subtitle">Stay organized and productive</p>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${this.todos.length}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.activeCount}</div>
            <div class="stat-label">Active</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.completedCount}</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>

        <todo-form
          @add-todo=${this.handleAddTodo}>
        </todo-form>

        <todo-list
          .todos=${this.todos}
          @toggle-todo=${this.handleToggleTodo}
          @delete-todo=${this.handleDeleteTodo}
          @update-todo=${this.handleUpdateTodo}>
        </todo-list>

        <div class="actions">
          <button
            class="clear-completed"
            @click=${this.handleClearCompleted}
            ?disabled=${this.model.completedCount === 0}>
            Clear Completed
          </button>
          <button
            class="clear-all"
            @click=${this.handleClearAll}
            ?disabled=${this.todos.length === 0}>
            Clear All
          </button>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('todo-app', TodoApp);