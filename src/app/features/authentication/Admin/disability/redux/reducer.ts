import { CODE_DEFAULT } from './../../../../../config/index';
import * as Action from './actionType'
export interface DisabilityState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataRequestConfirmDisability: any;
    acceptRequestConfirmDisability: any;
    rejectRequestConfirmDisability: any;
}

const initialState: DisabilityState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataRequestConfirmDisability: undefined,
    acceptRequestConfirmDisability: undefined,
    rejectRequestConfirmDisability: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const DisabilityReducer = (state = initialState, { type, payload }: ActionProps): DisabilityState => {
    switch (type) {
        case Action.DISABILITY_DEFAULT:
            return { ...initialState }
        case Action.GET_REQUEST_CONFIRM_DISABILITY_COMPLETE:
            return { ...state, dataRequestConfirmDisability: payload }
        case Action.ACCEPT_REQUEST_CONFIRM_DISABILITY_COMPLETE:
            return { ...state, acceptRequestConfirmDisability: payload }
        case Action.REJECT_REQUEST_CONFIRM_DISABILITY_COMPLETE:
            return { ...state, rejectRequestConfirmDisability: payload }
        default:
            return state
    }
}
