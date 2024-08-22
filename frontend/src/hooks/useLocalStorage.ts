import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  startValue: T
): [T, (a: T) => void] {
  const [stateData, setStateData] = useState(() => {
    const data = window.localStorage.getItem(key);

    if (!data) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });

  const save = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStateData(value);
  };

  return [stateData, save];
}
