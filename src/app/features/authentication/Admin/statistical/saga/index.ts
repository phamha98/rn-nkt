import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';

export function* StatisticalSaga() {
    yield takeLatest(Action.LOAD_THONG_BAO_ACTION, Saga.onLoadThongBao);
}
