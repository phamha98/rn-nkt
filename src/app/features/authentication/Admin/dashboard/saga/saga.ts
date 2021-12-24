import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../library/networking';
import * as Action from '../redux/actionType';
export function* onGetListNotification({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) {
  yield put({ type: Action.GET_LIST_NOTIFICATION_START });
  const response: {
    status: boolean;
    error: string;
    data: any;
  } = yield ServiceSaga.Get(url, payload);
  //console.log('Get list notification: ', response);
  if (response.status) {
    yield put({ type: Action.GET_LIST_NOTIFICATION_SUCCESS, payload: response });
  } else {
    yield put({
      type: Action.GET_LIST_NOTIFICATION_FAILED,
      payload: { error: response.error },
    });
  }
}
export function* onLoadMoreListNotification({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) {
  yield put({ type: Action.LOAD_MORE_LIST_NOTIFICATION_START });
  const response: {
    status: boolean;
    error: string;
    data: any;
  } = yield ServiceSaga.Get(url, payload);
  //console.log('onLoadMoreListNotification: ', response);
  if (response.status) {
    yield put({ type: Action.LOAD_MORE_LIST_NOTIFICATION_SUCCESS, payload: response });
  } else {
    yield put({
      type: Action.LOAD_MORE_LIST_NOTIFICATION_FAILED,
      payload: { error: response.error },
    });
  }
}

export function* onGetListNewNotification({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) {
  yield put({ type: Action.GET_LIST_NEW_NOTIFICATION_START });
  const response: {
    status: boolean;
    error: string;
    data: any;
  } = yield ServiceSaga.Get(url, payload);
  //console.log('Get list new notification: ', response);
  if (Array.isArray(response.data) && response.data.length > 0) {
    yield put({
      type: Action.GET_LIST_NEW_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: Action.GET_LIST_NEW_NOTIFICATION_FAILED,
      payload: { error: response.error },
    });
  }
}

export function* onGetDetailNotification({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) {
  yield put({ type: Action.GET_DETAIL_NOTIFICATION_START });
  const response: {
    status: boolean;
    error: string;
    data: any;
  } = yield ServiceSaga.Get(url, payload);
  //console.log('Get detail notification: ', response);
  if (response.status) {
    yield put({
      type: Action.GET_DETAIL_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } else {
    yield put({
      type: Action.GET_DETAIL_NOTIFICATION_FAILED,
      payload: { error: response.error },
    });
  }
}
export function* onClickNotification({ url, payload }: { url: string, payload: any }) {
  yield put({ type: Action.CLICK_NOTIFICATION_START });
  const response: { status: boolean, error: string, result: any } = yield ServiceSaga.Post(url, payload);
  //console.log('onClickNotification: ', response);
  if (response.result) {
    yield put({ type: Action.CLICK_NOTIFICATION_SUCCESS, payload: response.result })
  } else {
    yield put({ type: Action.CLICK_NOTIFICATION_FAILED, payload: { error: response } })
  }
}
export function* onXacDinhMucDo({ url, payload }: { url: string, payload: any }) {
  yield put({ type: Action.XAC_DINH_MUC_DO_START });
  const response: { status: boolean, error: string, result: any } = yield ServiceSaga.Post(url, payload);
  if (response.result) {
    yield put({ type: Action.XAC_DINH_MUC_DO_SUCCESS, payload: response.result })
  } else {
    yield put({ type: Action.XAC_DINH_MUC_DO_FAILED, payload: { error: response } })
  }
}