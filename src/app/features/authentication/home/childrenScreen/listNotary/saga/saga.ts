import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking/saga'
import * as Action from '../redux/actionType'
export function* onGetListNotaryStaff({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_NOTARY_STAFF_START })
    const response = yield ServiceSaga.Get(url, payload);
    //console.log('ccv',response)
    //console.log('ccv',url)
    //console.log('ccv',payload)
    if (response.data) {
        yield put({ type: Action.GET_LIST_NOTARY_STAFF_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_NOTARY_STAFF_FAILED, payload: { error: response.error } })
    }
}
export function* onLoadMoreListNotaryStaff({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.LOAD_MORE_LIST_NOTARY_STAFF_START })
    const response = yield ServiceSaga.Get(url, payload);
    if (response.data) {
        yield put({ type: Action.LOAD_MORE_LIST_NOTARY_STAFF_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.LOAD_MORE_LIST_NOTARY_STAFF_FAILED, payload: { error: response.error } })
    }
}
export function* onRefreshListNotaryStaff({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.REFRESH_LIST_NOTARY_STAFF_START })
    const response: { total: number, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    if (response.data) {
        yield put({ type: Action.REFRESH_LIST_NOTARY_STAFF_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.REFRESH_LIST_NOTARY_STAFF_FAILED, payload: { error: response.error } })
    }
}
export function* onGetListAddressCity({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_ADDRESS_NOTARY_CITY_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.GET_LIST_ADDRESS_NOTARY_CITY_SUCCESS, payload: response.arrData })
}
export function* onGetListDistrict({ url, payload }: { url: string, payload: any }) {
    // yield put({ type: Action.GET_LIST_DISTRICT_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.GET_LIST_DISTRICT_NOTARY_SUCCESS, payload: response.arrData })
}
