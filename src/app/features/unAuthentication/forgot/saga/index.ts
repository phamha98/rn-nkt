import {put, takeLatest, call} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ForgotSaga() {
  yield takeLatest(Action.FORGOT, Saga.onSendForgot);
}
