import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../../config/index';
import * as Action from './actionType'

export interface PersonalPaperState {
    loading: boolean;
    refresh: boolean;
    loadMore: boolean;
    isLoadEnd: boolean;
    error: string | null;
    codeRefresh: number;
    codeLoadMore: number;
    listPersonalPapers: Array<any>;
    finishDelete: boolean;
}
const initialState: PersonalPaperState = {
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    loading: false,
    refresh: false,
    loadMore: false,
    isLoadEnd: false,
    error: null,
    listPersonalPapers: [],
    finishDelete: false
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const PersonalPaperReducer = (state = initialState, { type, payload }: ActionProps): PersonalPaperState => {
    switch (type) {
        case Action.GET_LIST_PERSONAL_PAPER_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_PERSONAL_PAPER_SUCCESS:
            return { ...state, loading: false, listPersonalPapers: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_PERSONAL_PAPER_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }


        case Action.DELETE_PERSONAL_PAPER_START:
            return { ...state, loading: false, error: null }
        case Action.DELETE_PERSONAL_PAPER_SUCCESS:
            return { ...state, loading: false, finishDelete: true }
        case Action.DELETE_PERSONAL_PAPER_FAILED:
            return { ...state, loading: false, finishDelete: true }


        case Action.RESET_STATE_PERSONAL_PAPERS:
            return initialState;
        default:
            return state
    }
}
