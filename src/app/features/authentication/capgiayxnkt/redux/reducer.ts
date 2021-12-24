import { CODE_DEFAULT } from './../../../../config/index';
import * as Action from './actionType';
export interface HomeTabState {
    error: string | null;
    codeRefresh: number;
    data: any;
}
export interface PostTabState {
    error: string | null;
    codeRefresh: number;
    data: any;
}

const initialState: HomeTabState = {
    error: null,
    codeRefresh: CODE_DEFAULT,
    data: {},
};
const initialStatePost: PostTabState = {
    error: null,
    codeRefresh: CODE_DEFAULT,
    data: {},
};
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const CapGiayXNKTReducer = (state = initialState, { type, payload }: ActionProps): HomeTabState => {
    switch (type) {
        case Action.GET_DATA_CAPGIAYXNKT_SUCCESS:
            return { ...state, data: payload }
            case Action.RESET_DATA_CAPGIAYXNKT:
            return initialState 
        default:
            return state
    }
};

export const PostCapGiayXNKTReducer = (state = initialStatePost, { type, payload }: ActionProps): PostTabState => {
    switch (type) {
        case Action.POST_CAPGIAYXNKT_SUCCESS:
            return { ...state, data: payload }
        default:
            return state
    }
}
