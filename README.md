## Edits I Made
- Added CSS variables (in main styles.css)
- Created a .gitignore file
- Set up eslint for code formatting
- Created e2e tests using Playwright
- Made detailed JSDoc comments (will generate docs with these)
- Speech to text button using built in API

### Isues to fix:
- Weird visual bug when hovering over todo items in todo list
    - Solution: removed transformation in todo-item hover, just kept box-shadow when hovering.
- Weird behavior when marking 
something as complete and clearing completed tasks (checked but it says 2 are still active)
    - Solution: used lit function `repeat` to ensure stable DOM identity for each todo item in the todo list, makes sure no checkboxes are "borrowed". Made edit in `todo-list.js` under the `render()` method where individual todos are rendered. 

### TODO: 
- ADR documenting the choice of why one might use Lit or maybe we shouldn't use it!
- A pipeline that runs tests, docs, linting, etc. with Github actions when you push and deploys to either Cloudflare, Netlify, or other host as you see fit
- Write good tests: e2e and unit tests
- Add one new feature: dark mode toggle, ...


### Isssues:
- Some playwright tests were not working because the dialog prompt would pop up 
asking user if they are sure they want to clear completed todos, but I did not handle that in the playwright test.