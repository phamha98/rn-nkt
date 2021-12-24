import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onGetRequestConfirmDisability({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.GET_REQUEST_CONFIRM_DISABILITY_COMPLETE, payload: response })
}

export function* onAcceptRequestConfirmDisability({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.ACCEPT_REQUEST_CONFIRM_DISABILITY_COMPLETE, payload: response })
}

export function* onRejectRequestConfirmDisability({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.REJECT_REQUEST_CONFIRM_DISABILITY_COMPLETE, payload: response })
}

