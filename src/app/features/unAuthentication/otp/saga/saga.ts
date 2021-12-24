import { ActionBase } from './../../../../config/type';
import * as Action from '../redux/actionType'
import { ServiceSaga } from '../../../../library/networking/index';
import { put } from 'redux-saga/effects';
import { ResponseBase, RequestBase } from '../../../../config/type';
import { onSuccess, onFailed, onReFailed, onReSuccess, onSendStart, onReSendStart } from '../redux/action';
import { SendOTPRequest, ReSendOTPRequest } from '../../../../data/model/request';
import {
  SendOtpResponse,
  ReSendOtpResponse,
} from '../../../../data/model/response';


export function* onSendOtp(action: ActionBase<SendOTPRequest>) {
  yield put(onSendStart())
  //console.log('ac',action)
  const response: SendOtpResponse = yield ServiceSaga.Post(
    action.url,
    action.payload
  );
  //console.log('response',response)
  if (response.status) {
    yield put(onSuccess(response));
  } else {
    yield put(onFailed(response));
  }
}


export function* onReSendOtp(action: RequestBase<ReSendOTPRequest>) {
  yield put(onReSendStart())
  const response: ReSendOtpResponse = yield ServiceSaga.Post(
    action.url,
    action.data,
  );

  if (response.status) {
    yield put(onReSuccess(response));
  } else {
    yield put(onReFailed(response));
  }
}

//Code moi vinhnq 7/2020
export function* onReSendOTP({ url, payload }: { url: string, payload: any }) {
  yield put({ type: Action.RE_SEND_OTP_START })
  const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Post(url, payload);
  //console.log("onReSendOTP",response);
  if (response.status) {
      yield put({ type: Action.RE_SEND_OTP_SUCCESS, payload: response.data })
  } else {
      yield put({ type: Action.RE_SEND_OTP_FAILED, payload: { error: response.error } })
  }
}


