import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../library/networking'
import * as Action from '../redux/actionType'
export function* getTerm({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_TERM_START });
    const response: { id: number, key: string, title: string, content: string } = yield ServiceSaga.Get(url, payload);
    //console.log('Get term', response);
    if (response.content) {
        yield put({ type: Action.GET_TERM_SUCCESS, payload: response })
    } else {
        yield put({ type: Action.GET_TERM_FAILED, payload: { error: response } })
    }
}

export function* getPrivacy({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_PRIVACY_START });
    const response: { id: number, key: string, title: string, content: string } = yield ServiceSaga.Get(url, payload);
    //console.log('Get privacy', response);
    if (response.content) {
        yield put({ type: Action.GET_PRIVACY_SUCCESS, payload: response })
    } else {
        yield put({ type: Action.GET_PRIVACY_FAILED, payload: { error: response } })
    }
}