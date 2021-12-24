import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* EditUserSaga() {
    yield takeLatest(Action.POST_EDIT_BY_USER, Saga.onPostEditUser);
     yield takeLatest(Action.GET_LIST_ETHNIC, Saga.onGetListEthnic);
}
