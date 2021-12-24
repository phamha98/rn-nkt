import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Axios from 'axios';
import { select } from 'redux-saga/effects';
import { R } from '../../assets/value';
import { HandleErrorApi } from '../../common/handleError/index';
import LocalStorage from '../../common/LocalStorage';
import { ERROR_NETWORK_CODE, RESULT_CODE_PUSH_OUT } from '../../config';
import { navigateToLogin } from '../../navigation/navigationHelper';
import { AppState } from '../../store/app_redux/type';
import { default as DropDownAlert, default as DropDownHolder } from '../utils/dropDownHolder';
import { translate } from '../utils/i18n/translate';
import ProgressHolder from '../utils/progressHolder';
import { ErrorAxios, ResponseBase } from './../../config/type';
import { BASE_API } from './api';

var id = 1;

const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  msg: translate('error:errorData'),
  data: {},
};
const _onPushLogout = async () => {
  await AsyncStorage.removeItem(R.strings.TOKEN);
  DropDownAlert.showError(
    translate('dialog:error'),
    translate('error:pushLogout'),
  );
  navigateToLogin();
};
const Instance = Axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const checkConnectivity = () => {
  NetInfo.fetch().then(state => {
    //console.log(state)
    if (!state.isConnected) {
      ProgressHolder.hidden();
      DropDownHolder.showWarning(translate('dialog:warning'), translate('Không có kết nối mạng, vui lòng kiểm tra lại.'));
    }
  });
};
function* Get(url: string, param?: object) {
  checkConnectivity();
  // const { token }: AppState = yield select(x => x.AppReducer);
  const token = yield LocalStorage.getToken();
  const header: any = { token: token, 'Content-Type': 'application/json' };

  return yield Instance.get(url, {
    params: param,
    headers: header,
  })
    .then((res: any) => {
      if (res && res.data && res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res && res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios,) => {
      if (error && error.response && error.response.status === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
        return {
          code: RESULT_CODE_PUSH_OUT,
          error: '',
          data: null,
          status: false,
        }
      } else {
        if (error && error.response) {
          return HandleErrorApi(error.response.status);
        } else {
          return HandleErrorApi(ERROR_NETWORK_CODE);
        }
      }
    });
}

function* Post(url: string, data: object) {
  checkConnectivity();
  // const { token }: AppState = yield select(x => x.AppReducer);
  const token = yield LocalStorage.getToken();
  const header: any = { token: token, 'Content-Type': 'application/json' };

  return yield Instance.post(url, data, { headers: header })
    .then((res: any) => {
      if (res && res.data && res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res && res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error && error.response && error.response.status === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
        return {
          code: RESULT_CODE_PUSH_OUT,
          error: '',
          data: null,
          status: false,
        }
      } else {
        //console.log(url + '----------' + error)
        if (error && error.response) {
          return HandleErrorApi(error.response.status);
        } else {
          return HandleErrorApi(ERROR_NETWORK_CODE);
        }
      }
    });
}
function* PostWithFile(url: string, data: object) {
  checkConnectivity();
  const { token }: AppState = yield select(x => x.AppReducer);
  const header: any = { token: token, 'Content-Type': 'multipart/form-data', };
  return yield Instance.post(url, data,
    {
      headers: header,
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //console.log("percentComplete: " + percentCompleted + "%");
        // put({ type: Action.UPLOAD_IMAGE_PROFILE_NOTARY_PROGRESS });
        // Alert.alert(''+ percentCompleted)
      }
    })
    .then((res: any) => {
      if (res && res.data && res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res && res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error && error.response && error.response.status === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
        return {
          code: RESULT_CODE_PUSH_OUT,
          error: '',
          data: null,
          status: false,
        }
      } else {
        if (error && error.response) {
          return HandleErrorApi(error.response.status);
        } else {
          return HandleErrorApi(ERROR_NETWORK_CODE);
        }
      }
    });
}

function* Put(url: string, data: object, params?: object) {
  checkConnectivity();
  const { token }: AppState = yield select(x => x.AppReducer);
  const header: any = { token: token, 'Content-Type': 'application/json' };

  return yield Instance.put(url, { params: params, data: data })
    .then((res: any) => {
      if (res && res.data && res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res && res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response.status === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
        return {
          code: RESULT_CODE_PUSH_OUT,
          error: '',
          data: null,
          status: false,
        }
      } else {
        if (error.response) {
          return HandleErrorApi(error.response.status);
        } else {
          return HandleErrorApi(ERROR_NETWORK_CODE);
        }
      }
    });
}

function* Delete(url: string, data: object, params?: object) {
  checkConnectivity();
  const { token }: AppState = yield select(x => x.AppReducer);
  const header: any = { token: token, 'Content-Type': 'application/json' };

  return yield Instance.delete(url, {
    params: params,
    data: data,
  })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response.status === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
        return {
          code: RESULT_CODE_PUSH_OUT,
          error: '',
          data: null,
          status: false,
        }
      } else {
        if (error.response) {
          return HandleErrorApi(error.response.status);
        } else {
          return HandleErrorApi(ERROR_NETWORK_CODE);
        }
      }
    });
}

export const ServiceSaga = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
};
