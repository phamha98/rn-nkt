import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../../config/index';
import * as Action from './actionType'
export interface ListNotaryOfficeState {
    loading: boolean;
    refresh: boolean;
    loadMore: boolean;
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    listNotaryOffice: Array<any>;
    listNotaryServiceByOfficeId: Array<any>;
    listAddressCity: Array<any>;
    datalistDistrict: Array<any>;
    datalistWard: Array<any>;
    datalistEthnic: Array<any>;
    datalistQualification: Array<any>;
    datalistEducation: Array<any>;
    isLoadEnd: boolean;
    updateOffice: any
}

const initialState: ListNotaryOfficeState = {
    loading: false,
    loadMore: false,
    refresh: false,
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    listNotaryOffice: [],
    listNotaryServiceByOfficeId: [],
    listAddressCity: [],
    datalistDistrict: [],
    datalistWard: [],
    datalistEthnic: [],
    datalistQualification: [],
    datalistEducation: [],
    isLoadEnd: false,
    updateOffice: {}
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}
export const ListNotaryOfficeReducer = (state = initialState, { type, payload }: ActionProps): ListNotaryOfficeState => {
    switch (type) {
        case Action.GET_LIST_NOTARY_OFFICE_START:
            return { ...state, loading: true, error: null, listNotaryOffice: [] }
        case Action.GET_LIST_NOTARY_OFFICE_SUCCESS:
            return { ...state, loading: false, listNotaryOffice: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_NOTARY_OFFICE_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }

        case Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_START:
            return { ...state, loading: true, error: null, listNotaryOffice: [] }
        case Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_SUCCESS:
            return { ...state, loading: false, listNotaryOffice: payload }
        case Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }

        case Action.LOAD_MORE_LIST_NOTARY_OFFICE_START:
            return { ...state, loadMore: true, error: null, codeLoadMore: CODE_DEFAULT, listNotaryOffice: [] }
        case Action.LOAD_MORE_LIST_NOTARY_OFFICE_SUCCESS:
            return { ...state, loadMore: false, isLoadEnd: (Array.isArray(payload) && payload.length === 0) ? true : false, codeLoadMore: CODE_SUCCESS, listNotaryOffice: Array.isArray(payload) ? state.listNotaryOffice.concat(payload) : state.listNotaryOffice }
        case Action.LOAD_MORE_LIST_NOTARY_OFFICE_FAILED:
            return { ...state, loadMore: false, error: payload.error ? payload.error : "" }

        case Action.REFRESH_LIST_NOTARY_OFFICE_START:
            return { ...state, refresh: true, error: null, codeRefresh: CODE_DEFAULT, listNotaryOffice: [] }
        case Action.REFRESH_LIST_NOTARY_OFFICE_SUCCESS:
            return { ...state, refresh: false, codeRefresh: CODE_SUCCESS, listNotaryOffice: Array.isArray(payload) ? payload : state.listNotaryOffice }
        case Action.REFRESH_LIST_NOTARY_OFFICE_FAILED:
            return { ...state, refresh: false, error: payload.error ? payload.error : "" }

        case Action.GET_LIST_ADDRESS_CITY_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_ADDRESS_CITY_SUCCESS:
            return { ...state, loading: false, listAddressCity: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_ADDRESS_CITY_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_DISTRICT_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_DISTRICT_SUCCESS:
            return { ...state, loading: false, datalistDistrict: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_DISTRICT_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_WARD_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_WARD_SUCCESS:
            return { ...state, loading: false, datalistWard: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_WARD_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_ETHNIC_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_ETHNIC_SUCCESS:
            return { ...state, loading: false, datalistEthnic: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_ETHNIC_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_QUALIFICATION_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_QUALIFICATION_SUCCESS:
            return { ...state, loading: false, datalistQualification: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_QUALIFICATION_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_EDUCATION_LEVEL:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_EDUCATION_LEVEL_SUCCESS:
            return { ...state, loading: false, datalistEducation: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_EDUCATION_LEVEL_FAILED:
            return { ...state, loading: false }
            
        case Action.UPDATE_OFFICE_START:
            return { ...state, loading: true, error: null, codeRefresh: CODE_DEFAULT };
        case Action.UPDATE_OFFICE_SUCCESS:
            return { ...state, loading: false, codeRefresh: CODE_SUCCESS, updateOffice: payload };
        case Action.UPDATE_OFFICE_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" };


        case Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_START:
            return { ...state, listNotaryServiceByOfficeId: [] }
        case Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_SUCCESS:
            return { ...state, listNotaryServiceByOfficeId: Array.isArray(payload) ? payload : state.listNotaryServiceByOfficeId }
        case Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_FAILED:
            return { ...state, error: payload.error ? payload.error : "" }


        case Action.RESET_STATE_NOTARY_OFFICE:
            return initialState;

        default:
            return state
    }
}
