import React, { useEffect } from 'react';
import { AsyncStorage, Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import {
  Button, Header, Screen,



  Text, Wallpaper
} from '../../../../library/components';
import { navigate } from '../../../../navigation/navigationService';
import { HOME_UN_AUTH, LOGIN } from '../../../../navigation/screenTypes';
import { styles } from '../../term/screens/style';
const draw = Platform.OS === 'android' ? true : false
export const TermLaunch = ({ navigation }) => {

  const isGoToLogin = navigation.getParam('isGoToLogin', false);
  //console.log('isGoToLogin',isGoToLogin);
  const onAgreeAndContinue = () => {
    //console.log('onAgreeAndContinue');
    if (isGoToLogin) {
      navigate(LOGIN);
    } else {
      navigate(HOME_UN_AUTH);
    }

  };
  const onGoToLogin = () => {

  };

  useEffect(() => {
    AsyncStorage.getItem("FIRST_LAUNCH_APP").then((isFirstLaunchApp: any) => {
      if (isFirstLaunchApp === '0') {
        onAgreeAndContinue();
      } else {
        AsyncStorage.setItem("FIRST_LAUNCH_APP", "0");
      }
    });
  }, []);

  return (
    <>
      {isGoToLogin === true ? null :
        <Screen>
          <Wallpaper useWrap={true} />
          <Header
            headerTx={'ĐIỀU KHOẢN SỬ DỤNG'}
            style={styles.header}
          />
          <View style={styles.body}>
            <WebView
              startInLoadingState={true}
              originWhitelist={['*']}
              style={styles.web}
              source={{ uri: 'http://sys.congchungtructuyen.vn/chinhsach' }}
            />
          </View>
          <View style={{ backgroundColor: '#ffffff' }}>
            <Button activeOpacity={0.87} style={styles.wrap} onPress={onAgreeAndContinue}>
              <Text tx={'Đồng ý và tiếp tục'} />
            </Button>
          </View>

        </Screen>
      }

    </>
  );
};
