export function debugForceUpdate(obj, isSaveLocal) {
    isSaveLocal = isSaveLocal == null ? false : isSaveLocal;
    return {
        type: 'debugForceUpdate',
        obj,
        isSaveLocal
    }
}
export function debugAddApi(obj) {
    return {
        type: 'debugAddApi',
        obj
    }
}
export function debugEditApi(obj) {
    return {
        type: 'debugEditApi',
        obj
    }
}