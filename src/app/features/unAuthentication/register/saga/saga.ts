import {ServiceSaga} from '../../../../library/networking/index';
import {put} from 'redux-saga/effects';
import {ResponseBase, ActionBase} from '../../../../config/type';
import {onSuccess, onFailed, onRegisterStart} from '../redux/action';
import {RegisterRequest} from '../../../../data/model/request';
import {RegisterResponse} from '../../../../data/model/response';
export function* onRegister(action: ActionBase<RegisterRequest>) {
  yield put(onRegisterStart());
  const response: RegisterResponse = yield ServiceSaga.Post(
    action.url,
    action.payload,
  );
  console.log('status',response);
  if (response.status) {
    // console.log('status',response);
    yield put(onSuccess(response));
  } else {
    yield put(onFailed(response));
  }
}
