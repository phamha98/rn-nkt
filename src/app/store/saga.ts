import {fork} from 'redux-saga/effects';
import {LoginSaga} from '../features/unAuthentication/login/saga/index';
import {SplashSaga} from '../features/unAuthentication/splash//saga/index';
import {ForgotSaga} from '../features/unAuthentication/forgot/saga/index';
import {RegisterSaga} from '../features/unAuthentication/register/saga/index';
import {OTPSaga} from '../features/unAuthentication/otp/saga/index';
import {ListNotaryOfficeSaga} from '../features/authentication/home/childrenScreen/listOfficeCC/saga/';
import {ListNotaryStaffSaga} from '../features/authentication/home/childrenScreen/listNotary/saga/';
import {HomeTabSaga} from '../features/authentication/home/saga/';
import {ChatSaga} from '../features/authentication/chat/saga';
import {NotificationSaga} from '../features/authentication/notify/saga';
import { TermSaga } from '../features/unAuthentication/term/saga';
import {UpdateAvatar} from '../features/authentication/user/screen/saga';
import {ChangePasswordSaga} from '../features/authentication/user/secondaryScreen/changepassword/saga';
import {EditUserSaga} from '../features/authentication/user/secondaryScreen/editUser/saga';

//manager
import {StatisticalSaga} from '../features/authentication/Admin/statistical/saga';
import {DisabilitySaga} from '../features/authentication/Admin/disability/saga';
import {DisabilityDetailSaga} from '../features/authentication/Admin/disabilityDetail/saga';
import {DisabilityAcceptSaga} from '../features/authentication/Admin/disabilityAccept/saga';
import {AppointmentSaga} from '../features/authentication/Admin/appointment/saga';
import {AppointmentDetailSaga} from '../features/authentication/Admin/appointmentDetail/saga';
import {AppointmentCreateSaga} from '../features/authentication/Admin/appointmentCreate/saga';
import {AppointmentEditSaga} from '../features/authentication/Admin/appointmentEdit/saga';
import { CapGiayXNKTSaga } from '../features/authentication/capgiayxnkt/saga';

const rootSaga = function* rootSaga() {
  yield fork(SplashSaga);
  yield fork(LoginSaga);
  yield fork(ForgotSaga);
  yield fork(RegisterSaga);
  yield fork(OTPSaga);
  yield fork(ListNotaryOfficeSaga);
  yield fork(ListNotaryStaffSaga);
  yield fork(HomeTabSaga);
  yield fork(ChatSaga);
  yield fork(NotificationSaga);
  yield fork(TermSaga);
  yield fork(UpdateAvatar);
  yield fork(ChangePasswordSaga);
  yield fork(EditUserSaga);
  //manager
  yield fork(StatisticalSaga);
  yield fork(DisabilitySaga);
  yield fork(DisabilityDetailSaga);
  yield fork(AppointmentSaga);
  yield fork(AppointmentDetailSaga);
  yield fork(AppointmentCreateSaga);
  yield fork(AppointmentEditSaga);
  yield fork(DisabilityAcceptSaga);
  yield fork(CapGiayXNKTSaga);
};
export default rootSaga;
