import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import BotKhiemThi from '../features/authentication/khiemThi/BotKhiemThi';
import ChooseFunction from '../features/authentication/chooseFunction/ChooseFunction';
import { AuthorizedStack } from './authen/index';
import { AuthorizedManagerStack } from './authenManager/index';
import * as ScreenTypes from './screenTypes';
import { UnAuthorizeStack } from './unAuthen';
import DownloadBundle from '../features/downloadBundle';


// const AppSwitchNavigation = createSwitchNavigator(
//   {
//     [ScreenTypes.UN_AUTHORIZE]: { screen: UnAuthorizeSwitch },
//     [ScreenTypes.AUTHORIZE]: { screen: AuthorizedStack },
//     [ScreenTypes.AUTHORIZE_MANAGER]: { screen: AuthorizedManagerStack },
//   },
//   {
//     initialRouteName: ScreenTypes.UN_AUTHORIZE,
//   },
// );

// export const AppContainer = createAppContainer(AppSwitchNavigation);
export const GenericAppNavigate = (initialRouteName) => {
  return createAppContainer(createSwitchNavigator(
    {
      [ScreenTypes.UN_AUTHORIZE]: { screen: UnAuthorizeStack },
      [ScreenTypes.AUTHORIZE]: { screen: AuthorizedStack },
      [ScreenTypes.AUTHORIZE_MANAGER]: { screen: AuthorizedManagerStack },
      'CHOOSE_FUNCTION': { screen: ChooseFunction },
      'NGUOI_KHIEM_THI': { screen: BotKhiemThi },

    },
    {
      initialRouteName
    },
  ));
}
