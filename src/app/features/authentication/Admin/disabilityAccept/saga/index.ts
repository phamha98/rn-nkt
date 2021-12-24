import { put, takeLatest, all } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* DisabilityAcceptSaga() {
    yield all([
        takeLatest(Action.CAP_NHAT_NOI_DUNG_ACTION, Saga.onGetCapNhatNoiDung),
        takeLatest(Action.XAC_NHAN_KT_ACTION, Saga.onXacNhanKT)
    ])
}
