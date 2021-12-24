export * from './createFormData/index';
export * from './customHook/index';
export * from './handleError/index';
export * from './handleMsg/index';
export * from './method/index';
export * from './padEnd/index';
export * from './padStart/index';
export * from './handleNumberNotify/index';
export * from './handleDateToString/index';
export * from './requestPermission/index';
export * from './useConsole/index';
export function _sleep(ms: number, timer?: void) {
    return new Promise((resolve, reject) => {
        const _timer = setTimeout(resolve, ms);
        timer != null && timer(_timer)
    });
}

export const asyncFunc: Promise = async (callback: (resolve: (param) => void, reject: (error) => void) => void) => {
    return new Promise((resolve, reject) => {
        callback(resolve, reject)
    })
}
// export * from './handleLanguage/index';
