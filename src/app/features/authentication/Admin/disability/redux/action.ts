import * as Action from './actionType'

export const onDisabilityDefault = () => ({
    type: Action.DISABILITY_DEFAULT
})

export const onGetRequestConfirmDisability = (url: string, payload: any) => ({
    type: Action.GET_REQUEST_CONFIRM_DISABILITY_ACTION,
    url,
    payload
})

export const onAcceptRequestConfirmDisability = (url: string, payload: any) => ({
    type: Action.ACCEPT_REQUEST_CONFIRM_DISABILITY_ACTION,
    url,
    payload
})

export const onRejectRequestConfirmDisability = (url: string, payload: any) => ({
    type: Action.REJECT_REQUEST_CONFIRM_DISABILITY_ACTION,
    url,
    payload
})

