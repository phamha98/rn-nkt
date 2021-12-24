import AsyncStorage from '@react-native-community/async-storage';

export const getAllKeys = async () => await AsyncStorage.getAllKeys();
/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string, _default?: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return _default;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string, _default?: Object) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data == null ? _default : JSON.parse(data);
  } catch {
    return _default;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch { }
}

/**
 * Burn it all to the ground.
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch { }
}

export default {
  loadString,
  saveString,
  load,
  save,
  remove,
  clear,
  getAllKeys
}
