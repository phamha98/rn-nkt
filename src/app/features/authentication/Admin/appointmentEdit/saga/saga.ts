import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onGetAppointmentDetail({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Get(url, payload);
        yield put({ type: Action.GET_APPOINTMENT_DETAIL_COMPLETE, payload: response })
}

export function* onAppointmentUpdate({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.GET_APPOINTMENT_UPDATE_COMPLETE, payload: response })
}

