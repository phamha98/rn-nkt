import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text as TextCus, Button } from '../../../../../../library/components';
import ButtonNextTab from '../../../../../../library/components/buttonNext/ButtonNextTab';
import ViewCus from '../../../../../../library/components/ViewCus/ViewCus';
import { StyleSheet, RefreshControl } from 'react-native';
import Utils from '../../../../../../library/utils/Utils';
const Text = props => <TextCus {...props} style={[{ color: 'black', }, props.style]} />

const defaultData = {
  Id: 0,
  A4_HoTen: "",
  A2_MaSo: "",
  A3_NgayCap: null,
  C1_DangKhuyetTat_VD: 0,
  C1_DangKhuyetTat_Nhin: 0,
  C1_DangKhuyetTat_NgheNoi: 0,
  C1_DangKhuyetTat_TK: 0,
  C1_DangKhuyetTat_TT: 0,
  C1_DangKhuyetTat_CXD: 0,
  C1_DangKhuyetTat_Khac: 0,
  C1_DangKhuyetTat_KhacText: "",
  C2_MucDoKhuyetTat: 0,
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10
  }
})

export const ThongTinDoiTuong = reduxForm({
  form: 'ThongTinXNKT', validate: data => {
    var valids = Utils.objectValid.valid({
      ...defaultData,
      ...data,
    }, {
      Id: {
      },
      A4_HoTen: {
      },
      A2_MaSo: {
        required: true,
        maxlength: 40
      },
      A3_NgayCap: {
        required: true,
        lessDateOrEqual: {
          valid: true,
          compareWith: new Date(),
          compareFormat: 'DD/MM/YYYY'
        },
      },
      C1_DangKhuyetTat_VD: {
      },
      C1_DangKhuyetTat_Nhin: {
      },
      C1_DangKhuyetTat_NgheNoi: {
      },
      C1_DangKhuyetTat_TK: {
      },
      C1_DangKhuyetTat_TT: {
      },
      C1_DangKhuyetTat_CXD: {
      },
      C1_DangKhuyetTat_Khac: {
      },
      C1_DangKhuyetTat_KhacText: {
        maxlength: 100
      },
      C2_MucDoKhuyetTat: {
      },
    }, { lan: 'redux-form' })
    return valids.toObject(e => e.field, e => e.message);
  }
})(
  (props: ConfigProps & InjectedFormProps) => {
    const {
      handleSubmit,
      reset: resetForm,
      initialize: loadForm,
      initData,
      onRefresh = () => { },
      isRefresh: _isRefresh,
    } = props;

    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
      loadData();
    }, [_isRefresh])

    const loadData = async () => {
      var data = Utils.mapDataWithCase(defaultData, initData || {});
      loadForm(data);
      setIsRefresh(false);
    }

    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => onRefresh()} />}
        contentContainerStyle={{
          padding: 10,
          backgroundColor: 'white'
        }}
      >
        <ViewCus.ViewBoxShadown>
          <Field
            name={'Id'}
            component={ViewCus.HiddenField}
          />
          <Field
            name={'A2_MaSo'}
            component={ViewCus.TextInput}
            requiredLabel
            label={'Số hiệu'}
            placeholder={'Số hiệu'}
          />
          {/* <Field
            name={'A4_HoTen'}
            component={ViewCus.TextInput}
            requiredLabel
            label={'Họ và tên'}
            placeholder={'Họ và tên'}
          /> */}
          <Field
            name={'A3_NgayCap'}
            component={ViewCus.DatePicker}
            requiredLabel
            label='Ngày cấp giấy XNKT'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Dạng khuyết tật'}</Text>
          <Field
            name={'C1_DangKhuyetTat_VD'}
            component={ViewCus.Checkbox}
            children={'Vận động'}
          />

          <Field
            name={'C1_DangKhuyetTat_Nhin'}
            component={ViewCus.Checkbox}
            children={'Nhìn'}
          />
          <Field
            name={'C1_DangKhuyetTat_NgheNoi'}
            component={ViewCus.Checkbox}
            children={'Nghe, Nói'}
          />
          <Field
            name={'C1_DangKhuyetTat_TK'}
            component={ViewCus.Checkbox}
            children={'Thần kinh, tâm thần'}
          />

          <Field
            name={'C1_DangKhuyetTat_TT'}
            component={ViewCus.Checkbox}
            children={'Trí tuệ'}
          />
          <Field
            name={'C1_DangKhuyetTat_CXD'}
            component={ViewCus.Checkbox}
            children={'Chưa xác định'}
          />
          <Field
            name={'C1_DangKhuyetTat_Khac'}
            component={ViewCus.Checkbox}
            children={'Khác'}
          />
          <Field
            name={'C1_DangKhuyetTat_KhacText'}
            component={ViewCus.TextInput}
            placeholder={'Dạng khuyết tật khác'}
            label={"Dạng khuyết tật khác"}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'C2_MucDoKhuyetTat'}
            component={ViewCus.RadioGroup}
            label='Mức độ khuyết tật'
            options={[
              {
                name: '',
                label: 'Đặc biệt nặng',
                value: 1
              },
              {
                name: '',
                label: 'Nặng',
                value: 2
              },
              {
                name: '',
                label: 'Nhẹ',
                value: 3
              },
              {
                name: '',
                label: 'Chưa xác định',
                value: 4
              },
            ]}
          />
        </ViewCus.ViewBoxShadown>
        {
          __DEV__ && 
          <Button
            onPress={() => loadForm(defaultData)}
          >
            {'Reset'}
          </Button>
        }
        <ButtonNextTab onPress={handleSubmit((data) => props.onUpdate(data))}>
          {'Cập nhật thông tin'}
        </ButtonNextTab>
      </ScrollView>
    );
  },
);