import {
  RequestBase,
  ResponseBase,
  ActionBase,
  ActionResponseBase,
  Action,
} from './../../../../config/type';
import {
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  RESET_STATE_REGISTER,
  REGISTER_START,
} from './actionType';
import {RegisterRequest} from '../../../../data/model/request/index.js';
import {RegisterResponse} from '../../../../data/model/response';

export const onRegister = (
  url: string,
  action: RegisterRequest,
): ActionBase<RegisterRequest> => {
  return {
    type: REGISTER,
    url: url,
    payload: action,
  };
};
export const onRegisterStart = (): Action => {
  return {
    type: REGISTER_START,
  };
};

export const onSuccess = (
  action: RegisterResponse,
): ActionResponseBase<RegisterResponse> => {
  return {type: REGISTER_SUCCESS, payload: action};
};

export const onFailed = (
  action: RegisterResponse,
): ActionResponseBase<RegisterResponse> => {
  return {type: REGISTER_FAILED, payload: action};
};

export const onResetState = (): Action => {
  return {
    type: RESET_STATE_REGISTER,
  };
};
