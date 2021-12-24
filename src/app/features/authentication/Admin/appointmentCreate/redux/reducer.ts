import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'
import { Alert } from 'react-native';
export interface AppointmentCreateState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataAppointmentCreate: any;
}

const initialState: AppointmentCreateState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataAppointmentCreate: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const AppointmentCreateReducer = (state = initialState, { type, payload }: ActionProps): AppointmentCreateState => {
    switch (type) {
         case Action.APPOINTMENT_CREATE_COMPLETE:
            return { ...state, dataAppointmentCreate: payload }
        default:
            return state
    }
}
