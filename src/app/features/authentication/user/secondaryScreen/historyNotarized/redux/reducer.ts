import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../../config/index';
import * as Action from './actionType'

export interface HistoryNotaryState {
    loading: boolean;
    refresh: boolean;
    loadMore: boolean;
    isLoadEnd: boolean;
    error: string | null;
    codeRefresh: number;
    codeLoadMore: number;
    listHistoryNotary: Array<any>;
}
const initialState: HistoryNotaryState = {
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    loading: false,
    refresh: false,
    loadMore: false,
    isLoadEnd: false,
    error: null,
    listHistoryNotary: []
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const HistoryNotaryReducer = (state = initialState, { type, payload }: ActionProps): HistoryNotaryState => {
    switch (type) {
        case Action.GET_LIST_HISTORY_NOTARY_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_HISTORY_NOTARY_SUCCESS:
            return { ...state, loading: false, listHistoryNotary: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_HISTORY_NOTARY_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }

        case Action.LOAD_MORE_LIST_HISTORY_NOTARY_START:
            return { ...state, loadMore: true, error: null, codeLoadMore: CODE_DEFAULT }
        case Action.LOAD_MORE_LIST_HISTORY_NOTARY_SUCCESS:
            return { ...state, loadMore: false, isLoadEnd: (Array.isArray(payload) && payload.length === 0) ? true : false, codeLoadMore: CODE_SUCCESS, listHistoryNotary: Array.isArray(payload) ? payload : [] }
        case Action.LOAD_MORE_LIST_HISTORY_NOTARY_FAILED:
            return { ...state, loadMore: false, error: payload.error ? payload.error : "" }

        case Action.REFRESH_LIST_HISTORY_NOTARY_START:
            return { ...state, refresh: true, error: null, codeRefresh: CODE_DEFAULT }
        case Action.REFRESH_LIST_HISTORY_NOTARY_SUCCESS:
            return { ...state, refresh: false, codeRefresh: CODE_SUCCESS, listHistoryNotary: Array.isArray(payload) ? payload : state.listHistoryNotary }
        case Action.REFRESH_LIST_HISTORY_NOTARY_FAILED:
            return { ...state, refresh: false, error: payload.error ? payload.error : "" }

        case Action.RESET_STATE_HISTORY_NOTARY:
            return initialState;

        default:
            return state
    }
}
