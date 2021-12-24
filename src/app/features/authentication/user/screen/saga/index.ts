import { put, takeLatest, call } from 'redux-saga/effects';
import * as Action from '../redux/actionType';
import * as Saga from './saga';
export function* UpdateAvatar() {
    yield takeLatest(Action.UPDATE_AVATAR, Saga.onUpdateAvatar);
}
