import moment from 'moment';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { store } from '../../../../../store/store';
import { toggleLoading } from '../../../../../../../App';
import { Button, ButtonPrimary, Text as TextRN } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import RestAPI from '../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const Text = props => <TextRN {...props} style={[{ color: 'black' }, props.style]} />
const validateForm = data => {
  var valids = Utils.objectValid.valid({
    ...defaultData,
    ...data,
  }, {
    A1_GiayXacNhanKhuyetTat: {
      required: (value) => value <= 0
    },
    A2_MaSo: {
      required: (value, obj) => obj.A1_GiayXacNhanKhuyetTat == 1,
      maxlength: 12
    },
    A3_NgayCap: {
      lessDateOrEqual: {
        valid: true,
        compareWith: new Date(),
        compareFormat: 'DD/MM/YYYY'
      },
    },
    HoiDongXacNhan: {
    },
    A4_HoTen: {
      required: true,
    },
    A5_NgaySinh: {
      required: true,
      lessDateOrEqual: {
        valid: true,
        compareWith: new Date(),
        compareFormat: 'DD/MM/YYYY'
      },
    },
    A7_DanToc: {
      // required: (value) => value <= 0
    },
    A7_DanToc_KhacText: {
    },
    A8_CMND: {
      CMTND: true,
    },
    A8_CMND_NgayCap: {
    },
    A8_CMND_NoiCap: {
    },
    A9_MaDinhDanh: {
    },
    A9_MSDD_NgayCap: {
    },
    A9_MSDD_NoiCap: {
    },
    A10_MaASXH: {
    },
    A11_SoDienThoai: {
    },
    A11_Email: {
      email: true
    },
    A12_HKTT_Tinh: {
      required: true
    },
    A12_HKTT_Huyen: {
      required: true
    },
    A12_HKTT_Xa: {
      required: true
    },
    A12_HKTT_Thon: {
      required: true
    },
    D7_NoiChamSocNKT: {
    },
    A13_NOHT_Tinh: {
      required: true
    },
    A13_NOHT_Huyen: {
      required: true
    },
    A13_NOHT_Xa: {
      required: true
    },
    A13_NOHT_Thon: {
      required: true
    },
    A14_TinhTrangHonNhan: {
    },
    D5_TongSoConCuaNKT: {
    },
    D5_TongSoConDuoi16: {
    },
    D5_NamSinhCon1: {
    },
    D5_NamSinhCon2: {
    },
    D5_NamSinhCon3: {
    },
    D5_NamSinhCon4: {
    },
    D6_NKTMangThaiHoacNuoiConNho: {
    },
    A17_TenTruongDangDiHoc: {
    },
    A18_ViTheTrongGiaDinh: {
    },
  }, { lan: 'redux-form' })
  return valids.toObject(e => e.field, e => e.message);
}
const defaultData = {
  A1_GiayXacNhanKhuyetTat: '',
  A2_MaSo: '',
  A3_NgayCap: '',
  HoiDongXacNhan: '',
  A4_HoTen: '',
  A5_NgaySinh: '',
  A6_GioiTinh: 0,
  A7_DanToc: 0,
  A7_DanToc_KhacText: '',
  A8_CMND: '',
  A8_CMND_NgayCap: '',
  A8_CMND_NoiCap: '',
  A9_MaDinhDanh: '',
  A9_MSDD_NgayCap: '',
  A9_MSDD_NoiCap: '',
  A10_MaASXH: '',
  A11_SoDienThoai: '',
  A11_Email: '',
  A12_HKTT_Tinh: 0,
  A12_HKTT_Huyen: 0,
  A12_HKTT_Xa: 0,
  A12_HKTT_Thon: 0,
  D7_NoiChamSocNKT: 0,
  A13_NOHT_Tinh: 0,
  A13_NOHT_Huyen: 0,
  A13_NOHT_Xa: 0,
  A13_NOHT_Thon: 0,
  A14_TinhTrangHonNhan: 0,
  D5_TongSoConCuaNKT: 0,
  D5_TongSoConDuoi16: 0,
  D5_NamSinhCon1: '',
  D5_NamSinhCon2: '',
  D5_NamSinhCon3: '',
  D5_NamSinhCon4: '',
  D6_NKTMangThaiHoacNuoiConNho: 0,
  A17_TenTruongDangDiHoc: '',
  A18_ViTheTrongGiaDinh: 1,
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    paddingVertical: 5,
    color: 'black',
  },
});

var temp = {}
var tempHKTTDefault = {
  A12_HKTT_Tinh: 0,
  A12_HKTT_Huyen: 0,
  A12_HKTT_Xa: 0,
  A12_HKTT_Thon: 0,
}

var tempHKTT = { ...tempHKTTDefault }
let ThongTinCaNhan1 = (props: ConfigProps & InjectedFormProps) => {
  const {
    handleSubmit,
    reset: resetForm,
    initialize: loadForm,
    anyTouched,
    invalid,
    refOut,
    onReady,
    onRefresh,
    lockTab,
    isRefresh: _isRefresh,
  } = props;

  const dispatch = useDispatch();
  const dataDetailUser = useSelector(state => state.AppReducer.profile.user);

  const refContentXNKT = useRef()
  const refContentSex = useRef()
  const refDanToc = useRef()
  const refProvinceHKTT = useRef()
  const refDistrictHKTT = useRef()
  const refWardHKTT = useRef()
  const refVillageHKTT = useRef()
  const refProvinceNOHT = useRef()
  const refDistrictNOHT = useRef()
  const refWardNOHT = useRef()
  const refVillageNOHT = useRef()
  const [isRefresh, setIsRefresh] = useState(false)


  useEffect(() => {
    isRefresh != false && setIsRefresh(false);
    init();
  }, [_isRefresh])

  useImperativeHandle(
    refOut,
    () => ({
      setFormData
    })
  )

  var init = async () => {
    var { master: masterAll, dataSaved } = onReady() || {};
    var data = Utils.mapDataWithCase(defaultData, dataSaved.ttc);
    _setFormData(data, {
      A12_HKTT_Tinh: data.A12_HKTT_Tinh,
      A12_HKTT_Huyen: data.A12_HKTT_Huyen,
      A12_HKTT_Xa: data.A12_HKTT_Xa,
      A12_HKTT_Thon: data.A12_HKTT_Thon,
    });
  }

  const _setFormData = async (data, hkttTemp) => {
    var { master: masterAll, dataSaved } = onReady() || {};
    const {
      ethnics,
      provinces,
      districts,
      wards,
    } = masterAll;
    refDanToc.current?.getRenderedComponent().updateOptions(ethnics);
    refProvinceHKTT.current?.getRenderedComponent().updateOptions(provinces);
    refDistrictHKTT.current?.getRenderedComponent().updateOptions(districts).updateParentId(-1)
    refWardHKTT.current?.getRenderedComponent().updateOptions(wards).updateParentId(-1)
    var village: any = []
    if (data.A12_HKTT_Xa > 0) {
      village = (await RestAPI.Master_Village({
        maTinh: data.A12_HKTT_Tinh || 0,
        maHuyen: data.A12_HKTT_Huyen || 0,
        maXa: data.A12_HKTT_Xa || 0,
      })).data;
    }
    refVillageHKTT.current?.getRenderedComponent().updateOptions(village).select(-1)
    refProvinceNOHT.current?.getRenderedComponent().updateOptions(provinces);
    refDistrictNOHT.current?.getRenderedComponent().updateOptions(districts).updateParentId(-1)
    refWardNOHT.current?.getRenderedComponent().updateOptions(wards).updateParentId(-1)
    var village: any = []
    village = []

    if (data.A13_NOHT_Xa > 0) {
      village = (await RestAPI.Master_Village({
        maTinh: data.A13_NOHT_Tinh || 0,
        maHuyen: data.A13_NOHT_Huyen || 0,
        maXa: data.A13_NOHT_Xa || 0,
      })).data;
    }

    refVillageNOHT.current?.getRenderedComponent().updateOptions(village).select(-1)

    data.A1_GiayXacNhanKhuyetTat = data.A1_GiayXacNhanKhuyetTat == null ? 1 : data.A1_GiayXacNhanKhuyetTat
    setFormData(data)

  }
  const setFormData = (data) => {
    refDistrictHKTT.current?.getRenderedComponent().updateParentId(data.A12_HKTT_Tinh).select(data.A12_HKTT_Huyen);
    refWardHKTT.current?.getRenderedComponent().updateParentId(data.A12_HKTT_Huyen).select(data.A12_HKTT_Xa);

    refDistrictNOHT.current?.getRenderedComponent().updateParentId(data.A13_NOHT_Tinh).select(data.A13_NOHT_Huyen);
    refWardNOHT.current?.getRenderedComponent().updateParentId(data.A13_NOHT_Huyen).select(data.A13_NOHT_Xa);
    refContentXNKT.current?.setData(data.A1_GiayXacNhanKhuyetTat == 1);
    refContentSex.current?.setData(data.A6_GioiTinh == 2);
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
  const copyHKTT2NOHT = async () => {
    toggleLoading(true);

    var currentData = store.getState().form.ThongTinCaNhan.values;

    currentData = {
      ...currentData,
      A13_NOHT_Tinh: currentData.A12_HKTT_Tinh,
      A13_NOHT_Huyen: currentData.A12_HKTT_Huyen,
      A13_NOHT_Xa: currentData.A12_HKTT_Xa,
      A13_NOHT_Thon: currentData.A12_HKTT_Thon,
    }

    _setFormData(currentData, tempHKTT);
    setTimeout(() => {
      toggleLoading();
    }, 400);
  }


  var _onSubmit = (obj) => {
    obj = {
      ...defaultData,
      ...obj,
    }
    obj.UserId = dataDetailUser.userID
    obj.A3_NgayCap = formatDate(obj.A3_NgayCap);
    obj.A5_NgaySinh = formatDate(obj.A5_NgaySinh);
    obj.A8_CMND_NgayCap = formatDate(obj.A8_CMND_NgayCap);
    obj.A9_MSDD_NgayCap = formatDate(obj.A9_MSDD_NgayCap);
    obj.D5_NamSinhCon1 = formatDate(obj.D5_NamSinhCon1);
    obj.D5_NamSinhCon2 = formatDate(obj.D5_NamSinhCon2);
    obj.D5_NamSinhCon3 = formatDate(obj.D5_NamSinhCon3);
    obj.D5_NamSinhCon4 = formatDate(obj.D5_NamSinhCon4);
    obj.NgayTao = moment().format()
    obj.NguoiTao = dataDetailUser.userID
    if (obj.A3_NgayCap == "Invalid date") {
      obj.A3_NgayCap = ""
    }
    if (obj.A5_NgaySinh == "Invalid date") {
      obj.A5_NgaySinh = ""
    }
    if (obj.A8_CMND_NgayCap == "Invalid date") {
      obj.A8_CMND_NgayCap = ""
    }
    if (obj.A9_MSDD_NgayCap == "Invalid date") {
      obj.A9_MSDD_NgayCap = ""
    }
    if (obj.D5_NamSinhCon1 == "Invalid date") {
      obj.D5_NamSinhCon1 = ""
    }
    if (obj.D5_NamSinhCon2 == "Invalid date") {
      obj.D5_NamSinhCon2 = ""
    }
    if (obj.D5_NamSinhCon3 == "Invalid date") {
      obj.D5_NamSinhCon3 = ""
    }
    if (obj.D5_NamSinhCon4 == "Invalid date") {
      obj.D5_NamSinhCon4 = ""
    }
    if (obj.NgayTao == "Invalid date") {
      obj.NgayTao = ""
    }
    props.onSubmitNext('TTC', obj, false)
  }
  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
      }}
      refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
    >
      <View>
        <ViewCus.ViewBoxShadown>
          <Field
            label='A1. Giấy xác nhận khuyết tật'
            name={'A1_GiayXacNhanKhuyetTat'}
            component={ViewCus.RadioGroup}
            requiredLabel
            options={[
              {
                value: 1,
                label: 'Có',
                name: 'Co'
              },
              {
                value: 2,
                label: 'Không',
                name: 'Khong'
              },
            ]}
            render={({ RadioComponent }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <RadioComponent.Co />
                <RadioComponent.Khong />
              </View>
            )}
            onChange={(event, newValue, previousValue, name) => {
              refContentXNKT.current?.setData(newValue == 1);
            }}
          />
          <ViewCus.ComponentDynamic
            ref={refContentXNKT}
            render={(isShow) => {
              return isShow == true &&
                <>
                  <Field
                    name={'A2_MaSo'}
                    component={ViewCus.TextInput}
                    requiredLabel
                    label='Mã số giấy xác nhận khuyết tật'
                    placeholder={"Mã số giấy xác nhận khuyết tật"}
                  />
                  <Field
                    name={'A3_NgayCap'}
                    component={ViewCus.TextDate}
                    validate={[Utils.objectValid.isValidDate]}
                    requiredLabel
                    label='Ngày cấp giấy xác nhận'
                  />
                  <Field
                    name={'HoiDongXacNhan'}
                    component={ViewCus.TextInput}
                    label={'Hội đồng xác nhận'}
                    placeholder={'Hội đồng xác nhận'}
                  />
                </>
            }}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'A4_HoTen'}
            component={ViewCus.TextInput}
            requiredLabel
            label={'Họ và tên'}
            placeholder={'Họ và tên'}
          />
          <Field
            name={'A5_NgaySinh'}
            component={ViewCus.TextDate}
            validate={[Utils.objectValid.isValidDate]}
            requiredLabel
            label='Ngày sinh'
          />
          <Field
            name={'A6_GioiTinh'}
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
            onChange={(event, newValue_sex, previousValue, name) => {
              refContentSex.current?.setData(newValue_sex == 2);
            }}
          />
          <Field
            name={'A7_DanToc'}
            component={ViewCus.Selector}
            forwardRef={true}
            ref={refDanToc}
            optionLabel={(e, index) => e?.ten}
            optionKey={(e, index) => e?.id}
            label='Dân Tộc'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'A8_CMND'}
            component={ViewCus.TextInput}
            label={'Số CMND'}
            placeholder={'Số CMND'}
          />
          <Field
            name={'A8_CMND_NgayCap'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Ngày cấp CMND'
          />
          <Field
            name={'A8_CMND_NoiCap'}
            component={ViewCus.TextInput}
            placeholder={'Nơi cấp CMND'}
            label={'Nơi cấp CMND'}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'A9_MaDinhDanh'}
            component={ViewCus.TextInput}
            placeholder={'Mã số định danh (nếu có)'}
            label={'Mã số định danh (nếu có)'}
          />
          <Field
            name={'A9_MSDD_NgayCap'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Ngày cấp mã định danh'
          />
          <Field
            name={'A9_MSDD_NoiCap'}
            component={ViewCus.TextInput}
            placeholder={'Nơi cấp mã định danh'}
            label={'Nơi cấp mã định danh'}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'A10_MaASXH'}
            component={ViewCus.TextInput}
            placeholder={'Mã an sinh xã hội'}
            label={'Mã an sinh xã hội'}
          />
          <Field
            name={'A11_SoDienThoai'}
            component={ViewCus.TextInput}
            placeholder={'SĐT liên hệ'}
            label={'SĐT liên hệ'}
          />
          <Field
            name={'A11_Email'}
            component={ViewCus.TextInput}
            placeholder={'Email'}
            label={'Email'}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Hộ khẩu thường trú'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'A12_HKTT_Tinh'}
              component={ViewCus.Selector}
              forwardRef={true}
              requiredLabel
              ref={refProvinceHKTT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              onSelected={(e, index) => {
                tempHKTT.A12_HKTT_Tinh = e.id;
                refDistrictHKTT.current?.getRenderedComponent().updateParentId(e.id);
                refWardHKTT.current?.getRenderedComponent().updateParentId(-1);
                refVillageHKTT.current?.getRenderedComponent().updateOptions([]);
              }}
              label='Tỉnh/Thành phố'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'A12_HKTT_Huyen'}
              component={ViewCus.Selector}
              requiredLabel
              forwardRef={true}
              ref={refDistrictHKTT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maTinh}
              onSelected={(e, index) => {
                tempHKTT.A12_HKTT_Huyen = e.id;
                refWardHKTT.current?.getRenderedComponent().updateParentId(e.id);
                refVillageHKTT.current?.getRenderedComponent().updateOptions([]);
              }}
              label='Quận/Huyện'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'A12_HKTT_Xa'}
              component={ViewCus.Selector}
              requiredLabel
              forwardRef={true}
              ref={refWardHKTT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maHuyen}
              onSelected={async (e, index) => {
                tempHKTT.A12_HKTT_Xa = e.id;
                toggleLoading(true);
                var village = (await RestAPI.Master_Village({
                  maTinh: tempHKTT.A12_HKTT_Tinh || 0,
                  maHuyen: tempHKTT.A12_HKTT_Huyen || 0,
                  maXa: tempHKTT.A12_HKTT_Xa || 0,
                })).data;
                toggleLoading()
                refVillageHKTT.current?.getRenderedComponent().updateOptions(village)
              }}
              label='Xã/Phường'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'A12_HKTT_Thon'}
              component={ViewCus.Selector}
              forwardRef={true}
              requiredLabel
              ref={refVillageHKTT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              onSelected={e => {
                tempHKTT.A12_HKTT_Thon = e.id
              }}
              label='Thôn/Tổ'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'D7_NoiChamSocNKT'}
            component={ViewCus.RadioGroup}
            label='Nơi ở hiện tại'
            options={[
              {
                value: 1,
                label: 'Cộng đồng',
                name: 'CongDong'
              },
              {
                value: 2,
                label: 'Trong cơ sở BTXH',
                name: 'BTXH'
              },
            ]}
            render={({ RadioComponent }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <RadioComponent.CongDong />
                <RadioComponent.BTXH />
              </View>
            )}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              onPress={copyHKTT2NOHT}
              style={{ marginTop: 15, marginBottom: 10, width: '50%', backgroundColor: appColors.primary }}
            >
              {'Sao chép HKTT'}
            </Button>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'A13_NOHT_Tinh'}
              component={ViewCus.Selector}
              forwardRef={true}
              requiredLabel
              ref={refProvinceNOHT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              onSelected={(e, index) => {
                temp.A13_NOHT_Tinh = e.id
                refDistrictNOHT.current?.getRenderedComponent().updateParentId(e.id);
                refWardNOHT.current?.getRenderedComponent().updateParentId(-1);
                refVillageNOHT.current?.getRenderedComponent().updateOptions([])
              }}
              label='Tỉnh/Thành phố'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'A13_NOHT_Huyen'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refDistrictNOHT}
              requiredLabel
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maTinh}
              onSelected={(e, index) => {
                temp.A13_NOHT_Huyen = e.id
                refWardNOHT.current?.getRenderedComponent().updateParentId(e.id);
                refVillageNOHT.current?.getRenderedComponent().updateOptions([])
              }}
              label='Quận/Huyện'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'A13_NOHT_Xa'}
              component={ViewCus.Selector}
              forwardRef={true}
              requiredLabel
              ref={refWardNOHT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maHuyen}
              label='Xã/Phường'
              onSelected={async (e, index) => {
                toggleLoading(true);
                temp.A13_NOHT_Xa = e.id
                var village = (await RestAPI.Master_Village({
                  maTinh: temp.A13_NOHT_Tinh || 0,
                  maHuyen: temp.A13_NOHT_Huyen || 0,
                  maXa: temp.A13_NOHT_Xa || 0,
                })).data;// như cái mẹ này nó có param
                toggleLoading()
                refVillageNOHT.current?.getRenderedComponent().updateOptions(village)
              }}
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'A13_NOHT_Thon'}
              component={ViewCus.Selector}
              forwardRef={true}
              requiredLabel
              ref={refVillageNOHT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              label='Thôn/Tổ'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Field
            name={'A14_TinhTrangHonNhan'}
            component={ViewCus.RadioGroup}
            label='Tình trạng hôn nhân hiện nay'
            options={[
              {
                value: 1,
                label: 'Chưa kết hôn',
                name: 'ChuaKetHon'
              },
              {
                value: 2,
                label: 'Kết hôn',
                name: 'KetHon'
              },
              {
                value: 3,
                label: 'Giá/Đơn thân',
                name: 'GiaDonThan'
              },
              {
                value: 4,
                label: 'Ly hôn',
                name: 'LyHon'
              },
            ]}
            render={({ RadioComponent }) => (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <RadioComponent.ChuaKetHon styleContainer={{ width: '50%' }} />
                  <RadioComponent.KetHon styleContainer={{ width: '50%' }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioComponent.GiaDonThan styleContainer={{ width: '50%' }} />
                  <RadioComponent.LyHon styleContainer={{ width: '50%' }} />
                </View>
              </>
            )}
          />
          <Field
            name={'D5_TongSoConCuaNKT'}
            component={ViewCus.TextInput}
            placeholder={'Tổng số con của NKT'}
            label={'Tổng số con của NKT'}
          />
          <Field
            name={'D5_TongSoConDuoi16'}
            component={ViewCus.TextInput}
            placeholder={'Trong đó, số con dưới 16 tuổi'}
            label={'Trong đó, số con dưới 16 tuổi'}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <ViewCus.ComponentDynamic
            ref={refContentSex}
            render={(isShow) => {
              return isShow == true &&
                <>
                  <Field
                    name={'D6_NKTMangThaiHoacNuoiConNho'}
                    component={ViewCus.TextInput}
                    placeholder={'NKT đang mang thai tháng thứ'}
                    label={'NKT đang mang thai tháng thứ'}
                  />
                </>
            }}
          />
          <Field
            name={'D5_NamSinhCon1'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Con thứ nhất: năm sinh'
          />
          <Field
            name={'D5_NamSinhCon2'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Con thứ hai: năm sinh'
          />
          <Field
            name={'D5_NamSinhCon3'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Con thứ ba: năm sinh'
          />
          <Field
            name={'D5_NamSinhCon4'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Con thứ tư: năm sinh'
          />
          <Field
            name={'A17_TenTruongDangDiHoc'}
            component={ViewCus.TextInput}
            placeholder={'Tên trường học (nếu đang đi học)'}
            label={'Tên trường học (nếu đang đi học)'}
          />
          <Field
            name={'A18_ViTheTrongGiaDinh'}
            component={ViewCus.RadioGroup}
            label='Vị thế NKT trong gia đình'
            options={[
              {
                value: 1,
                label: 'Sống phụ thuộc',
                name: 'PhuThuoc'
              },
              {
                value: 2,
                label: 'Sống độc lập',
                name: 'DocLap'
              },
            ]}
            render={({ RadioComponent }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <RadioComponent.PhuThuoc />
                <RadioComponent.DocLap />
              </View>
            )}
          />
        </ViewCus.ViewBoxShadown>
      </View>
      {
        (anyTouched && invalid) && <View>
          <Text
            style={{
              color: appColors.materialRed,
              paddingVertical: 20,
              paddingHorizontal: 10
            }}
          >
            {'Hãy kiểm tra lại dữ liệu'}
          </Text>
        </View>
      }
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
    </ScrollView>);
}

var ThongTinCaNhan2 = reduxForm({
  form: 'ThongTinCaNhan',
  validate: validateForm,
})(ThongTinCaNhan1)
var ThongTinCaNhan = forwardRef((props, ref) => <ThongTinCaNhan2 {...props} refOut={ref} />)
export { ThongTinCaNhan, defaultData as defaultDataTTCN };
