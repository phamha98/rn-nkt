import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { R } from '../../assets/value';
import { HandleErrorApi } from '../../common/handleError/index';
import { ERROR_NETWORK_CODE, RESULT_CODE_PUSH_OUT } from '../../config';
import { navigateToLogin } from '../../navigation/navigationHelper';
import DropDownAlert from '../utils/dropDownHolder';
import { translate } from '../utils/i18n/translate';
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
async function Get(url: string, param?: object) {
  let header: any = {};
  var val = await AsyncStorage.getItem(R.strings.TOKEN)
  header = { token: val, 'Content-Type': 'application/json' };

  return Instance.get(url, { params: param, headers: header })
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
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

async function Post(url: string, data: object) {
  let header: any = {};
  var val = await AsyncStorage.getItem(R.strings.TOKEN)
  header = { token: val, 'Content-Type': 'application/json' };

  return Instance.post(url, data, { headers: header })
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

      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function PostWithFile(url: string, data: object, token: any) {
  let header: any = { token: token, 'Content-Type': 'multipart/form-data' };
  return Instance.post(url, data, { headers: header })
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

async function Put(url: string, data: object, params?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val && val.length > 0) {
      header = { token: val, 'Content-Type': 'application/json' };
    }
  });
  return Instance.put(url, { params: params, data: data })
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
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function Delete(url: string, data: object, params?: object) {
  let header: any = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val && val.length > 0) {
      header = { token: val, 'Content-Type': 'application/json' };
    }
  });
  return Instance.delete(url, { params: params, data: data })
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
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

const UploadFile = (url: string, formData: FormData, header: Object) => {
  header = header == null ? {} : header;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
        ...header
      }, body: formData
    })
      .then(response => {
        var res = {};
        try {
          res = response.json();
        } catch (error) {
          res = {
            message: 'error',
            error: response
          };
        }
        resolve(res)
      })
      .catch(error => reject(error))
  })
}

export const ServiceAsync = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
  UploadFile
};
