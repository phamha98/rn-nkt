import {
  AppState,
  AppActionTypes,
  SET_INTERNET_OFF,
  SET_INTERNET_ON,
  SET_TOKEN,
  SET_CURRENT_USER,
  LOG_OUT_APP,
} from './app_redux/type';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { LoginReducer } from '../features/unAuthentication/login/redux/reducer';
import { ForgotReducer } from '../features/unAuthentication/forgot/redux/reducer';
import { RegisterReducer } from '../features/unAuthentication/register/redux/reducer';
import { OTPReducer } from '../features/unAuthentication/otp/redux/reducer';
import { ListNotaryOfficeReducer } from '../features/authentication/home/childrenScreen/listOfficeCC/redux/reducer';
import { ListNotaryStaffReducer } from '../features/authentication/home/childrenScreen/listNotary/redux/reducer';
import { HomeTabReducer } from '../features/authentication/home/redux/reducer';
import { ChatReducer } from '../features/authentication/chat/redux/reducer';
import { NotificationReducer } from '../features/authentication/notify/redux/reducer';
import { TermReducer } from '../features/unAuthentication/term/redux/reducer';
import { UpdateAvatarReducer } from "../features/authentication/user/screen/redux/reducer";
import { ChangePasswordReducer } from "../features/authentication/user/secondaryScreen/changepassword/redux/reducer";
import { EditUserReducer } from "../features/authentication/user/secondaryScreen/editUser/redux/reducer";
//manager
import debugReducer from '../features/debug/redux/debugReducer';
import { StatisticalReducer } from "../features/authentication/Admin/statistical/redux/reducer";
import { DisabilityReducer } from "../features/authentication/Admin/disability/redux/reducer";
import { DisabilityDetailReducer } from "../features/authentication/Admin/disabilityDetail/redux/reducer";
import { DisabilityAcceptReducer } from "../features/authentication/Admin/disabilityAccept/redux/reducer";
import { AppointmentReducer } from "../features/authentication/Admin/appointment/redux/reducer";
import { AppointmentDetailReducer } from "../features/authentication/Admin/appointmentDetail/redux/reducer";
import { AppointmentCreateReducer } from "../features/authentication/Admin/appointmentCreate/redux/reducer";
import { AppointmentEditReducer } from "../features/authentication/Admin/appointmentEdit/redux/reducer";
import { CapGiayXNKTReducer } from "../features/authentication/capgiayxnkt/redux/reducer";

const initialAppState = {
  internetState: true,
  profile: {},
  // dataNotary:{},
  token: null,
  notify: 0,
};

const AppReducer = (
  state = initialAppState,
  action: AppActionTypes,
): AppState => {
  switch (action.type) {
    case SET_INTERNET_ON:
      return { ...state, internetState: true };
    case SET_INTERNET_OFF:
      return { ...state, internetState: false };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_CURRENT_USER:
      return { ...state, profile: action.user };
    // case SET_DATA_NOTARY_VERIFY:
    //   return { ...state, dataNotary: action.userNotary };
    case LOG_OUT_APP:
      return initialAppState;
    default:
      return state;
  }
};
export let reducerInfos = [
  {name:'debug'},
  {name:'AppReducer'},
  {name:'LoginReducer'},
  {name:'ForgotReducer'},
  {name:'RegisterReducer'},
  {name:'OTPReducer'},
  {name:'ListNotaryOffice'},
  {name:'ListNotaryStaff'},
  {name:'HomeTab'},
  {name:'ChatReducer'},
  {name:'NotificationReducer'},
  {name:'TermReducer'},
  {name:'form'},
  {name:'UpdateAvatarReducer'},
  {name:'ChangePasswordReducer'},
  {name:'EditUserReducer'},
  {name:'StatisticalReducer'},
  {name:'DisabilityReducer'},
  {name:'DisabilityDetailReducer'},
  {name:'DisabilityAcceptReducer'},
  {name:'AppointmentReducer'},
  {name:'AppointmentDetailReducer'},
];
export default combineReducers({
  debug: debugReducer,
  AppReducer,
  LoginReducer,
  ForgotReducer,
  RegisterReducer,
  OTPReducer,
  ListNotaryOffice: ListNotaryOfficeReducer,
  ListNotaryStaff: ListNotaryStaffReducer,
  HomeTab: HomeTabReducer,
  ChatReducer,
  NotificationReducer,
  TermReducer,
  form: formReducer,
  UpdateAvatarReducer,
  ChangePasswordReducer,
  EditUserReducer,
  //manager
  StatisticalReducer,
  DisabilityReducer,
  DisabilityDetailReducer,
  DisabilityAcceptReducer,
  AppointmentReducer,
  AppointmentDetailReducer,
  AppointmentCreateReducer,
  AppointmentEditReducer,
  CapGiayXNKTReducer
});
