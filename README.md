# Test

A simple Node.js module for managing user profiles, including create, read, **update**, and delete operations.

## Usage

```js
const { createProfile, getProfile, updateProfile, deleteProfile } = require('./userProfile');

// Create
createProfile('u1', { name: 'Alice', email: 'alice@example.com' });

// Read
const profile = getProfile('u1');

// Update
const updated = updateProfile('u1', { name: 'Alice Smith', phone: '555-1234' });

// Delete
deleteProfile('u1');
```

## Tests

```bash
npm test
```
