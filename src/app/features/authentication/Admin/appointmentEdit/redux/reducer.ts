import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'
import { Alert } from 'react-native';
export interface AppointmentEditState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataAppointmentDetail: any;
    dataAppointmentUpdate: any;
}

const initialState: AppointmentEditState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataAppointmentDetail: undefined,
    dataAppointmentUpdate: undefined
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const AppointmentEditReducer = (state = initialState, { type, payload }: ActionProps): AppointmentEditState => {
    switch (type) {
        case Action.DEFAULT_ACTION:
            return { ...initialState }
        case Action.GET_APPOINTMENT_DETAIL_COMPLETE:
            return { ...state, dataAppointmentDetail: payload }
        case Action.GET_APPOINTMENT_UPDATE_COMPLETE:
            return { ...state, dataAppointmentUpdate: payload }
        default:
            return state
    }
}
