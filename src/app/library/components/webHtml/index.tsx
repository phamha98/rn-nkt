import React, { useEffect, useRef } from 'react';
import { BackHandler, Dimensions, Platform, ScrollView, View } from 'react-native';
import HTML from 'react-native-render-html';
import { Header, Screen, Wallpaper } from '../../../library/components';
import { styles } from './style';
const draw = Platform.OS === 'android';
export const WebHTML = (props: any) => {
  const { navigation } = props;
  const _inputs = useRef(null);
  const news = navigation.getParam('news', {});


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
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={
            news && news.title ? news.title : ''
          }
        />
        <View style={styles.body}>
          <ScrollView style={{ paddingHorizontal: 10 }}>
            {/* <Text style={{color:'#000', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: FONT_17}}>{term.title}</Text> */}
            <HTML html={news.content} imagesMaxWidth={Dimensions.get('window').width * 0.8} />
            {/* <Text style={{color:'#000', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: FONT_17, marginBottom: 10}}>{privacy.title}</Text>
          <HTML html={privacy.content} imagesMaxWidth={Dimensions.get('window').width * 0.8} /> */}
          </ScrollView>
        </View>
      </Screen>
    </>
  );
};
