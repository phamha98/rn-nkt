import {put, takeLatest, call} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* OTPSaga() {
  yield takeLatest(Action.SEND_OTP, Saga.onSendOtp);
  yield takeLatest(Action.RE_SEND_OTP, Saga.onReSendOTP);
}
