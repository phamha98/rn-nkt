export const SET_INTERNET_OFF = 'SET_INTERNET_OFF';
export const SET_INTERNET_ON = 'SET_INTERNET_ON';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_DATA_NOTARY_VERIFY = 'SET_DATA_NOTARY_VERIFY';
export const LOG_OUT_APP = 'LOG_OUT_APP';

export interface ProfileProps {
  id: string;
  token: string;
  username: string;
  avatar: any;
}

export interface AppState {
  internetState: boolean;
  profile: ProfileProps;
  token: any;
  notify: number;
}
export interface onSetInternetOff {
  type: typeof SET_INTERNET_OFF;
}

export interface onSetInternetOn {
  type: typeof SET_INTERNET_ON;
}

export interface onSetToken {
  type: typeof SET_TOKEN;
  token: any;
}
export interface onSetCurrentUser {
  type: typeof SET_CURRENT_USER;
  user: any;
}
// export interface onSetDataNotaryVerify {
//   type: typeof SET_DATA_NOTARY_VERIFY;
//   userNotary: any;
// }
export interface onLogOutApp {
  type: typeof LOG_OUT_APP;
}

export type AppActionTypes =
  | onSetInternetOff
  | onSetInternetOn
  | onSetToken
  | onSetCurrentUser
  | onLogOutApp;
