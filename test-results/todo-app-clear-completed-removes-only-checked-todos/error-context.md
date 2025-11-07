# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e4]:
    - heading "My Tasks" [level=1] [ref=e5]
    - paragraph [ref=e6]: Stay organized and productive
    - generic [ref=e7]:
      - generic [ref=e8]:
        - generic [ref=e9]: "2"
        - generic [ref=e10]: Total
      - generic [ref=e11]:
        - generic [ref=e12]: "1"
        - generic [ref=e13]: Active
      - generic [ref=e14]:
        - generic [ref=e15]: "1"
        - generic [ref=e16]: Completed
    - generic [ref=e18]:
      - textbox "New todo" [ref=e19]:
        - /placeholder: What needs to be done?
      - button "Add" [disabled] [ref=e20]
    - generic [ref=e22]:
      - generic [ref=e24]:
        - checkbox "Toggle todo" [checked] [ref=e25] [cursor=pointer]
        - generic [ref=e26]: Todo A
        - generic [ref=e27]:
          - button "Edit todo" [ref=e28] [cursor=pointer]: Edit
          - button "Delete todo" [ref=e29] [cursor=pointer]: Delete
      - generic [ref=e31]:
        - checkbox "Toggle todo" [ref=e32] [cursor=pointer]
        - generic [ref=e33]: Todo B
        - generic [ref=e34]:
          - button "Edit todo" [ref=e35] [cursor=pointer]: Edit
          - button "Delete todo" [ref=e36] [cursor=pointer]: Delete
    - generic [ref=e37]:
      - button "Clear Completed" [ref=e38] [cursor=pointer]
      - button "Clear All" [ref=e39] [cursor=pointer]
    - generic [ref=e40]: "Lab 9: The final battle!"
```