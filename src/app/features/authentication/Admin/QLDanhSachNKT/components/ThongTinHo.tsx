import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProps, Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import { Text } from '../../../../../library/components';
import { Checkbox } from '../../../../../library/components/checkboxCus';
import { DatePicker } from '../../../../../library/components/date';
import { Radio } from '../../../../../library/components/radio';
import { TextField } from '../../../../../library/components/text-field/text-field';
import { GlobalStyle } from '../../../../../themes';
import { FONT_14 } from '../../../../../themes/fontSize';
import ButtonNextTab from './ButtonNextTab';
import DanhSachThanhVien from './DanhSachThanhVien';
import { translate } from '../../../../../library/utils/i18n/translate';
import { CustomInput } from '../../../../../library/components/inputCustom/customInput';
const msxn = (value: any) =>
  value && value.toString().trim().length > 8
    ? undefined
    : translate('Vui lòng nhập mã số chính xác');
const require = (value: any) =>
  value && value.toString().trim().length > 0
    ? undefined
    : translate('Vui lòng nhập đầy đủ');
const cmnd = (value: any) =>
  value && value.toString().trim().length == 9
    ? undefined
    : translate('Vui lòng nhập CMND chính xác');
const phone = (value: any) =>
  value && value.toString().trim().length == 10
    ? undefined
    : translate('Vui lòng nhập số điện thoại chính xác');
export const ThongTinHo = reduxForm({ form: 'ThongTinHo' })(
  (props: ConfigProps & InjectedFormProps) => {
    const { handleSubmit, onSubmit } = props;
    const dispatch = useDispatch();
    const formObj = useSelector(s => s.form.ThongTinHo)?.values || {};
    const [showStateStartDate, setShowStateStartDate] = useState(new Date());
    var _onSubmit = (obj) => {
      obj.B2_NgaySinhChuHo = moment().format()
      obj.B2_NgayCap = moment().format()
      obj.ThanhVien.NgaySinh = moment().format()
      obj.B7_SoNhanKhau_Tong = (obj.ThanhVien || []).length
      props.onSubmitNext('TTC', obj, false);
    }
    useEffect(() => {
      var _run = async () => {
        props.initialize({
          B1_MaHo: "",
          B2_ChuHo_HoTen: "",
          B2_NgaySinhChuHo: "",
          B2_SoCMNDChuHo: "",
          B2_NgayCap: "",
          B2_NoiCap: "",
          B2_SoDienThoai: "",
          B3_ChuHo_GioiTinh: -1,
          B4_ChuHo_QuanHeVoiNKT: -1,
          B4_ChuHo_QuanHeVoiNKT_KhacText: "",
          B5_NgheNghiep_KVL: 0,
          B5_NgheNghiep_TSXKD: 0,
          B5_NgheNghiep_LTM: 0,
          B5_NgheNghiep_LNN: 0,
          B5_NgheNghiep_CVC: 0,
          B5_NgheNghiep_CN: 0,
          B5_NgheNghiep_HT: 0,
          B5_NgheNghiep_Khac: 0,
          B5_NgheNghiep_KhacText: "",
          B6_HoanCanhKinhTe: -1,
          B7_SoNhanKhau_Tong: 0,
          B7_SoNhanKhau_NKT: 1,
          B7_SoNhanKhau_TreDuoi16: -1,
          B7_SoNhanKhau_NguoiLaoDong: -1,
          B7_SoNhanKhau_NguoiCaoTuoi: 1,
          B8_NguonThuNhap_TCBTXH: 0,
          B8_NguonThuNhap_Luong: 0,
          B8_NguonThuNhap_HTGD: 0,
          B8_NguonThuNhap_KTH: 0,
          B8_NguonThuNhap_Khac: 0,
          B8_NguonThuNhap_KhacText: "",
          B9_ThuNhapHo: "",
          B10_ThuNhapBinhQuan: "",
          B11_ChiPhi_LuongThuc: -1,
          B11_ChiPhi_QuanAo: -1,
          B11_ChiPhi_KhamChuaBenh: -1,
          B11_ChiPhi_DongHocPhi: -1,
          B11_ChiPhi_UongThuoc: -1,
          B11_ChiPhi_Khac: "",
          B12_SuQuanTamChamSoc: -1,
          B12_MoiTruongChamSoc: -1,
          B12_NangLucChamSoc: "",
          ThanhVien: [
          ]
        })
      }
      _run()
      return () => {
      };
    }, []);
    return (
      <View style={[GlobalStyle.fullScreen]}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#ddd',
            }}
          />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 5,
              margin: 10,
              ...GlobalStyle.boxShadow
            }}
          >
            <Text style={styles.title}>{'Mã hộ:'}</Text>
            <Field
              name={'B1_MaHo'}
              placeholderTx={'Mã hộ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Họ và tên chủ hộ:'}</Text>
            <Field
              name={'B2_ChuHo_HoTen'}
              placeholderTx={'Họ và tên chủ hộ'}
              placeholderColor={'#A4A4A4'}
              placeHolder={"Họ và tên chủ hộ"}
              maxLength={100}
              validate={[require]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày Sinh:'}</Text>
            <Field
              name={'B2_NgaySinhChuHo'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Chọn Ngày Sinh'
              mode="date"
              locale="vi_VN"
            />
            <Text style={styles.title}>{'Số CMND:'}</Text>
            <Field
              name={'B2_SoCMNDChuHo'}
              placeholderTx={'Số CMND/CCCD hoặc mã số định danh cá nhân'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeHolder={"Số CMND/CCCD hoặc mã số định danh cá nhân"}
              validate={[cmnd]}
              component={CustomInput}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày cấp CMND:'}</Text>
            <Field
              name={'B2_NgayCap'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Ngày cấp CMND/CCCD hoặc MSĐD'
              mode="date"
              locale="vi_VN"
            />
            <Text style={styles.title}>{'Nơi cấp CMND:'}</Text>
            <Field
              name={'B2_NoiCap'}
              placeholderTx={'Nơi cấp CMND/CCCD hoặc MSĐD'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
             <Text style={styles.title}>{'Số điện thoại:'}</Text>
            <Field
              name={'B2_SoDienThoai'}
              placeholderTx={'Số điện thoại chủ hộ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeHolder={"Số điện thoại chủ hộ"}
              validate={[phone]}
              component={CustomInput}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
              <Text style={styles.textGioiTinh}>{"Giới tính:"}</Text>
              <Field
                name={'B3_ChuHo_GioiTinh'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B3_ChuHo_GioiTinh == 1}
                valueRadio={1}
                tx={'Nam'}
              />
              <Field
                name={'B3_ChuHo_GioiTinh'}
                type='radio'
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B3_ChuHo_GioiTinh == '2'}
                valueRadio={2}
                tx={'Nữ'}
              />
            </View>

            <Text style={styles.title}>{'Quan hệ với NKT:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10, }}>
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == 1}
                valueRadio={1}
                tx={'Vợ/chồng'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '2'}
                valueRadio={2}
                tx={'Con'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '3'}
                valueRadio={3}
                tx={'Cha Mẹ'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '4'}
                valueRadio={4}
                tx={'Ông Bà'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '5'}
                valueRadio={5}
                tx={'Cháu ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '6'}
                valueRadio={6}
                tx={'Anh/Chị/Em ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'B4_ChuHo_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B4_ChuHo_QuanHeVoiNKT == '7'}
                valueRadio={7}
                tx={'Khác'}
              />
            </View>
            <Field
              name={'B4_ChuHo_QuanHeVoiNKT_KhacText'}
              placeholderTx={'Quan hệ với NKT (Khác)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{' Nghề nghiệp hiện nay:'}</Text>
            <Field
              name={'B5_NgheNghiep_KVL'}
              component={Checkbox}
              isNum={true}
              tx={'Không có việc làm'}

            />
            <Field
              name={'B5_NgheNghiep_TSXKD'}
              component={Checkbox}
              isNum={true}
              tx={'Tự sản xuất kinh doanh'}
            />
            <Field
              name={'B5_NgheNghiep_LTM'}
              component={Checkbox}
              isNum={true}
              tx={'Làm thuê/mướn'}
            />
            <Field
              name={'B5_NgheNghiep_LNN'}
              component={Checkbox}
              tx={' Làm nông/lâm/diêm/ngư nghiệp'}
              isNum={true}
            />
            <Field
              name={'B5_NgheNghiep_CVC'}
              component={Checkbox}
              tx={'Công chức, viên chức'}
              isNum={true}
            />
            <Field
              name={'B5_NgheNghiep_CN'}
              component={Checkbox}
              isNum={true}
              tx={'Công nhân'}
            />
            <Field
              name={'B5_NgheNghiep_HT'}
              component={Checkbox}
              isNum={true}
              tx={'Hưu trí'}
            />
            <Field
              name={'B5_NgheNghiep_Khac'}
              component={Checkbox}
              isNum={true}
              tx={'Khác'}
            />
            <Text style={styles.title}>{'Hoàn cảnh kinh tế gia đình:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10, }}>
              <Field
                name={'B6_HoanCanhKinhTe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B6_HoanCanhKinhTe == 1}
                valueRadio={1}
                tx={'Hộ nghèo'}
              />
              <Field
                name={'B6_HoanCanhKinhTe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B6_HoanCanhKinhTe == '2'}
                valueRadio={2}
                tx={'Cận nghèo'}
              />
              <Field
                name={'B6_HoanCanhKinhTe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.B6_HoanCanhKinhTe == '3'}
                valueRadio={3}
                tx={'Không nghèo'}
              />
            </View>
            <FieldArray
              name='ThanhVien'
              component={DanhSachThanhVien}
            />
             <Text style={styles.title}>{'Số Người khuyết tật:'}</Text>
            <Field
              name={'B7_SoNhanKhau_NKT'}
              placeholderTx={'Số Người khuyết tật'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
             <Text style={styles.title}>{'Trẻ dưới 16 tuổi:'}</Text>
            <Field
              name={'B7_SoNhanKhau_TreDuoi16'}
              placeholderTx={'Trẻ dưới 16 tuổi'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
              <Text style={styles.title}>{'Số người lao động tạo thu nhập:'}</Text>
            <Field
              name={'B7_SoNhanKhau_NguoiLaoDong'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeholderTx={'Số người lao động tạo thu nhập'}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
              <Text style={styles.title}>{'Số người cao tuổi (từ 60 tuổi trở lên):'}</Text>
            <Field
              name={'B7_SoNhanKhau_NguoiCaoTuoi'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeholderTx={'Số người cao tuổi (từ 60 tuổi trở lên)'}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Nguồn thu nhập hiện nay:'}</Text>
            <Field
              name={'B8_NguonThuNhap_TCBTXH'}
              component={Checkbox}
              tx={'Trợ cấp bảo trợ xã hội'}
              isNum={true}
            />

            <Field
              name={'B8_NguonThuNhap_Luong'}
              component={Checkbox}
              isNum={true}
              tx={'Lương, làm công, làm thuê'}
            />
            <Field
              name={'B8_NguonThuNhap_HTGD'}
              component={Checkbox}
              isNum={true}
              tx={'Hỗ trợ từ gia đình, người khác'}
            />
            <Field
              name={'B8_NguonThuNhap_KTH'}
              component={Checkbox}
              isNum={true}
              tx={'Các hoạt động kinh tế hộ'}
            />
            <Field
              name={'B8_NguonThuNhap_Khac'}
              component={Checkbox}
              isNum={true}
              tx={'Các công việc có thu nhập khác'}
            />
            <Field
              name={'B8_NguonThuNhap_KhacText'}
              placeholderTx={'Nguồn thu nhập khác'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Tổng thu nhập của hộ gia đình/tháng (đồng):'}</Text>
            <Field
              name={'B9_ThuNhapHo'}
              placeholderTx={'Tổng thu nhập của hộ gia đình/tháng (đồng)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{' Thu nhập bình quân người/tháng (đồng):'}</Text>
            <Field
              name={'B10_ThuNhapBinhQuan'}
              placeholderTx={'Tổng thu nhập của hộ gia đình/tháng (đồng)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Lương thực/thức ăn'}</Text>
            <Field
              name={'B11_ChiPhi_LuongThuc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_LuongThuc == 1}
              valueRadio={1}
              tx={'Thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_LuongThuc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_LuongThuc == 2}
              valueRadio={2}
              tx={'Thực hiện được nhưng cần trợ giúp'}
            />
            <Field
              name={'B11_ChiPhi_LuongThuc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_LuongThuc == 3}
              valueRadio={3}
              tx={' Không thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_LuongThuc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_LuongThuc == 4}
              valueRadio={4}
              tx={'Không xác định được'}
            />
            <Text style={styles.title}>{'Quần áo'}</Text>
            <Field
              name={'B11_ChiPhi_QuanAo'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_QuanAo == 1}
              valueRadio={1}
              tx={'Thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_QuanAo'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_QuanAo == 2}
              valueRadio={2}
              tx={'Thực hiện được nhưng cần trợ giúp'}
            />
            <Field
              name={'B11_ChiPhi_QuanAo'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_QuanAo == 3}
              valueRadio={3}
              tx={' Không thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_QuanAo'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_QuanAo == 4}
              valueRadio={4}
              tx={'Không xác định được'}
            />
            <Text style={styles.title}>{'Khám và chữa bệnh'}</Text>
            <Field
              name={'B11_ChiPhi_KhamChuaBenh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_KhamChuaBenh == 1}
              valueRadio={1}
              tx={'Thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_KhamChuaBenh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_KhamChuaBenh == 2}
              valueRadio={2}
              tx={'Thực hiện được nhưng cần trợ giúp'}
            />
            <Field
              name={'B11_ChiPhi_KhamChuaBenh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_KhamChuaBenh == 3}
              valueRadio={3}
              tx={' Không thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_KhamChuaBenh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_KhamChuaBenh == 4}
              valueRadio={4}
              tx={'Không xác định được'}
            />
            <Text style={styles.title}>{'Đóng học phí'}</Text>
            <Field
              name={'B11_ChiPhi_DongHocPhi'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_DongHocPhi == 1}
              valueRadio={1}
              tx={'Thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_DongHocPhi'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_DongHocPhi == 2}
              valueRadio={2}
              tx={'Thực hiện được nhưng cần trợ giúp'}
            />
            <Field
              name={'B11_ChiPhi_DongHocPhi'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_DongHocPhi == 3}
              valueRadio={3}
              tx={' Không thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_DongHocPhi'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_DongHocPhi == 4}
              valueRadio={4}
              tx={'Không xác định được'}
            />
            <Text style={styles.title}>{'Uống thuốc'}</Text>
            <Field
              name={'B11_ChiPhi_UongThuoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_UongThuoc == 1}
              valueRadio={1}
              tx={'Thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_UongThuoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_UongThuoc == 2}
              valueRadio={2}
              tx={'Thực hiện được nhưng cần trợ giúp'}
            />
            <Field
              name={'B11_ChiPhi_UongThuoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_UongThuoc == 3}
              valueRadio={3}
              tx={' Không thực hiện được'}
            />
            <Field
              name={'B11_ChiPhi_UongThuoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B11_ChiPhi_UongThuoc == 4}
              valueRadio={4}
              tx={'Không xác định được'}
            />
            <Field
              name={"B11_ChiPhi_Khac"}
              placeholderTx={'Chi phí khác'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Sự quan tâm chăm sóc:'}</Text>
            <Field
              name={'B12_SuQuanTamChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_SuQuanTamChamSoc == 1}
              valueRadio={1}
              tx={'Nhiều'}
            />
            <Field
              name={'B12_SuQuanTamChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_SuQuanTamChamSoc == 2}
              valueRadio={2}
              tx={'Ít'}
            />
            <Field
              name={'B12_SuQuanTamChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_SuQuanTamChamSoc == 3}
              valueRadio={3}
              tx={'Không có'}
            />

            <Text style={styles.title}>{'Môi trường chăm sóc:'}</Text>
            <Field
              name={'B12_MoiTruongChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_MoiTruongChamSoc == 1}
              valueRadio={1}
              tx={'An toàn và sạch sẽ'}
            />
            <Field
              name={'B12_MoiTruongChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_MoiTruongChamSoc == 2}
              valueRadio={2}
              tx={'Có vấn đề'}
            />
            <Field
              name={'B12_MoiTruongChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_MoiTruongChamSoc == 3}
              valueRadio={3}
              tx={'Có nguy cơ cao'}
            />

            <Text style={styles.title}>{'Năng lực chăm sóc (có kiến thức và kỹ năng):'}</Text>
            <Field
              name={'B12_NangLucChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_NangLucChamSoc == 1}
              valueRadio={1}
              tx={'Nhiều'}
            />
            <Field
              name={'B12_NangLucChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_NangLucChamSoc == 2}
              valueRadio={2}
              tx={'Ít'}
            />
            <Field
              name={'B12_NangLucChamSoc'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.B12_NangLucChamSoc == 3}
              valueRadio={3}
              tx={'Không có'}
            />
            <ButtonNextTab
              onPress={handleSubmit(_onSubmit)}
            >
              {'Lưu và sang trang'}
            </ButtonNextTab>
          </View>
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: 5,
    paddingBottom: 45,
  },
  input: {
    borderColor: '#f2f2f2',
    borderWidth: 0,
    paddingLeft: 5,
    borderBottomWidth: 1,
    marginTop: 10
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',

  },
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    borderRadius: 50,
    marginTop: 20,
    top: 0,
    width: '100%',
    height: 50

  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,

  },
  text_radio: {
    color: '#333',
    fontSize: 15,
  },
  radio: {
    flex: 0.5, backgroundColor: '#fff',
    alignItems: 'flex-start'
  },
  textGioiTinh: {
    flex: 0.7,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row',
    marginTop: 7

  },

});
