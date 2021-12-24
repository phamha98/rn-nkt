import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Screen,

  Wallpaper
} from '../../../../library/components';
import { CHINH_SACH } from '../../../../library/networking/index';
import { getPrivacy } from '../redux/action';
import { TermState } from '../redux/reducer';
import { styles } from './style';

export const Privacy = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { loading, privacy, term }: TermState = useSelector(
    (x: any) => x.TermReducer,
  );
  const onGoback = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(getPrivacy(CHINH_SACH, {}));
  }, [])
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'CHÍNH SÁCH BẢO MẬT'}
        />
        <ScrollView style={{}}>
          <View style={styles.body}>
            {/* <Text style={{color:'#000', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: FONT_17, marginBottom: 10}}>{privacy.title}</Text> */}
            <HTML html={privacy.content} imagesMaxWidth={Dimensions.get('window').width * 0.8} tagsStyles={styles}
              baseFontStyle={styles.justify} />
          </View>
        </ScrollView>
      </Screen>
    </>

  );
};
