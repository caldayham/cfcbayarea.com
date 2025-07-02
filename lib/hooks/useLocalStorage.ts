import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state with localStorage persistence
 * Automatically saves state changes to localStorage and restores on component mount
 * 
 * @param key - The localStorage key to store the data under
 * @param initialValue - The initial value to use if no data exists in localStorage
 * @returns [value, setValue, clearValue] - Similar to useState but with persistence
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or return initialValue if none exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error reading localStorage, return initial value
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Set value in both state and localStorage
   * @param value - The new value to store
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * Clear the value from both state and localStorage
   */
  const clearValue = () => {
    try {
      // Reset to initial value
      setStoredValue(initialValue);
      
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, clearValue] as const;
}