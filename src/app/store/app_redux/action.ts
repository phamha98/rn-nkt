import { SET_INTERNET_OFF, SET_INTERNET_ON, SET_TOKEN, SET_CURRENT_USER, LOG_OUT_APP,SET_DATA_NOTARY_VERIFY } from './type';

export const onInternetOff = () => {
  return {
    type: SET_INTERNET_OFF,
  };
};

export const onInternetOn = () => {
  return {
    type: SET_INTERNET_ON,
  };
};
export const onSetToken = (token: any) => {
  return {
    type: SET_TOKEN,
    token,
  };
};
export const onSetUser = (user: any) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};
export const onLogoutApp = () => {
  return {
    type: LOG_OUT_APP,
  };
};
