import { R } from '../assets/value';
import { default as LC_Storage } from '../library/utils/storage'
import { initialState as initialStateDebug } from '../features/debug/redux/debugReducer'
const DEBUG = 'DEBUG';
const TOKEN = R.strings.TOKEN;
const USER_SAVED = 'USER_SAVED';
const DATA = 'DATA';
const DATA_LOGIN = 'DATA_LOGIN';
const SETTINGS = 'SETTINGS';

export const defaultSettings = {
    bunderVersion: 1,
    offline: {
        province: null
    }
}

const KEYS_LOCALSTORAGE = [
    {
        name: 'DEBUG',
        value: DEBUG,
        default: '{}'
    },
    {
        name: 'TOKEN',
        value: TOKEN,
        default: ''
    },
    {
        name: 'DATA',
        value: DATA,
        default: null
    },
    {
        name: 'USER_SAVED',
        value: USER_SAVED,
        default: null
    },
]

let LocalStorage = {
    allKeys: () => LC_Storage.getAllKeys(),
    set: (key, data, callback) => {
        return new Promise(async (resolve, reject) => {
            await LC_Storage.save(key, data);
            (callback || resolve)(true);
        });
    },
    get: (key, _default, callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.load(key, _default);
            (callback || resolve)(data);
        });
    },
    remove: (key, callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.remove(key);
            (callback || resolve)();
        });
    },
    setDebug: (data, callback) => {
        return new Promise(async (resolve, reject) => {
            await LC_Storage.save(DEBUG, data);
            (callback || resolve)(true);
        });
    },
    getDebug: (callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.load(DEBUG, {});
            data = {
                ...initialStateDebug,
                ...data
            };
            (callback || resolve)(data);
        });
    },
    setToken: (token, callback) => {
        return new Promise(async (resolve, reject) => {
            await LC_Storage.saveString(TOKEN, token);
            (callback || resolve)(true);
        });
    },
    getToken: (callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.loadString(TOKEN, '');
            (callback || resolve)(data);
        });
    },
    setData: (data, callback) => {
        return new Promise(async (resolve, reject) => {
            await LC_Storage.saveString(DATA, data);
            (callback || resolve)(true);
        });
    },
    getData: (callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.loadString(DATA, '');
            (callback || resolve)(data);
        });
    },
    setUserSaved: (user, callback) => {
        return new Promise(async (resolve, reject) => {
            await LC_Storage.save(USER_SAVED, user);
            (callback || resolve)(true);
        });
    },
    getUserSaved: (callback) => {
        return new Promise(async (resolve, reject) => {
            var data = await LC_Storage.load(USER_SAVED, null);
            (callback || resolve)(data);
        });
    },
    setDataLogin: (data, callback) => LocalStorage.set(DATA_LOGIN, data, callback),
    getDataLogin: () => LocalStorage.get(DATA_LOGIN, {}, null),
    setSettings: (data, callback) => LocalStorage.set(SETTINGS, data, callback),
    getSettings: () => LocalStorage.get(SETTINGS, defaultSettings, null),
}

export {
    KEYS_LOCALSTORAGE
}

export default LocalStorage