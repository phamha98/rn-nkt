import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header, Screen,

  Wallpaper
} from '../../../../library/components';
import { TermState } from '../redux/reducer';
import { styles } from './style';

export const TermAuth = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { loading, privacy, term }: TermState = useSelector(
    (x: any) => x.TermReducer,
  );
  const onGoback = () => {
    navigation.goBack();
  };
  // useEffect(() => {
  //   dispatch(getTerm(DIEU_KHOAN, {}));
  // }, [])
  //console.log(term)
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          headerTx={'ĐIỀU KHOẢN SỬ DỤNG'}
          isBack={true}
        />
        <View style={styles.body}>
          <WebView
            startInLoadingState={true}
            originWhitelist={['*']}
            style={styles.web}
            source={{ uri: 'http://sys.congchungtructuyen.vn/chinhsach' }}
          />
        </View>
      </Screen>
    </>
  );
};
