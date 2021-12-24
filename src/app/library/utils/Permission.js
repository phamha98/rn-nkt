import { Platform } from 'react-native';
import {
    request as requestRNP,
    requestMultiple as requestMultipleRNP,
    check as checkRNP,
    PERMISSIONS as PERMISSIONS_RNP,
    RESULTS,
    checkMultiple as checkMultipleRNP,
    openSettings
} from 'react-native-permissions';
const PERMISSIONS = {
    LOCATION_WHEN_IN_USE: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS_RNP.IOS.LOCATION_WHEN_IN_USE
    }),
    LOCATION_ALWAYS: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.ACCESS_BACKGROUND_LOCATION,
        ios: PERMISSIONS_RNP.IOS.LOCATION_ALWAYS
    }),
    CAMERA: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.CAMERA,
        ios: PERMISSIONS_RNP.IOS.CAMERA
    }),
    SELECT_IMAGE: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS_RNP.IOS.PHOTO_LIBRARY
    }),
    SAVE_IMAGE: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS_RNP.IOS.PHOTO_LIBRARY
    }),
    AUDIO: Platform.select({
        android: PERMISSIONS_RNP.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS_RNP.IOS.MICROPHONE
    }),
}

const checkMultiple = (_permissions) => {
    return new Promise((resolve, reject) => {
        checkMultipleRNP(_permissions).then((status) => {
            var obj = {};
            _permissions.map((per, index) => {
                obj[per] = status[per]
            });
            resolve(obj);
        });
    });
}

const check = (_permission) => {
    return checkRNP(_permission);
}

const requestMultiple = (_permissions) => {
    return new Promise((resolve, reject) => {
        requestMultipleRNP(_permissions).then((status) => {
            var obj = {};
            _permissions.map((per, index) => {
                obj[per] = status[per]
            });
            resolve(obj)
        });
    });
}

const request = (_permission) => {
    return requestRNP(_permission)
}

const checkAndRequest = (PermissionConfigs) => {
    return new Promise(async (resolve, reject) => {
        var checkInfos = await checkMultiple(PermissionConfigs.map(e => e.permission));

        var permissionMiss = PermissionConfigs.map(e => [RESULTS.DENIED, RESULTS.BLOCKED].indexOf(checkInfos[e.permission]) >= 0 ? { ...e, RESULTS: checkInfos[e.permission] } : null).filter(e => e != null);
        if (permissionMiss.length > 0) {
            var requestInfos = await requestMultiple(permissionMiss.map(e => e.permission));
            permissionMiss = PermissionConfigs.map(e => [RESULTS.DENIED, RESULTS.BLOCKED].indexOf(requestInfos[e.permission]) >= 0 ? { ...e, RESULTS: requestInfos[e.permission] } : null).filter(e => e != null);
        }

        __DEV__ && console.log(permissionMiss)
        resolve(permissionMiss);
    })
}

export {
    check,
    checkMultiple,
    request,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
    openSettings,
    checkAndRequest
}