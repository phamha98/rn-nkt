import { CODE_DEFAULT } from '../../../../config';
import * as Action from './actionType';

export interface ChatState {
  loading: boolean;
  refresh: boolean;
  loadMore: boolean;
  error: string | null;
  codeLoadMore: number;
  codeRefresh: number;
  listRoomChat: any;
  infoRoom: any;
  listMessage: any;
  statusJoin: boolean;
  roomWorking: any;
  roomJoined: any;
}

const initialState: ChatState = {
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  codeLoadMore: CODE_DEFAULT,
  codeRefresh: CODE_DEFAULT,
  listRoomChat: [],
  infoRoom: {},
  listMessage: {},
  statusJoin: false,
  roomWorking: -1,
  roomJoined: -1,
};

interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}

export const ChatReducer = (
  state = initialState,
  { type, payload }: ActionProps,
): ChatState => {
  switch (type) {
    // save room working
    case Action.SAVE_ROOM_WORKING:
      return {
        ...state,
        roomWorking: payload,
      };
    // refresh list room
    case Action.REFRESH_LIST_ROOM_CHAT_START:
      return { ...state, refresh: true }
    case Action.REFRESH_LIST_ROOM_CHAT_SUCCESS:
      return { ...state, refresh: false, listRoomChat: payload }
    case Action.REFRESH_LIST_ROOM_CHAT_FAILED:
      return { ...state, refresh: false }
    // get list room
    case Action.GET_LIST_ROOM_CHAT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.GET_LIST_ROOM_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        listRoomChat: payload,
      };
    case Action.GET_LIST_ROOM_CHAT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };

    // create room chat
    case Action.CREATE_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        // loading: false,
        roomWorking: payload,
      };
    case Action.CREATE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };

    // join room
    case Action.JOIN_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.JOIN_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        roomJoined: payload,
      };
    case Action.JOIN_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };

    // get info room
    case Action.GET_INFO_ROOM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.GET_INFO_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        infoRoom: payload,
      };
    case Action.GET_INFO_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };

    // Get list message
    case Action.GET_MESSAGE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.GET_MESSAGE_SUCCESS:
      //console.log('GET_MESSAGE_SUCCESS', payload.data);
      if (Array.isArray(payload.data) && payload.data.length > 0) {
        payload.data.map((message: any, index: number) => {
          let typeid = message.typeid ? message.typeid : 1
          try {
            switch (typeid) {
              case 1:
              case 2:
              case 3: {
                payload.data[index] = {
                  _id: message.id && message.id,
                  user: {
                    _id: message.userid && message.userid,
                    name: message.fullname && message.fullname,
                    avatar: message.avatar && message.avatar,
                  },
                  roomid: message.roomid,
                  text: message.messenger,
                  type: typeid,
                  createdAt: message.createddate && message.createddate,
                };
              }; break;
              case 4: {
                payload.data[index] = {
                  _id: message.id && message.id,
                  user: {
                    _id: message.userid && message.userid,
                    name: message.fullname && message.fullname,
                    avatar: message.avatar && message.avatar,
                  },
                  roomid: message.roomid,
                  map: message.messenger && JSON.parse(message.messenger).coordinate,
                  type: typeid,
                  createdAt: message.createddate && message.createddate,
                };
              }
            }

          } catch (e) {
            payload.data[index] = {
              _id: message.id && message.id,
              user: {
                _id: message.userid && message.userid,
                name: message.fullname && message.fullname,
                avatar: message.avatar && message.avatar,
              },
              roomid: message.roomid,
              text: message.messenger && message.messenger,
              type: 1,
              createdAt: message.createddate && message.createddate,
            };
          }
        });
      }
      return Object.assign({}, state, {
        loading: false,
        listMessage: payload,
      });
    case Action.GET_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };
    case Action.RESET_ROOM_WORKING:
      return {
        ...state,
        roomJoined: -1,
        roomWorking: -1,
      };

    // add message
    case Action.ADD_MESSAGE:
      let newList = payload;
      if (state.listMessage.data && Array.isArray(state.listMessage.data)) {
        newList = payload.concat(state.listMessage.data);
      }
      return Object.assign({}, state, {
        listMessage: {
          ...state.listMessage,
          data: newList,
        },
      });

      //update read message
      case Action.UPDATE_READ_MESSAGE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.UPDATE_READ_MESSAGE_SUCCESS:
      return {
        ...state,
        // loading: false,
      };
    case Action.UPDATE_READ_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };


    // join room
    case Action.SEND_MESSAGE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Action.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Action.SEND_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error ? payload.error : '',
      };
    case Action.RESET_STATE_LIST_ROOM_CHAT:
      return initialState;

    default:
      return state;
  }
};
