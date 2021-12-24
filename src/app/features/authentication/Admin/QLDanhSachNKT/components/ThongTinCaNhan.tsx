import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text } from '../../../../../library/components';
import { DatePicker } from '../../../../../library/components/date';
import Icon from '../../../../../library/components/iconVector/index';
import IoniconsFont from '../../../../../library/components/iconVector/IoniconsFont';
import { CustomInput } from '../../../../../library/components/inputCustom/customInput';
import { Radio } from '../../../../../library/components/radio';
import Selector from '../../../../../library/components/selector';
import { TextField } from '../../../../../library/components/text-field/text-field';
import { ServiceAsync } from '../../../../../library/networking/async';
import { translate } from '../../../../../library/utils/i18n/translate';
import { GlobalStyle } from '../../../../../themes';
import { color } from '../../../../../themes/color';
import { FONT_14, FONT_18 } from '../../../../../themes/fontSize';
import { onGetListAddressCity, onResetState } from '../../../../authentication/home//childrenScreen/listOfficeCC/redux/action';
import { ListNotaryOfficeState } from '../../../../authentication/home/childrenScreen/historyCC/redux/reducer';
import { onGetListDistrict, onGetListEthnic, onGetListWard } from '../../../../authentication/home/childrenScreen/listOfficeCC/redux/action';
import ButtonNextTab from './ButtonNextTab';
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
export const ThongTinCaNhan = reduxForm({ form: 'ThongTinCaNhan' })(
  (props: ConfigProps & InjectedFormProps) => {
    const formObj = useSelector(s => s.form.ThongTinCaNhan)?.values || {};
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const [checkMSDD, setCheckMSDD] = useState(1);
    const { handleSubmit, onSubmit } = props;
    const {
      listAddressCity, datalistDistrict, datalistWard, datalistEthnic
    }: ListNotaryOfficeState = useSelector((x: any) => x.ListNotaryOffice)
    const refDistrict = useRef(null);
    const refDistrictHKTT = useRef(null);
    const [cityId, setCityId] = useState(-1)
    const [cityIdHKTT, setCityIdHKTT] = useState(-1)
    const [districId, setDistricId] = useState(-1)
    const [districIdHKTT, setDistricIdHKTT] = useState(-1)
    const [wardId, setWardId] = useState(-1)
    const [wardIdHKTT, setWardIdHKTT] = useState(-1)
    const [ethnicId, setEthnicId] = useState(-1)
    const dispatch = useDispatch();
    const [citiesHKTT, setCitiesHKTT] = useState([])
    const [cities_XaHKTT, setCities_XaHKTT] = useState([])
    const [cities_HuyenHKTT, setCities_HuyenHKTT] = useState([])
    const [showStateStartDate, setShowStateStartDate] = useState(new Date());
    useEffect(() => {
      var _run = async () => {
        props.initialize({
          A1_GiayXacNhanKhuyetTat: 0,
          A2_MaSo: "",
          A3_NgayCap: "",
          HoiDongXacNhan: "",
          A4_HoTen: "",
          A5_NgaySinh: "",
          A6_GioiTinh: 1,
          A7_DanToc: 1,
          A7_DanToc_KhacText: "",
          A8_CMND: "",
          A8_CMND_NgayCap: "",
          A8_CMND_NoiCap: "",
          A9_MaDinhDanh: "",
          A9_MSDD_NgayCap: "",
          A9_MSDD_NoiCap: "",
          A10_MaASXH: "",
          A11_SoDienThoai: "",
          A11_Email: "",
          A12_HKTT_Tinh: -1,
          A12_HKTT_Huyen: -1,
          A12_HKTT_Xa: -1,
          A12_HKTT_Thon: -1,
          D7_NoiChamSocNKT: 0,
          A13_NOHT_Tinh: -1,
          A13_NOHT_Huyen: -1,
          A13_NOHT_Xa: -1,
          A13_NOHT_Thon: -1,
          A14_TinhTrangHonNhan: -1,
          D5_TongSoConCuaNKT: 0,
          D5_TongSoConDuoi16: 0,
          D5_NamSinhCon1: "",
          D5_NamSinhCon2: "",
          D5_NamSinhCon3: "",
          D5_NamSinhCon4: "",
          D6_NKTMangThaiHoacNuoiConNho: "",
          A17_TenTruongDangDiHoc: "",
          A18_ViTheTrongGiaDinh: -1,
        })
        dispatch(onGetListAddressCity('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0'));
        var respon = await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0')
          .then(response => {
            setCitiesHKTT(response.data)
          })
      }
      _run()
      return () => {
        dispatch(onResetState())
      };
    }, []);
    useEffect(() => {
      if (cityId > 0)
        dispatch(onGetListDistrict('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + cityId + ' &suDung=0'))
    }, [cityId])
    useEffect(() => {
      if (districId > 0)
        dispatch(onGetListWard('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + cityId + '&maHuyen=' + districId + '&suDung=0'))
    }, [districId])
    useEffect(() => {
      dispatch(onGetListEthnic('https://apinkt.dttt.vn/api/v1/DM_DanToc/List?length=99'))
    }, [])
    useEffect(() => {
      if ((formObj.A12_HKTT_Tinh || 0) > 0)
        var respon = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + formObj.A12_HKTT_Tinh + ' &suDung=0')
          .then(response => {
            setCities_HuyenHKTT(response.data)
          })
    }, [formObj.A12_HKTT_Tinh])

    useEffect(() => {
      if ((formObj.A12_HKTT_Huyen || 0) > 0)
        var respon = ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + formObj.A12_HKTT_Tinh + '&maHuyen=' + formObj.A12_HKTT_Huyen + '&suDung=0')
          .then(response => {
            setCities_XaHKTT(response.data)
          })
    }, [formObj.A12_HKTT_Huyen])

    var _onSubmit = (obj) => {
      obj.Id = 0
      obj.UserId = dataDetailUser.userID
      obj.A3_NgayCap = moment().format()
      obj.A5_NgaySinh = moment().format()
      obj.A8_CMND_NgayCap = moment().format()
      obj.A9_MSDD_NgayCap = moment().format()
      obj.D5_NamSinhCon1 = moment().format()
      obj.D5_NamSinhCon2 = moment().format()
      obj.D5_NamSinhCon3 = moment().format()
      obj.D5_NamSinhCon4 = moment().format()
      props.onSubmitNext('TTC', obj, false)
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
            <Text style={styles.textGioiTinh}>{"A1. Giấy xác nhận khuyết tật:"}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 0 }}>
              <Field
                name={'A1_GiayXacNhanKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A1_GiayXacNhanKhuyetTat == 1}
                valueRadio={1}
                tx={'Có'}
              />
              <Field
                name={'A1_GiayXacNhanKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A1_GiayXacNhanKhuyetTat == 2}
                valueRadio={2}
                tx={'Không'}

              />
            </View>
            <Text style={styles.title}>{'Mã số giấy xác nhận khuyết tật:'}</Text>
            <Field
              name={'A2_MaSo'}
              placeholderTx={'Mã số giấy xác nhận khuyết tật'}
              placeHolder={"Mã số giấy xác nhận khuyết tật"}
              placeholderColor={'#A4A4A4'}
              maxLength={10}
              validate={[msxn]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
            <Field
              name={'A3_NgayCap'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Ngày cấp giấy xác nhận'
              mode="date"
              locale="vi_VN"
            />
            <Text style={styles.title}>{'Hội đồng xác nhận :'}</Text>
            <Field
              name={'HoiDongXacNhan'}
              placeholderTx={'Hội đồng xác nhận'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Họ và tên:'}</Text>
            <Field
              name={'A4_HoTen'}
              placeholderTx={'Họ và tên'}
              placeHolder={"Họ và tên"}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              validate={[require]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày sinh:'}</Text>
            <Field
              name={'A5_NgaySinh'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Chọn Ngày sinh'
              mode="date"
              locale="vi_VN"
            />

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
              <Text style={styles.textGioiTinh}>{"Giới tính :"}</Text>
              <Field
                name={'A6_GioiTinh'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A6_GioiTinh == 1}
                valueRadio={1}
                tx={'Nam'}
              />
              <Field
                name={'A6_GioiTinh'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A6_GioiTinh == '2'}
                valueRadio={2}
                tx={'Nữ'}
              />
            </View>
            <Text style={styles.title}>{'Dân tộc'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
              <Field
                name={'A7_DanToc'}
                component={Selector}
                options={datalistEthnic}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setEthnicId(e.id);
                }}
                placeholder='Dân Tộc'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <Text style={styles.title}>{'Số CMND:'}</Text>
            <Field
              name={'A8_CMND'}
              placeholderTx={'Số CMND'}
              placeHolder={"Số CMND"}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              validate={[cmnd]}
              component={CustomInput}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày cấp:'}</Text>
            <Field
              name={'A8_CMND_NgayCap'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Ngày cấp CMND'
              mode="date"
              locale="vi_VN"
            />
              <Text style={styles.title}>{'Nơi cấp CMND:'}</Text>
            <Field
              name={'A8_CMND_NoiCap'}
              placeholderTx={'Nơi cấp CMND'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.6 }}>
                <Text style={styles.title}>{'Mã số định danh (nếu có)'}</Text>
              </View>
              <View style={{ flex: 0.4,marginTop:5 }}>
                <Icon
                  type={'Ionicons'}
                  color={color.palette.primary}
                  icon={checkMSDD ? IoniconsFont.informationCircle : IoniconsFont.informationCircle}
                />
              </View>
            </View>
            <Field
              name={'A9_MaDinhDanh'}
              placeholderTx={'Mã số định danh (nếu có)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Ngày cấp mã định danh:'}</Text>
            <Field
              name={'A9_MSDD_NgayCap'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Ngày cấp mã định danh'
              mode="date"
              locale="vi_VN"
            />
            <Text style={styles.title}>{'Nơi cấp mã định danh:'}</Text>
            <Field
              name={'A9_MSDD_NoiCap'}
              placeholderTx={'Nơi cấp mã định danh'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Mã an sinh xã hội (nếu có):'}</Text>
            <Field
              name={'A10_MaASXH'}
              placeholderTx={'Mã an sinh xã hội'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'SĐT liên hệ:'}</Text>
            <Field
              name={'A11_SoDienThoai'}
              placeholderTx={'SĐT liên hệ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Email:'}</Text>
            <Field
              name={'A11_Email'}
              placeholderTx={'Email'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Hộ khẩu thường trú:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <Field
                name={'A12_HKTT_Tinh'}
                component={Selector}
                options={citiesHKTT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setCityIdHKTT(e.id);
                  refDistrictHKTT.current.select(-1)
                }}
                placeholder='Chọn tỉnh'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'A12_HKTT_Huyen'}
                component={Selector}
                options={cities_HuyenHKTT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setDistricIdHKTT(e.id);
                }}
                onRef={e => refDistrictHKTT.current = e}
                placeholder='Chọn huyện'
                styleButton={{
                  flex: 1
                }}
              />

            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'A12_HKTT_Xa'}
                component={Selector}
                options={cities_XaHKTT}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setWardIdHKTT(e.id);
                }}
                placeholder='Chọn xã'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <Text style={styles.title}>{'Nơi ở hiện tại:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 0 }}>
              <Field
                name={'D7_NoiChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D7_NoiChamSocNKT == 1}
                valueRadio={1}
                tx={'Có'}
              />
              <Field
                name={'D7_NoiChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D7_NoiChamSocNKT == 2}
                valueRadio={2}
                tx={'Không'}
              />
            </View>
            <Text style={styles.title}>{'Nơi ở hiện tại:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <Field
                name={'A13_NOHT_Tinh'}
                component={Selector}
                options={listAddressCity}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setCityId(e.id);
                  refDistrict.current.select(-1)
                }}
                placeholder='Chọn tỉnh'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'A13_NOHT_Huyen'}
                component={Selector}
                options={datalistDistrict}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setDistricId(e.id);
                }}
                onRef={e => refDistrict.current = e}
                placeholder='Chọn huyện'
                styleButton={{
                  flex: 1
                }}
              />

            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'A13_NOHT_Xa'}
                component={Selector}
                options={datalistWard}
                itemLabel={(e, index) => e.ten}
                itemKey={(e, index) => e.id}
                onSelected={(e, index) => {
                  setWardId(e.id);
                }}
                placeholder='Chọn xã'
                styleButton={{
                  flex: 1
                }}
              />
            </View>
            <Text style={styles.title}>{'Tình trạng hôn nhân hiện nay:'}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
              <Field
                name={'A14_TinhTrangHonNhan'}
                component={Radio}
                styleContainer={{
                  flex: 1,
                }}
                selected={formObj.A14_TinhTrangHonNhan == 1}
                valueRadio={1}
                tx={'Chưa kết hôn'}
              />
              <Field
                name={'A14_TinhTrangHonNhan'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A14_TinhTrangHonNhan == '2'}
                valueRadio={2}
                tx={'Kết hôn'}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
              <Field
                name={'A14_TinhTrangHonNhan'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A14_TinhTrangHonNhan == '3'}
                valueRadio={3}
                tx={'Giá/Đơn thân'}
              />
              <Field
                name={'A14_TinhTrangHonNhan'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A14_TinhTrangHonNhan == '4'}
                valueRadio={4}
                tx={'Ly hôn'}
              />
            </View>
            <Text style={styles.title}>{'Tổng số con của NKT:'}</Text>
            <Field
              name={'D5_TongSoConCuaNKT'}
              placeholderTx={'Tổng số con của NKT'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Trong đó, số con dưới 16 tuổi:'}</Text>
            <Field
              name={'D5_TongSoConDuoi16'}
              placeholderTx={'Trong đó, số con dưới 16 tuổi'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'A15.2. Năm sinh của các con:'}</Text>
            <Field
              name={'D5_NamSinhCon1'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Con số 1: năm sinh:'
              mode="date"
              locale="vi_VN"
            />
            <Field
              name={'D5_NamSinhCon2'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Con số 2: năm sinh:'
              mode="date"
              locale="vi_VN"
            />
            <Field
              name={'D5_NamSinhCon3'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Con số 3: năm sinh:'
              mode="date"
              locale="vi_VN"
            />
            <Field
              name={'D5_NamSinhCon4'}
              component={DatePicker}
              date={new Date(showStateStartDate)}
              placeholder='Con số 4: năm sinh:'
              mode="date"
              locale="vi_VN"
            />
            <Field
              name={'D6_NKTMangThaiHoacNuoiConNho'}
              placeholderTx={'NKT đang mang thai tháng thứ'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              type={'number-pad'}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.title}>{'Tên trường học (nếu đang đi học):'}</Text>
            <Field
              name={'A17_TenTruongDangDiHoc'}
              placeholderTx={'Tên trường học (nếu đang đi học)'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />
            <Text style={styles.textGioiTinh}>{"Vị thế NKT trong gia đình:"}</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
              <Field
                name={'A18_ViTheTrongGiaDinh'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A18_ViTheTrongGiaDinh == 1}
                valueRadio={1}
                tx={'Sống phụ thuộc'}
              />
              <Field
                name={'A18_ViTheTrongGiaDinh'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.A18_ViTheTrongGiaDinh == '2'}
                valueRadio={2}
                tx={'Sống độc lập'}
              />
            </View>
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
  viewBottom: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewLeft: {
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 50,
    elevation: 5,
    overflow: 'visible',
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  textDate: {
    color: '#333333',
    fontSize: FONT_18,
    fontStyle: 'normal',
    flex: 0.5,
    flexDirection: 'row'
  },

  textStartDate: {
    flex: 0.5,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row'

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