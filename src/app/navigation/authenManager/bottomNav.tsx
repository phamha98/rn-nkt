import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Home } from '../../features/authentication/home/screen/index';
import { HomeChat } from '../../features/authentication/chat/screen/index';
import { HomeNotify } from '../../features/authentication/notify/screen/index';
import { HomeProfile } from '../../features/authentication/profileCC/screen/index';
import { HomeUser } from '../../features/authentication/user/screen/index';
import * as ScreenTypes from '../screenTypes';
import { translate } from '../../library/utils/i18n/translate';
import { Dashboard } from '../../features/authentication/Admin/dashboard/screen/index';
import { Statistical } from '../../features/authentication/Admin/statistical/screen/index';
import { Disability } from '../../features/authentication/Admin/disability/screen/index';
import { BottomTabBar, TabBarIcon, TabBarIconProfileCC, TabBarIconChat, TabBarIconNotify } from './bottomTabBar';
import { AppState } from '../../store/app_redux/type';
import { useSelector } from 'react-redux';  
export const BottomNavigation = createBottomTabNavigator(
  {
    [ScreenTypes.TAB_HOME]: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: translate('main:tabHome'),
        tabBarIcon: (props: {
          focused: boolean;
          tintColor?: string;
          horizontal?: boolean;
        }) => <TabBarIcon {...props} icon={'tab_home'} />,
      },
    },
    
    [ScreenTypes.TAB_NOTIFY]: {
      screen: Disability,
      navigationOptions: {
        tabBarLabel: translate('QL KT'),
        tabBarIcon: props => (
          <TabBarIconNotify useBadged={true} {...props} icon={'tab_profileCC'} />
        ),
      },
    },
    [ScreenTypes.TAB_CHAT]: {
      screen: Statistical,
      navigationOptions: {
        tabBarLabel: translate('QL trường hợp'),
        tabBarIcon: props => <TabBarIconChat useBadged={true} {...props} icon={'tab_chat'} />,
      },
    },
    // [ScreenTypes.TAB_PROFILE_CC]: {
    //   screen: HomeProfile,
    //   navigationOptions: {
    //     tabBarLabel: translate('DS ĐK TT Lần đầu'),
    //     tabBarIcon: props => (
    //       <TabBarIconProfileCC useBadged={true} {...props} icon={'tab_profileCC'} />
    //     ),
    //   },
    // },
    [ScreenTypes.TAB_USER]: {
      screen: Statistical,
      navigationOptions: {
        tabBarLabel: translate('TB, CB'),
        tabBarIcon: props => <TabBarIcon {...props} icon={'tab_user'} />,
      },
    },
  },
  {
    tabBarOptions: { activeTintColor: 'rgba(0,190,212,1)', inactiveTintColor: '#6F6F6F' },
    tabBarComponent: BottomTabBar,
  },
);



// export const BottomNavigationUnAuth = createBottomTabNavigator(
//   {
//     [ScreenTypes.TAB_HOME]: {
//       screen: Home,
//       navigationOptions: {
//         tabBarLabel: translate('main:tabHome'),
//         tabBarIcon: (props: {
//           focused: boolean;
//           tintColor?: string;
//           horizontal?: boolean;
//         }) => <TabBarIcon {...props} icon={'tab_home'} />,
//       },
//     },
//     [ScreenTypes.TAB_NOTIFY]: {
//       screen: HomeNotify,
//       navigationOptions: {
//         tabBarLabel: translate('Xác định mức độ'),
//         tabBarIcon: props => (
//           <TabBarIconNotify useBadged={true} {...props} icon={'tab_notify'} />
//         ),
//       },
//     },
//     [ScreenTypes.TAB_USER]: {
//       screen: HomeUser,
//       navigationOptions: {
//         tabBarLabel: translate('Cập nhật thông tin'),
//         tabBarIcon: props => <TabBarIcon {...props} icon={'tab_user'} />,
//       },
//     },
//   },
//   {
//     tabBarOptions: { activeTintColor: 'rgba(0,174,247,1)', inactiveTintColor: '#6F6F6F' },
//     tabBarComponent: BottomTabBar,
//   },
// );
