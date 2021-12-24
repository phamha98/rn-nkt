// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { useSelector } from 'react-redux';
import { Button, Text } from '../';
import { translate } from '../../../library/utils/i18n/translate';
import { goBack, navigate } from '../../../navigation/navigationService';
import { NOTIFICATION, NOTIFICATIONAMDIN } from '../../../navigation/screenTypes';
import RestAPI from '../../../RestAPI';
import { spacing } from '../../../themes';
import { color } from '../../../themes/color';
import Icon from '../iconVector/index';
import IoniconsFont from '../iconVector/IoniconsFont';
import { HeaderProps } from './header.props';
// static styles
const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: spacing[4],
  alignItems: 'center',
  paddingTop: spacing[4],
  paddingBottom: spacing[4],
  justifyContent: 'flex-start',
};
const TITLE: TextStyle = { textAlign: 'center', fontSize: 16, };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center', minHeight: 30 };
const Badged: ViewStyle = { width: '100%', position: 'absolute', alignSelf: 'flex-end', borderRadius: 8.5, left: 20, top: -3, zIndex: 1, backgroundColor: 'rgb(229, 20, 0)' };
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };
const WRAP_ICON_LEFT: ViewStyle = { paddingVertical: 5, paddingRight: 10 };
const WRAP_ICON_RIGHT: ViewStyle = { paddingVertical: 5, paddingLeft: 10 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
let Header: React.FunctionComponent<HeaderProps> = props => {
  const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
  const {
    isMenu,
    isBack,
    isCreate,
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    childrenLeft,
    childrenRight,
    headerText,
    rightIconStyle,
    leftIconStyle,
    headerTx,
    wrapLeftIconStyle,
    childrenText,
    wrapRightIconStyle,
    style,
    titleStyle,
    navigation,
    onGoBack = null
  } = props;
  const header = headerText || (headerTx && translate(headerTx)) || '';
  const [countNotifi, setcountNotifi] = useState([])
  const onPressNotifi = () => {
    if (dataDetailUser?.capQuanLy == 7)
      navigate(NOTIFICATION);
    else
      navigate(NOTIFICATIONAMDIN);
  }
  var _run = async () => {
    if (dataDetailUser == null) return
    if (dataDetailUser?.capQuanLy == 7)
      RestAPI.API_Get_DanhSachThongBaoND(dataDetailUser?.userID)
        .then(response => {
          setcountNotifi(response.total)
        })
    else
      RestAPI.API_Get_DanhSachThongBao({
        maTinh: dataDetailUser.maTinh,
        maHuyen: dataDetailUser.maHuyen,
        maXa: dataDetailUser.maXa,
        typeId: -1
      })
        .then(response => {
          var countData = response.data.length
          setcountNotifi(countData)
        })
  }
  useEffect(() => {
    _run()
  }, []);
  return (
    <View style={[
      { backgroundColor: color.palette.primary, ...ROOT, ...style },
    ]}>
      {
        isMenu ?
          <Button
            accessible={true}
            accessibilityLabel="Menu"
            style={{
              backgroundColor: 'transparent',
              paddingVertical: 0
            }}
            onPress={() => navigation?.dispatch(DrawerActions.toggleDrawer())}
          >
            <Icon
              type={'Ionicons'}
              color={color.palette.white}
              icon={IoniconsFont.menu}
            // size={30}
            />
          </Button>
          : isBack ?
            <Button
              accessible={true}
              accessibilityLabel="Quay lại"
              style={{
                backgroundColor: 'transparent',
                paddingVertical: 0
              }}
              // onPress={() => goBack()}
              onPress={() => onGoBack == null ? goBack() : onGoBack()}
            >
              <Icon
                type={'Ionicons'}
                color={color.palette.white}
                icon={IoniconsFont.chevronBack}
              // size={30}
              />
            </Button>
            : leftIcon ?
              <Button
                accessible={true}
                accessibilityLabel="Menu"
                style={[WRAP_ICON_LEFT, wrapLeftIconStyle]} preset="link" onPress={onLeftPress}>
                <Icon
                  type={'Ionicons'}
                  color={color.palette.white}
                  icon={IoniconsFont.menu}
                />
              </Button>
              : childrenLeft ?
                <View>{childrenLeft}</View>
                : <View style={LEFT} />
      }
      <View style={TITLE_MIDDLE}>
        {childrenText ? childrenText : <Text style={{ ...TITLE, ...titleStyle }} numberOfLines={1} text={header} />}
      </View>
      {rightIcon ? (
        <Button
          accessible={true}
          accessibilityLabel="Thông báo"
          style={[
            WRAP_ICON_RIGHT,
            wrapRightIconStyle,
            {
              paddingVertical: 0
            }
          ]} preset="link" onPress={isCreate ? onRightPress : onPressNotifi}>
          {
            countNotifi > 0 ?
              <>{
                <View style={[Badged]}>
                  <Text style={{ width: '100%', fontSize: 12, textAlign: 'center' }}>{countNotifi}</Text>
                </View>
              }
              </>
              :
              <View style={[Badged]}></View>
          }
          <Icon
            type={'Ionicons'}
            color={color.palette.white}
            icon={isCreate ? IoniconsFont.addCircle : IoniconsFont.notifications}
          />

        </Button>
      ) : childrenRight ? (<View>{childrenRight}</View>) : (
        <View style={RIGHT} />
      )}
    </View>
  );
};
Header = withNavigation(Header)

export {
  Header
};

