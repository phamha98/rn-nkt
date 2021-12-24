import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'
import { Alert } from 'react-native';
export interface AppointmentState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataAppointment: any;
}

const initialState: AppointmentState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataAppointment: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const AppointmentReducer = (state = initialState, { type, payload }: ActionProps): AppointmentState => {
    switch (type) {
         case Action.GET_APPOINTMENT_COMPLETE:
            return { ...state, dataAppointment: payload }
        default:
            return state
    }
}
