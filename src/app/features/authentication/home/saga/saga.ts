import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onGetDetailUserNotary({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_DETAIL_USER_SUCCESS, payload: response })
}

