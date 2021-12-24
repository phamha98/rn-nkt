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
          label='Mã hộ'
          placeholder={"Mã hộ"}
        />
        <Field
          name={'B2_ChuHo_HoTen'}
          component={ViewCus.TextInput}
          requiredLabel
          label='Họ và tên chủ hộ'
          placeholder={"Họ và tên chủ hộ"}
        />
        <Field
          name={'B2_NgaySinhChuHo'}
          component={ViewCus.TextDate}
          // validate={[Utils.objectValid.isValidDate]}
          label='Ngày Sinh'
        />
        <Field
          name={'B2_SoCMNDChuHo'}
          component={ViewCus.TextInput}
          label='Số CMND/CCCD hoặc mã số định danh'
          placeholder={'Số CMND/CCCD hoặc mã số định danh'}

        />
        <Field
          name={'B2_NgayCap'}
          component={ViewCus.TextDate}
          // validate={[Utils.objectValid.isValidDate]}
          label='Ngày cấp'
        />
        <Field
          name={'B2_NoiCap'}
          component={ViewCus.TextInput}
          label='Nơi cấp'
          placeholder={'Nơi cấp CMND/CCCD hoặc MSĐD'}
        />
        <Field
          name={'B2_SoDienThoai'}
          component={ViewCus.TextInput}
          label='Số điện thoại'
          placeholder={'Số điện thoại'}
        />
        <Field
          name={'B3_ChuHo_GioiTinh'}
          component={ViewCus.RadioGroup}
          label='Giới tính'
          options={[
            {
              value: 1,
              label: 'Nam',
              name: 'Nam'
            },
            {
              value: 2,
              label: 'Nữ',
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
          label='Quan hệ với NKT'
          options={[
            {
              value: 1,
              label: 'Vợ/chồng',
              name: 'VoChong'
            },
            {
              value: 2,
              label: 'Con',
              name: 'Con'
            },
            {
              value: 3,
              label: 'Cha Mẹ',
              name: 'Chame'
            },
            {
              value: 4,
              label: 'Ông Bà',
              name: 'OngBa'
            }, {
              value: 5,
              label: 'Cháu ruột',
              name: 'ChauRuot'
            }, {
              value: 6,
              label: 'Anh/Chị/Em ruột',
              name: 'AnhChiEmRuot'
            },
            {
              value: 7,
              label: 'Khác',
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
          placeholder={'Khác'}
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Text style={styles.title}>{'Nghề nghiệp hiện nay'}</Text>
        <Field
          name={'B5_NgheNghiep_KVL'}
          component={ViewCus.Checkbox}
          children='Không có việc làm'
        />
        <Field
          name={'B5_NgheNghiep_TSXKD'}
          component={ViewCus.Checkbox}
          children='Tự sản xuất kinh doanh'
        />
        <Field
          name={'B5_NgheNghiep_LTM'}
          component={ViewCus.Checkbox}
          children='Làm thuê/mướn'
        />
        <Field
          name={'B5_NgheNghiep_LNN'}
          component={ViewCus.Checkbox}
          children='Làm nông/lâm/diêm/ngư nghiệp'
        />
        <Field
          name={'B5_NgheNghiep_CVC'}
          component={ViewCus.Checkbox}
          children='Công chức, viên chức'
        />
        <Field
          name={'B5_NgheNghiep_CN'}
          component={ViewCus.Checkbox}
          children='Công nhân'
        />
        <Field
          name={'B5_NgheNghiep_HT'}
          component={ViewCus.Checkbox}
          children='Hưu trí'
        />
        <Field
          name={'B5_NgheNghiep_Khac'}
          component={ViewCus.Checkbox}
          children='Khác'
        />
        <Field
          name={'B5_NgheNghiep_KhacText'}
          component={ViewCus.TextInput}
          placeholder='Khác'
        />
      </ViewCus.ViewBoxShadown>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B6_HoanCanhKinhTe'}
          component={ViewCus.RadioGroup}
          label='Hoàn cảnh kinh tế gia đình'
          options={[
            {
              value: 1,
              label: 'Hộ Nghèo',
              name: 'HoNgheo'
            },
            {
              value: 2,
              label: 'Cận nghèo',
              name: 'CanNgheo'
            },
            {
              value: 3,
              label: 'Không nghèo',
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
          label='Tổng số nhân khẩu'
          placeholder='Tổng số nhân khẩu '
        />
        <Field
          name={'B7_SoNhanKhau_NKT'}
          component={ViewCus.TextInput}
          label='Số người khuyết tật'
          placeholder='Số người khuyết tật'
        />
        <Field
          name={'B7_SoNhanKhau_TreDuoi16'}
          component={ViewCus.TextInput}
          label='Trẻ dưới 16 tuổi'
          placeholder='Trẻ dưới 16 tuổi'
        />
        <Field
          name={'B7_SoNhanKhau_NguoiLaoDong'}
          component={ViewCus.TextInput}
          label='Số người lao động tạo thu nhập'
          placeholder='Số người lao động tạo thu nhập'
        />
        <Field
          name={'B7_SoNhanKhau_NguoiCaoTuoi'}
          component={ViewCus.TextInput}
          label='Số người cao tuổi (từ 60 tuổi trở lên)'
          placeholder='Số người cao tuổi (từ 60 tuổi trở lên)'
        />
      </ViewCus.ViewBoxShadown>
      <FieldArray
        name={'ThanhVien'}
        component={DanhSachThanhVien}
      />
      <ViewCus.ViewBoxShadown>
        <Text style={styles.title}>{'Nguồn thu nhập hiện nay'}</Text>
        <Field
          name={'B8_NguonThuNhap_TCBTXH'}
          component={ViewCus.Checkbox}
          children='Trợ cấp bảo trợ xã hội'
        />
        <Field
          name={'B8_NguonThuNhap_Luong'}
          component={ViewCus.Checkbox}
          children='Lương, làm công, làm thuê'
        />
        <Field
          name={'B8_NguonThuNhap_HTGD'}
          component={ViewCus.Checkbox}
          children='Hỗ trợ từ gia đình, người khác'
        />
        <Field
          name={'B8_NguonThuNhap_KTH'}
          component={ViewCus.Checkbox}
          children='Các hoạt động kinh tế hộ'
        />
        <Field
          name={'B8_NguonThuNhap_Khac'}
          component={ViewCus.Checkbox}
          children='Các công việc có thu nhập khác'
        />
        <Field
          name={'B8_NguonThuNhap_KhacText'}
          component={ViewCus.TextInput}
          label={'Nguồn thu nhập khác'}
          placeholder='Nguồn thu nhập khác'
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
          suffix={'₫'}
          label={'Tổng thu nhập của hộ gia đình/tháng (đồng)'}
        />
        <Field
          name={'B10_ThuNhapBinhQuan'}
          component={ViewCus.Slider}
          maximumValue={100000000}
          minimumValue={0}
          step={1000000}
          formatter={v => v.formatVND()}
          suffix={'₫'}
          label={'Tổng thu nhập bình quân người/tháng (đồng)'}
        />
      </ViewCus.ViewBoxShadown>
      <Text style={styles.titleCus}>{'Các khoản chi phí và khả năng chi trả từ gia đình'}</Text>
      <ViewCus.ViewBoxShadown>
        <Field
          name={'B11_ChiPhi_LuongThuc'}
          component={ViewCus.RadioGroup}
          label='Lương thực/thức ăn'
          options={[
            {
              value: 1,
              label: 'Thực hiện được',
              name: 'THD'
            },
            {
              value: 2,
              label: 'Thực hiện được nhưng cần trợ giúp',
              name: 'THDNCTG'
            },
            {
              value: 3,
              label: 'Không thực hiện được',
              name: 'KTHD'
            },
            {
              value: 4,
              label: 'Không xác định được',
              name: 'KXDD'
            },
          ]}
        />
      </ViewCus.ViewBoxShadown>
      <Field
        name={'B11_ChiPhi_QuanAo'}
        component={ViewCus.RadioGroup}
        label='Quần áo'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Thực hiện được',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Thực hiện được nhưng cần trợ giúp',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Không thực hiện được',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Không xác định được',
            name: 'KXDD'
          },
        ]}
      />
      <Field
        name={'B11_ChiPhi_KhamChuaBenh'}
        component={ViewCus.RadioGroup}
        label='Khám và chữa bệnh'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Thực hiện được',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Thực hiện được nhưng cần trợ giúp',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Không thực hiện được',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Không xác định được',
            name: 'KXDD'
          },
        ]}
      />
      <Field
        name={'B11_ChiPhi_DongHocPhi'}
        component={ViewCus.RadioGroup}
        label='Đóng học phí'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Thực hiện được',
            name: 'THD'
          },
          {
            value: 2,
            label: 'Thực hiện được nhưng cần trợ giúp',
            name: 'THDNCTG'
          },
          {
            value: 3,
            label: 'Không thực hiện được',
            name: 'KTHD'
          },
          {
            value: 4,
            label: 'Không xác định được',
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
          label='Uống thuốc'
          options={[
            {
              value: 1,
              label: 'Thực hiện được',
              name: 'THD'
            },
            {
              value: 2,
              label: 'Thực hiện được nhưng cần trợ giúp',
              name: 'THDNCTG'
            },
            {
              value: 3,
              label: 'Không thực hiện được',
              name: 'KTHD'
            },
            {
              value: 4,
              label: 'Không xác định được',
              name: 'KXDD'
            },
          ]}
        />
        <Field
          name={'B11_ChiPhi_Khac'}
          component={ViewCus.TextInput}
          label={'Chi phí khác'}
          placeholder='Chi phí khác'
        />
      </View>
      <Text style={styles.titleCus}>{'Khả năng chăm sóc đối tượng của gia đình'}</Text>
      <Field
        name={'B12_SuQuanTamChamSoc'}
        component={ViewCus.RadioGroup}
        label='Sự quan tâm chăm sóc'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Nhiều',
            name: 'Nhieu'
          },
          {
            value: 2,
            label: 'Ít',
            name: 'It'
          },
          {
            value: 3,
            label: 'Không có',
            name: 'KhongCo'
          },
        ]}
      />

      <Field
        name={'B12_MoiTruongChamSoc'}
        component={ViewCus.RadioGroup}
        label='Môi trường chăm sóc'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'An toàn và sạch sẽ',
            name: 'ATVSS'
          },
          {
            value: 2,
            label: 'Có vấn đề',
            name: 'CVD'
          },
          {
            value: 3,
            label: 'Có nguy cơ cao',
            name: 'CNCC'
          },
        ]}
      />

      <Field
        name={'B12_NangLucChamSoc'}
        component={ViewCus.RadioGroup}
        label='Năng lực chăm sóc (có kiến thức và kỹ năng)'
        styleContainer={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          ...GlobalStyle.boxShadow
        }}
        options={[
          {
            value: 1,
            label: 'Nhiều',
            name: 'Nhieu'
          },
          {
            value: 2,
            label: 'Ít',
            name: 'It'
          },
          {
            value: 3,
            label: 'Không có',
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
          {'Tiếp tục'}
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

