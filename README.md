# Todo App with Lit

A modern Todo app built using **Lit** with component-based architecture, E2E testing, and speech-to-text support.

## Live Deployment

Check out the app live [here](https://lab9-todo-app.tjhayes2224.workers.dev/)

## Project Overview

This project is a Todo List web app where users can:

- Add, edit, and delete todos
- Mark todos as completed
- Clear completed tasks
- Use speech-to-text for quick todo entry
- Track statistics (total, active, completed)

The app is built entirely with **Lit Elements**, leveraging reactive rendering and component-based architecture for modularity and maintainability.

---

## ADR
Find the ADR [here](/adr.md)

---

## Features

- **CRUD functionality**: Create, read, update, and delete todos
- **Speech-to-text input**: Add todos using your voice
- **Statistics display**: Total, active, and completed todos
- **Playwright e2e tests**: Full end-to-end test coverage
- **Unit tests**: Ensure model logic correctness
- **ESLint integration**: Consistent code formatting
- **Detailed JSDoc comments**: Easy to understand and generate documentation
- **Dark theme-inspired UI**: Sleek black and grey gradient background

---

## Fixes and Improvements

During development, several issues were addressed:

1. **Todo completion and clearing bug**:  
   - Problem: Marking a todo as completed and clearing completed tasks sometimes left the DOM in an inconsistent state.  
   - Solution: Updated `todo-list.js` to use Lit’s `repeat()` function in the `render()` method. This ensures stable DOM identity for each todo and prevents checkboxes from being "borrowed".

2. **Hover visual bug**:  
   - Problem: Hovering over todo items caused unwanted transformations.  
   - Solution: Removed the transformation and kept only a subtle `box-shadow` for hover states in `todo-item.js`.

3. **Playwright tests handling**:  
   - Problem: Some tests failed because confirmation dialogs were not handled.  
   - Solution: Adjusted tests to skip or handle dialogs appropriately and ensured browser dependencies were installed in CI workflows.

---

## Styling

The app features a **sleek dark theme** with:

- **Background gradient**: `linear-gradient(145deg, #3a3a3a, #0f0f0f)`  
- **Hover effects**: Subtle box shadows on todo items  
- **Mic button**: Custom button for speech-to-text input  

CSS variables were added to make theme adjustments easier in the future.

---

## Documentation 

- All components and models include **detailed JSDoc comments**.
- Documentation can be generated via:
```bash
npm run docs
```

---

## Testing
- Unit tests: Validate model logic (tests/unit/todo-model.test.js)
- End-to-end tests: Validate UI and interaction using Playwright (tests/e2e/todo-app.spec.js)
- Run tests locally with:
```bash
npm run test
```
- CI/CD workflow is configured to automatically run tests, linting, and documentation generation on pushes to main.

---

## File Structure
```
LAB9-1/
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ docs/
├─ node_modules/
├─ src/
│  ├─ components/
│  │  ├─ todo-app.js
│  │  ├─ todo-form.js
│  │  ├─ todo-item.js
│  │  └─ todo-list.js
│  ├─ models/
│  │  └─ todo-model.js
│  ├─ services/
│  │  └─ storage-service.js
├─ tests/
│  ├─ e2e/
│  │  └─ todo-app.spec.js
│  └─ unit/
│     └─ todo-model.test.js
├─ index.html
├─ styles.css
├─ README.md
├─ adr.md
├─ jsdoc.json
├─ package.json
├─ package-lock.json
├─ playwright.config.js
├─ vite.config.js
└─ wrangler.jsonc
```

## Getting started (locally)
1. Clone the repository:
```bash
git clone https://github.com/TJhayes22/lab9-the-final-warmup.git
```

2. Install dependencies
```bash
npm ci
```

3. Run the app locally:
```bash
npm run dev
```

---

## Usage
- Add todos in the input field
- Use the microphone button to add todos via speech
- Click checkbox to mark complete
- Use "Clear Completed" to remove completed todos
- Use "Clear all" to remove all todos
- Edit a todo inline by clicking the edit icon
- Delete todos with the delete button