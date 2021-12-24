import * as Action from './actionType'

export const onChangePassword = (url: string, payload: any, onSuccess?: () => void)  => ({
    type: Action.CHANGE_PASSWORD,
    url,
    payload,
    onSuccess
})

export const ResetState = () => ({
    type: Action.RESET_STATE_CHANGE_PASSWORD
})