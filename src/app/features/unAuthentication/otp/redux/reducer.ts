import { CODE_DEFAULT, CODE_ERROR, CODE_SUCCESS } from './../../../../config/index';
import { OtpActionTypes, OtpState } from './type';
import * as Action from './actionType';

const initialState = {
  data: {},
  code: CODE_DEFAULT,
  loading: false,
  msg: '',
};

export function OTPReducer(
  state = initialState,
  action: OtpActionTypes,
): OtpState {
  const payload = action.payload;
  switch (action.type) {
    case Action.SEND_OTP_START:
      return {
        ...state,
        loading: true,
        code: CODE_DEFAULT,
      };
    case Action.SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        code: CODE_SUCCESS,
      };
    case Action.SEND_OTP_FAILED:
      //console.log('err', payload)
      return {
        ...state,
        loading: false,
        code: CODE_ERROR,
        msg: payload?.error,
      };
    case Action.RE_SEND_OTP_START:
      return {
        ...state,
        loading: true,
        code: CODE_DEFAULT,
      };
    case Action.RE_SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case Action.RE_SEND_OTP_FAILED:
      return {
        ...state,
        loading: false
      };
    case Action.RESET_STATE_OTP:
      return initialState;
    default:
      return state;
  }
}
