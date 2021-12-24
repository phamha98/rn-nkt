import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking/saga'
import * as Action from '../redux/actionType'
export function* onGetListNotaryHistory({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_HISTORY_NOTARY_START })
    const response = yield ServiceSaga.Get(url, payload);
    console.log('JSON.stringify',(response))
    if (response.data) {
        yield put({ type: Action.GET_LIST_HISTORY_NOTARY_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_HISTORY_NOTARY_FAILED, payload: { error: response.error } })
    }
}
export function* onLoadMoreListNotaryHistory({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.LOAD_MORE_LIST_HISTORY_NOTARY_START })
    const response = yield ServiceSaga.Get(url, payload);
    if (response.data) {
        yield put({ type: Action.LOAD_MORE_LIST_HISTORY_NOTARY_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.LOAD_MORE_LIST_HISTORY_NOTARY_FAILED, payload: { error: response.error } })
    }
}
export function* onRefreshListNotaryHistory({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.REFRESH_LIST_HISTORY_NOTARY_START })
    const response: { total: number, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    if (response.data) {
        yield put({ type: Action.REFRESH_LIST_HISTORY_NOTARY_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.REFRESH_LIST_HISTORY_NOTARY_FAILED, payload: { error: response.error } })
    }
}