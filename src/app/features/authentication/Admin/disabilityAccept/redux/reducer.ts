import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'
import { Alert } from 'react-native';
export interface DisabilityAcceptState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataCapNhatNoiDung: any;
    dataXacNhanKT: any;
}

const initialState: DisabilityAcceptState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataCapNhatNoiDung: undefined,
    dataXacNhanKT: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const DisabilityAcceptReducer = (state = initialState, { type, payload }: ActionProps): DisabilityAcceptState => {
    switch (type) {
        case Action.DEFAULT_ACTION:
            return { ...initialState }
        case Action.CAP_NHAT_NOI_DUNG_COMPLETE:
            return { ...state, dataCapNhatNoiDung: payload }
        case Action.XAC_NHAN_KT_COMPLETE:
            return { ...state, dataXacNhanKT: payload }
        default:
            return state
    }
}
