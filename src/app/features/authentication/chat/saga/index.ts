import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ChatSaga() {
  yield takeLatest(Action.GET_LIST_ROOM_CHAT, Saga.getListRoomChat);
  yield takeLatest(Action.REFRESH_LIST_ROOM_CHAT, Saga.refreshListMessage);
  yield takeLatest(Action.JOIN_ROOM, Saga.joinRoomChat);
  yield takeLatest(Action.CREATE_ROOM, Saga.createRoomChat);
  yield takeLatest(Action.GET_MESSAGE, Saga.getListMessage);
  yield takeLatest(Action.GET_INFO_ROOM, Saga.getInfoRoomChat);
  yield takeLatest(Action.SEND_MESSAGE, Saga.sendMessage);
  yield takeLatest(Action.UPDATE_READ_MESSAGE, Saga.updateReadMessage);
}
