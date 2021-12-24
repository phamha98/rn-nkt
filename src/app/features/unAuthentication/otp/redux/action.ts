import { RequestBase, ResponseBase, ActionBase } from './../../../../config/type';
import * as Action from './actionType';
import {
  SendOTPRequest,
  ReSendOTPRequest,
} from '../../../../data/model/request/index.js';
import {
  SendOtpResponse,
  ReSendOtpResponse,
} from '../../../../data/model/response';

export const onSend = (
  url: string,
  action: SendOTPRequest,
): ActionBase<SendOTPRequest> => {
  return {
    type: Action.SEND_OTP,
    url,
    payload: { userid: action.userid, otp: action.otp },
  };
};
export const onSendStart = () => {
  return {
    type: Action.SEND_OTP_START,
  };
};
export const onSuccess = (
  action: SendOtpResponse,
): ActionBase<SendOtpResponse> => {
  return { type: Action.SEND_OTP_SUCCESS, payload: action };
};

export const onFailed = (action: SendOtpResponse): ActionBase<SendOtpResponse> => {
  return { type: Action.SEND_OTP_FAILED, payload: action};
};
//====================CODE CU ===================//
export const onReSend = (
  action: ReSendOTPRequest,
): ActionBase<ReSendOTPRequest> => {
  return {
    type: Action.RE_SEND_OTP,
    payload: { phone: action.data },
  };
};
export const onReSendStart = () => {
  return {
    type: Action.RE_SEND_OTP_START,
  };
};
export const onReSuccess = (
  action: ReSendOtpResponse,
): ActionBase<ReSendOtpResponse> => {
  return { type: Action.RE_SEND_OTP_SUCCESS, payload: action };
};

export const onReFailed = (
  action: ReSendOtpResponse,
): ActionBase<ReSendOtpResponse> => {
  return { type: Action.RE_SEND_OTP_FAILED, payload: action };
};

export const onResetState = () => {
  return { type: Action.RESET_STATE_OTP };
};
//====================CODE MOI - vinhnq 7/2020===================//

export const onResendOTP = (url: string, payload: any) => ({
  type: Action.RE_SEND_OTP,
  url,
  payload
});