import * as Action from './actionType'
export const getTerm = (url: string, payload: any) => ({
    type: Action.GET_TERM,
    url,
    payload
});

export const getPrivacy = (url: string, payload: any) => ({
    type: Action.GET_PRIVACY,
    url,
    payload
});

export const onResetState = () => ({
    type: Action.RESET_STATE_TERM
});
