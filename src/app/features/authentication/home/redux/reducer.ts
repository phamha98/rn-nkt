import { CODE_DEFAULT } from './../../../../config/index';
import * as Action from './actionType';
export interface HomeTabState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataDetailUser: any;
}

const initialState: HomeTabState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataDetailUser: {},
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const HomeTabReducer = (state = initialState, { type, payload }: ActionProps): HomeTabState => {
    switch (type) {
        case Action.GET_DETAIL_USER_SUCCESS:
            return { ...state, dataDetailUser: payload }
        case Action.RESET_DETAIL_USER:
            return initialState  
        default:
            return state
    }
}
