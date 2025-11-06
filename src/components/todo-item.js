/**
 * @fileoverview TodoItem component.
 * Represents an individual todo item.
 * Handles editing, deleting, and toggling completion of a single todo.
 */

import { LitElement, html, css } from 'lit';

/**
 * Represents a single todo item in the list.
 * Provides UI and functionality for editing, deleting, and toggling completion.
 * @extends {LitElement}
 */
export class TodoItem extends LitElement {
  static properties = {
    todo: { type: Object },
    isEditing: { state: true },
    editValue: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      --editbutton-bg: #4CAF50;
      --editbutton-bg-hover: #45a049;
      --deletebutton-bg: #f44336;
      --deletebutton-bg-hover: #da190b;
      --savebutton-bg: #2196F3;
      --savebutton-bg-hover: #0b7dda;
      --cancelbutton-bg: #757575;
      --cancelbutton-bg-hover: #616161;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .todo-item:hover {
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-text {
      flex: 1;
      font-size: 16px;
      color: #333;
      word-break: break-word;
    }

    .todo-text.completed {
      text-decoration: line-through;
      color: #999;
    }

    .edit-input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #667eea;
      border-radius: 4px;
      outline: none;
    }

    .button-group {
      display: flex;
      gap: 8px;
    }

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .edit-btn {
      background: var(--editbutton-bg);
      color: white;
    }

    .edit-btn:hover {
      background: var(--editbutton-bg-hover);
    }

    .delete-btn {
      background: var(--deletebutton-bg);
      color: white;
    }

    .delete-btn:hover {
      background: var(--deletebutton-bg-hover);
    }

    .save-btn {
      background: var(--savebutton-bg);
      color: white;
    }

    .save-btn:hover {
      background: var(--savebutton-bg-hover);
    }

    .cancel-btn {
      background: var(--cancelbutton-bg);
      color: white;
    }

    .cancel-btn:hover {
      background: var(--cancelbutton-bg-hover);
    }
  `;

  /**
   * Initializes the todo item.
   * @constructor
   */
  constructor() {
    super();
    this.isEditing = false;
    this.editValue = '';
  }

  /**
   * Toggles the completion state of the todo.
   * @fires TodoItem#toggle-todo
   */
  handleToggle() {
    this.dispatchEvent(new CustomEvent('toggle-todo', {
      detail: { id: this.todo.id },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Deletes the todo after user confirmation.
   * @fires TodoItem#delete-todo
   */
  handleDelete() {
    if (confirm('Delete this todo?')) {
      this.dispatchEvent(new CustomEvent('delete-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true
      }));
    }
  }

  /**
   * Puts the todo into edit mode and sets the edit input value.
   */
  handleEdit() {
    this.isEditing = true;
    this.editValue = this.todo.text;
  }

  /**
   * Saves the edited todo and exits edit mode.
   * @fires TodoItem#update-todo
   */
  handleSave() {
    if (this.editValue.trim()) {
      this.dispatchEvent(new CustomEvent('update-todo', {
        detail: { id: this.todo.id, text: this.editValue },
        bubbles: true,
        composed: true
      }));
      this.isEditing = false;
    }
  }

  /**
   * Cancels editing and resets the input value.
   */
  handleCancel() {
    this.isEditing = false;
    this.editValue = '';
  }

  /**
   * Handles keyboard events while editing.
   * Enter saves the todo; Escape cancels editing.
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSave();
    } else if (e.key === 'Escape') {
      this.handleCancel();
    }
  }

  /**
   * Renders the todo item template.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    if (this.isEditing) {
      return html`
        <div class="todo-item">
          <input
            class="edit-input"
            type="text"
            .value=${this.editValue}
            @input=${(e) => this.editValue = e.target.value}
            @keydown=${this.handleKeyDown}
            autofocus
          />
          <div class="button-group">
            <button class="save-btn" @click=${this.handleSave}>Save</button>
            <button class="cancel-btn" @click=${this.handleCancel}>Cancel</button>
          </div>
        </div>
      `;
    }

    return html`
      <div class="todo-item">
        <input
          type="checkbox"
          class="checkbox"
          .checked=${this.todo.completed}
          @change=${this.handleToggle}
          aria-label="Toggle todo"
        />
        <span class="todo-text ${this.todo.completed ? 'completed' : ''}">
          ${this.todo.text}
        </span>
        <div class="button-group">
          <button
            class="edit-btn"
            @click=${this.handleEdit}
            ?disabled=${this.todo.completed}
            aria-label="Edit todo">
            Edit
          </button>
          <button
            class="delete-btn"
            @click=${this.handleDelete}
            aria-label="Delete todo">
            Delete
          </button>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('todo-item', TodoItem);