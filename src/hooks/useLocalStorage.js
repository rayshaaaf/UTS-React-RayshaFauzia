import { useState, useEffect } from 'react';

/**
 * Custom hook useLocalStorage untuk persistensi data (Favorit, Keranjang, Komentar, Notifikasi, Riwayat)
 * @param {string} key - LocalStorage key
 * @param {any} initialValue - Nilai default
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
