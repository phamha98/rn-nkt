import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onGetCapNhatNoiDung({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.CAP_NHAT_NOI_DUNG_COMPLETE, payload: response })
}

export function* onXacNhanKT({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.XAC_NHAN_KT_COMPLETE, payload: response })
}

