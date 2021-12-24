import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onLoadThongBao({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.LOAD_THONG_BAO_COMPLETE, payload: response })
}

