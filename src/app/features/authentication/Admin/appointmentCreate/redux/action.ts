import * as Action from './actionType'
export const onAppointmentCreate = (url: string, payload: any) => ({
    type: Action.APPOINTMENT_CREATE_ACTION,
    url,
    payload
})

