# ADR: Choice of Lit for Todo App

## Title: Use of Lit for Component-Based Todo App

### Status: **Accepted**

### Context:

- This project is a Todo app with multiple interactive UI components (todo-app, todo-list, todo-item, todo-form).

- The app requires dynamic rendering (adding/removing todos, marking as complete), reactivity, and encapsulated styles.

### Alternatives considered:

- Vanilla JS with manual DOM manipulation – simple, but harder to maintain, especially with reactive UI and multiple components.

- React – popular, robust, but heavier setup and build tooling for a small project.

- Lit – lightweight, Web Components-based, supports reactive properties and templating with minimal boilerplate.

### Decision:

Chose Lit for this project because:

- It allows encapsulated, reusable components with scoped styles.

- Reactive rendering is easy with .properties and repeat directive.

- Lightweight and minimal dependency overhead.

- Simplifies DOM identity issues (like checkboxes retaining state when list changes).

### Consequences:

- Pros: Clean, modular components; reactive updates; easy to maintain and extend.

- Cons: Slight learning curve for newcomers; less out-of-the-box ecosystem compared to React or Vue.

- Future: Can replace Lit with another framework if scaling requirements change or if SEO/server-side rendering becomes critical.