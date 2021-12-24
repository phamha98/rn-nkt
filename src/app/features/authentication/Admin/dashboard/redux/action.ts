import * as Action from './actionType';
export const onXacDinhMucDo = (url: string, payload: any) => ({
  type: Action.XAC_DINH_MUC_DO,
  url,
  payload,
});

export const onGetListNotification = (url: string, payload: any) => ({
  type: Action.GET_LIST_NOTIFICATION,
  url,
  payload,
});

export const onLoadMoreListNotification = (url: string, payload: any) => ({
  type: Action.LOAD_MORE_LIST_NOTIFICATION,
  url,
  payload,
});

export const onGetListNewNotification = (url: string, payload: any) => ({
  type: Action.GET_LIST_NEW_NOTIFICATION,
  url,
  payload,
});

export const onGetDetailNotification = (url: string, payload: any) => ({
  type: Action.GET_DETAIL_NOTIFICATION,
  url,
  payload,
});

export const onClickNotification = (url: string, payload: any) => ({
  type: Action.CLICK_NOTIFICATION,
  url,
  payload,
});

export const onResetState = () => ({
  type: Action.RESET_STATE_NOTIFICATION,
});
