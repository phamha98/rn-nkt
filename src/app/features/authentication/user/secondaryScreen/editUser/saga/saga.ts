import { put } from 'redux-saga/effects';
import { ServiceSaga } from '../../../../../../library/networking'
import * as Action from '../redux/actionType'
export function* onPostEditUser(action: ActionBase<RegisterRequest>) {
    const response = yield ServiceSaga.Post(action.url,
        action.payload);
        console.log("response");
        console.log(response);
    if (response.status) {
        yield put({
            type: Action.POST_EDIT_BY_USER_SUCCESS,
            status: response.status,
            data: response.data,
        });
    } else {
        yield put({
            type: Action.POST_EDIT_BY_USER_FAILED,
            status: response.status,
        });
    }
}
export function* onGetListEthnic({ url, payload }: { url: string, payload: any }) {
    const response: { status: boolean, error: string, data: any } = yield ServiceSaga.Get(url, payload);
    yield put({ type: Action.GET_LIST_ETHNIC_SUCCESS, payload: response.data })
}