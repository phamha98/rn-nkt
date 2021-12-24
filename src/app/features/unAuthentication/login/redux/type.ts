import {LoginRequest,LoginSocialRequest} from '../../../../data/model/request/index.js';
import {LoginResponse} from '../../../../data/model/response';

import {
  LOGIN,
  LOGIN_SOCIAL,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  RESET_STATE_LOGIN,
} from './actionType';

export interface LoginState {
  data: LoginResponse;
  code: number;
  loading: boolean;
  msg: string;
}

export interface onLogin {
  type: typeof LOGIN;
  payload: LoginRequest;
}

export interface onLoginSocial {
  type: typeof LOGIN_SOCIAL;
  payload: LoginSocialRequest;
}

export interface onLoginFailed {
  type: typeof LOGIN_FAILED;
  payload: LoginResponse;
}

export interface onLoginStart {
  type: typeof LOGIN_START;
  payload: null;
}

export interface onLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResponse;
}

export interface onResetSate {
  type: typeof RESET_STATE_LOGIN;
  payload: null;
}

export type LoginActionTypes =
  | onLoginSuccess
  | onLoginFailed
  | onLoginStart
  | onResetSate;
