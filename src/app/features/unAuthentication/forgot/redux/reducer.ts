import { CODE_DEFAULT } from './../../../../config/index';
import * as Action from './actionType'

export interface ForgotState {
  data: any,
  code: number;
  loading: boolean;
}
const initialState = {
  data: {},
  code: CODE_DEFAULT,
  loading: false,
  msg: '',
};

export function ForgotReducer(
  state = initialState,
  { type, payload }: { type: keyof typeof Action, payload: any },
): ForgotState {
  switch (type) {
    case Action.FORGOT_START:
      return {
        ...state,
        loading: true
      };
    case Action.FORGOT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case Action.FORGOT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case Action.RESET_STATE_FORGOT:
      return initialState;
    default:
      return state;
  }
}
