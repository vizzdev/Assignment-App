---
description: Debug String to Boolean Cast Error
status: in-progress
---

# Debugging "java.lang.String cannot be cast to java.lang.Boolean"

The user is experiencing a crash on Android startup. The error indicates a prop type mismatch (String passed to Boolean prop).

## Plan
- [ ] Simplify `Switch` usage in `edit-subscription.tsx` by removing `trackColor`, `thumbColor`, `ios_backgroundColor`.
- [ ] If error persists, comment out `DateTimePicker`.
- [ ] If error persists, check `app.json` and other configs.
- [ ] Verify fix.
