import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Screen,

  Wallpaper
} from '../../../../library/components';
import { DIEU_KHOAN } from '../../../../library/networking/index';
import { getTerm } from '../redux/action';
import { TermState } from '../redux/reducer';

export const Term = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { loading, privacy, term }: TermState = useSelector(
    (x: any) => x.TermReducer,
  );
  const onGoback = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(getTerm(DIEU_KHOAN, {}));
    // dispatch(getPrivacy(CHINH_SACH,{}));
  }, [])
  return (
    <>
      <Wallpaper useWrap={false} />
      <Screen>
        <Header
          isBack={true}
          headerTx={term.title}
        />
        <ScrollView style={{ paddingHorizontal: 10 }}>
          {/* <Text style={{color:'#000', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: FONT_17}}>{term.title}</Text> */}
          <HTML html={term.content} imagesMaxWidth={Dimensions.get('window').width * 0.8} />
          {/* <Text style={{color:'#000', width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: FONT_17, marginBottom: 10}}>{privacy.title}</Text>
          <HTML html={privacy.content} imagesMaxWidth={Dimensions.get('window').width * 0.8} /> */}
        </ScrollView>
      </Screen>
    </>
  );
};
