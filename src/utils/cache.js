import localforage from "localforage"

export const loadCachedItem = async (key) => {
  return await localforage.getItem(key)
}

export const cacheItem = async (key, item) => {
  await localforage.setItem(key, item)
}

export const setItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
}

export const removeItem = key => {
  localStorage.removeItem(key);
}

export const getItem = key => {
  return localStorage.getItem(key);
}
