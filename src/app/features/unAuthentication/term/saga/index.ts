import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* TermSaga() {
    yield takeLatest(Action.GET_TERM, Saga.getTerm);
    yield takeLatest(Action.GET_PRIVACY, Saga.getPrivacy);
}
