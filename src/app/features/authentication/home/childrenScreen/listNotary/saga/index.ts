import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ListNotaryStaffSaga() {
    yield takeLatest(Action.GET_LIST_NOTARY_STAFF, Saga.onGetListNotaryStaff);
    yield takeLatest(Action.GET_LIST_ADDRESS_NOTARY_CITY, Saga.onGetListAddressCity);
    yield takeLatest(Action.GET_LIST_DISTRICT_NOTARY, Saga.onGetListDistrict);
    yield takeLatest(Action.LOAD_MORE_LIST_NOTARY_STAFF, Saga.onLoadMoreListNotaryStaff);
    yield takeLatest(Action.REFRESH_LIST_NOTARY_STAFF, Saga.onRefreshListNotaryStaff);
}
