import * as Action from './actionType';

export const onForgot = (payload: any, url: string, onSuccess?: () => void, onFailure?: (msg: string) => void) => ({
  type: Action.FORGOT,
  url,
  payload,
  onSuccess,
  onFailure
})
export const onForgotStart = () => ({
  type: Action.FORGOT_START
})
export const onForgotSuccess = () => ({
  type: Action.FORGOT_SUCCESS
})
export const onForgotFailure = () => ({
  type: Action.FORGOT_FAILED
})