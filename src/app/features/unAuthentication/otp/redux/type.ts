import {
  SendOTPRequest,
  ReSendOTPRequest,
} from '../../../../data/model/request/index.js';
import {
  SendOtpResponse,
  ReSendOtpResponse,
} from '../../../../data/model/response';

import * as Action from './actionType';

export interface OtpState {
  data: any;
  code: number;
  loading: boolean;
  msg: string;
}

export interface onSendOtp {
  type: typeof Action.SEND_OTP;
  payload: SendOTPRequest;
}

export interface onSendOtpStart {
  type: typeof Action.SEND_OTP_START;
  payload: SendOtpResponse;
}
export interface onSendOtpFailed {
  type: typeof Action.SEND_OTP_FAILED;
  payload: SendOtpResponse;
}

export interface onSendOtpSuccess {
  type: typeof Action.SEND_OTP_SUCCESS;
  payload: SendOtpResponse;
}

export interface onReSendOtp {
  type: typeof Action.RE_SEND_OTP;
  payload: ReSendOTPRequest;
}

export interface onReSendOtpStart {
  type: typeof Action.RE_SEND_OTP_START;
  payload: ReSendOtpResponse;
}
export interface onReSendOtpFailed {
  type: typeof Action.RE_SEND_OTP_FAILED;
  payload: ReSendOtpResponse;
}

export interface onReSendOtpSuccess {
  type: typeof Action.RE_SEND_OTP_SUCCESS;
  payload: ReSendOtpResponse;
}
export interface onResetSate {
  type: typeof Action.RESET_STATE_OTP;
  payload: null;
}
export type OtpActionTypes =
  | onSendOtpFailed
  | onSendOtpStart
  | onSendOtpSuccess
  | onReSendOtpFailed
  | onReSendOtpStart
  | onReSendOtpSuccess
  | onResetSate;
