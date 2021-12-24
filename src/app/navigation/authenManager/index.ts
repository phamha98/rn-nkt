import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { Dashboard } from '../../features/authentication/Admin/dashboard/screen/index';
import { CaptureCamera } from '../../features/authentication/captureCamera/screen/index';
import { ListNotary } from '../../features/authentication/home/childrenScreen/listNotary/screen/index';
import { ListOfficeCC } from '../../features/authentication/home/childrenScreen/listOfficeCC/screen/index';
import { Privacy } from '../../features/unAuthentication/term/screens/privacy';
import { TermAuth } from '../../features/unAuthentication/term/screens/termAuth';
import { TermThanhToan } from '../../features/unAuthentication/term/screens/termThanhToan';
import { TermThongTin } from '../../features/unAuthentication/term/screens/termThongTin';
import { WebPayment } from '../../library/components/web/index';
import { WebHTML } from '../../library/components/webHtml/index';
import { EditUser } from '../../features/authentication/user/secondaryScreen/editUser/index';
import { ChangePassword } from '../../features/authentication/user/secondaryScreen/changepassword/index';
import { FingerPrint } from '../../features/authentication/settingAuthen/fingerPrint/fingerPrint';
import { Voice } from '../../features/authentication/settingAuthen/voice/voice';
import { Home } from '../../features/authentication/home/screen/index';
//Manager
import { Disability } from '../../features/authentication/Admin/disability/screen/index';
import { DisabilityAccept } from '../../features/authentication/Admin/disabilityAccept/screen/index';
import { DisabilityDetail } from '../../features/authentication/Admin/disabilityDetail/screen/index';
import { QLDanhSachYeuCauHoTro } from '../../features/authentication/Admin/QLDanhSachYeuCauHoTro/screen/index';
import { NhanHoTro } from '../../features/authentication/Admin/QLDanhSachYeuCauHoTro/screen/nhanHoTro';
import { lichSuNhanHoTro } from '../../features/authentication/Admin/QLDanhSachYeuCauHoTro/screen/lichSuNhanHoTro';
import {DetailYeuCauHoTro} from '../../features/authentication/Admin/QLDanhSachYeuCauHoTro/screen/detail';
import {QLDanhSachNKT} from '../../features/authentication/Admin/QLDanhSachNKT/screen/index';
import {DetailNKT} from '../../features/authentication/Admin/QLDanhSachNKT/screen/detail';
import {Report} from '../../features/authentication/Admin/BaoCao/index';
import {DownloadExcel} from '../../features/authentication/Admin/QLDanhSachYeuCauHoTro/screen/components/index';
import {Notication} from '../../features/authentication/Admin/notification/index';

import { Appointment } from '../../features/authentication/Admin/appointment/screen/index';
import { AppointmentDetail } from '../../features/authentication/Admin/appointmentDetail/screen/index';
import { AppointmentCreate } from '../../features/authentication/Admin/appointmentCreate/screen/index';
import { AppointmentEdit } from '../../features/authentication/Admin/appointmentEdit/screen/index';

import * as ScreenTypes from '.././screenTypes';
import { BottomNavigation } from './bottomNav';
import LeftMenu from './LeftMenu';
import StackNavigationFirstRegister from '../../features/authentication/Admin/firstRegister/navigation/StackNavigation';
import StackNavigationUpdateRegister from '../../features/authentication/Admin/updateRegister/navigation/StackNavigation';
// import { HuongDanSuDung } from '../../features/authentication/Admin/HuongDanSuDung/index';
var { width, height } = Dimensions.get('window');

var HomeDrawer = createDrawerNavigator(
  {
    [ScreenTypes.AUTHORIZE_MANAGER]: { screen: Dashboard },
    'FirstRegister_List': { screen: StackNavigationFirstRegister },
    'UpdateRegister_List': { screen: StackNavigationUpdateRegister },
    'Dashboard': { screen: Dashboard },
  },
  {
    drawerWidth: width * .95,
    contentComponent: LeftMenu,
    initialRouteName: ScreenTypes.AUTHORIZE_MANAGER
  }
)

export const AuthorizedManagerStack = createStackNavigator(
  {
    [ScreenTypes.HOME]: { screen: HomeDrawer },
    [ScreenTypes.LIST_OFFICE_CC]: { screen: ListOfficeCC, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.LIST_NOTARY]: { screen: ListNotary, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.WEB_PAYMENT]: { screen: WebPayment, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.CAPTURE_CAMERA]: { screen: CaptureCamera, navigationOptions: { ...TransitionPresets.ModalSlideFromBottomIOS }, },
    [ScreenTypes.TERM_AUTH]: { screen: TermAuth, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.TERM_THANHTOAN]: { screen: TermThanhToan, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.TERM_THONGTIN]: { screen: TermThongTin, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.PRIVACY]: { screen: Privacy, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.WEB_HTML]: { screen: WebHTML, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.EDIT_USER]: { screen: EditUser, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.CHANGE_PASSWORD]: { screen: ChangePassword, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.FINGERPRINT]: { screen: FingerPrint, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.VOICE]: { screen: Voice, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DISABILITY]: { screen: Disability, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DISABILITY_ACCEPT]: { screen: DisabilityAccept, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DISABILITY_DETAIL]: { screen: DisabilityDetail, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.QLDANHSACHYEUCAUHOTRO]: { screen: QLDanhSachYeuCauHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },  
    [ScreenTypes.QLLICHSUNHANHOTRO]: { screen: lichSuNhanHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, }, 
    [ScreenTypes.NOTIFICATIONADMIN]: { screen: Notication, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },  
    [ScreenTypes.NHANHOTRO]: { screen: NhanHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },  
    [ScreenTypes.DETAILYEUCAUHOTRO]: { screen: DetailYeuCauHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.QLDANHSACHNKT]: { screen: QLDanhSachNKT, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DETAILNKT]: { screen: DetailNKT, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.REPORT]: { screen: Report, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    // [ScreenTypes.HUONGDANSUDUNG]: { screen: HuongDanSuDung, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DOWNLOADEXCEL]: { screen: DownloadExcel, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.NOTIFICATIONAMDIN]: { screen: Notication, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DISABILITY]: { screen: Disability, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, }, 
    [ScreenTypes.DISABILITY_ACCEPT]: { screen: DisabilityAccept, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, }, 
    [ScreenTypes.APPOINTMENT]: { screen: Appointment, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.APPOINTMENT_DETAIL]: { screen: AppointmentDetail, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.APPOINTMENT_CREATE]: { screen: AppointmentCreate, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.APPOINTMENT_EDIT]: { screen: AppointmentEdit, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
  },
  {
    headerMode: 'none',
    initialRouteName: ScreenTypes.HOME, defaultNavigationOptions: { gestureEnabled: true }
  },
);
