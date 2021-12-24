import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ListPersonalPapersSaga() {
    yield takeLatest(Action.GET_LIST_PERSONAL_PAPER, Saga.onGetListPersonalPapers);
    yield takeLatest(Action.DELETE_PERSONAL_PAPER, Saga.onDeletePersonalPapers);
}
