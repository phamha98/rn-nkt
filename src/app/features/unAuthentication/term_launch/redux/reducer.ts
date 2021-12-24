
import * as Action from './actionType'

export interface TermState {
    loading: boolean;
    error: string | null;
    term: any;
    privacy: any;
}

const initialState: TermState = {
    loading: false,
    error: null,
    term: '',
    privacy: ''
};

interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const TermReducer = (
  state = initialState,
  {type, payload}: ActionProps,
): TermState => {
    switch (type) {
        case Action.GET_TERM_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case Action.GET_TERM_SUCCESS:
            return {
                ...state,
                loading: false,
                term: payload
            };
        case Action.GET_TERM_FAILED:
            return {
                ...state,
                loading: false,
                error: payload.error ? payload.error : '',
            };

        case Action.GET_PRIVACY_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case Action.GET_PRIVACY_SUCCESS:
            return {
                ...state,
                loading: false,
                privacy: payload
            };
        case Action.GET_PRIVACY_FAILED:
            return {
                ...state,
                loading: false,
                error: payload.error ? payload.error : '',
            };

        case Action.RESET_STATE_TERM:
            return initialState;

        default:
            return state
    }
};
