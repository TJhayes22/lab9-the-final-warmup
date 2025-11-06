/**
 * @fileoverview StorageService handles localStorage operations for the TODO app.
 * Provides a simple interface for saving, loading, removing, and clearing app-specific data.
 */

/**
 * StorageService - Handles localStorage operations for the TODO app
 */
export class StorageService {
  /**
   * Creates a new StorageService instance.
   * @param {string} [storageKey='todos'] The base key for storing app data in localStorage
   */
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
  }

  /**
   * Save data to localStorage.
   * @param {string} key The key to save the data under (app-specific key appended automatically)
   * @param {*} data The data to store (will be JSON-stringified)
   */
  save(k, d) {
    try {
      const fk = `${this.storageKey}_${k}`;
      localStorage.setItem(fk, JSON.stringify(d));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  /**
   * Load data from localStorage.
   * @template T
   * @param {string} key The key to retrieve the data from (app-specific key appended automatically)
   * @param {T} [defaultValue=null] Value to return if key does not exist or parsing fails
   * @returns {T|null} Parsed data from localStorage or the default value
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove single item from localStorage.
   * @param {string} k The key of the item to remove (app-specific key appended automatically)
   */
  remove(k) {
    try {
      const fullK = `${this.storageKey}_${k}`;
      localStorage.removeItem(fullK);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  }

  /**
   * Clear all localStorage items for this app.
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}