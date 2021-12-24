import { CODE_DEFAULT, CODE_SUCCESS } from '../../../../config';
import * as Action from './actionType';

export interface NotificationState {
  loading: boolean;
  refresh: boolean;
  loadMore: boolean;
  error: string | null;
  codeLoadMore: number;
  codeRefresh: number;
  listNotification: any;
  listNewNotification: any;
  detailNotification: any;
  countNotify: number;
  isLoadEnd: boolean;
  status : boolean;

}

const initialState: NotificationState = {
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  codeLoadMore: CODE_DEFAULT,
  codeRefresh: CODE_DEFAULT,
  listNotification: [],
  listNewNotification: [],
  detailNotification: {},
  countNotify: 0,
  isLoadEnd: false,
};

interface ActionProps {
  type: keyof typeof Action;
  payload: any;
}
export const NotificationReducer = (state = initialState, { type, payload }: ActionProps): NotificationState => {

  switch (type) {
      case Action.XAC_DINH_MUC_DO_SUCCESS:
        return { ...state,  listNotification: Array.isArray(payload) ? payload : [],}
      case Action.XAC_DINH_MUC_DO_FAILED:
        return { ...state, loadMore: false, error: payload.error ? payload.error : "" }

    default:
      return state;
  }
};
