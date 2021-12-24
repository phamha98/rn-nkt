

import { put, call } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* changePass({ url, payload, onSuccess }: { url: string, payload: any, onSuccess?: () => void }) {
    yield put({ type: Action.CHANGE_PASSWORD_START })
    const response: { status: boolean, error: string} = yield ServiceSaga.Post(url, payload);
    if (response.status) {
        yield put({ type: Action.CHANGE_PASSWORD_SUCCESS, payload: response.status })
    } else {
        yield put({ type: Action.CHANGE_PASSWORD_FAIL, payload: { error: response.status } })
    }
}
