import React from 'react';
import { View,Dimensions } from 'react-native';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ForgotRequest } from 'src/app/data/model/request';
import { toggleLoading } from '../../../../../../App';
import constants from '../../../../common/constants';
import {
  ButtonPrimary,
  Header,
  Screen,
  Text
} from '../../../../library/components';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import RestAPI from '../../../../RestAPI';
import { GlobalStyle } from '../../../../themes/index';
var { width, height } = Dimensions.get('window');
export const Forgot = reduxForm({
  form: 'Login_Forgot', validate: data => {
  }
})(
  (props: ForgotFormProps & ConfigProps & InjectedFormProps) => {
    const { handleSubmit, onSubmit, onForgot, onCheckForm } = props;
    const forgotPassword = async (value: ForgotRequest) => {
      console.log(value)
      toggleLoading(true);
      var resp = await RestAPI.ForgotPassword({
        username: value.username
      });
      if (resp.status == 1) {
        DropDownHolder.showSuccess('Thông báo', (resp.message));
      }
      else {
        DropDownHolder.showWarning(('Thông báo'), (resp.message));
      }
      toggleLoading();
    }
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
        </View>
        <Text style={{
          textAlign: 'center', alignSelf: 'stretch', fontSize: 30, fontWeight: '700', textTransform: 'uppercase', marginTop: 10
        }}>
          {'Lấy lại mật khẩu'}
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 20,
            marginTop: 100,
            margin: 15,
            ...GlobalStyle.boxShadow
          }}
        >
          <View>
            <Field
              name={'username'}
              label='Nhập tài khoản'
              placeholder='Tài khoản'
              component={ViewCus.TextInput}
              normalize1={value => {
                return value && value.toUpperCase()
              }}
            />
          </View>
          <ButtonPrimary style={{ marginTop: 20 }} onPress={handleSubmit(forgotPassword)} >{'Lấy mật khẩu'}</ButtonPrimary>
        </View>
        </View>
      </Screen>
    );
  },
);
