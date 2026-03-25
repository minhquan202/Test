'use strict';

/**
 * In-memory store for user profiles.
 * @type {Map<string, Object>}
 */
const profiles = new Map();

/**
 * Creates a new user profile.
 * @param {string} userId - Unique identifier for the user.
 * @param {Object} data - Profile data.
 * @returns {Object} The created profile.
 */
function createProfile(userId, data) {
  if (!userId) throw new Error('userId is required');
  if (profiles.has(userId)) throw new Error(`Profile already exists for user: ${userId}`);
  const profile = { userId, ...data };
  profiles.set(userId, profile);
  return { ...profile };
}

/**
 * Retrieves a user profile by userId.
 * @param {string} userId - Unique identifier for the user.
 * @returns {Object|null} The profile, or null if not found.
 */
function getProfile(userId) {
  const profile = profiles.get(userId);
  return profile ? { ...profile } : null;
}

/**
 * Updates an existing user profile.
 * @param {string} userId - Unique identifier for the user.
 * @param {Object} updates - Fields to update.
 * @returns {Object} The updated profile.
 */
function updateProfile(userId, updates) {
  if (!userId) throw new Error('userId is required');
  if (!profiles.has(userId)) throw new Error(`Profile not found for user: ${userId}`);
  const existing = profiles.get(userId);
  const updated = { ...existing, ...updates, userId };
  profiles.set(userId, updated);
  return { ...updated };
}

/**
 * Deletes a user profile.
 * @param {string} userId - Unique identifier for the user.
 * @returns {boolean} True if deleted, false if not found.
 */
function deleteProfile(userId) {
  return profiles.delete(userId);
}

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };
