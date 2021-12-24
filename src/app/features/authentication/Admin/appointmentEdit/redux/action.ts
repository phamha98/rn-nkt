import * as Action from './actionType'
export const onDefault = () => ({
    type: Action.DEFAULT_ACTION
})

export const onAppointmentDetail = (url: string,payload: any) => ({
    type: Action.GET_APPOINTMENT_DETAIL_ACTION,
    url,
    payload
})

export const onAppointmentUpdate = (url: string,payload: any) => ({
    type: Action.GET_APPOINTMENT_UPDATE_ACTION,
    url,
    payload
})

