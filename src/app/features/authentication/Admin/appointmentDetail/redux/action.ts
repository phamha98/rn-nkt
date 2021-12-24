import * as Action from './actionType'
export const onDefault = (url: string,payload: any) => ({
    type: Action.GET_APPOINTMENT_DETAIL_ACTION,
    url,
    payload
})

export const onAppointmentDetail = (url: string,payload: any) => ({
    type: Action.GET_APPOINTMENT_DETAIL_ACTION,
    url,
    payload
})

