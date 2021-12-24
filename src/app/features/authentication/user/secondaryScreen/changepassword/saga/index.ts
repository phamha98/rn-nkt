import { put, takeLatest, call, takeEvery} from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* ChangePasswordSaga() {
    yield takeLatest(Action.CHANGE_PASSWORD, Saga.changePass);

}
