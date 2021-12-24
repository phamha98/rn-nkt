import {put, takeLatest, call, takeEvery} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* LoginSaga() {
  yield takeEvery(Action.LOGIN, Saga.onLogin);
  yield takeLatest(Action.LOGIN_SOCIAL, Saga.onLoginSocial);
}
