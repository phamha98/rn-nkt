import { put } from 'redux-saga/effects';
import { ActionBase } from '../../../../config/type';
import { LoginRequest, LoginSocialRequest } from '../../../../data/model/request';
import { LoginResponse } from '../../../../data/model/response';
import { ServiceSaga } from '../../../../library/networking/index';
import { onLoginFailed, onLoginStart, onLoginSuccess } from '../redux/action';
export function* onLogin(action: ActionBase<LoginRequest>) {
  yield put(onLoginStart());
  const response: LoginResponse = yield ServiceSaga.Post(
    action.url,
    action.payload,
  );
  if (response.status == 0) {
    yield put(onLoginSuccess(response));
  } else {
    yield put(onLoginFailed(response));
  }
}

export function* onLoginSocial(action: ActionBase<LoginSocialRequest>) {
  yield put(onLoginStart());
  const response: LoginResponse = yield ServiceSaga.Post(
      action.url,
      action.payload,
  );
  //console.log('login social', response);
  if (response.status) {
    yield put(onLoginSuccess(response));
  } else {
    yield put(onLoginFailed(response));
  }
}
