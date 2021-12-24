
import {
    RequestBase,
    ResponseBase,
    ActionBase,
    ActionResponseBase,
    Action,
  } from '../../../../../../config/type';
  import {
    POST_EDIT_BY_USER,
    POST_EDIT_BY_USER_FAILED,
    POST_EDIT_BY_USER_SUCCESS,
    RESET_STATE_EDIT_USER,
    POST_EDIT_BY_USER_START,
  } from './actionType';

  import { RegisterResponse } from 'src/app/data/model/response';
import {RegisterRequest} from '../../../../../../data/model/request/index.js';
  export const onEditUser = (
    url: string,
    action: RegisterRequest,
  ): ActionBase<RegisterRequest> => {
    return {
      type: POST_EDIT_BY_USER,
      url: url,
      payload: action,
    };
  };
  export const onEditUserStart = (): Action => {
    return {
      type: POST_EDIT_BY_USER_START,
    };
  };
  
  export const onSuccess = (
    action: RegisterResponse,
  ): ActionResponseBase<RegisterResponse> => {
    return {type: POST_EDIT_BY_USER_SUCCESS, payload: action};
  };
  
  export const onFailed = (
    action: RegisterResponse,
  ): ActionResponseBase<RegisterResponse> => {
    return {type: POST_EDIT_BY_USER_FAILED, payload: action};
  };
  
  export const onResetState = (): Action => {
    return {
      type: RESET_STATE_EDIT_USER,
    };
  };
  