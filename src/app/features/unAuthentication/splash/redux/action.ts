import * as Action from './actionType'
export const onCheckToken = (url: string, data: any, onSuccess: (data: any) => void, onFailure: () => void) => ({
    type: Action.CHECK_TOKEN_EXPIRE,
    url,
    data,
    onSuccess,
    onFailure,
})
