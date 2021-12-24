import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'
export function* onUpdateAvatar({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.UPDATE_AVATAR_START })
    const response = yield ServiceSaga.PostWithFile(url, payload);
    //console.log('JSON.stringify',(response))
    if (response.status === true) {
        yield put({ type: Action.UPDATE_AVATAR_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.UPDATE_AVATAR_FAILED, payload: { error: response.error } })
    }
}