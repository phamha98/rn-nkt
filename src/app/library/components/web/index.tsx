import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, Screen, Wallpaper } from '../../../library/components';
import { CREATE_BILL_NOTARY, CREATE_NOTARY_COMPLETE } from '../../../navigation/screenTypes';
import { styles } from './style';
const draw = Platform.OS === 'android';

export const WebPayment = (props: any) => {
  const { navigation } = props;
  const _inputs = useRef(null);
  const headerTx = navigation.getParam('headerTx', '');
  const news = navigation.getParam('news', {});
  const [key, setKey] = useState(1);
  const [canGoBack, setCanGoBack] = useState();
  const url = navigation.getParam('url');
  //console.log(url)
  const [isWebViewUrlChanged, setIsWebViewUrlChanged] = useState(url);
  //console.log(news)
  const _onNavigationStateChange = (webViewState: any) => {
    if (Object.keys(news).length > 0) {
      return;
    }
    setIsWebViewUrlChanged(webViewState)

    let stringArray = webViewState.url;
    let stringArray2 = 'status=1'
    if (stringArray.includes(stringArray2)) {
      navigation.navigate(CREATE_NOTARY_COMPLETE);
    } else if (stringArray.includes(stringArray2) != stringArray.includes(stringArray2)) {
      navigation.navigate(CREATE_BILL_NOTARY);
    }
  }


  useEffect(() => {
    const backAction = () => {
      _onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const _onBack = () => {
    if (Object.keys(news).length > 0) {
      navigation.goBack();
      return;
    }
    let stringArrayBack2 = 'http://alpha1.vtcpay.vn/public/bankservice'
    // let stringArrayBack = isWebViewUrlChanged;

    if (isWebViewUrlChanged && isWebViewUrlChanged.url && isWebViewUrlChanged.url.includes(stringArrayBack2)) {
      _inputs.current.goBack()
    } else {
      navigation.navigate(CREATE_BILL_NOTARY);
    }
  };
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={
            news && news.title ? news.title : (headerTx && headerTx !== '' ? headerTx : 'main:home:bill:headerWebView')
          }
        />
        <View style={styles.body}>
          <WebView
            key={key}
            ref={_inputs}
            onNavigationStateChange={_onNavigationStateChange}
            startInLoadingState={true}
            originWhitelist={['*']}
            style={styles.web}
            source={{ uri: url }}
          />
        </View>
        {/*{//console.log('ddsad',url)}*/}
      </Screen>
    </>
  );
};
