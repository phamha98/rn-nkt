import * as Action from './actionType'
export const onGetDetailUser = (url: string) => ({
    type: Action.GET_DETAIL_USER,
    url
})
export const setHomeUserDetails = (user: any) => ({
    type: Action.GET_DETAIL_USER_SUCCESS,
    payload: user
})
export const resetUserDetails = () => ({
    type: Action.RESET_DETAIL_USER,
})

