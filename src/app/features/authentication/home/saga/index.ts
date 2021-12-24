import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* HomeTabSaga() {
    yield takeLatest(Action.GET_DETAIL_USER, Saga.onGetDetailUserNotary);
}
