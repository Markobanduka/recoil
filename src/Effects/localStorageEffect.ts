import { AtomEffect } from "recoil";

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValues = localStorage.getItem(key);
    if (savedValues !== null) {
      setSelf(JSON.parse(savedValues));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
