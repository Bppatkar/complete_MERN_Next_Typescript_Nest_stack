import { useState } from "react";

const UseLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorage = (valueOrFunc) => {
    let newValue;
    if (typeof valueOrFunc === "function") {
      newValue = valueOrFunc(localStorageValue);
    } else {
      newValue = valueOrFunc;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    // now mainting the state from value
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorage];
};

export default UseLocalStorage;
