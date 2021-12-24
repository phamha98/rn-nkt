import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CODE_ERROR, CODE_SUCCESS } from '../..../../../../../config';
import { RegisterRequest } from '../../../../data/model/request';
import { Header, Screen, Text } from '../../../../library/components';
import { Register_APIs } from '../../../../library/networking/api';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { translate } from '../../../../library/utils/i18n/translate';
import ProgressHolder from '../../../../library/utils/progressHolder/index';
import { navigate } from '../../../../navigation/navigationService';
import { LOGIN } from '../../../../navigation/screenTypes';
import { GlobalStyle } from '../../../../themes';
import { ButtonRegister } from '../../login/screens/components';
import { onRegister, onResetState } from '../redux/action';
import { RegisterState } from '../redux/type';
import { Form } from './components/index';
var { width, height } = Dimensions.get('window');
export const Register = (props: any) => {
  const { loading, data, code, msg }: RegisterState = useSelector(
    x => x.RegisterReducer,
  );
  const dispatch = useDispatch();
  const { navigation } = props;
  const _form = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const onSend = (value: RegisterRequest) => {
    dispatch(onRegister(Register_APIs, value));

  };
  const onSubmit = () => {
    if (_form) {
      // _form.current.submit();
      dispatch(onRegister(Register_APIs, _form.current.values));
    }

  };
  useEffect(() => {
    switch (code) {
      case CODE_ERROR:
        DropDownHolder.showWarning(translate('dialog:warning'), "Tài khoản đã tồn tại. Vui lòng kiểm tra lại");
        break;
      case CODE_SUCCESS:
        DropDownHolder.showSuccess(translate('dialog:success'), "Đăng ký thành công!");
        setTimeout(() => {
          navigate(LOGIN, { USER_ID: data, PHONE: phoneNumber })
        }, 2000);
        break;

      default:
        break;
    }
  }, [code]);
  useEffect(() => {
    if (loading) {
      ProgressHolder.visible(translate('dialog:loading'));
    } else {
      ProgressHolder.hidden();
    }
  }, [loading]);
  useEffect(() => {
    return () => dispatch(onResetState());
  }, []);
  return (
    <Screen isScroll={true}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: height * .5,
          backgroundColor: 'rgba(0,190,212,1)',
        }}
      />
      <Header isBack={true} style={{
        // position: 'absolute'
      }} />
      <View
        style={{
        }}
      >
        <View
          style={{
            paddingTop: 20
          }}
        >
          <Text style={{
            textAlign: 'center', alignSelf: 'stretch'
          }}>
            {'Bộ Lao động-Thương binh và Xã hội'}
          </Text>
          <Text style={{
            textAlign: 'center', alignSelf: 'stretch', fontSize: 18, textTransform: 'uppercase', lineHeight: 50, marginTop: 20, fontWeight: 'bold', paddingLeft: 30, paddingRight: 30
          }}>
            {'ỨNG DỤNG ĐĂNG KÝ THÔNG TIN NGƯỜI KHUYẾT TẬT VÀ NẠN NHÂN BOM MÌN'}
          </Text>
          <Text style={{
            textAlign: 'center', alignSelf: 'stretch', fontSize: 36, fontWeight: '700', textTransform: 'uppercase', marginTop: 10
          }}>
            {'Đăng ký'}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 20,
            marginTop: 20,
            margin: 15,
            // height: 300,
            ...GlobalStyle.boxShadow
          }}
        >
          <Form ref={_form} onSubmit={onSend} />
          <ButtonRegister onPress={onSubmit} />
        </View>
      </View>
    </Screen>
  );
};
