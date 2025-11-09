/**
 * @fileoverview TodoForm component.
 * Provides an input field and submit button for adding new todos.
 * Dispatches a custom `add-todo` event when a valid todo is submitted.
 */

import { LitElement, html, css } from 'lit';

/**
 * Represents the input form for adding new todo items.
 * Handles user input and dispatches events to add todos.
 * @extends {LitElement}
 */
export class TodoForm extends LitElement {
  static properties = {
    inputValue: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 20px;
      --primary-color: #667eea;
      --primary-color-hover: #5568d3;
      --mic-button-bg: #f0f0f0;
      --mic-button-bg-hover: #e0e0e0;
    }

    form {
      display: flex;
      gap: 8px;
    }

    input {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: var(--primary-color);
    }

    button {
      padding: 12px 24px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: var(--primary-color-hover);
    }

    button:active {
      transform: translateY(1px);
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    #mic-button {
    background: var(--mic-button-bg);
    border-radius: 50%;
    padding: 8px 10px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  #mic-button:hover {
    background: var(--mic-button-bg-hover);
  }
  `;

  /**
   * Creates a new TodoForm instance with an empty input value.
   * @constructor
   */
  constructor() {
    super();
    this.inputValue = '';
    this.listening = false;
    this.recognition = null;
  }

  /**
   * Initializes speech recognition if supported by the browser.
   * Sets up event listeners for handling speech results and end events.
   */
  firstUpdated() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript.trim();
      this.inputValue = transcript;
      this.requestUpdate();
    });

    this.recognition.addEventListener('end', () => {
      this.listening = false;
      this.requestUpdate();
    });
  }

  /**
   * Handles the form submission event.
   * Validates input, dispatches `add-todo` event, and clears the input.
   * @param {Event} e - The submit event.
   * @fires TodoForm#add-todo
   */
  handleSubmit(e) {
    e.preventDefault();
    const text = this.inputValue.trim();

    if (text) {
      this.dispatchEvent(new CustomEvent('add-todo', {
        detail: { text },
        bubbles: true,
        composed: true
      }));

      this.inputValue = '';
    }
  }

  /**
   * Updates the local input value as the user types.
   * @param {InputEvent} e - The input event triggered when typing in the text field.
   */
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  /**
   * Handles the microphone button click to start/stop speech recognition.
   * @param {MouseEvent} e - The click event on the microphone button.
   */
  handleMicClick(e) {
    e.preventDefault();
    if (!this.recognition) return;

    if (this.listening) {
      this.recognition.stop();
      this.listening = false;
    } else {
      this.recognition.start();
      this.listening = true;
    }
  }

  /**
   * Renders the form UI for adding new todos.
   * @returns {import('lit').TemplateResult} The Lit HTML template for the form.
   */
  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          name="todo-input"
          type="text"
          placeholder="What needs to be done?"
          .value=${this.inputValue}
          @input=${this.handleInput}
          aria-label="New todo"
          autofocus
        />
        <button 
          type="submit" 
          id="mic-button"
          @click=${this.handleMicClick}
          titile="Add by voice"
        >
          🎤
        </button>
        <button type="submit" ?disabled=${!this.inputValue.trim()}>
          Add
        </button>
      </form>
    `;
  }
}

// Define the custom element
customElements.define('todo-form', TodoForm);