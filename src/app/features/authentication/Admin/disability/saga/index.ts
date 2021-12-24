import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* DisabilitySaga() {
    yield all([
        takeLatest(Action.GET_REQUEST_CONFIRM_DISABILITY_ACTION, Saga.onGetRequestConfirmDisability),
        takeLatest(Action.ACCEPT_REQUEST_CONFIRM_DISABILITY_ACTION, Saga.onAcceptRequestConfirmDisability),
        takeLatest(Action.REJECT_REQUEST_CONFIRM_DISABILITY_ACTION, Saga.onRejectRequestConfirmDisability)
    ])
}
