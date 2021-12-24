import { Dimensions } from 'react-native';
// import { HomeUser } from '../../features/authentication/user/screen/index';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { CaptureCamera } from '../../features/authentication/captureCamera/screen/index';
import { ChatBot } from '../../features/authentication/chatBot/index';
import { ChiTietNguoiDungYeuCauHoTro } from '../../features/authentication/danhSachNhuCauHoTro/detail';
import { DanhSachNguoiDungYeuCauHoTro } from '../../features/authentication/danhSachNhuCauHoTro/index';
import { Dashboard } from '../../features/authentication/dashboard/screen/index';
import { ListNotary } from '../../features/authentication/home/childrenScreen/listNotary/screen/index';
import { ListOfficeCC } from '../../features/authentication/home/childrenScreen/listOfficeCC/screen/index';
import { HuongDanSuDungNguoiDung } from '../../features/authentication/HuongDanSuDungNguoiDung/index';
import { LichSuNhanHoTro } from '../../features/authentication/LichSuHoTro/index';
import { Notication } from '../../features/authentication/notification/index';
import { FingerPrint } from '../../features/authentication/settingAuthen/fingerPrint/fingerPrint';
import { Voice } from '../../features/authentication/settingAuthen/voice/voice';
import { HomeUser } from '../../features/authentication/user/screen/index';
import { ChangePassword } from '../../features/authentication/user/secondaryScreen/changepassword/index';
import { EditUser } from '../../features/authentication/user/secondaryScreen/editUser/index';
import { Privacy } from '../../features/unAuthentication/term/screens/privacy';
import { TermAuth } from '../../features/unAuthentication/term/screens/termAuth';
import { TermThanhToan } from '../../features/unAuthentication/term/screens/termThanhToan';
import { TermThongTin } from '../../features/unAuthentication/term/screens/termThongTin';
import { WebPayment } from '../../library/components/web/index';
import { WebHTML } from '../../library/components/webHtml/index';
import * as ScreenTypes from '.././screenTypes';
import { BottomNavigation } from './bottomNav';
import LeftMenu from './LeftMenu';
import { CapGiayXNKT } from '../../features/authentication/capgiayxnkt/index';
//ADMIN

var { width, height } = Dimensions.get('window');

var HomeDrawer = createDrawerNavigator(
  {
    [ScreenTypes.HOME]: { screen: BottomNavigation },
    // [ScreenTypes.HOME_UN_AUTH]: { screen: BottomNavigationUnAuth },
    [ScreenTypes.HOME_UN_AUTH]: { screen: BottomNavigation },
    // [ScreenTypes.HOME_UN_AUTH]: { screen: Dashboard },
    'Dashboard': { screen: Dashboard },

  },
  {
    drawerWidth: width * .95,
    contentComponent: LeftMenu,
  }
)

export const AuthorizedStack = createStackNavigator(
  {
    [ScreenTypes.HOME]: { screen: HomeDrawer },
    [ScreenTypes.CAPGIAY_XNKT]: { screen: CapGiayXNKT, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
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
    [ScreenTypes.NOTIFICATION]: { screen: Notication, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.LICHSUNHANHOTRO]: { screen: LichSuNhanHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.DANHSACHNGUOIDUNGYEUCAUHOTRO]: { screen: DanhSachNguoiDungYeuCauHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.CHITIETNGUOIDUNGYEUCAUHOTRO]: { screen: ChiTietNguoiDungYeuCauHoTro, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.TAB_USER]: { screen: HomeUser, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.HUONGDANSUDUNGNGUOIDUNG]: { screen: HuongDanSuDungNguoiDung, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.CHATBOT]: { screen: ChatBot, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.FINGERPRINT]: { screen: FingerPrint, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },
    [ScreenTypes.VOICE]: { screen: Voice, navigationOptions: { ...TransitionPresets.SlideFromRightIOS }, },

  },
  { headerMode: 'none', initialRouteName: ScreenTypes.HOME, defaultNavigationOptions: { gestureEnabled: true } },
);
