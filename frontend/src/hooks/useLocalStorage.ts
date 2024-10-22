import { useState } from "react";
import { KEY_TOKEN } from "../utils/globalVariables";

export function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  // Створюємо локальний стан для токена
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialValue;
    }
  });

  // Функція для збереження значення
  const setValue = (value: string) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
      setStoredValue(value);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export const useTokenLocalStorage = () => {
  return useLocalStorage(KEY_TOKEN, '');
};
