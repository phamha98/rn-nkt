import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onGetDetailDisability({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.GET_DETAIL_DISABILITY_COMPLETE, payload: response })
}

export function* onDuyetTiepNhan({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.DUYET_TIEP_NHAN_COMPLETE, payload: response })
}

export function* onKhongDuyetTiepNhan({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.KHONG_DUYET_TIEP_NHAN_COMPLETE, payload: response })
}

