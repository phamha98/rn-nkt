import * as Action from './actionType'
export const onGetListNotaryStaff = (url: string, payload: any) => ({
    type: Action.GET_LIST_NOTARY_STAFF,
    url,
    payload
})
export const onGetListAddressNotaryCity = (url: string, payload: any) => ({
    type: Action.GET_LIST_ADDRESS_NOTARY_CITY,
    url,
    payload
})
export const onGetListDistrictNotary = (url: string) => ({
    type: Action.GET_LIST_DISTRICT_NOTARY,
    url
})
export const onLoadMoreListNotaryStaff = (url: string, payload: any) => ({
    type: Action.LOAD_MORE_LIST_NOTARY_STAFF,
    url,
    payload
})
export const onRefreshListNotaryStaff = (url: string, payload: any) => ({
    type: Action.REFRESH_LIST_NOTARY_STAFF,
    url,
    payload
});
export const saveStaffSelected = (payload: any) => ({
    type: Action.SAVE_STAFF_SELECTED,
    payload
});
export const onResetState = () => ({
    type: Action.RESET_STATE_NOTARY_STAFF
})
export const onRemoveList = () => ({
  type:Action.REMOVE_LIST
})
