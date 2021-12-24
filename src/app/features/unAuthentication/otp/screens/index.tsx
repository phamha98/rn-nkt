import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CODE_ERROR, CODE_SUCCESS } from '../../../../config';
import {
  Header, Screen,

  Wallpaper
} from '../../../../library/components';
import { RESEND_OTP, Send_OTP_APIs } from '../../../../library/networking';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';
import ProgressHolder from '../../../../library/utils/progressHolder';
import { navigate } from '../../../../navigation/navigationService';
import { REGISTER_SUCCESS } from '../../../../navigation/screenTypes';
import { onResendOTP, onResetState, onSend } from '../redux/action';
import { OtpState } from '../redux/type';
import { ButtonSend, RowReSend, SubTop, TextOTP } from './components/index';
import { styles } from './style';
export const OTP = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const userId = navigation.getParam('USER_ID', -1);
  const phone = navigation.getParam('PHONE', '');
  const { loading, data, code, msg }: OtpState = useSelector((x: any) => x.OTPReducer)
  const [otp, setOtp] = useState('')
  const _form = useRef();
  const onGoback = () => {
    navigation.goBack();
  };
  const onSubmit = () => {
    dispatch(onSend(Send_OTP_APIs, { userid: userId, otp: otp }))
  };
  const onChangeOTP = val => {
    setOtp(val)
  }
  useEffect(() => {
    return () => {
      dispatch(onResetState())
    }
  }, []);
  useEffect(() => {
    switch (code) {
      case CODE_ERROR:
        DropDownHolder.showWarning(translate('dialog:warning'), msg);
        break;
      case CODE_SUCCESS:
        DropDownHolder.showSuccess(translate('dialog:success'), msg);
        setTimeout(() => {
          ProgressHolder.hidden();
          navigate(REGISTER_SUCCESS);
        }, 300);
        break;

      default:
        break;
    }
  }, [msg, code]);
  useEffect(() => {
    if (loading) {
      ProgressHolder.visible(translate('dialog:loading'));
    } else {
      ProgressHolder.hidden();
    }
  }, [loading]);

  //Gui lai ma OTP
  const onReSend = () => {
    dispatch(onResendOTP(RESEND_OTP, { "phone": phone }))
  };
  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'otp:tvHeader'}
        />
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <View>
              <SubTop />
              <TextOTP onChangeOTP={onChangeOTP} />
              <RowReSend onPress={onReSend} />
            </View>
          </ScrollView>
          <ButtonSend onPress={onSubmit} />
        </View>
      </Screen>
    </>
  );
};
