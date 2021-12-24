import {
  CODE_DEFAULT,
  CODE_ERROR,
  CODE_SUCCESS,
  STATUS_SUCCESS,
  STATUS_ERROR
} from './../../../../config/index';
import {RegisterActionTypes, RegisterState} from './type';
import {
  REGISTER_START,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  RESET_STATE_REGISTER,
} from './actionType';


const initialState = {
  data: {},
  code: CODE_DEFAULT,
  loading: false,
  status: false,
  msg: '',
};

export function RegisterReducer(
  state = initialState,
  action: RegisterActionTypes,
): RegisterState {
  const payload = action.payload;
  switch (action.type) {
    case REGISTER_SUCCESS:
       console.log('payload',payload)
      return {
        ...state,
        loading: false,
        code: CODE_SUCCESS,
        data: payload?.userid,
        msg:payload?.messager,
        status : STATUS_SUCCESS,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        code: CODE_ERROR,
        msg: payload?.error,
        status : STATUS_ERROR,
      };
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        msg: '',
        code: CODE_DEFAULT,
      };
    case RESET_STATE_REGISTER:
      return initialState;
    default:
      return state;
  }
}
