export const loadCachedItem = async (key) => {
    return await sessionStorage.getItem(key)
}

export const cacheItem = async (key, item) => {
    await sessionStorage.setItem(key, item)
}

export const setItem = (key, item) => {
    sessionStorage.setItem(key, JSON.stringify(item));
}

export const removeItem = key => {
    sessionStorage.removeItem(key);
}

export const getItem = key => {
    return sessionStorage.getItem(key);
}
