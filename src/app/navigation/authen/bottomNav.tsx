import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeChat } from '../../features/authentication/chat/screen/index';
import { DanhSachNguoiDungYeuCauHoTro } from '../../features/authentication/danhSachNhuCauHoTro/index';
import { Home } from '../../features/authentication/home/screen/index';
import { HomeNotify } from '../../features/authentication/notify/screen/index';
import { IoniconsFont } from '../../library/components';
import ViewCus from '../../library/components/ViewCus/ViewCus';
import { translate } from '../../library/utils/i18n/translate';
import * as ScreenTypes from '../screenTypes';
import { BottomTabBar } from './bottomTabBar';

export const BottomNavigation = createBottomTabNavigator(
  {
    [ScreenTypes.TAB_HOME]: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: translate('main:tabHome'),
        tabBarIcon: (props: {
          focused: boolean;
          tintColor?: string;
          horizontal?: boolean;
        }) => 
        <ViewCus.Ionicons size={20} icon={IoniconsFont.homeOutline} color="#6F6F6F"/>
      },
    },
    
    [ScreenTypes.TAB_NOTIFY]: {
      screen: HomeNotify,
      navigationOptions: {
        tabBarLabel: translate('XĐ mức độ'),
        tabBarIcon: props => (
          <ViewCus.Ionicons size={21} icon={IoniconsFont.readerOutline} color="#6F6F6F"/>
        ),
      },
    },
    [ScreenTypes.TAB_CHAT]: {
      screen: HomeChat,
      navigationOptions: {
        tabBarLabel: translate('Cập nhật TT'),
        tabBarIcon: props => 
        <ViewCus.Ionicons size={22} icon={IoniconsFont.checkmarkCircleOutline} color="#6F6F6F"/>
      },
    },
    [ScreenTypes.DANHSACHNGUOIDUNGYEUCAUHOTRO]: {
      screen: DanhSachNguoiDungYeuCauHoTro,
      navigationOptions: {
        tabBarLabel: translate('Nhu cầu HT'),
        tabBarIcon: props => 
        <ViewCus.Ionicons size={22} icon={IoniconsFont.refreshOutline} color="#6F6F6F"/>
      },
    },
  },
  {
    tabBarOptions: { activeTintColor: 'rgba(0,190,212,1)', inactiveTintColor: '#6F6F6F'},
    tabBarComponent: BottomTabBar,
  },
);
