import { put, takeLatest, all } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* DisabilityDetailSaga() {
    yield all([
        takeLatest(Action.GET_DETAIL_DISABILITY_ACTION, Saga.onGetDetailDisability),
        takeLatest(Action.DUYET_TIEP_NHAN_ACTION, Saga.onDuyetTiepNhan),
        takeLatest(Action.KHONG_DUYET_TIEP_NHAN_ACTION, Saga.onKhongDuyetTiepNhan)
    ])
}
