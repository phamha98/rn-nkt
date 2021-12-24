import {put, takeLatest, call} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* NotificationSaga() {
  yield takeLatest(Action.GET_LIST_NOTIFICATION, Saga.onGetListNotification);
  yield takeLatest(Action.GET_LIST_NEW_NOTIFICATION, Saga.onGetListNewNotification);
  yield takeLatest(Action.GET_DETAIL_NOTIFICATION, Saga.onGetDetailNotification);
  yield takeLatest(Action.CLICK_NOTIFICATION, Saga.onClickNotification);
  yield takeLatest(Action.LOAD_MORE_LIST_NOTIFICATION, Saga.onLoadMoreListNotification);
  yield takeLatest(Action.XAC_DINH_MUC_DO, Saga.onXacDinhMucDo);
}
