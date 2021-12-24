import {
  ResponseBase,
  ActionBase,
  ActionResponseBase,
} from './../../../../config/type';
import {
  LOGIN_FAILED,
  LOGIN,
  LOGIN_SOCIAL,
  LOGIN_SUCCESS,
  LOGIN_START,
  RESET_STATE_LOGIN,
  SET_DATA_SERVER
} from './actionType';
import {LoginRequest,LoginSocialRequest} from '../../../../data/model/request';
import {LoginResponse} from '../../../../data/model/response';


export const onLogin = (
  url: string,
  action: LoginRequest,
): ActionBase<LoginRequest> => {
  return {
    type: LOGIN,
    url: url,
    payload: action,
  };
};

export const onLoginSocial = (
    url: string,
    action: LoginSocialRequest,
): ActionBase<LoginSocialRequest> => {
  return {
    type: LOGIN_SOCIAL,
    url: url,
    payload: action,
  };
};

export const onLoginStart = () => {
  return {type: LOGIN_START};
};

export const onLoginSuccess = (
  action: LoginResponse,
): ActionResponseBase<LoginResponse> => {
  return {type: LOGIN_SUCCESS, payload: action};
};

export const onLoginFailed = (

  action: LoginResponse,
): ActionResponseBase<LoginResponse> => {
  return {type: LOGIN_FAILED, payload: action};
};

export const onSetDataServer = (
  action: LoginResponse,
):ActionResponseBase<LoginResponse> => {
  return {type: SET_DATA_SERVER, payload: action};
}
export const onResetState = () => {
  return {type: RESET_STATE_LOGIN};
};
