import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text } from '../../../../../../library/components';
import { translate } from '../../../../../../library/utils/i18n/translate';
import { ButtonSend } from './buttonSend';
import ViewCus from '../../../../../../library/components/ViewCus/ViewCus'
import Utils from '../../../../../../library/utils/Utils';
import ButtonNext from '../../../../../../library/components/buttonNext/ButtonNextTab'


const required = (value: any) =>
  value && value.toString().trim().length > 0
    ? undefined
    : translate('validate:required');
export const strongPassword = (value: any) =>
  value &&
    !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)
    ? 'Must like Abc@1234'
    : undefined;

export const validatePassword = (value: any) =>
  value && value.length < 8
    ? 'Must like Abc@1234'
    : undefined;


export const Form = reduxForm({
  form: 'Register', validate: data => {
    var valids = Utils.objectValid.valid({
      ...data,
    }, {
      Password: {
        required: true,
        maxlength: 40
      },
      NewPassword: {
        required: true,
        maxlength: 40
      },
      confirm_NewPassword: {
        required: true,
        maxlength: 40
      },
    }, { lan: 'redux-form' })
    return valids.toObject(e => e.field, e => e.message);
  }
})(
  (props: ConfigProps & InjectedFormProps) => {
    const { handleSubmit, onSubmit ,onCheckForm} = props;
    const [passwordLevel, setPasswordLevel] = useState(0);
    const [strLevel, setStrLevel] = useState('');
    const [colorLevel, setColorLevel] = useState('');

    const onChangeNewPassword = (value: any) => {
      if (value && value.length > 0) {
        if (value && /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)) {
          setPasswordLevel(3);
          setStrLevel('Mật khẩu mạnh')
          setColorLevel('#06A20B')
        } else if (value && (
          /^(?=.*[0-9])(?!.*['"]).{8,}$/.test(value) ||
          /^(?=.*[\W])(?!.*['"]).{8,}$/.test(value) ||
          /^(?=.*[A-Z])(?!.*['"]).{8,}$/.test(value))) {
          setPasswordLevel(2);
          setStrLevel('Mật khẩu trung bình')
          setColorLevel('#FA8211')
        } else {
          setPasswordLevel(1);
          setStrLevel('Mật khẩu yếu')
          setColorLevel('#ff0000')
        }
      } else {
        setPasswordLevel(0);
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Field
            name={'Password'}
            label='Mật khẩu hiện tại'
            placeholder='Mật khẩu hiện tại'
            isSecurity={true}
            component={ViewCus.TextInput}
            secureTextEntry={true}

          />
          <Field
            name={'NewPassword'}
            label='Mật khẩu mới'
            placeholder='Mật khẩu mới'
            isSecurity={true}
            component={ViewCus.TextInput}
            secureTextEntry={true}
          />
          {passwordLevel > 0 ? <Text text={strLevel} style={{ color: colorLevel, width: '100%', textAlign: 'center', marginTop: 8, marginLeft: 5, fontStyle: 'italic' }} /> : null}
          <Field
            name={'confirm_NewPassword'}
            label='Nhập lại mật khẩu mới'
            placeholder='Nhập lại mật khẩu mới'
            isSecurity={true}
            component={ViewCus.TextInput}
            secureTextEntry={true}

          />
          <Text text={'(Mật khẩu phải có ít nhất 8 ký tự)'} style={{ color: '#666666', margin: 20, width: '100%', textAlign: 'center', fontStyle: 'italic' }} />
        </View>
        <ButtonSend onPress={handleSubmit(onSubmit)} />
      </View>
    );
  },
);
