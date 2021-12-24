import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking/saga'
import * as Action from '../redux/actionType'

export function* onAppointmentCreate({ url, payload }: { url: string, payload: any }) {
    const response: { data: any } = yield ServiceSaga.Post(url, payload);
        yield put({ type: Action.APPOINTMENT_CREATE_COMPLETE, payload: response })
}

