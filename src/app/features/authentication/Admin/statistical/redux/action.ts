import * as Action from './actionType'
export const onLoadThongBao = (url: string, payload: any) => ({
    type: Action.LOAD_THONG_BAO_ACTION,
    url,
    payload
})

