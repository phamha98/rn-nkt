import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { toggleLoading } from '../../../../../../../App';
import { Button, Text } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import RestAPI from '../../../../../RestAPI';
import { palette as appColors } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';
import { store } from '../../../../../store/store';
const defaultData = {
  DDHP_HoTen: '',
  DDHP_QuanHe: '',
  DDHP_CCCD: '',
  DDHP_SDT: '',
  DDHP_HKTT_Tinh: '',
  DDHP_HKTT_Huyen: '',
  DDHP_HKTT_Xa: '',
  DDHP_HKTT_Thon: '',
  DDHP_HKTT_DiaChi: '',
  DDHP_NoiO_Tinh: '',
  DDHP_NoiO_Huyen: '',
  DDHP_NoiO_Xa: '',
  DDHP_NoiO_Thon: '',
  DDHP_NoiO_DiaChi: '',
}

const validateForm = (data: any) => {
  var valids = Utils.objectValid.valid({
    ...defaultData,
    ...data,
  }, {
    DDHP_HoTen: {
      // required: true
    },
    DDHP_CCCD: {
      // CMTND: true,
    },
    DDHP_QuanHe: {
    },
    DDHP_SDT: {
    },
    DDHP_HKTT_Tinh: {
      // required: true,
    },
    DDHP_HKTT_Huyen: {
      // required: true,
    },
    DDHP_HKTT_Xa: {
      // required: true,
    },
    DDHP_HKTT_Thon: {
      // required: true,
    },
    DDHP_HKTT_DiaChi: {
    },
    DDHP_NoiO_Tinh: {
      // required: true,
    },
    DDHP_NoiO_Huyen: {
      // required: true,
    },
    DDHP_NoiO_Xa: {
      // required: true,
    },
    DDHP_NoiO_Thon: {
      // required: true,
    },
    DDHP_NoiO_DiaChi: {
    },
  }, { lan: 'redux-form' })
  return valids.toObject(e => e.field, e => e.message);
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
  DDHP_HKTT_Tinh: 0,
  DDHP_HKTT_Huyen: 0,
  DDHP_HKTT_Xa: 0,
  DDHP_HKTT_Thon: 0,
}
var tempHKTT = { ...tempHKTTDefault }

export const DaiDienHopPhap = reduxForm({ form: 'DaiDienHopPhap', validate: validateForm })(
  (props: ConfigProps & InjectedFormProps) => {
    const {
      handleSubmit,
      reset: resetForm,
      initialize: loadForm,
      anyTouched,
      invalid,
      refOut,
      lockTab,
      onReady,
      onRefresh,
      isRefresh: _isRefresh,
    } = props;
    const dispatch = useDispatch();
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
      setIsRefresh(false);
      init();
    }, [_isRefresh])

    var _onSubmit = (obj) => {
      obj.ID = 0
      props.onSubmitNext('GXN_01', obj, false)
    }

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      var data = Utils.mapDataWithCase(defaultData, dataSaved.gxN_01);
      _setFormData(data, {
        DDHP_HKTT_Tinh: data.DDHP_HKTT_Tinh,
        DDHP_HKTT_Huyen: data.DDHP_HKTT_Huyen,
        DDHP_HKTT_Xa: data.DDHP_HKTT_Xa,
        DDHP_HKTT_Thon: data.DDHP_HKTT_Thon,
      });
    }

    const _setFormData = async (data, hkttTemp) => {
      console.log(data)
      var { master: masterAll, dataSaved } = onReady() || {};
      const {
        ethnics,
        provinces,
        districts,
        wards,
      } = masterAll;
      refProvinceHKTT.current?.getRenderedComponent().updateOptions(provinces);
      refDistrictHKTT.current?.getRenderedComponent().updateOptions(districts);
      refWardHKTT.current?.getRenderedComponent().updateOptions(wards);
      toggleLoading(true)
      if (data.DDHP_HKTT_Xa > 0) {
        var village = (await RestAPI.Master_Village({
          maTinh: data.DDHP_HKTT_Tinh || 0,
          maHuyen: data.DDHP_HKTT_Huyen || 0,
          maXa: data.DDHP_HKTT_Xa || 0,
        })).data;
      }
      refVillageHKTT.current?.getRenderedComponent().updateOptions(village).select(-1)
      refProvinceNOHT.current?.getRenderedComponent().updateOptions(provinces);

      refDistrictNOHT.current?.getRenderedComponent().updateOptions(districts);
      refWardNOHT.current?.getRenderedComponent().updateOptions(wards);
      if (data.DDHP_NoiO_Xa > 0) {
      var village = (await RestAPI.Master_Village({
        maTinh: data.DDHP_NoiO_Tinh || 0,
        maHuyen: data.DDHP_NoiO_Huyen || 0,
        maXa: data.DDHP_NoiO_Xa || 0,
      })).data;
    }
      refVillageNOHT.current?.getRenderedComponent().updateOptions(village).select(-1)
      setFormData(data)
      toggleLoading()
    }

    const setFormData = (data) => {
      refDistrictHKTT.current?.getRenderedComponent().updateParentId(data.DDHP_HKTT_Tinh)
      refWardHKTT.current?.getRenderedComponent().updateParentId(data.DDHP_HKTT_Huyen)
      refVillageHKTT.current?.getRenderedComponent().updateParentId(data.DDHP_HKTT_Xa)
      refDistrictNOHT.current?.getRenderedComponent().updateParentId(data.DDHP_NoiO_Tinh)
      refWardNOHT.current?.getRenderedComponent().updateParentId(data.DDHP_NoiO_Huyen)
      refVillageNOHT.current?.getRenderedComponent().updateParentId(data.DDHP_NoiO_Xa)
      loadForm(data)
    }

    const onResetFrom = () => {
      loadForm(defaultData)
    }
    const copyHKTT2NOHT = async () => {
      toggleLoading(true);
      var currentData = store.getState().form.DaiDienHopPhap.values;
      currentData = {
        ...currentData,
        DDHP_NoiO_Tinh: currentData.DDHP_HKTT_Tinh,
        DDHP_NoiO_Huyen: currentData.DDHP_HKTT_Huyen,
        DDHP_NoiO_Xa: currentData.DDHP_HKTT_Xa,
        DDHP_NoiO_Thon: currentData.DDHP_HKTT_Thon,
      }
      _setFormData(currentData, tempHKTT);
      setTimeout(() => {
        toggleLoading();
      }, 400);
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
          <ViewCus.ViewBoxShadown >
            <Field
              name={'DDHP_HoTen'}
              component={ViewCus.TextInput}
              label={'Họ và tên ĐDHP'}
              placeholder={'Họ và tên ĐDHP'}
            />
            <Text style={styles.title}>{"Quan hệ với NKT"}</Text>
            <Field
              name={'DDHP_QuanHe'}
              component={ViewCus.RadioGroup}
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
              name={'DDHP_CCCD'}
              component={ViewCus.TextInput}
              label={'Số CMND/CCCD:'}
              placeholder={'Số CMND/CCCD:'}
            />
            <Field
              name={'DDHP_SDT'}
              component={ViewCus.TextInput}
              label={'Số điện thoại'}
              placeholder={'Số điện thoại'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hộ khẩu thường trú'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'DDHP_HKTT_Tinh'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refProvinceHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                onSelected={(e, index) => {
                  tempHKTT.DDHP_HKTT_Tinh = e.id;
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
                name={'DDHP_HKTT_Huyen'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refDistrictHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maTinh}
                onSelected={(e, index) => {
                  tempHKTT.DDHP_HKTT_Huyen = e.id;
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
                name={'DDHP_HKTT_Xa'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refWardHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maHuyen}
                onSelected={async (e, index) => {
                  tempHKTT.DDHP_HKTT_Xa = e.id;
                  toggleLoading(true);
                  var village = (await RestAPI.Master_Village({
                    maTinh: tempHKTT.DDHP_HKTT_Tinh || 0,
                    maHuyen: tempHKTT.DDHP_HKTT_Huyen || 0,
                    maXa: tempHKTT.DDHP_HKTT_Xa || 0,
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
                name={'DDHP_HKTT_Thon'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refVillageHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                onSelected={e => {
                  tempHKTT.DDHP_HKTT_Thon = e.id
                }}
                label='Thôn/Tổ'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>
            <Field
              name={'DDHP_HKTT_DiaChi'}
              component={ViewCus.TextInput}
              label={'Địa chỉ hộ khẩu thường trú'}
              placeholder={'Địa chỉ thường trú'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Nơi ở hiện tại'}</Text>
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
                name={'DDHP_NoiO_Tinh'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refProvinceNOHT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                onSelected={(e, index) => {
                  temp.DDHP_NoiO_Tinh = e.id;
                  refDistrictNOHT.current?.getRenderedComponent().updateParentId(e.id);
                  refWardNOHT.current?.getRenderedComponent().updateParentId(-1);
                  refVillageNOHT.current?.getRenderedComponent().updateOptions([]);
                }}
                label='Tỉnh/Thành phố'
                styleContainer={{
                  flex: 1
                }}
              />
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'DDHP_NoiO_Huyen'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refDistrictNOHT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maTinh}
                onSelected={(e, index) => {
                  temp.DDHP_NoiO_Huyen = e.id;
                  refWardNOHT.current?.getRenderedComponent().updateParentId(e.id);
                  refVillageNOHT.current?.getRenderedComponent().updateOptions([]);
                }}
                label='Quận/Huyện'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>

            <View style={{ paddingHorizontal: 5 }} />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'DDHP_NoiO_Xa'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refWardNOHT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maHuyen}
                onSelected={async (e, index) => {
                  temp.DDHP_NoiO_Xa = e.id;
                  toggleLoading(true);
                  var village = (await RestAPI.Master_Village({
                    maTinh: temp.DDHP_NoiO_Tinh || 0,
                    maHuyen: temp.DDHP_NoiO_Huyen || 0,
                    maXa: temp.DDHP_NoiO_Xa || 0,
                  })).data;
                  toggleLoading()
                  refVillageNOHT.current?.getRenderedComponent().updateOptions(village)
                }}
                label='Xã/Phường'
                styleContainer={{
                  flex: 1
                }}
              />
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'DDHP_NoiO_Thon'}
                component={ViewCus.Selector}
                forwardRef={true}
                ref={refVillageNOHT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                label='Thôn/Tổ'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>
            <Field
              name={'DDHP_NoiO_DiaChi'}
              component={ViewCus.TextInput}
              label={'Địa chỉ nơi ở hiện tại'}
              placeholder={'Địa chỉ nơi ở hiện tại'}
            />
          </ViewCus.ViewBoxShadown>
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
          {__DEV__ &&
            <Button
              onPress={() => onResetFrom()}
            >
              {'Reset'}
            </Button>
          }
          {
            lockTab &&
            <ButtonNextTab
              onPress={handleSubmit(_onSubmit)}
            >
              {'Tiếp tục'}
            </ButtonNextTab>
          }
        </View>
      </ScrollView>

    );
  },
);
