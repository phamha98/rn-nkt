import moment from 'moment';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, RefreshControl, Alert, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ConfigProps, Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Text as TextRN } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';
import DanhSachThanhVien from './DanhSachThanhVien';
const Text = props => <TextRN {...props} style={[{ color: 'black' }, props.style]} />
const validateForm = data => {
  var valids = Utils.objectValid.valid({
    ...defaultData,
    ...data,
  }, {
    B2_ChuHo_HoTen: {
      required: true,
    },
    B2_SoCMNDChuHo: {
      CMTND: true,
    },
    B10_ThuNhapBinhQuan: {
      min: 10
    }
  }, { lan: 'redux-form' })
  return valids.toObject(e => e.field, e => e.message);
}
const defaultData = {
  B1_MaHo: '',
  B2_ChuHo_HoTen: '',
  B2_NgaySinhChuHo: '',
  B2_SoCMNDChuHo: '',
  B2_NgayCap: '',
  B2_NoiCap: '',
  B2_SoDienThoai: '',
  B3_ChuHo_GioiTinh: 0,
  B4_ChuHo_QuanHeVoiNKT: 0,
  B4_ChuHo_QuanHeVoiNKT_KhacText: '',
  B5_NgheNghiep_KVL: 0,
  B5_NgheNghiep_TSXKD: 0,
  B5_NgheNghiep_LTM: 0,
  B5_NgheNghiep_LNN: 0,
  B5_NgheNghiep_CVC: 0,
  B5_NgheNghiep_CN: 0,
  B5_NgheNghiep_HT: 0,
  B5_NgheNghiep_Khac: 0,
  B5_NgheNghiep_KhacText: '',
  B6_HoanCanhKinhTe: 1,
  B7_SoNhanKhau_NKT: 0,
  B7_SoNhanKhau_TreDuoi16: 0,
  B7_SoNhanKhau_NguoiLaoDong: 0,
  B7_SoNhanKhau_NguoiCaoTuoi: 0,
  B8_NguonThuNhap_TCBTXH: 1,
  B8_NguonThuNhap_Luong: 0,
  B8_NguonThuNhap_HTGD: 0,
  B8_NguonThuNhap_KTH: 0,
  B8_NguonThuNhap_Khac: 0,
  B8_NguonThuNhap_KhacText: '',
  B9_ThuNhapHo: 0,
  B10_ThuNhapBinhQuan: 0,
  B11_ChiPhi_LuongThuc: 0,
  B11_ChiPhi_QuanAo: 0,
  B11_ChiPhi_KhamChuaBenh: 0,
  B11_ChiPhi_DongHocPhi: 0,
  B11_ChiPhi_UongThuoc: 0,
  B11_ChiPhi_Khac: '',
  B12_SuQuanTamChamSoc: 0,
  B12_MoiTruongChamSoc: 0,
  B12_NangLucChamSoc: 0,
  B7_SoNhanKhau_Tong: 0,
  ThanhVien: [
  ]
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    paddingVertical: 5,
    color: 'black',
  },
  titleCus: {
    fontSize: 15,
    letterSpacing: 0.16,
    paddingVertical: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title1: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    marginVertical: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

let ThongTinHo1 = (props: ConfigProps & InjectedFormProps) => {
  const {
    handleSubmit,
    reset: resetForm,
    initialize: loadForm,
    onReady,
    refOut,
    onRefresh,
    lockTab,
    prince,
    isRefresh: _isRefresh,
  } = props;

  const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
  const [isRefresh, setIsRefresh] = useState(false)

  useEffect(() => {
    isRefresh != false && setIsRefresh(false);
    init();
  }, [_isRefresh])

  useImperativeHandle(
    refOut,
    () => {
      setFormData
    },
  )

  var init = async () => {
    var { master: masterAll, dataSaved } = onReady() || {};
    // const {
    //   ethnics,
    //   provinces,
    //   districts,
    //   wards,
    // } = masterAll;
    var data = Utils.mapDataWithCase(defaultData, dataSaved.ttc);
    setFormData({
      ...data,
      ThanhVien: dataSaved.thanhVien.map(e => {
        e = Utils.mapDataWithCase({
          Id: -1,
          HoTen: '',
          NgaySinh: null,
          CMND: '',
          QuanHeChuHo: -1
        }, e);
        e.NgaySinh = e.NgaySinh != null ? new Date(e.NgaySinh) : null;
        return e
      })
    })
  }

  const setFormData = (data) => {
    loadForm(data)
  }

  const onResetFrom = () => {
    loadForm(defaultData)
  }
  const formatDate = (date) => {
    if (date == null || date == '')
      return '';
    else
      return moment(date).format()
  }
  var _onSubmit = (obj) => {
    obj = {
      ...defaultData,
      ...obj,
    }
    obj.NgayCapNhat = formatDate(obj.NgayCapNhat);
    obj.B2_NgaySinhChuHo = formatDate(obj.B2_NgaySinhChuHo);
    obj.B2_NgayCap = formatDate(obj.B2_NgayCap);
    obj.NguoiCapNhat = dataDetailUser.userID
    // obj.ThanhVien.NgaySinh = moment().format()
    obj.B7_SoNhanKhau_Tong = (obj.ThanhVien || []).length
    if (obj.B2_NgaySinhChuHo == "Invalid date") {
      obj.B2_NgaySinhChuHo = ""
    }
    if (obj.B2_NgayCap == "Invalid date") {
      obj.B2_NgayCap = ""
    }

    var { ThanhVien, ...other } = obj;
    props.onSubmitNext('TTC', other);
    props.onSubmitNext('ThanhVien', ThanhVien, { override: true });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        backgroundColor: 'white',
      }}
      refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
    >
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B1_MaHo'}
          component={ViewCus.TextInput}
          label='M?? h???'
          placeholder={"M?? h???"}
        />
        <Field
          name={'B2_ChuHo_HoTen'}
          component={ViewCus.TextInput}
          requiredLabel
          label='H??? v?? t??n ch??? h???'
          placeholder={"H??? v?? t??n ch??? h???"}
        />
        <Field
          name={'B2_NgaySinhChuHo'}
          component={ViewCus.TextDate}
          // validate={[Utils.objectValid.isValidDate]}
          label='Ng??y Sinh'
        />
        <Field
          name={'B2_SoCMNDChuHo'}
          component={ViewCus.TextInput}
          label='S??? CMND/CCCD ho???c m?? s??? ?????nh danh'
          placeholder={'S??? CMND/CCCD ho???c m?? s??? ?????nh danh'}

        />
        <Field
          name={'B2_NgayCap'}
          component={ViewCus.TextDate}
          // validate={[Utils.objectValid.isValidDate]}
          label='Ng??y c???p'
        />
        <Field
          name={'B2_NoiCap'}
          component={ViewCus.TextInput}
          label='N??i c???p'
          placeholder={'N??i c???p CMND/CCCD ho???c MS??D'}
        />
        <Field
          name={'B2_SoDienThoai'}
          component={ViewCus.TextInput}
          label='S??? ??i???n tho???i'
          placeholder={'S??? ??i???n tho???i'}
        />
        <Field
          name={'B3_ChuHo_GioiTinh'}
          component={ViewCus.RadioGroup}
          label='Gi???i t??nh'
          options={[
            {
              value: 1,
              label: 'Nam',
              name: 'Nam'
            },
            {
              value: 2,
              label: 'N???',
              name: 'Nu'
            },
          ]}
          render={({ RadioComponent }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <RadioComponent.Nam />
              <RadioComponent.Nu />
            </View>
          )}
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B4_ChuHo_QuanHeVoiNKT'}
          component={ViewCus.RadioGroup}
          label='Quan h??? v???i NKT'
          options={[
            {
              value: 1,
              label: 'V???/ch???ng',
              name: 'VoChong'
            },
            {
              value: 2,
              label: 'Con',
              name: 'Con'
            },
            {
              value: 3,
              label: 'Cha M???',
              name: 'Chame'
            },
            {
              value: 4,
              label: '??ng B??',
              name: 'OngBa'
            }, {
              value: 5,
              label: 'Ch??u ru???t',
              name: 'ChauRuot'
            }, {
              value: 6,
              label: 'Anh/Ch???/Em ru???t',
              name: 'AnhChiEmRuot'
            },
            {
              value: 7,
              label: 'Kh??c',
              name: 'Khac'
            },
          ]}
          render={({ RadioComponent }) => (
            <View>
              <View style={{ flexDirection: 'row', }}>
                <RadioComponent.VoChong styleContainer={{ width: '50%' }} />
                <RadioComponent.Con styleContainer={{ width: '50%' }} />
              </View>
              <View style={{ flexDirection: 'row', }}>
                <RadioComponent.Chame styleContainer={{ width: '50%' }} />
                <RadioComponent.OngBa styleContainer={{ width: '50%' }} />
              </View>
              <View style={{ flexDirection: 'row', }}>
                <RadioComponent.ChauRuot styleContainer={{ width: '50%' }} />
                <RadioComponent.AnhChiEmRuot styleContainer={{ width: '50%' }} />
              </View>
              <View style={{ flexDirection: 'row', }}>
                <RadioComponent.Khac styleContainer={{ width: '100%' }} />
              </View>
            </View>
          )}
        />
        <Field
          name={'B4_ChuHo_QuanHeVoiNKT_KhacText'}
          component={ViewCus.TextInput}
          placeholder={'Kh??c'}
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Text style={styles.title}>{'Ngh??? nghi???p hi???n nay'}</Text>
        <Field
          name={'B5_NgheNghiep_KVL'}
          component={ViewCus.Checkbox}
          children='Kh??ng c?? vi???c l??m'
        />
        <Field
          name={'B5_NgheNghiep_TSXKD'}
          component={ViewCus.Checkbox}
          children='T??? s???n xu???t kinh doanh'
        />
        <Field
          name={'B5_NgheNghiep_LTM'}
          component={ViewCus.Checkbox}
          children='L??m thu??/m?????n'
        />
        <Field
          name={'B5_NgheNghiep_LNN'}
          component={ViewCus.Checkbox}
          children='L??m n??ng/l??m/di??m/ng?? nghi???p'
        />
        <Field
          name={'B5_NgheNghiep_CVC'}
          component={ViewCus.Checkbox}
          children='C??ng ch???c, vi??n ch???c'
        />
        <Field
          name={'B5_NgheNghiep_CN'}
          component={ViewCus.Checkbox}
          children='C??ng nh??n'
        />
        <Field
          name={'B5_NgheNghiep_HT'}
          component={ViewCus.Checkbox}
          children='H??u tr??'
        />
        <Field
          name={'B5_NgheNghiep_Khac'}
          component={ViewCus.Checkbox}
          children='Kh??c'
        />
        <Field
          name={'B5_NgheNghiep_KhacText'}
          component={ViewCus.TextInput}
          placeholder='Kh??c'
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B6_HoanCanhKinhTe'}
          component={ViewCus.RadioGroup}
          label='Ho??n c???nh kinh t??? gia ????nh'
          options={[
            {
              value: 1,
              label: 'H??? Ngh??o',
              name: 'HoNgheo'
            },
            {
              value: 2,
              label: 'C???n ngh??o',
              name: 'CanNgheo'
            },
            {
              value: 3,
              label: 'Kh??ng ngh??o',
              name: 'KhongNgheo'
            },
          ]}
          render={({ RadioComponent }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <RadioComponent.HoNgheo />
              <RadioComponent.CanNgheo />
              <RadioComponent.KhongNgheo />
            </View>
          )}
        />
        <Field
          name={'B7_SoNhanKhau_Tong'}
          component={ViewCus.TextInput}
          label='T???ng s??? nh??n kh???u'
          placeholder='T???ng s??? nh??n kh???u '
        />
        <Field
          name={'B7_SoNhanKhau_NKT'}
          component={ViewCus.TextInput}
          label='S??? ng?????i khuy???t t???t'
          placeholder='S??? ng?????i khuy???t t???t'
        />
        <Field
          name={'B7_SoNhanKhau_TreDuoi16'}
          component={ViewCus.TextInput}
          label='Tr??? d?????i 16 tu???i'
          placeholder='Tr??? d?????i 16 tu???i'
        />
        <Field
          name={'B7_SoNhanKhau_NguoiLaoDong'}
          component={ViewCus.TextInput}
          label='S??? ng?????i lao ?????ng t???o thu nh???p'
          placeholder='S??? ng?????i lao ?????ng t???o thu nh???p'
        />
        <Field
          name={'B7_SoNhanKhau_NguoiCaoTuoi'}
          component={ViewCus.TextInput}
          label='S??? ng?????i cao tu???i (t??? 60 tu???i tr??? l??n)'
          placeholder='S??? ng?????i cao tu???i (t??? 60 tu???i tr??? l??n)'
        />
      </ViewCus.ViewBoxShadown>
      <FieldArray
        name={'ThanhVien'}
        component={DanhSachThanhVien}
      />
      <ViewCus.ViewBoxShadown>
        <Text style={styles.title}>{'Ngu???n thu nh???p hi???n nay'}</Text>
        <Field
          name={'B8_NguonThuNhap_TCBTXH'}
          component={ViewCus.Checkbox}
          children='Tr??? c???p b???o tr??? x?? h???i'
        />
        <Field
          name={'B8_NguonThuNhap_Luong'}
          component={ViewCus.Checkbox}
          children='L????ng, l??m c??ng, l??m thu??'
        />
        <Field
          name={'B8_NguonThuNhap_HTGD'}
          component={ViewCus.Checkbox}
          children='H??? tr??? t??? gia ????nh, ng?????i kh??c'
        />
        <Field
          name={'B8_NguonThuNhap_KTH'}
          component={ViewCus.Checkbox}
          children='C??c ho???t ?????ng kinh t??? h???'
        />
        <Field
          name={'B8_NguonThuNhap_Khac'}
          component={ViewCus.Checkbox}
          children='C??c c??ng vi???c c?? thu nh???p kh??c'
        />
        <Field
          name={'B8_NguonThuNhap_KhacText'}
          component={ViewCus.TextInput}
          label={'Ngu???n thu nh???p kh??c'}
          placeholder='Ngu???n thu nh???p kh??c'
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B9_ThuNhapHo'}
          component={ViewCus.Slider}
          maximumValue={100000000}
          minimumValue={0}
          step={1000000}
          formatter={v => v.formatVND()}
          suffix={'???'}
          label={'T???ng thu nh???p c???a h??? gia ????nh/th??ng (?????ng)'}
        />
        <Field
          name={'B10_ThuNhapBinhQuan'}
          component={ViewCus.Slider}
          maximumValue={100000000}
          minimumValue={0}
          step={1000000}
          formatter={v => v.formatVND()}
          suffix={'???'}
          label={'T???ng thu nh???p b??nh qu??n ng?????i/th??ng (?????ng)'}
        />
      </ViewCus.ViewBoxShadown>
      <Text style={styles.titleCus}>{'C??c kho???n chi ph?? v?? kh??? n??ng chi tr??? t??? gia ????nh'}</Text>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B11_ChiPhi_LuongThuc'}
          component={ViewCus.RadioGroup}
          label='L????ng th???c/th???c ??n'
          options={[
            {
              value: 1,
              label: 'Th???c hi???n ???????c',
              name: 'THD'
            },
            {
              value: 2,
              label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
              name: 'THDNCTG'
            },
            {
              value: 3,
              label: 'Kh??ng th???c hi???n ???????c',
              name: 'KTHD'
            },
            {
              value: 4,
              label: 'Kh??ng x??c ?????nh ???????c',
              name: 'KXDD'
            },
          ]}
        />
      </ViewCus.ViewBoxShadown>
      <Field
        name={'B11_ChiPhi_QuanAo'}
        component={ViewCus.RadioGroup}
        label='Qu???n ??o'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Th???c hi???n ???????c',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Kh??ng th???c hi???n ???????c',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Kh??ng x??c ?????nh ???????c',
            name: 'KXDD'
          },
        ]}
      />
      <Field
        name={'B11_ChiPhi_KhamChuaBenh'}
        component={ViewCus.RadioGroup}
        label='Kh??m v?? ch???a b???nh'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Th???c hi???n ???????c',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Kh??ng th???c hi???n ???????c',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Kh??ng x??c ?????nh ???????c',
            name: 'KXDD'
          },
        ]}
      />
      <Field
        name={'B11_ChiPhi_DongHocPhi'}
        component={ViewCus.RadioGroup}
        label='????ng h???c ph??'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Th???c hi???n ???????c',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Kh??ng th???c hi???n ???????c',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Kh??ng x??c ?????nh ???????c',
            name: 'KXDD'
          },
        ]}
      />
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
      >
        <Field
          name={'B11_ChiPhi_UongThuoc'}
          component={ViewCus.RadioGroup}
          label='U???ng thu???c'
          options={[
            {
              value: 1,
              label: 'Th???c hi???n ???????c',
              name: 'THD'
            },
            {
              value: 2,
              label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
              name: 'THDNCTG'
            },
            {
              value: 3,
              label: 'Kh??ng th???c hi???n ???????c',
              name: 'KTHD'
            },
            {
              value: 4,
              label: 'Kh??ng x??c ?????nh ???????c',
              name: 'KXDD'
            },
          ]}
        />
        <Field
          name={'B11_ChiPhi_Khac'}
          component={ViewCus.TextInput}
          label={'Chi ph?? kh??c'}
          placeholder='Chi ph?? kh??c'
        />
      </View>
      <Text style={styles.titleCus}>{'Kh??? n??ng ch??m s??c ?????i t?????ng c???a gia ????nh'}</Text>
      <Field
        name={'B12_SuQuanTamChamSoc'}
        component={ViewCus.RadioGroup}
        label='S??? quan t??m ch??m s??c'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Nhi???u',
            name: 'Nhieu'
          },
          {
            value: 2,
            label: '??t',
            name: 'It'
          },
          {
            value: 3,
            label: 'Kh??ng c??',
            name: 'KhongCo'
          },
        ]}
      />

      <Field
        name={'B12_MoiTruongChamSoc'}
        component={ViewCus.RadioGroup}
        label='M??i tr?????ng ch??m s??c'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'An to??n v?? s???ch s???',
            name: 'ATVSS'
          },
          {
            value: 2,
            label: 'C?? v???n ?????',
            name: 'CVD'
          },
          {
            value: 3,
            label: 'C?? nguy c?? cao',
            name: 'CNCC'
          },
        ]}
      />

      <Field
        name={'B12_NangLucChamSoc'}
        component={ViewCus.RadioGroup}
        label='N??ng l???c ch??m s??c (c?? ki???n th???c v?? k??? n??ng)'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Nhi???u',
            name: 'Nhieu'
          },
          {
            value: 2,
            label: '??t',
            name: 'It'
          },
          {
            value: 3,
            label: 'Kh??ng c??',
            name: 'KhongCo'
          },
        ]}
      />
      {/* {__DEV__ &&
        <Button
          onPress={() => onResetFrom()}
        >
          {'Reset'}
        </Button>
      } */}
      {
        lockTab &&
        <ButtonNextTab
          onPress={handleSubmit(_onSubmit)}
        >
          {'Ti???p t???c'}
        </ButtonNextTab>
      }
    </ScrollView>
  );
};

var ThongTinHo2 = reduxForm({ form: 'ThongTinHo', validate: validateForm })(ThongTinHo1)
var ThongTinHo = forwardRef((props, ref) => <ThongTinHo2 {...props} refOut={ref} />)
export {
  ThongTinHo,
  defaultData as defaultDataHo
};

