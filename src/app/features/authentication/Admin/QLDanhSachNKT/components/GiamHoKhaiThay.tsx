import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../../../../themes';
import { useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm, Form as FormRDF } from 'redux-form';
import ButtonNextTab from './ButtonNextTab'
import { Text } from '../../../../../library/components';
import { Radio } from '../../../../../library/components/radio';
import { TextField } from '../../../../../library/components/text-field/text-field';
import { CustomInput } from '../../../../../library/components/inputCustom/customInput';
import Selector from '../../../../../library/components/selector';
import { DatePicker } from '../../../../../library/components/date';
import { ServiceAsync } from '../../../../../library/networking/async';
import { FONT_14, } from '../../../../../themes/fontSize';
import { translate } from '../../../../../library/utils/i18n/translate';
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
export const GiamHoKhaiThay = reduxForm({ form: 'GiamHoKhaiThay' })((props) => {
  const { handleSubmit, onSubmit } = props;
  const formObj = useSelector(s => s.form.GiamHoKhaiThay)?.values || {};
  const [cities_GHKT, setCities_TinhHKTT] = useState([])
  const [cities_NKT, setCities_TinhNKT] = useState([])
  const [cityIdGHKT, setCityIdGHKT] = useState(-1)
  const [cityIdNKT, setCityIdNKT] = useState(-1)
  const refDistrictGHKT = useRef(null);
  const refDistrictNKT = useRef(null);
  const [district_GHKT, setCities_HuyenHKTT] = useState([])
  const [district_NKT, setCities_HuyenNKT] = useState([])
  const [ditrictIdGHKT, setDistrictIdGHKT] = useState(-1)
  const [ditrictIdNKT, setDistrictIdNKT] = useState(-1)
  const [ward_GHKT, setWard_XaHKTT] = useState([])
  const [ward_NKT, setWard_XaNKT] = useState([])
  const [wardIdGHKT, setWardIdGHKT] = useState(-1)
  const [wardIdNKT, setWardIdNKT] = useState(-1)
  const refWardGHKT = useRef(null);
  const [showStateStartDate, setShowStateStartDate] = useState(new Date());
  useEffect(() => {
    var _run = async () => {
      props.initialize({
        H1_HoTenNguoiGiamHo: "",
        H2_NgaySinhNguoiGiamHo: "",
        H2_GioiTinhNguoiGiamHo: 0,
        H3_SoCMNDNguoiGiamHo: "",
        H4_SoDienThoaiNguoiGiamHo: "",
        H5_QuanHeVoiNKT: 0,
        H5_QuanHeVoiNKT_Khac: "",
        H6_DiaChiNguoiGiamHo: "",
        H6_DiaChi_TinhTP: -1,
        H6_DiaChi_QuanHuyen: -1,
        H6_DiaChi_PhuongXa: -1,
        H6_DiaChi_ThonTo: -1,
        I1_HoTenNguoiKeKhai: "",
        I2_NgaySinhNguoiKeKhai: "",
        I2_GioiTinhNguoiGiamHo: 0,
        I3_SoCMNDNguoiKeKhai: "",
        I4_SoDienThoaiNguoiKeKhai: "",
        I5_QuanHeVoiNKT: 0,
        I5_QuanHeVoiNKT_Khac: "",
        I6_DiaChiNguoiKhaiThay: "",
        I6_DiaChi_TinhTP: -1,
        I6_DiaChi_QuanHuyen: -1,
        I6_DiaChi_PhuongXa: -1,
        I6_DiaChi_ThonTo: -1,
      })
      var response = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0')
        .then(response => {
          setCities_TinhHKTT(response.data)
        })
      var response = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0')
        .then(response => {
          setCities_TinhNKT(response.data)
        })
    }
    _run()
  }, []);
  useEffect(() => {
    if ((formObj.H6_DiaChi_TinhTP || 0) > 0)
      var respon = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + formObj.H6_DiaChi_TinhTP + ' &suDung=0')
        .then(response => {
          setCities_HuyenHKTT(response.data)
        })
  }, [formObj.H6_DiaChi_TinhTP])

  useEffect(() => {
    if ((formObj.H6_DiaChi_QuanHuyen || 0) > 0)
      var response = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + formObj.H6_DiaChi_TinhTP + '&maHuyen=' + formObj.H6_DiaChi_QuanHuyen + '&suDung=0')
        .then(response => {
          setWard_XaHKTT(response.data)
        })
  }, [formObj.H6_DiaChi_QuanHuyen])


  useEffect(() => {
    if ((formObj.I6_DiaChi_TinhTP || 0) > 0)
      var response = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + formObj.I6_DiaChi_TinhTP + ' &suDung=0')
        .then(response => {
          setCities_HuyenNKT(response.data)
        })
  }, [formObj.I6_DiaChi_TinhTP])

  useEffect(() => {
    if ((formObj.I6_DiaChi_QuanHuyen || 0) > 0)
      var response = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + formObj.I6_DiaChi_TinhTP + '&maHuyen=' + formObj.I6_DiaChi_QuanHuyen + '&suDung=0')
        .then(response => {
          setWard_XaNKT(response.data)
        })
  }, [formObj.I6_DiaChi_QuanHuyen])

  var _onSubmit = (obj) => {
    obj.H2_NgaySinhNguoiGiamHo = moment().format()
    obj.I2_NgaySinhNguoiKeKhai = moment().format()
    props.onSubmitNext('TTC', obj, true)
  }

  return (
    <View style={[GlobalStyle.fullScreen]}>
      <ScrollView
        style={{
          flex: 1,
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
          <View>
          <Text style={styles.title}>{'THÔNG TIN VỀ NGƯỜI GIÁM HỘ :'}</Text>
            <Text style={styles.title}>{'Họ và tên:'}</Text>
            <Field
              name={'H1_HoTenNguoiGiamHo'}
              placeholderTx={'Họ và tên'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeHolder={"Họ và tên giám hộ"}
              validate={[require]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
             <Text style={styles.title}>{'Ngày Sinh:'}</Text>
            <Field
              name={'H2_NgaySinhNguoiGiamHo'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Chọn Ngày Sinh'
              mode="date"
              locale="vi_VN"
            />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
              <Text style={styles.textGioiTinh}>{"Giới tính:"}</Text>
              <Field
                name={'H2_GioiTinhNguoiGiamHo'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H2_GioiTinhNguoiGiamHo == 1}
                valueRadio={1}
                tx={'Nam'}
              />
              <Field
                name={'H2_GioiTinhNguoiGiamHo'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H2_GioiTinhNguoiGiamHo == '2'}
                valueRadio={2}
                tx={'Nữ'}
              />
            </View>
            <Text style={styles.title}>{'Số CMND người giám hộ:'}</Text>
            <Field
              name={'H3_SoCMNDNguoiGiamHo'}
              placeholderTx={'Số CMND người giám hộ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeHolder={"Số CMND người giám hộ"}
              validate={[cmnd]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Số điện thoại:'}</Text>
            <Field
              name={'H4_SoDienThoaiNguoiGiamHo'}
              placeholderTx={'Số điện thoại'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              placeHolder={"Số điện thoại chủ hộ"}
              validate={[phone]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />

            <Text style={styles.title}>{'Quan hệ với NKT:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10, }}>
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == 1}
                valueRadio={1}
                tx={'Vợ/chồng'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '2'}
                valueRadio={2}
                tx={'Con'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '3'}
                valueRadio={3}
                tx={'Cha Mẹ'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '4'}
                valueRadio={4}
                tx={'Ông Bà'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '5'}
                valueRadio={5}
                tx={'Cháu ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '6'}
                valueRadio={6}
                tx={'Anh/Chị/Em ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'H5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.H5_QuanHeVoiNKT == '7'}
                valueRadio={7}
                tx={'Khác'}
              />
            </View>
            <Field
              name={'H5_QuanHeVoiNKT_Khac'}
              placeholderTx={'Quan hệ với NKT (Khác)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Địa chỉ người giám hộ:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <Field
                name={'H6_DiaChi_TinhTP'}
                component={Selector}
                options={cities_GHKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setCityIdGHKT(e.id);
                  refDistrictGHKT.current.select(-1)
                }}
                placeholder='Chọn tỉnh'
                styleButton={{
                  flex: 1
                }}
              />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'H6_DiaChi_QuanHuyen'}
                component={Selector}
                options={district_GHKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setDistrictIdGHKT(e.id);
                }}
                onRef={e => refDistrictGHKT.current = e}
                placeholder='Chọn huyện'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'H6_DiaChi_PhuongXa'}
                component={Selector}
                options={ward_GHKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setWardIdGHKT(e.id);
                }}
                placeholder='Chọn xã'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <Field
              name={'H6_DiaChiNguoiGiamHo'}
              placeholderTx={'Địa chỉ người giám hộ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'THÔNG TIN VỀ NGƯỜI KHAI THAY:'}</Text>
            <Text style={styles.title}>{'Họ và tên:'}</Text>
            <Field
              name={'I1_HoTenNguoiKeKhai'}
              placeholderTx={'Họ và tên'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày Sinh:'}</Text>
            <Field
              name={'I2_NgaySinhNguoiKeKhai'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Chọn Ngày Sinh'
              mode="date"
              locale="vi_VN"
            />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
              <Text style={styles.textGioiTinh}>{"Giới tính:"}</Text>
              <Field
                name={'I2_GioiTinhNguoiGiamHo'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I2_GioiTinhNguoiGiamHo == 1}
                valueRadio={1}
                tx={'Nam'}
              />
              <Field
                name={'I2_GioiTinhNguoiGiamHo'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I2_GioiTinhNguoiGiamHo == '2'}
                valueRadio={2}
                tx={'Nữ'}
              />
            </View>
            <Text style={styles.title}>{'Số CMND:'}</Text>
            <Field
              name={'I3_SoCMNDNguoiKeKhai'}
              placeholderTx={'Số CMND người khai thay'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Số điện thoại:'}</Text>
            <Field
              name={'I4_SoDienThoaiNguoiKeKhai'}
              placeholderTx={'Số điện thoại'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />

            <Text style={styles.title}>{'Quan hệ với NKT:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10, }}>
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == 1}
                valueRadio={1}
                tx={'Vợ/chồng'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '2'}
                valueRadio={2}
                tx={'Con'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '3'}
                valueRadio={3}
                tx={'Cha Mẹ'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '4'}
                valueRadio={4}
                tx={'Ông Bà'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '5'}
                valueRadio={5}
                tx={'Cháu ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '6'}
                valueRadio={6}
                tx={'Anh/Chị/Em ruột'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }} >
              <Field
                name={'I5_QuanHeVoiNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.I5_QuanHeVoiNKT == '7'}
                valueRadio={7}
                tx={'Khác'}
              />
            </View>
            <Field
              name={'I5_QuanHeVoiNKT_Khac'}
              placeholderTx={'Quan hệ với NKT (Khác)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{' Địa chỉ người khai thay:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <Field
                name={'I6_DiaChi_TinhTP'}
                component={Selector}
                options={cities_NKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setCityIdNKT(e.id);
                  refDistrictNKT.current.select(-1)
                }}
                placeholder='Chọn tỉnh'
                styleButton={{
                  flex: 1
                }}
              />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'I6_DiaChi_QuanHuyen'}
                component={Selector}
                options={district_NKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setDistrictIdNKT(e.id);
                }}
                onRef={e => refDistrictNKT.current = e}
                placeholder='Chọn huyện'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'I6_DiaChi_PhuongXa'}
                component={Selector}
                options={ward_NKT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setWardIdNKT(e.id);
                }}
                placeholder='Chọn xã'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <Field
              name={'I6_DiaChiNguoiKhaiThay'}
              placeholderTx={'Địa chỉ người giám hộ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />

          </View>
          <ButtonNextTab
            onPress={handleSubmit(_onSubmit)}
          >
            {'Gửi đơn'}
          </ButtonNextTab>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  textGioiTinh: {
    flex: 0.7,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row',
    marginTop: 7
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',

},
})