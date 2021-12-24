import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../config/index';
import * as Action from './actionType'

export interface DisabilityDetailState {
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    dataDetailDisability: any;
    dataDuyetTiepNhan: any,
    dataKhongDuyetTiepNhan: any,
}

const initialState: DisabilityDetailState = {
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    dataDetailDisability: undefined,
    dataDuyetTiepNhan: undefined,
    dataKhongDuyetTiepNhan: undefined,
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const DisabilityDetailReducer = (state = initialState, { type, payload }: ActionProps): DisabilityDetailState => {
    switch (type) {
        case Action.DEFAULT_ACTION:
            return { ...initialState }
        case Action.GET_DETAIL_DISABILITY_COMPLETE:
            return { ...state, dataDetailDisability: payload }
        case Action.DUYET_TIEP_NHAN_COMPLETE:
            return { ...state, dataDuyetTiepNhan: payload }
        case Action.KHONG_DUYET_TIEP_NHAN_COMPLETE:
            return { ...state, dataKhongDuyetTiepNhan: payload }
        default:
            return state
    }
}
