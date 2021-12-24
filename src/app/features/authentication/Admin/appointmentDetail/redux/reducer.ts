import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'
import { Alert } from 'react-native';
export interface AppointmentDetailState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataAppointmentDetail: any;
}

const initialState: AppointmentDetailState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataAppointmentDetail: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const AppointmentDetailReducer = (state = initialState, { type, payload }: ActionProps): AppointmentDetailState => {
    switch (type) {
        case Action.GET_APPOINTMENT_DETAIL_COMPLETE:
            return { ...state, dataAppointmentDetail: payload }
        default:
            return state
    }
}
