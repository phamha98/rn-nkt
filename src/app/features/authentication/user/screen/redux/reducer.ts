import { CODE_DEFAULT, CODE_SUCCESS } from '../../../../../config/index';
import * as Action from './actionType';

export interface UpdateAvatarState {
    loading: boolean;
    error: string | null;
    status: boolean
}
const initialState: UpdateAvatarState = {
    loading: false,
    error: null,
    status: false,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const UpdateAvatarReducer = (state = initialState, { type, payload }: ActionProps): UpdateAvatarState => {
    switch (type) {
        case Action.UPDATE_AVATAR_START:
            return { ...state, loading: true, error: null }
        case Action.UPDATE_AVATAR_SUCCESS:
            return { ...state, loading: false, status: true }
        case Action.UPDATE_AVATAR_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }
            case Action.RESET_STATE_UPDATE_AVATAR:
                return initialState;
        default:
            return state
    }
}
