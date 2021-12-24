import * as Action from './actionType';

export const createRoomChat = (url: string, payload: any) => ({
  type: Action.CREATE_ROOM,
  url,
  payload,
});

export const refreshListRoomChat = (url: string, payload: any) => ({
  type: Action.REFRESH_LIST_ROOM_CHAT,
  url,
  payload,
});

export const getListRoomChat = (url: string, payload: any) => ({
  type: Action.GET_LIST_ROOM_CHAT,
  url,
  payload,
});

export const joinRoomChat = (url: string, payload: any) => ({
  type: Action.JOIN_ROOM,
  url,
  payload,
});

export const addMessage = (payload: any) => ({
  type: Action.ADD_MESSAGE,
  payload
});

export const saveRoomWorking = () => ({
  type: Action.SAVE_ROOM_WORKING,
});

export const resetRoomWorking = () => ({
  type: Action.RESET_ROOM_WORKING,
});

export const getListMessage = (url: string, payload: any) => ({
  type: Action.GET_MESSAGE,
  url,
  payload,
});

export const sendMessage = (url: string, payload: any) => ({
  type: Action.SEND_MESSAGE,
  url,
  payload,
});

export const getInfoRoomChat = (url: string, payload: any) => ({
  type: Action.GET_INFO_ROOM,
  url,
  payload,
});

export const updateReadMessage = (url: string, payload: any) => ({
  type: Action.UPDATE_READ_MESSAGE,
  url,
  payload,
});

export const onResetAllStateChat = () => ({
  type: Action.RESET_STATE_ALL,
});
