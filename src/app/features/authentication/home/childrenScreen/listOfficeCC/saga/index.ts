import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ListNotaryOfficeSaga() {
    yield takeLatest(Action.GET_LIST_NOTARY_OFFICE, Saga.onGetListNotaryOffice);
    yield takeLatest(Action.GET_LIST_ADDRESS_CITY, Saga.onGetListAddressCity); 
    yield takeLatest(Action.GET_LIST_DISTRICT, Saga.onGetListDistrict);
    yield takeLatest(Action.GET_LIST_WARD, Saga.onGetListWard); 
    yield takeLatest(Action.GET_LIST_QUALIFICATION, Saga.onGetListQualification);
    yield takeLatest(Action.GET_LIST_EDUCATION_LEVEL, Saga.onGetListEducation);
    yield takeLatest(Action.LOAD_MORE_LIST_NOTARY_OFFICE, Saga.onLoadMoreListNotaryOffice);
    yield takeLatest(Action.REFRESH_LIST_NOTARY_OFFICE, Saga.onRefreshListNotaryOffice);
    yield takeLatest(Action.UPDATE_OFFICE, Saga.onUpdateOffice);
    yield takeLatest(Action.GET_LIST_NOTARY_OFFICE_BY_SERVICEID, Saga.onGetListNotaryOfficeByServiceId);
    yield takeLatest(Action.GET_LIST_NOTARY_SERVICE_BY_OFFICE_ID, Saga.onGetListNotaryServiceByOfficeId);
}
