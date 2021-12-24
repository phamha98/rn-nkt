import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* SplashSaga() {
    yield takeLatest(Action.CHECK_TOKEN_EXPIRE, Saga.onCheckToken);
}
