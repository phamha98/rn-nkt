import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* AppointmentSaga() {
    yield takeLatest(Action.GET_APPOINTMENT_ACTION, Saga.onGetAppointment);
}
