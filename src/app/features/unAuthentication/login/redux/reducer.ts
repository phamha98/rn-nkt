import {
  CODE_DEFAULT,
  CODE_SUCCESS,
  CODE_ERROR,
} from './../../../../config/index';
import { LoginActionTypes, LoginState } from './type';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGIN_START, RESET_STATE_LOGIN } from './actionType';

const initialState = {
  data: {},
  dataServerVerify:{},
  code: CODE_DEFAULT,
  loading: false,
  msg: '',
  user: {
    isLogin: false,
    userType: 0,
    userName: ''
  }
};

export function LoginReducer(
  state = initialState,
  action: LoginActionTypes,
): LoginState {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN_SUCCESS:
      let newPayload = payload;
      if (payload && payload.result){
        newPayload = payload.result
      }
      //console.log(newPayload)

      var _state = {
        ...state,
        loading: false,
        data: newPayload,
        dataServerVerify: newPayload,
        code: CODE_SUCCESS,
        msg: '',
      };
      return _state;
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        code: CODE_ERROR,
        msg: payload?.error,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        msg: '',
        code: CODE_DEFAULT,
      };
    case RESET_STATE_LOGIN:
      return initialState;

    default:
      return state;
  }
}
