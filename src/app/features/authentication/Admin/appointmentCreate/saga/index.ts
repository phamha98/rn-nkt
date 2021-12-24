import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* AppointmentCreateSaga() {
    yield takeLatest(Action.APPOINTMENT_CREATE_ACTION, Saga.onAppointmentCreate);
}
