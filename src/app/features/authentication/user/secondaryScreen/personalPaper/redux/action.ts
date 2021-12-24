import * as Action from './actionType';
export const onGetListPersonalPaper = (url:string, payload:any) => ({
    type: Action.GET_LIST_PERSONAL_PAPER,
    url,
    payload
})

export const onDeletePersonalPaper = (url:string, payload:any) => ({
    type: Action.DELETE_PERSONAL_PAPER,
    url,
    payload
})

export const ResetState = () => ({
    type: Action.RESET_STATE_PERSONAL_PAPERS,
})
