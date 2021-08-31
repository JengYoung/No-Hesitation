const storage = window.localStorage;

/**
 * @description getItem from localStorage by key
 * @param {*} key
 * @param {*} defaultValue
 * @returns value if value is not null else return defaultValue
 */
export const getItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

/**
 * @description setItem from localStorage by key
 * @param {*} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
