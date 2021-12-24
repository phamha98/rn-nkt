import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Screen,

  Wallpaper
} from '../../../../library/components';
import { DIEU_KHOAN } from '../../../../library/networking/index';
import { getTerm } from '../redux/action';
import { TermState } from '../redux/reducer';

export const TermAuth = (props: any) => {
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
  }, [])
  //console.log(term)
  return (
    <>
      <Screen>
        <Wallpaper useWrap={false} />
        <Header
          isBack={true}
          headerTx={term.title}
        />
        <WebView
          startInLoadingState={true}
          originWhitelist={['*']}
          style={{ flex: 1 }}
          source={{ uri: 'http://sys.congchungtructuyen.vn/chinhsach' }}
        />
      </Screen>
    </>
  );
};
