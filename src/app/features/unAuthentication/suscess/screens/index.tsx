import React, { useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { Header, Screen, Wallpaper } from '../../../../library/components';
import { GlobalStyle } from '../../../../themes';
import { LOGIN } from '../../login/redux/actionType';
import { ButtonReturn } from './components/buttonSend';
import { Center } from './components/center';
import { styles } from './style';

export const RegisterSuccess = (props: any) => {
  const { navigation } = props;
  const goBack = () => {
    onReturn();
  };
  const onReturn = () => {
    navigation.push(LOGIN);
  };
  useEffect(() => {
    const onBackPress = () => {
      onReturn();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  return (
    <>
      <Wallpaper useWrap={true} />
      <Screen>
        <Header
          isBack={true}
          headerTx={'registerSuccess:tvHeader'}
        />
        <View style={styles.content}>
          <View style={[GlobalStyle.fullScreen]}>
            <Center />
          </View>
          <ButtonReturn onPress={onReturn} />
        </View>
      </Screen>
    </>
  );
};
