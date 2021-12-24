import * as Action from './actionType'
export const onGetListNotaryOffice = (url: string, payload: any) => ({
    type: Action.GET_LIST_NOTARY_OFFICE,
    url,
    payload
})
export const onGetListNotaryOfficeByServiceId = (url: string, payload: any) => ({
    type: Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID,
    url,
    payload
})
//Tỉnh
export const onGetListAddressCity = (url: string, payload: any) => ({
    type: Action.GET_LIST_ADDRESS_CITY,
    url,
    payload
})
//Huyên
export const onGetListDistrict = (url: string, payload: any) => ({
    type: Action.GET_LIST_DISTRICT,
    url,
    payload
})
//Xã
export const onGetListWard = (url: string, payload: any) => ({
    type: Action.GET_LIST_WARD,
    url,
    payload
})
//Dân tộc

export const onGetListEthnic = (url: string, payload: any) => ({
    type: Action.GET_LIST_ETHNIC,
    url,
    payload
})
//Trình độ chuyên môn
export const onGetListQualification = (url: string, payload: any) => ({
    type: Action.GET_LIST_QUALIFICATION,
    url,
    payload
})
//Trình độ học vấn
export const onGetListEducationLevel = (url: string, payload: any) => ({
    type: Action.GET_LIST_EDUCATION_LEVEL,
    url,
    payload
})

export const onLoadMoreListNotaryOffice = (url: string, payload: any) => ({
    type: Action.LOAD_MORE_LIST_NOTARY_OFFICE,
    url,
    payload
})
export const onRefreshListNotaryOffice = (url: string, payload: any) => ({
    type: Action.REFRESH_LIST_NOTARY_OFFICE,
    url,
    payload
});
export const onUpdateOffice = (url: string, payload: any) => ({
    type: Action.UPDATE_OFFICE,
    url,
    payload
});

export const onGetNotaryServiceByOfficeID = (url: string, payload: any) => ({
    type: Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID,
    url,
    payload
});

export const onResetState = () => ({
    type: Action.RESET_STATE_NOTARY_OFFICE
})
