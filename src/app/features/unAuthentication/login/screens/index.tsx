import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import React, { useEffect, useRef } from 'react';
import { Alert, Platform, View,Image } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { PERMISSIONS } from 'react-native-permissions';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { dispatch } from '../../../../store/store';
import { toggleLoading } from '../../../../../../App';
import { checkPermission } from '../../../../common';
import constants from '../../../../common/constants';
import LocalStorage from '../../../../common/LocalStorage';
import { Screen, Text } from '../../../../library/components';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';
import { navigate } from '../../../../navigation/navigationService';
import { AUTHORIZE, AUTHORIZE_MANAGER, FORGOT, } from '../../../../navigation/screenTypes';
import RestAPI from '../../../../RestAPI';
import { onSetToken, onSetUser } from '../../../../store/app_redux/action';
import { GlobalStyle } from '../../../../themes/index';
import { palette as appColors } from '../../../../themes/palette';
import { setHomeUserDetails } from '../../../authentication/home/redux/action';
import { DebugButtonActive } from '../../../debug/components/Debug';
import { ButtonSocial, Form } from './components';
import { AudioRecording } from '../../recordingAudio/recording'
import { FingerPrint } from '../../fingerPrint/FingerPrint';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import { ButtonLogin } from './components/buttonLogin';
import { ButtonRegister } from './components/buttonRegister'

export const loadUserOffline = () => {
  return new Promise(async (resolve, reject) => {
    const token = await LocalStorage.getToken();
    const user = await LocalStorage.getUserSaved();
       
    if (user != null) {
      dispatch(setHomeUserDetails(user.user))
      dispatch(onSetToken(token));
      dispatch(onSetUser(user));

      const navigate = user?.user.capQuanLy == 7 ? AUTHORIZE : AUTHORIZE_MANAGER
      resolve({ isSuccess: true, navigate });
    }
    else {
      resolve({ isSuccess: false, navigate: '' });
    }
  })
}
export const loginFunc = (data) => {
  return new Promise(async (resolve, reject) => {
    const resp = await RestAPI.Login(data)
    if (resp.status == 0 && resp.user != null) {
      dispatch(setHomeUserDetails(resp.user))
      dispatch(onSetToken(resp.token));
      dispatch(onSetUser(resp));
      LocalStorage.setToken(resp.token);
      LocalStorage.setUserSaved(resp);
      LocalStorage.setDataLogin(data);
      AsyncStorage.setItem(
        'dataUserLocal',
        JSON.stringify(resp),
        () => { }
      );
      resolve({
        isSuccess: true,
        user: resp.user,
        navigate: resp.user?.capQuanLy == 7 ? 'CHOOSE_FUNCTION' : AUTHORIZE_MANAGER
      })
    }
    else {
      resolve({ isSuccess: false, message: resp.message || 'Tài khoản hoặc mật khẩu không đúng' })
    }
  })
}
export const Login = (props: any) => {
  var insets = useSafeArea();
  const _form = useRef();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const onCheckForm = async () => {
    toggleLoading(true);
    _form.current.values.isRemember = true
    const { isSuccess, message, navigate: _nav } = await loginFunc(_form.current.values)
    toggleLoading();
    if (isSuccess)
      navigate(_nav);
    else
      DropDownHolder.showWarning(translate('dialog:warning'), message);
  };
  const onForgot = () => {
    navigate(FORGOT);
  };

  const onLoginApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const params = {
        "Email": appleAuthRequestResponse.email,
        "DisplayName": appleAuthRequestResponse.user,
        "Username": appleAuthRequestResponse.user,
        "socialid": appleAuthRequestResponse.nonce,
        "AnhDaiDien": '',
        "type_social": 2
      };
      appleAuth.Operation.LOGOUT
      toggleLoading();
      RestAPI.Login_Social(params)
        .then(response => {
          toggleLoading();
          if (response.status == true) {
            dispatch(setHomeUserDetails(response.user))
            dispatch(onSetToken(response.token));
            dispatch(onSetUser(response));
            LocalStorage.setToken(response.token);
            LocalStorage.setUserSaved(response);
            navigate(AUTHORIZE);
          }
        })
    }
  }

  const onLoginFacebook = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only")
    }
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(async (data: any) => {
            const response = await fetch(
              `https://graph.facebook.com/me?access_token=${data.accessToken
              }&fields=id,name,email,about,picture`,
            );
            const responseJSON = JSON.parse(JSON.stringify(await response.json()));
            try {
              const params = {
                "Email": "",
                "DisplayName": responseJSON.name,
                "Username": "",
                "socialid": responseJSON.id,
                "AnhDaiDien": `http://graph.facebook.com/${responseJSON.id}/picture?type=large`,
                "type_social": 1
              };
              LoginManager.logOut();
              toggleLoading();
              RestAPI.Login_Social(params)
                .then(response => {
                  toggleLoading();
                  if (response.status == true) {
                    dispatch(setHomeUserDetails(response.user))
                    dispatch(onSetToken(response.token));
                    dispatch(onSetUser(response));
                    LocalStorage.setToken(response.token);
                    LocalStorage.setUserSaved(response);
                    AsyncStorage.setItem(
                      'dataUserLocal',
                      JSON.stringify(response),
                      () => { }
                    );
                    navigate(AUTHORIZE);
                  }
                  else {
                    DropDownHolder.showWarning(translate('dialog:warning'), 'Thông báo' || translate('Tài khoản hoặc mật khẩu không đúng'));
                  }
                })
            }
            catch (e) {
              console.log(e)
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const onLoginGoogle = async () => {
    // checkConnectivity();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // AccessToken.getCurrentAccessToken;
      const { givenName, familyName, email, id, name, photo } = userInfo.user;
      const params = {
        "Email": email,
        "DisplayName": name,
        "Username": "",
        "socialid": id,
        "AnhDaiDien": photo,
        "type_social": 2
      };
      LoginManager.logOut();
      toggleLoading();
      RestAPI.Login_Social(params)
        .then(response => {
          toggleLoading();
          if (response.status == true) {
            dispatch(setHomeUserDetails(response.user))
            dispatch(onSetToken(response.token));
            dispatch(onSetUser(response));
            LocalStorage.setToken(response.token);
            LocalStorage.setUserSaved(response);
            navigate(AUTHORIZE);
          }
        })
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(translate('login:tvLoginCancel'));
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(translate('login:tvServiceUnavaiable'));
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure();
  };

  return (
    <Screen isScroll={true}>
      <View style={{ position: 'absolute', width: '100%', height: constants.window.height * .5, backgroundColor: 'rgba(0,190,212,1)', }} />
      <View style={{ paddingTop: 20 }} >
        <Text style={{ textAlign: 'center', alignSelf: 'stretch' }}>{'Bộ Lao động-Thương binh và Xã hội'}</Text>
        <Text style={{ textAlign: 'center', alignSelf: 'stretch', fontSize: 18, textTransform: 'uppercase', lineHeight: 50, marginTop: 20, fontWeight: 'bold', paddingLeft: 30, paddingRight: 30 }}>
          {'ỨNG DỤNG ĐĂNG KÝ THÔNG TIN NGƯỜI KHUYẾT TẬT VÀ NẠN NHÂN BOM MÌN'}
        </Text>
        <DebugButtonActive>
          <Text style={{ textAlign: 'center', alignSelf: 'stretch', fontSize: 36, fontWeight: '700', textTransform: 'uppercase', marginTop: 10 }}>
            {'Đăng nhập'}
          </Text>
        </DebugButtonActive>
      </View>
      <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 20, marginTop: 20, margin: 15, ...GlobalStyle.boxShadow }} >
        <Form ref={_form} onForgot={onForgot} onSubmit={() => { }} onCheckForm={onCheckForm} />
      </View>

      {/* <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, marginTop: 10, margin: 15, height: 260, ...GlobalStyle.boxShadow }} >
        {Platform.OS === 'ios' && <ButtonSocial background={'#1c1c1c'} icon={'apple'} tx={'login:tvAplle'} onPress={onLoginApple} />}
        <ButtonSocial background={appColors.socialFacebook} icon={'facebook'} tx={'login:tvFaceBook'} onPress={onLoginFacebook} />
        <ButtonSocial background={appColors.socialGooglePlus} icon={'google'} tx={'login:tvGoogle'} onPress={onLoginGoogle} />
      </View> */}
      <Text style={{ textAlign: 'center', alignSelf: 'stretch', fontSize: 16, fontWeight: '400', color: '#333', marginTop: 5, marginVertical: 20, }}>
        {'Hoặc đăng nhập bằng'}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <FingerPrint />
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-start', marginHorizontal: 25 }}>
          <AudioRecording />
        </View>
      </View>
      {/* <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 25 }}>
        <Image  style={{width:'100%',height: 50}} source={require('../../../../assets/image/audio2.gif')} />
        </View> */}
    </Screen>
  )
};

