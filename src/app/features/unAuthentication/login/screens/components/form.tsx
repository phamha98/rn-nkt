import React, { useEffect, useRef, Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { navigate } from '../../../../../navigation/navigationService';
import { REGISTER, FORGOT, KHIEMTHI } from '../../../../../navigation/screenTypes';
import { ButtonLogin } from './buttonLogin';
import { ButtonRegister } from './buttonRegister';
import { ButtonForgot } from './buttonForgot';
import Utils from '../../../../../library/utils/Utils';
import { dispatch } from '../../../../../store/store';
import { debugForceUpdate } from '../../../../../features/debug/redux/debugAction';
import { AudioRecording } from '../../../recordingAudio/recording';
import { FingerPrint } from '../../../fingerPrint/FingerPrint';
interface LoginFormProps {
  onForgot: () => void;
}

const userTest = [
  {
    username: '0974185689',
    password: '123456789',
  },
  {
    username: 't001.badinh1',
    password: '123456a@',
  },
  {
    username: 't01.hanoi9',
    password: '123456a@',
  },
  {
    username: 'root',
    password: 'trinam@123',
  },
  {
    username: 'tranhoan',
    password: '123456789',
  },
  {
    username: 't00004.trucbach',
    password: '123456a@',
  },
  {
    username: 't09538.nguyentrai',
    password: '123456a@',
  },
  {
    username: 'transau',
    password: '123456789',
  },
  {
    username: 'test2',
    password: '12345678',
  },
  {
    username: 'test6',
    password: '12345678',
  },
  {
    username: 'transieu',
    password: '123456789',
  },
  {
    username: 'Hamy',
    password: '123456789',
  },
  {
    username: 'h005.caugiay.fpt1',
    password: '123456789',
  },
  {
    username: 'minhhieu5',
    password: '123456789',
  },
  {
    username: 'minhhoa',
    password: '123456789',
  },
  {
    username: 'Phanhang1111',
    password: '123456789',
  },
  {
    username: 'buihuong7',
    password: '123456789',
  }, {
    username: 'buihuong15',
    password: '123456a@',
  },{
    username: 't09538.nguyentrai',
    password: '123456a@',
  },
]

let defaultData = {
  username: '',
  password: '',
  isRemember: true,
}

export const Form = reduxForm({
  initialValues: defaultData, form: 'Login_Form', validate: data => {
    var valid = Utils.objectValid.valid({
      ...defaultData,
      ...data,
    }, {
      username: {
        required: true,
        maxlength: 40
      },
      password: {
        required: true,
        maxlength: 40
      },
    }, { lan: 'redux-form' })
    return Object.fromEntries(valid.map(e => [e.field, e.message]));
  }
})((props: LoginFormProps & ConfigProps & InjectedFormProps) => {
  const { handleSubmit, onSubmit, onForgot, onCheckForm } = props;
  const promptUser = useRef();
  const isActive = useSelector(state => state.debug.isActive);
  const userLogin = useSelector(state => state.debug.userLogin);

  useEffect(() => {
    props.initialize(
      {
        ...defaultData,
        username: '',
        password: '',
        ...userLogin
      });
  }, [])

  const onRegister = () => {
    navigate(REGISTER);
  };
  const onDanhChoNguoiKhiemThi = () => {
    navigate(KHIEMTHI);
  };
  const onForgotPassWord = () => {
    navigate(FORGOT);
  };

  return (
    <View>
      <Field
        name={'username'}
        label='Tài khoản'
        placeholder='Tài khoản'
        component={ViewCus.TextInput}
      />
      <Field
        name={'password'}
        label='Mật khẩu'
        placeholder='Mật khẩu'
        isSecurity={true}
        component={ViewCus.TextInput}
        secureTextEntry={true}
      />

      {(isActive || __DEV__) && <>
        <ViewCus.Modal
          ref={promptUser}
          title='Chọn tài khoản'
          styleModal={{ margin: 0, justifyContent: 'flex-end', }}
          styleContainer={{ borderRadius: 0, }}
          styleContent={{ borderRadius: 0, padding: 0 }}
        >
          <FlatList
            data={userTest}
            keyExtractor={(e, index) => e.username}
            renderItem={({ item: e, index }) => (
              <ViewCus.Button
                onPress={() => {
                  promptUser.current?.toggle(false)
                  dispatch(debugForceUpdate({ userLogin: e }, true))
                  props.initialize(e)
                }}
                style={{ alignItems: 'flex-start', backgroundColor: 'white', borderTopWidth: index == 0 ? 0 : 1, borderColor: '#f2f2f2' }}
              >
                <ViewCus.Text>{`User: ${e.username}`}</ViewCus.Text>
                <ViewCus.Text>{`Pass: ${e.password}`}</ViewCus.Text>
              </ViewCus.Button>
            )}
          />
        </ViewCus.Modal>
        <ViewCus.Button onPress={() => promptUser.current?.toggle()} >
          {'Chọn tài khoản'}
        </ViewCus.Button>
      </>}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.7, marginTop: 15 }}>
          <Field
            name={'isRemember'}
            children='Ghi nhớ mật khẩu'
            component={ViewCus.Checkbox}
          />
        </View>
        <View style={{ flex: 0.5, }}>
          <ButtonForgot onPress={onForgot} />
        </View>
      </View>
      <ButtonLogin onPress={handleSubmit(onCheckForm)} />
      <ButtonRegister onPress={onRegister} />
      {/* <View style={{ flex: 1 }}>
        <AudioRecording />
      </View> */}
      {/* <View style={{ flex: 1, alignItems: 'center' }}>
        <FingerPrint />
      </View> */}
      {/*  <ViewCus.Button onPress={()=> navigate('NGUOI_KHIEM_THI')}>{'Sử dụng cho người khiếm thị'}</ViewCus.Button>
        <ButtonLogin onPress={handleSubmit(onCheckForm)} />
      <ButtonRegister onPress={onRegister} /> */}
    </View>
  );
})