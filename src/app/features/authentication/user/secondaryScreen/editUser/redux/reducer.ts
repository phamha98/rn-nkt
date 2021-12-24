import * as Action from './actionType'
import {
    CODE_DEFAULT,
    CODE_ERROR,
    CODE_SUCCESS,
    STATUS_SUCCESS,
    STATUS_ERROR
  } from '../../../../../../config/index';

export interface CreateNotaryState {
    loading: boolean;
    status: boolean,
    codeInitial: number;
    documentaryID: number;
    datalistEthnic: Array<any>;
    lisEthnic: Array<any>;
    error: string | null;
}
const initialState: CreateNotaryState = {
    loading: false,
    status: false,
    codeInitial: -1,
    documentaryID: -1,
    datalistEthnic: [],
    lisEthnic : [],
    error: null,
    
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const EditUserReducer = (state = initialState, { type, payload }: ActionProps): CreateNotaryState => {
    switch (type) {
        case Action.POST_EDIT_BY_USER_START:
            return { ...state, loading: true, status: false }
        case Action.POST_EDIT_BY_USER_SUCCESS:
            return { ...state, loading: false, status: true }
        case Action.POST_EDIT_BY_USER_FAILED:
            return { ...state, loading: false, status: false }
        case Action.RESET_STATE_EDIT_USER:
            return initialState;
        default:
            return state

        case Action.GET_LIST_ETHNIC_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_ETHNIC_SUCCESS:
            return { ...state, loading: false, datalistEthnic: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_ETHNIC_FAILED:
            return { ...state, loading: false }
    }
}
