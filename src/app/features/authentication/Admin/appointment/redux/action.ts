import * as Action from './actionType'
export const onGetAppointment = (url: string, payload: any) => ({
    type: Action.GET_APPOINTMENT_ACTION,
    url,
    payload
})

