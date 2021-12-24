import * as Action from './actionType'
export const onDefault = () => ({
    type: Action.DEFAULT_ACTION
})

export const onGetCapNhatNoiDung = (url: string) => ({
    type: Action.CAP_NHAT_NOI_DUNG_ACTION,
    url
})

export const onXacNhanKT = (url: string, payload: any) => ({
    type: Action.XAC_NHAN_KT_ACTION,
    url,
    payload
})

