import * as Action from './actionType'
export const onDefault = () => ({
    type: Action.DEFAULT_ACTION
})

export const onGetDetailDisability = (url: string, payload: any) => ({
    type: Action.GET_DETAIL_DISABILITY_ACTION,
    url,
    payload
})

export const onDuyetTiepNhan = (url: string, payload: any) => ({
    type: Action.DUYET_TIEP_NHAN_ACTION,
    url,
    payload
})

export const onKhongDuyetTiepNhan = (url: string, payload: any) => ({
    type: Action.KHONG_DUYET_TIEP_NHAN_ACTION,
    url,
    payload
})

