import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* AppointmentDetailSaga() {
    yield takeLatest(Action.GET_APPOINTMENT_DETAIL_ACTION, Saga.onGetAppointmentDetail);
}
