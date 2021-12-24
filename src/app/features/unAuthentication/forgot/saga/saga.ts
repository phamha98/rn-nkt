import { ServiceSaga } from '../../../../library/networking/index';
import { put, call } from 'redux-saga/effects';
import { onForgotFailure, onForgotSuccess,onForgotStart } from '../redux/action';
export function* onSendForgot({ payload, url, onSuccess, onFailure }: { payload: any, url: string, onSuccess?: () => void, onFailure?: (msg: string) => void }) {
  yield put(onForgotStart())
  const { status, error }: { status: boolean, error: string } = yield ServiceSaga.Post(url, payload);
  //console.log("RESS", { status, error })
  if (status) {
    yield put(onForgotSuccess())
    if (onSuccess) yield call(onSuccess)
  } else {
    yield put(onForgotFailure())
    if (onFailure) yield call(onFailure, error)
  }
}
