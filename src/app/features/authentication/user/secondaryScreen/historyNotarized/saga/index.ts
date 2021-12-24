import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ListNotaryHistorySaga() {
    yield takeLatest(Action.GET_LIST_HISTORY_NOTARY, Saga.onGetListNotaryHistory);
    yield takeLatest(Action.LOAD_MORE_LIST_HISTORY_NOTARY, Saga.onLoadMoreListNotaryHistory);
    yield takeLatest(Action.REFRESH_LIST_HISTORY_NOTARY, Saga.onRefreshListNotaryHistory);
}
