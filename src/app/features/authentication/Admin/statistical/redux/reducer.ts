import { CODE_DEFAULT } from './../../../../../config/index';
import * as Action from './actionType'

export interface StatisticalState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    statisticalRes: any;
}

const initialState: StatisticalState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    statisticalRes: {},
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const StatisticalReducer = (state = initialState, { type, payload }: ActionProps): StatisticalState => {
    switch (type) {
         case Action.LOAD_THONG_BAO_COMPLETE:
            return { ...state, statisticalRes: payload }
        default:
            return state
    }
}
