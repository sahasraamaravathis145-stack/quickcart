import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // TODO: Initialize state from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from localStorage
      const item = window.localStorage.getItem(key);
      // Parse or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // TODO: Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}