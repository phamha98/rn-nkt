
import * as Action from './actionType'
export interface ChangePassState {
    data: boolean;
    loading: boolean;
    error: string | null;
    codeInitial: number;
}
const initialState: ChangePassState = {
    data: false,
    loading: false,
    error: null,
    codeInitial: -1
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const ChangePasswordReducer = (state = initialState, { type, payload }: ActionProps): ChangePassState => {

    switch (type) {
        case Action.CHANGE_PASSWORD_START:
            return { ...state, loading: true, error: null, codeInitial: -1 }
        case Action.CHANGE_PASSWORD_SUCCESS:
            return { ...state, loading: false, data: payload, codeInitial: 0 }
        case Action.CHANGE_PASSWORD_FAIL:
            return { ...state, loading: false, error: payload.error }
        case Action.RESET_STATE_CHANGE_PASSWORD:
            return initialState;
        default:
            return state
    }
}
