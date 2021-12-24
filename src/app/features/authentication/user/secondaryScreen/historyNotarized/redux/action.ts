import * as Action from './actionType';
export const onGetListHistory = (url:string, payload:any) => ({
    type: Action.GET_LIST_HISTORY_NOTARY,
    url,
    payload
})
export const onRefreshListHistory = (url:string, payload:any) => ({
    type: Action.REFRESH_LIST_HISTORY_NOTARY,
    url,
    payload
})
export const onLoadMoreListHistory = (url:string, payload:any) => ({
    type: Action.LOAD_MORE_LIST_HISTORY_NOTARY,
    url,
    payload
})
export const ResetState = () => ({
    type: Action.RESET_STATE_HISTORY_NOTARY,
})
