import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import ViewCus from '../../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../../library/utils/Utils';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
  NgayHen: null,
  NoiDung: '',
  NoiDungNoi: '',
  TrangThai: 0,
}

export const AppointmentEditForm = reduxForm({
  form: 'AppointmentEditForm',
  validate: data => {
    var valids = Utils.objectValid.valid({
      ...defaultData,
      ...data,
    }, {
      NgayHen: {
        required: true,
        greaterDateOrEqual: {
          valid: true,
          compareWith: new Date(),
          compareFormat: 'DD/MM/YYYY'
        },
      },
      NoiDung: {
        required: true,
        maxlength: 400
      },
      NoiDungNoi: {
        // required: true,
        maxlength: 600
      },
      TrangThai: {
        required: value => value < 0 || value == null
      }
    }, { lan: 'redux-form' })
    return valids.toObject(e => e.field, e => e.message);
  }
})((props: ConfigProps & InjectedFormProps) => {
  const {
    handleSubmit,
    reset: resetForm,
    initialize: loadForm,
    onSubmit,
    initData
  } = props;

  useEffect(() => {
    loadData();
    return () => {

    };
  }, []);

  const loadData = () => {
    var _initData = Utils.mapDataWithCase(defaultData, initData || {})
    loadForm({
      ...defaultData,
      ..._initData
    })
  }

  const _onSubmit = (obj) => {
    props.onSubmit(obj)
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 10
      }}
    >
      <ViewCus.ViewBoxShadown
        style={{
          padding: 20
        }}
      >
        <Field
          name={'NgayHen'}
          component={ViewCus.DatePicker}
          requiredLabel
          label='Ngày hẹn'
          placeholder='Ngày hẹn'
        />
        <Field
          name={'NoiDung'}
          component={ViewCus.TextInput}
          requiredLabel
          label='Nội dung hẹn'
          placeholder='Nội dung hẹn'
          multiline={true}
          numberOfLines={5}
          style={[
            {

            },
            Platform.OS == 'ios' && { height: 100 }
          ]}
        />
        <Field
          name={'NoiDungNoi'}
          component={ViewCus.TextInput}
          label='Nội dung xử lý'
          placeholder='Nội dung xử lý'
          multiline={true}
          numberOfLines={5}
          style={[
            {

            },
            Platform.OS == 'ios' && { height: 100 }
          ]}
        />
        <Field
          name={'TrangThai'}
          component={ViewCus.RadioGroup}
          label='Trạng thái xử lý'
          requiredLabel
          options={[
            {
              name: 'DaXuLy',
              label: 'Đã xử lý',
              value: 1
            },
            {
              name: 'ChuaXuLy',
              label: 'Chưa xử lý',
              value: 0
            },
          ]}
          render={({ RadioComponent }) => (
            <ViewCus.ViewHorizontal
              style={{
                justifyContent: 'space-around',
              }}
            >
              <RadioComponent.DaXuLy />
              <RadioComponent.ChuaXuLy />
            </ViewCus.ViewHorizontal>
          )}
        />
        <ButtonNextTab
          onPress={handleSubmit(_onSubmit)}
        >
          {'Lưu'}
        </ButtonNextTab>
      </ViewCus.ViewBoxShadown>
    </ScrollView>
  );
});