
import NetworkInfo from '@react-native-community/netinfo';
import React, { useEffect, useRef } from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import { checkPermission } from '../common';
import LocalStorage from '../common/LocalStorage';
import Debug from '../features/debug/components/Debug';
import { debugForceUpdate } from '../features/debug/redux/debugAction';
import DownloadBundle from '../features/downloadBundle';
import { loadUserOffline, loginFunc } from '../features/unAuthentication/login/screens';
import { UpdateDataSaved } from '../library/components/updateDataSaved';
import ViewCus from '../library/components/ViewCus/ViewCus';
import { apiUpdateStatusFunc } from '../RestAPI';
import { dispatch } from '../store/store';
import { palette as appColors } from '../themes/palette';
import VoiceTest from '../VoiceTest';
import { GenericAppNavigate } from './appContainer';
import { setTopLevelNavigator } from './navigationService';
import RNFetchBlob from 'rn-fetch-blob';
export const navigationRef = React.createRef();
export const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/Script.json`;


export function getNavigationSteps(navigationState, steps = []) {
  steps = steps == null ? [] : steps;
  if (!navigationState) {
    return steps;
  }
  const route = navigationState.routes[navigationState.index];
  steps.push(route);
  if (route.routes || route.state) {
    return (getNavigationSteps(route.routes != null ? route : route.state, steps));
  }
  return steps;
}

var isConnected = null;
const AppNavigator = () => {
  const refLoading = useRef();
  const refContent = useRef();

  useEffect(() => {
    SplashScreen.hide()
    const listennerNetInfo = NetworkInfo.addEventListener(state => {
      if (state.isConnected != isConnected) {
        loadData(state.isConnected);
      }
    })

    return () => {
      listennerNetInfo != null && listennerNetInfo();
    }
  }, []);

  const updateNavigationSteps = (state) => {
    dispatch(debugForceUpdate({
      navigationSteps: getNavigationSteps(state)
    }))
  }

  const loadData = async (isConnected) => {
    SplashScreen.hide()
    // isConnected = state.isConnected;
    // const isConnected = (await NetworkInfo.fetch()).isConnected;
    // const isConnected = false;
    apiUpdateStatusFunc(isConnected);
    var initRoute = '';
    const debug = await LocalStorage.getDebug();
    const settings = await LocalStorage.getSettings();
    const navigationSaved = __DEV__ ? debug.initNavigation.navigation : null;
    const checkSaveFile = await RNFetchBlob.fs.exists(filePath);
    console.log(checkSaveFile, filePath)
    dispatch(debugForceUpdate(debug, false));

    const { isRemember = false, username, password } = await LocalStorage.getDataLogin();
    var dataPostSaved = [];
    if (isRemember)
      if (!isConnected) {
        const { isSuccess: isLoginOffline = false, navigate: _nav } = await loadUserOffline();
        if (isLoginOffline)
          initRoute = _nav
      }
      else {
        dataPostSaved = await LocalStorage.get("DATAPOSTSAVED", [])
        const { isSuccess: isLogin, message, navigate: _nav, user } = await loginFunc({ username, password, isRemember })
        if (isLogin)
          initRoute = _nav
      }

    await checkPermission(Platform.select({ android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE }, null, null, null, null))
    refContent.current?.setData({
      isReady: true, isConnected, initRoute,
      state: navigationSaved, update: new Date().getTime(),
      dataPostSaved,
      checkSaveFile
    })

  }

  return (
    <>
      <ViewCus.ComponentDynamic
        ref={refContent}
        render={(params = {}) => {
          const { isReady = false, isConnected = false, initRoute = '', state = null, dataPostSaved = [], isDownBundle = true, checkSaveFile } = params;
          // return <VoiceTest/>
          if (!isReady)
            return <ViewCus.ViewCenter><ViewCus.ActivityIndicator /></ViewCus.ViewCenter>;
          const AppContent = GenericAppNavigate(initRoute);
          return (<View style={{ flex: 1 }}>
            {!isConnected &&
              <View>
                {/* <SafeAreaView />
                <ViewCus.Text style={{ textAlign: 'center', color: appColors.white, backgroundColor: appColors.metroYellow, paddingVertical: 8, paddingHorizontal: 5 }}>{'Đang Offline'}</ViewCus.Text> */}
                <ViewCus.Text style={{ textAlign: 'center', color: appColors.white, backgroundColor: appColors.lightGrey, paddingHorizontal: 5, paddingTop: Platform.OS === 'android' ? 20 : 40, paddingBottom: 10 }}>{'Đang chế độ Offline'}</ViewCus.Text>
              </View>
            }
            {isConnected && isDownBundle && !checkSaveFile ? <DownloadBundle
              callback={() => refContent.current?.setData({ ...params, isDownBundle: false })}
            /> : dataPostSaved.length != 0 ?
              <UpdateDataSaved data={dataPostSaved} onSuccess={() => loadData(true)} /> :
              <AppContent
                style={{ flex: 1 }}
                ref={e => {
                  navigationRef.current = e;
                  setTopLevelNavigator(e);
                }}
                onNavigationStateChange={(prevState, newState) => { updateNavigationSteps(newState); }}
                persistNavigationState={async (navState) => {
                  dispatch(debugForceUpdate({ currentNavigation: navState }));
                }}
                loadNavigationState={() => state}
              />
            }
          </View>)
        }}
      />
      {/* {__DEV__ && <ViewCus.ViewHorizontal style={{}}>
        {[
          { title: 'Connected', onPress: () => loadData(true) },
          { title: 'Disconnected', onPress: () => loadData(false) },
        ].map((e, index) => (
          <ViewCus.Button key={index} onPress={e.onPress}>{e.title}</ViewCus.Button>
        ))}
      </ViewCus.ViewHorizontal>} */}
      <Debug />
    </>
  );
};
export default AppNavigator;
