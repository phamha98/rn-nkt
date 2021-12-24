import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Anim from 'react-native-reanimated';
import { spring, timing, useValues } from 'react-native-redash';
import { NavigationParams, NavigationRoute, SafeAreaView } from 'react-navigation';
import { BottomTabBarProps } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';
import { ChatState } from 'src/app/features/authentication/chat/redux/reducer';
import { NotificationState } from 'src/app/features/authentication/notify/redux/reducer';
import { HistoryProfileState } from 'src/app/features/authentication/profileCC/screen/redux/reducer';
import { IconTypes } from '../../assets/icon';
import { NotifyHandle } from '../../common';
import { Button, Icon, Img, Text } from '../../library/components';
import { AppState } from '../../store/app_redux/type';
import { FONT_12, FONT_14, typography } from '../../themes';
import { navigate } from '../navigationService';
import { CREATE_INFO_NOTARY } from '../screenTypes';
import { ModalSelect } from './components/modalSelect';
const { width } = Dimensions.get('window');
const { set, useCode } = Anim;
type TinColorType = string | { dark: string; light: string } | undefined;
type TextBottom = string | undefined;
interface ButtonBarProps {
  text?: TextBottom;
  active: boolean;
  onPress: any;
  renderIcon: any;
  configIcon: any;
  activeTintColor: TinColorType;
  inactiveTintColor: TinColorType;
  route: NavigationRoute<NavigationParams>;
  lengthRoute: number;
}
interface TabBarIconProps {
  focused: boolean;
  horizontal: boolean;
  tintColor: string;
  icon?: IconTypes;
  useBadged?: boolean;
}

export const TabBarIcon = ({
  focused,
  tintColor,
  icon,
  useBadged,
}: TabBarIconProps) => {
  const { notify }: AppState = useSelector(x => x.AppReducer);

  return focused ? (
    <View>
      {useBadged === true && NotifyHandle(notify).length > 0 && (
        <View style={styles.badged}>
          <Text style={styles.textBadged}>{NotifyHandle(notify)}</Text>
        </View>
      )}
      <Icon style={{ tintColor: tintColor }} icon={icon} />
    </View>
  ) : (
      <View>
        {useBadged === true && NotifyHandle(notify).length > 0 && (
          <View style={styles.badged}>
            <Text style={styles.textBadged}>{NotifyHandle(notify)}</Text>
          </View>
        )}
        <Icon icon={icon} />
      </View>
    );
};

export const TabBarIconProfileCC = ({
  focused,
  tintColor,
  icon,
  useBadged,
}: TabBarIconProps) => {
  const { listProfileAdditional, listProfileNewInitialize, listProfileWaiting }: HistoryProfileState = useSelector((state: any) => state.ProfileHistoryReducer);
  const profileCCNotify = listProfileAdditional.length + listProfileNewInitialize.length + listProfileWaiting.length;
  return focused ? (
    <View>
      {useBadged === true && NotifyHandle(profileCCNotify).length > 0 && (
        <View style={styles.badged}>
          <Text style={styles.textBadged}>{NotifyHandle(profileCCNotify)}</Text>
        </View>
      )}
      <Icon style={{ tintColor: tintColor }} icon={icon} />
    </View>
  ) : (
      <View>
        {useBadged === true && NotifyHandle(profileCCNotify).length > 0 && (
          <View style={styles.badged}>
            <Text style={styles.textBadged}>{NotifyHandle(profileCCNotify)}</Text>
          </View>
        )}
        <Icon icon={icon} />
      </View>
    );
};
export const TabBarIconChat = ({
  focused,
  tintColor,
  icon,
  useBadged,
}: TabBarIconProps) => {
  const { listRoomChat }: ChatState = useSelector((state: any) => state.ChatReducer);
  let count = 0;
  let data = listRoomChat.data;
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let id = element.mes && element.mes.id;
      let readId = element.read;
      try {
        if (id - readId > 0) {
          count++;
        }
      } catch (error) {

      }
      // try {
      //   count = count + (id - readId);
      // } catch (error) {

      // }
    }
  }
  return focused ? (
    <View>
      {useBadged === true && NotifyHandle(count).length > 0 && (
        <View style={styles.badged}>
          <Text style={styles.textBadged}>{NotifyHandle(count)}</Text>
        </View>
      )}
      <Icon style={{ tintColor: tintColor }} icon={icon} />
    </View>
  ) : (
      <View>
        {useBadged === true && NotifyHandle(count).length > 0 && (
          <View style={styles.badged}>
            <Text style={styles.textBadged}>{NotifyHandle(count)}</Text>
          </View>
        )}
        <Icon icon={icon} />
      </View>
    );
};

export const TabBarIconNotify = ({
  focused,
  tintColor,
  icon,
  useBadged,
}: TabBarIconProps) => {
  const { countNotify }: NotificationState = useSelector((state: any) => state.NotificationReducer);
  return focused ? (
    <View>
      {useBadged === true && NotifyHandle(countNotify).length > 0 && (
        <View style={styles.badged}>
          <Text style={styles.textBadged}>{NotifyHandle(countNotify)}</Text>
        </View>
      )}
      <Icon style={{ tintColor: tintColor }} icon={icon} />
    </View>
  ) : (
      <View>
        {useBadged === true && NotifyHandle(countNotify).length > 0 && (
          <View style={styles.badged}>
            <Text style={styles.textBadged}>{NotifyHandle(countNotify)}</Text>
          </View>
        )}
        <Icon icon={icon} />
      </View>
    );
};


const ButtonBar = ({
  text,
  active,
  onPress,
  route,
  configIcon,
  renderIcon,
  activeTintColor,
  inactiveTintColor,
}: ButtonBarProps) => {
  const onPressTab = () => {
    route && onPress && onPress({ route });
  };
  return (
    <Button activeOpacity={0.87} onPress={onPressTab} style={styles.wrapButton}>
      {/* {active === true && <View style={[styles.indicator]} />} */}
      {renderIcon && renderIcon(configIcon)}
      <Text
        style={
          active
            ? {
              ...styles.textButtonActive,
              color: activeTintColor ? activeTintColor : 'rgba(0,190,212,1)',
            }
            : {
              ...styles.textButton,
              color: inactiveTintColor ? inactiveTintColor : '#6F6F6F',
            }
        }>
        {text && text}
      </Text>
    </Button>
  );
};

export const BottomTabBar = (props: BottomTabBarProps) => {
  const {
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    renderIcon,
    navigation,
  } = props;
  const [visible, setVisible] = useState(false)
  const { routes, index } = navigation.state;
  const [translateY, translateX, opacity] = useValues([0, 0, 0], [])
  const {token }: AppState = useSelector((state: any) => state.AppReducer);
  const onShowModal = useCallback(
    () => {
      setVisible(true)
    },
    [],
  )
  const onNext = useCallback(
    () => {
      setVisible(false)
      navigate(CREATE_INFO_NOTARY)
    },
    [],
  )
  const onHideModal = useCallback(
    () => {
      setVisible(false)
    },
    [],
  )
  useCode(() => set(translateY, spring({ from: 60, to: 0, config: { damping: 12 } })), [])
  useCode(() => set(opacity, timing({ from: 0, to: 1, duration: 700 })), [])
  useCode(() => set(translateX, timing({ from: translateX, to: (width / routes.length) * index, duration: 200 })), [index])
  return (

    <>
      <SafeAreaView>
        <ModalSelect onHideModal={onHideModal}
          onPressNext={onNext}
          visible={visible} />
        <View style={styles.shadow}>
          <Img source={'shadow'} />
        </View>
        <Anim.View style={[styles.wrap, { transform: [{ translateY }] }]}>
          <Anim.View style={[styles.indicator, { width: (width / routes.length), transform: [{ translateX: translateX }] }]} />
          {routes.map((route, routeIndex) => {
            return (
              <ButtonBar
                onPress={onTabPress}
                route={route}
                configIcon={{
                  route: route,
                  horizontal: false,
                  focused: routeIndex === index,
                  tintColor: activeTintColor,
                }}
                renderIcon={renderIcon}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                key={routeIndex}
                active={routeIndex === index}
                text={getLabelText({ route })}
              />
            );
          })}
        </Anim.View>
      </SafeAreaView>
      {(index === 0 || index === 2 || index === 3) && token && token.length > 0 &&
        // <Button onPress={onNext} activeOpacity={0.87} style={[styles.wrapFloat, { bottom: 70 + useSafeArea().bottom}]}>
        //   <Icon icon={'create_profile_cc'} />
        //   <Text style={styles.textFloat} tx={'main:tvCreateCC'} />
        // </Button>
        <View></View>
        }
    </>

  );
};
const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    top: -25,
    zIndex: -2,
    transform: [{ rotate: '180deg' }],
  },
  wrapFloat: {
    position: 'absolute',
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 10,
    zIndex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,190,212,1)',
    borderRadius: 20,
  },
  textFloat: {
    fontSize: FONT_14,
    letterSpacing: 0.16,
    fontWeight: 'bold',
    fontFamily: typography.helveticaNeue_bold,
    marginLeft: 5,
  },
  indicator: {
    height: 2,
    position: 'absolute',
    top: 0,
    backgroundColor: 'red',
  },
  textBadged: {
    fontSize: FONT_12,
  },
  badged: {
    paddingHorizontal: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: 8.5,
    left: 12,
    top: -2,
    zIndex: 1,
    backgroundColor: 'rgba(0,190,212,1)',
  },
  wrap: {
    overflow: 'visible',
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffffff',
  },
  wrapButton: {
    flexDirection: 'column',
    overflow: 'hidden',
    flex: 1,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#6F6F6F',
    fontSize: FONT_12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.32,
    paddingTop: 2,
    fontFamily: typography.helveticaNeue_regular,
  },
  textButtonActive: {
    color: 'rgba(0,190,212,1)',
    paddingTop: 2,
    textAlign: 'center',
    fontSize: FONT_12,
    lineHeight: 16,
    letterSpacing: 0.32,
    fontFamily: typography.helveticaNeue_regular,
  },
});
