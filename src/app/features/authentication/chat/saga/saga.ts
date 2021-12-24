import {put} from 'redux-saga/effects';
import {ServiceSaga} from '../../../../library/networking';
import * as Action from '../redux/actionType';
export function* getListRoomChat({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.GET_LIST_ROOM_CHAT_START});
  const response = yield ServiceSaga.Get(url, payload);
  //console.log('Get api list room', response);
  if (response.data) {
    yield put({type: Action.GET_LIST_ROOM_CHAT_SUCCESS, payload: response});
  } else {
    yield put({
      type: Action.GET_LIST_ROOM_CHAT_FAILED,
      payload: {error: response.error},
    });
  }
}

export function* createRoomChat({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.CREATE_ROOM_START});
  const response = yield ServiceSaga.Post(url, payload);
  //console.log('Get api list room', response);
  if (response.result) {
    yield put({type: Action.CREATE_ROOM_SUCCESS, payload: response.result});
  } else {
    yield put({
      type: Action.CREATE_ROOM_FAILED,
      payload: {error: response},
    });
  }
}

export function* joinRoomChat({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.JOIN_ROOM_START});
  const response = yield ServiceSaga.Post(url, payload);
  //console.log('Api join room', response);
  if (response.result) {
    yield put({type: Action.JOIN_ROOM_SUCCESS, payload: response.result});
  } else {
    yield put({
      type: Action.JOIN_ROOM_FAILED,
      payload: {error: response},
    });
  }
}

export function* sendMessage({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.SEND_MESSAGE_START});
  const response = yield ServiceSaga.Post(url, payload);
  //console.log('Api send message', response);
  if (response.result) {
    yield put({type: Action.SEND_MESSAGE_SUCCESS, payload: response.result});
  } else {
    yield put({
      type: Action.SEND_MESSAGE_FAILED,
      payload: {error: response.error},
    });
  }
}
export function* refreshListMessage({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.REFRESH_LIST_ROOM_CHAT_START});
  const response = yield ServiceSaga.Get(url, payload);
  //console.log('Get api list message', response);
  if (response) {
    yield put({type: Action.REFRESH_LIST_ROOM_CHAT_SUCCESS, payload: response});
  } else {
    yield put({
      type: Action.REFRESH_LIST_ROOM_CHAT_FAILED,
      payload: {error: response},
    });
  }
}
export function* getListMessage({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.GET_MESSAGE_START});
  const response = yield ServiceSaga.Get(url, payload);
  //console.log('Get api list message', response);
  if (response) {
    yield put({type: Action.GET_MESSAGE_SUCCESS, payload: response});
  } else {
    yield put({
      type: Action.GET_MESSAGE_FAILED,
      payload: {error: response},
    });
  }
}

export function* getInfoRoomChat({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.GET_INFO_ROOM_START});
  const response: {
    status: boolean;
    error: string;
    data: any;
  } = yield ServiceSaga.Get(url, payload);
  //console.log('Get api info room', response);
  if (response.status) {
    yield put({type: Action.GET_INFO_ROOM_SUCCESS, payload: response});
  } else {
    yield put({
      type: Action.GET_INFO_ROOM_FAILED,
      payload: {error: response.error},
    });
  }
}

export function* updateReadMessage({url, payload}: {url: string; payload: any}) {
  yield put({type: Action.UPDATE_READ_MESSAGE_START});
  const response = yield ServiceSaga.Post(url, payload);
  //console.log('Get api info room', response);
  if (response > 0) {
    yield put({type: Action.UPDATE_READ_MESSAGE_SUCCESS, payload: response});
  } else {
    yield put({
      type: Action.UPDATE_READ_MESSAGE_FAILED,
      payload: {error: response.error},
    });
  }
}
