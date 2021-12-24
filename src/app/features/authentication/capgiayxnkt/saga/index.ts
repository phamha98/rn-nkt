import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* CapGiayXNKTSaga() {
    yield takeLatest(Action.GET_DATA_CAPGIAYXNKT, Saga.onGetDetailUserNotary);
    yield takeLatest(Action.POST_CAPGIAYXNKT, Saga.onPostDetailUserNotary);
}
