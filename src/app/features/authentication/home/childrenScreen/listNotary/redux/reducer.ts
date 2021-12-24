import { CODE_DEFAULT, CODE_SUCCESS } from './../../../../../../config/index';
import * as Action from './actionType'
export interface ListNotaryStaffState {
    loading: boolean;
    refresh: boolean;
    loadMore: boolean;
    error: string | null;
    codeLoadMore: number;
    codeRefresh: number;
    listNotaryStaff: Array<any>;
    listMarkers: Array<any>;
    listAddressCity: Array<any>;
    datalistDistrict: Array<any>;
    isLoadEnd: boolean;
    staffSelected: any
}

const initialState: ListNotaryStaffState = {
    loading: false,
    loadMore: false,
    refresh: false,
    error: null,
    codeLoadMore: CODE_DEFAULT,
    codeRefresh: CODE_DEFAULT,
    listNotaryStaff: [],
    listMarkers: [],
    listAddressCity: [],
    datalistDistrict: [],
    isLoadEnd: false,
    staffSelected: {}
}
interface ActionProps {
    type: keyof typeof Action;
    payload: any;
}

export const ListNotaryStaffReducer = (state = initialState, { type, payload }: ActionProps): ListNotaryStaffState => {
    switch (type) {
        case Action.GET_LIST_NOTARY_STAFF_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_NOTARY_STAFF_SUCCESS:
            return { ...state, loading: false, listNotaryStaff: Array.isArray(payload) ? payload : [], listMarkers: onSetListMarkers(payload) }
        case Action.GET_LIST_NOTARY_STAFF_FAILED:
            return { ...state, loading: false, error: payload.error ? payload.error : "" }

        case Action.LOAD_MORE_LIST_NOTARY_STAFF_START:
            return { ...state, loadMore: true, error: null, codeLoadMore: CODE_DEFAULT }
        case Action.LOAD_MORE_LIST_NOTARY_STAFF_SUCCESS:
            return { ...state, loadMore: false, isLoadEnd: (Array.isArray(payload) && payload.length === 0) ? true : false, codeLoadMore: CODE_SUCCESS, listNotaryStaff: Array.isArray(payload) ? state.listNotaryStaff.concat(payload) : state.listNotaryStaff }
        case Action.LOAD_MORE_LIST_NOTARY_STAFF_FAILED:
            return { ...state, loadMore: false, error: payload.error ? payload.error : "" }

        case Action.REFRESH_LIST_NOTARY_STAFF_START:
            return { ...state, refresh: true, error: null, codeRefresh: CODE_DEFAULT }
        case Action.REFRESH_LIST_NOTARY_STAFF_SUCCESS:
            return { ...state, refresh: false, codeRefresh: CODE_SUCCESS, listNotaryStaff: Array.isArray(payload) ? payload : state.listNotaryStaff, listMarkers: Array.isArray(payload) ? onSetListMarkers(payload) : onSetListMarkers(state.listNotaryStaff) }
        case Action.REFRESH_LIST_NOTARY_STAFF_FAILED:
            return { ...state, refresh: false, error: payload.error ? payload.error : "" }

        case Action.GET_LIST_ADDRESS_NOTARY_CITY_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_ADDRESS_NOTARY_CITY_SUCCESS:
            return { ...state, loading: false, listAddressCity: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_ADDRESS_NOTARY_CITY_FAILED:
            return { ...state, loading: false }

        case Action.GET_LIST_DISTRICT_NOTARY_START:
            return { ...state, loading: true, error: null }
        case Action.GET_LIST_DISTRICT_NOTARY_SUCCESS:
            return { ...state, loading: false, datalistDistrict: Array.isArray(payload) ? payload : [] }
        case Action.GET_LIST_DISTRICT_NOTARY_FAILED:
            return { ...state, loading: false }

        case Action.REMOVE_LIST:
            return { ...state, listNotaryStaff: [] }
        case Action.SAVE_STAFF_SELECTED:
            return { ...state, staffSelected: payload };

        case Action.RESET_STATE_NOTARY_STAFF:
            return initialState;

        default:
            return state
    }


}
const onSetListMarkers = (listNotaryStaff: Array<any>) => {
    let listNewMarker = [];
    listNotaryStaff.map((item: any) => {
        if (!Array.isArray(listNotaryStaff)) {
            return [];
        }

        if (listNewMarker.length > 0) {
            if (item.lat && item.lng && item.lat.length > 0 && item.lng.length > 0) {
                let isAdd = true;
                for (let i = 0; i < listNewMarker.length; i++) {
                    if (listNewMarker[i].lat === item.lat && listNewMarker[i].lng === item.lng) {
                        isAdd = false;
                    }
                }
                if (isAdd) {
                    listNewMarker.push(item);
                }
            }
        } else {
            if (item.lat && item.lng && item.lat.length > 0 && item.lng.length > 0) {
                listNewMarker.push(item);
            }
        }

    });
    return listNewMarker;
}
