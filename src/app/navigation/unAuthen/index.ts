import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { Forgot } from '../../features/unAuthentication/forgot/screens/index';
import { Login } from '../../features/unAuthentication/login/screens/index';
import { OTP } from '../../features/unAuthentication/otp/screens/index';
import { Register } from '../../features/unAuthentication/register/screens/index';
import { Splash } from '../../features/unAuthentication/splash/screen/index';
import { RegisterSuccess } from '../../features/unAuthentication/suscess/screens/index';
import { Term } from '../../features/unAuthentication/term/screens/index';
import * as ScreenTypes from '../screenTypes';
export const UnAuthorizeStack = createStackNavigator(
  {
    // [ScreenTypes.TERM_LAUNCH]: {
    //   screen: TermLaunch,
    //   navigationOptions: {...TransitionPresets.SlideFromRightIOS},
    // },
    [ScreenTypes.LOGIN]: {screen: Login},
    [ScreenTypes.FORGOT]: {
      screen: Forgot,
      navigationOptions: {...TransitionPresets.ModalSlideFromBottomIOS},
    },
    [ScreenTypes.REGISTER]: {
      screen: Register,
      navigationOptions: {...TransitionPresets.ModalSlideFromBottomIOS},
    },
    [ScreenTypes.TERM]: {
      screen: Term,
      navigationOptions: {...TransitionPresets.SlideFromRightIOS},
    },
    [ScreenTypes.OTP]: {
      screen: OTP,
      navigationOptions: {...TransitionPresets.SlideFromRightIOS},
    },
    [ScreenTypes.REGISTER_SUCCESS]: {
      screen: RegisterSuccess,
      navigationOptions: {...TransitionPresets.ScaleFromCenterAndroid},
    },
  },
  {headerMode: 'none', defaultNavigationOptions: {gestureEnabled: true}},
);
export const UnAuthorizeSwitch = createSwitchNavigator({
  // [ScreenTypes.SPLASH]: {screen: Splash},
  [ScreenTypes.UN_AUTHORIZE]: {screen: UnAuthorizeStack},
});
