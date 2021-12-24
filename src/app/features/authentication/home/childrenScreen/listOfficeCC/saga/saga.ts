import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking/saga'
import * as Action from '../redux/actionType'
import { Alert } from 'react-native';
export function* onGetListNotaryOffice({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_NOTARY_OFFICE_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    if (response.status) {
        yield put({ type: Action.GET_LIST_NOTARY_OFFICE_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_NOTARY_OFFICE_FAILED, payload: { error: response.error } })
    }
}
export function* onGetListNotaryOfficeByServiceId({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    //console.log('Get list office by service id success: ',response.data)
    if (response.data) {
        yield put({ type: Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID_FAILED, payload: { error: 'Data null' } })
    }
}
export function* onGetListNotaryServiceByOfficeId({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    //console.log('onGetListNotaryServiceByOfficeId: ',response.data)
    if (response.data) {
        yield put({ type: Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID_FAILED, payload: { error: 'Data null' } })
    }
}
export function* onLoadMoreListNotaryOffice({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.LOAD_MORE_LIST_NOTARY_OFFICE_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    if (response.status) {
        yield put({ type: Action.LOAD_MORE_LIST_NOTARY_OFFICE_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.LOAD_MORE_LIST_NOTARY_OFFICE_FAILED, payload: { error: response.error } })
    }
}
export function* onRefreshListNotaryOffice({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.REFRESH_LIST_NOTARY_OFFICE_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    if (response.status) {
        yield put({ type: Action.REFRESH_LIST_NOTARY_OFFICE_SUCCESS, payload: response.data })
    } else {
        yield put({ type: Action.REFRESH_LIST_NOTARY_OFFICE_FAILED, payload: { error: response.error } })
    }
}
export function* onGetListAddressCity({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.GET_LIST_ADDRESS_CITY_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_LIST_ADDRESS_CITY_SUCCESS, payload: response.data })
}
export function* onGetListDistrict({ url, payload }: { url: string, payload: any }) {
    // yield put({ type: Action.GET_LIST_DISTRICT_START })
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    //console.log('datadistrict',response)
    yield put({ type: Action.GET_LIST_DISTRICT_SUCCESS, payload: response.data })
}
export function* onGetListWard({ url, payload }: { url: string, payload: any }) {
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_LIST_WARD_SUCCESS, payload: response.data })
}
export function* onGetListQualification({ url, payload }: { url: string, payload: any }) {
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_LIST_QUALIFICATION_SUCCESS, payload: response.data })
}
export function* onGetListEducation({ url, payload }: { url: string, payload: any }) {
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_LIST_EDUCATION_LEVEL_SUCCESS, payload: response.data })
}

export function* onUpdateOffice({ url, payload }: { url: string, payload: any }) {
    yield put({ type: Action.UPDATE_OFFICE_START });
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Post(url, payload);
    //console.log('Update vpcc + staff',response);
    if (response.status) {
        yield put({ type: Action.UPDATE_OFFICE_SUCCESS, payload: response })
    } else {
        yield put({ type: Action.UPDATE_OFFICE_FAILED, payload: { error: response.error } })
    }
}
