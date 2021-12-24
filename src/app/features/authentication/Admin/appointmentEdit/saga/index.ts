import { put, takeLatest, all } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* AppointmentEditSaga() {
    yield all([
        takeLatest(Action.GET_APPOINTMENT_DETAIL_ACTION, Saga.onGetAppointmentDetail),
        takeLatest(Action.GET_APPOINTMENT_UPDATE_ACTION, Saga.onAppointmentUpdate)
    ])
    
}
