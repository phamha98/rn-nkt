import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking/saga'
import * as Action from '../redux/actionType'
export function* onGetListPersonalPapers({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_PERSONAL_PAPER_START })
    const response = yield ServiceSaga.Get(url, payload);
    console.log('JSON.stringify',(response))
    if (response.data) {
        yield put({ type: Action.GET_LIST_PERSONAL_PAPER_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_PERSONAL_PAPER_FAILED, payload: { error: response.error } })
    }
}
export function* onDeletePersonalPapers({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.DELETE_PERSONAL_PAPER_START })
    const response = yield ServiceSaga.Get(url, payload);
    console.log('onDeletePersonalPapers',(response))
    if (response.data) {
        yield put({ type: Action.DELETE_PERSONAL_PAPER_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.DELETE_PERSONAL_PAPER_FAILED, payload: { error: response.error } })
    }
}