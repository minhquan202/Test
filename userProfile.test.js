'use strict';

const assert = require('assert');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('./userProfile');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// Reset module state between test groups by requiring a fresh instance
// (re-require workaround: we use unique IDs per test to avoid conflicts)

console.log('User Profile Tests');

test('createProfile creates a profile with the given data', () => {
  const profile = createProfile('u1', { name: 'Alice', email: 'alice@example.com' });
  assert.strictEqual(profile.userId, 'u1');
  assert.strictEqual(profile.name, 'Alice');
  assert.strictEqual(profile.email, 'alice@example.com');
});

test('getProfile returns the profile for a known user', () => {
  const profile = getProfile('u1');
  assert.strictEqual(profile.userId, 'u1');
  assert.strictEqual(profile.name, 'Alice');
});

test('getProfile returns null for an unknown user', () => {
  const profile = getProfile('unknown');
  assert.strictEqual(profile, null);
});

test('updateProfile updates specified fields', () => {
  const updated = updateProfile('u1', { name: 'Alice Smith', phone: '555-1234' });
  assert.strictEqual(updated.userId, 'u1');
  assert.strictEqual(updated.name, 'Alice Smith');
  assert.strictEqual(updated.email, 'alice@example.com');
  assert.strictEqual(updated.phone, '555-1234');
});

test('updateProfile persists changes when retrieved later', () => {
  const profile = getProfile('u1');
  assert.strictEqual(profile.name, 'Alice Smith');
  assert.strictEqual(profile.phone, '555-1234');
});

test('updateProfile does not allow changing the userId', () => {
  const updated = updateProfile('u1', { userId: 'hacker', name: 'Bob' });
  assert.strictEqual(updated.userId, 'u1');
});

test('updateProfile throws for a non-existent user', () => {
  assert.throws(() => updateProfile('nobody', { name: 'X' }), /Profile not found/);
});

test('updateProfile throws when userId is missing', () => {
  assert.throws(() => updateProfile('', { name: 'X' }), /userId is required/);
});

test('createProfile throws when userId is missing', () => {
  assert.throws(() => createProfile('', { name: 'X' }), /userId is required/);
});

test('createProfile throws when profile already exists', () => {
  assert.throws(() => createProfile('u1', { name: 'Duplicate' }), /already exists/);
});

test('deleteProfile removes the profile', () => {
  assert.strictEqual(deleteProfile('u1'), true);
  assert.strictEqual(getProfile('u1'), null);
});

test('deleteProfile returns false for non-existent user', () => {
  assert.strictEqual(deleteProfile('nobody'), false);
});

console.log(`\n${passed} passing, ${failed} failing`);
if (failed > 0) process.exit(1);
