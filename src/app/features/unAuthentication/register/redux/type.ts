import { ResponseBase } from '../../../../config/type';
import { RegisterRequest } from '../../../../data/model/request/index.js';
import { RegisterResponse } from '../../../../data/model/response';

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER,
  REGISTER_START,
  RESET_STATE_REGISTER,
} from './actionType';

export interface RegisterState {
  data: any;
  code: number;
  loading: boolean;
  msg: string;
  status : boolean
}

export interface onRegister {
  type: typeof REGISTER;
  payload: RegisterRequest;
}

export interface onRegisterFailed {
  type: typeof REGISTER_FAILED;
  payload: RegisterResponse;
}

export interface onRegisterStart {
  type: typeof REGISTER_START;
  payload: RegisterResponse;
}

export interface onRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: RegisterResponse;
}

export interface onResetStateRegister {
  type: typeof RESET_STATE_REGISTER;
  payload: null;
}
export type RegisterActionTypes =
  | onRegisterFailed
  | onRegisterStart
  | onRegisterSuccess
  | onResetStateRegister;
