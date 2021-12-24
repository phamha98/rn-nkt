import { ServiceSaga } from '../../../../library/networking/index';
import { call } from 'redux-saga/effects';
export function* onCheckToken({ url, onSuccess, onFailure, data }: { url: string, data: any, onSuccess: (data: any) => void, onFailure: () => void }) {
    const response = yield ServiceSaga.Get(url);
    //console.log("CHECK_TOKEN_FINISH",response)
    if (!response || response.status === undefined || response.status === false) {
        yield call(onFailure)
    } else {
        yield call(onSuccess, data);
    }
}
