import moment from 'moment';
import RestAPI from '../../../../../RestAPI';
import { toggleLoading } from '../../../../../../../App';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text, Button } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle, palette as appColors } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
  LoaiCapXNKT: '',
  LyDoDoiCapLai: '',
  MaQuyetDinh: '',
  NgayQuyetDinh: '',
  HoTen: '',
  NgaySinh: '',
  CMTND: '',
  MaDinhDanh: '',
  GioiTinh: '',
  QQMaTinh: '',
  QQMaHuyen: '',
  QQMaXa: '',
  HKTT_Tinh: '',
  HKTT_Huyen: '',
  HKTT_Xa: '',
  HKTT_Thon: '',
  NoiOHienTai: '',
  HoanCanhCaNhan: '',
}

const validateForm = (data: any) => {
  var valids = Utils.objectValid.valid({
    ...defaultData,
    ...data,
  }, {
    LoaiCapXNKT: {
      required: true
    },
    LyDoDoiCapLai: {
      required: (value, obj) => obj.LoaiCapXNKT > 1,
    },
    NgayQuyetDinh: {
      required: (value, obj) => obj.LoaiCapXNKT > 1,
    },
    MaQuyetDinh: {
      required: (value, obj) => obj.LoaiCapXNKT > 1,
    },
    HoTen: {
      required: true,
    },
    NgaySinh: {
      required: true,
      lessDateOrEqual: {
        valid: true,
        compareWith: new Date(),
        compareFormat: 'DD/MM/YYYY'
      },
    },
    CMTND: {
      CMTND: true,
    },
    MaDinhDanh: {
    },
    GioiTinh: {
    },
    QQMaTinh: {
      required: true,
    },
    QQMaHuyen: {
      required: true,
    },
    QQMaXa: {
      required: true,
    },
    HKTT_Tinh: {
      required: true,
    },
    HKTT_Huyen: {
      required: true,
    },
    HKTT_Xa: {
      required: true,
    },
    HKTT_Thon: {
      required: true,
    },
    NoiOHienTai: {
    },
    HoanCanhCaNhan: {
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
export const ThongTinDoiTuong = reduxForm({ form: 'ThongTinDoiTuong', validate: validateForm })(
  (props: ConfigProps & InjectedFormProps) => {
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
    const refContentLDCL = useRef()
    const refProvinceHKTT = useRef()
    const refDistrictHKTT = useRef()
    const refWardHKTT = useRef()
    const refVillageHKTT = useRef()
    const refProvinceQQ = useRef()
    const refDistrictQQ = useRef()
    const refWardQQ = useRef()
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
      setIsRefresh(false);
      init()
    }, [_isRefresh])

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      const {
        ethnics,
        provinces,
        districts,
        wards,
      } = masterAll
      var data = Utils.mapDataWithCase(defaultData, dataSaved.gxn)
      refProvinceHKTT.current?.getRenderedComponent().updateOptions(provinces);
      refDistrictHKTT.current?.getRenderedComponent().updateOptions(districts);
      refWardHKTT.current?.getRenderedComponent().updateOptions(wards)
      var village = [];
      if (dataSaved.gxn.hktT_Xa > 0) {
        village = (await RestAPI.Master_Village({
          maTinh: data.HKTT_Tinh || 0,
          maHuyen: data.HKTT_Huyen || 0,
          maXa: data.HKTT_Xa || 0,
        })).data;
      }
      refVillageHKTT.current?.getRenderedComponent().updateOptions(village)
      refProvinceQQ.current?.getRenderedComponent().updateOptions(provinces);
      refDistrictQQ.current?.getRenderedComponent().updateOptions(districts)
      refWardQQ.current?.getRenderedComponent().updateOptions(wards)
      setFormData(data)
    }

    const setFormData = (data) => {
      refDistrictHKTT.current?.getRenderedComponent().updateParentId(data.HKTT_Tinh)
      refWardHKTT.current?.getRenderedComponent().updateParentId(data.HKTT_Huyen)
      refVillageHKTT.current?.getRenderedComponent().updateParentId(data.HKTT_Xa)

      refDistrictQQ.current?.getRenderedComponent().updateParentId(data.QQMaTinh)
      refWardQQ.current?.getRenderedComponent().updateParentId(data.QQMaHuyen)
      refContentLDCL.current?.setData(data.LoaiCapXNKT != 1 && data.LoaiCapXNKT != null)
      setTimeout(() => {
        loadForm(data)
      }, 200);
    }

    const onResetFrom = () => {
      refContentLDCL.current?.setData(defaultData.LoaiCapXNKT != 1)
      loadForm(defaultData)
    }

    const formatDate = (date) => {
      if (date == null || date == '')
        return '';
      else
        return moment(date).format()
    }

    var _onSubmit = (obj) => {
      obj.ID = 0;
      obj.NgaySinh = formatDate(obj.NgaySinh);
      obj.NgayTao = moment().format()
      obj.NgayQuyetDinh = formatDate(obj.NgayQuyetDinh);
      if (obj.NgayQuyetDinh == "Invalid date") {
        obj.NgayQuyetDinh = ""
      }
      if (obj.NgaySinh == "Invalid date") {
        obj.NgaySinh = ""
      }
      props.onSubmitNext('GXN', obj, false)
    }
    return (
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
        accessible={false}
      >
        <View accessible={false}>
          <ViewCus.ViewBoxShadown accessible={false}>
            <Field
              name={'LoaiCapXNKT'}
              component={ViewCus.RadioGroup}
              label='Y??u c???u'
              requiredLabel
              options={[
                {
                  value: 1,
                  label: 'C???p m???i',
                  name: 'CapMoi'
                },
                {
                  value: 2,
                  label: 'C???p l???i',
                  name: 'CapLai'
                },
                {
                  value: 3,
                  label: '?????i',
                  name: 'Doi'
                },
              ]}
              onChange={(event, newValue, preValue, name) => {
                refContentLDCL.current?.setData(newValue !== 1)
              }}
              render={({ RadioComponent }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} accessible={false}>
                  <RadioComponent.CapMoi />
                  <RadioComponent.CapLai />
                  <RadioComponent.Doi />
                </View>
              )}
            />
            <ViewCus.ComponentDynamic
              ref={refContentLDCL}
              render={(isShow) => {
                return isShow == true &&
                  <>
                    <Field
                      name={'LyDoDoiCapLai'}
                      component={ViewCus.TextInput}
                      requiredLabel
                      placeholder={'L?? do c???n ?????i / c???p l???i'}
                      label={'L?? do c???n ?????i / c???p l???i'}

                    />
                    <Field
                      name={'MaQuyetDinh'}
                      component={ViewCus.TextInput}
                      requiredLabel
                      placeholder={'Gi???y x??c nh???n khuy???t t???t'}
                      label={'Gi???y x??c nh???n khuy???t t???t'}

                    />
                    <Field
                      name={'NgayQuyetDinh'}
                      component={ViewCus.TextDate}
                      validate={[Utils.objectValid.isValidDate]}
                      requiredLabel
                      label='Ng??y c???p gi???y x??c nh???n'
                    />
                  </>
              }}
            />
            <Field
              name={'HoTen'}
              component={ViewCus.TextInput}
              requiredLabel
              placeholder={"H??? v?? t??n"}
              label={"H??? v?? t??n"}

            />
            <Field
              name={'NgaySinh'}
              component={ViewCus.TextDate}
              validate={[Utils.objectValid.isValidDate]}
              requiredLabel
              label='Ng??y sinh'
            />
            <Field
              name={'CMTND'}
              component={ViewCus.TextInput}
              requiredLabel
              placeholder={''}
              label={"CMND/CCCD"}

            />
            <Field
              name={'MaDinhDanh'}
              component={ViewCus.TextInput}
              placeholder={'M?? ?????nh danh'}
              label={'M?? ?????nh danh'}
            />
            <View >
              <Text style={styles.title}>{"Gi???i t??nh:"}</Text>
              <Field
                name={'GioiTinh'}
                component={ViewCus.RadioGroup}
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
            </View>
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Qu?? qu??n'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'QQMaTinh'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refProvinceQQ}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                onSelected={(e, index) => {
                  refDistrictQQ.current?.getRenderedComponent().updateParentId(e.id);
                  refWardQQ.current?.getRenderedComponent().updateParentId(-1);
                }}
                label='T???nh/Th??nh ph???'
                styleContainer={{
                  flex: 1
                }}
              />
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'QQMaHuyen'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refDistrictQQ}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maTinh}
                onSelected={(e, index) => {
                  refWardQQ.current?.getRenderedComponent().updateParentId(e.id);
                }}
                label='Qu???n/Huy???n'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'H??? kh???u th?????ng tr??'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'HKTT_Tinh'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refProvinceHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                onSelected={(e, index) => {
                  temp.HKTT_Tinh = e.id;
                  refDistrictHKTT.current?.getRenderedComponent().updateParentId(e.id);
                  refWardHKTT.current?.getRenderedComponent().updateParentId(-1);
                  refVillageHKTT.current?.getRenderedComponent().updateOptions([]);
                }}
                label='T???nh/Th??nh ph???'
                styleContainer={{
                  flex: 1
                }}
              />
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'HKTT_Huyen'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refDistrictHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maTinh}
                onSelected={(e, index) => {
                  temp.HKTT_Huyen = e.id;
                  refWardHKTT.current?.getRenderedComponent().updateParentId(e.id);
                  refVillageHKTT.current?.getRenderedComponent().updateOptions([]);
                }}
                label='Qu???n/Huy???n'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Field
                name={'HKTT_Xa'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refWardHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                optionParentId={(e, index) => e.maHuyen}
                onSelected={async (e, index) => {
                  temp.HKTT_Xa = e.id;
                  toggleLoading(true);
                  var village = (await RestAPI.Master_Village({
                    maTinh: temp.HKTT_Tinh || 0,
                    maHuyen: temp.HKTT_Huyen || 0,
                    maXa: temp.HKTT_Xa || 0,
                  })).data;
                  toggleLoading()
                  refVillageHKTT.current?.getRenderedComponent().updateOptions(village)
                }}
                label='Ph?????ng/X??'
                styleContainer={{
                  flex: 1
                }}
              />
              <View style={{ paddingHorizontal: 5 }} />
              <Field
                name={'HKTT_Thon'}
                component={ViewCus.Selector}
                requiredLabel
                forwardRef={true}
                ref={refVillageHKTT}
                optionLabel={(e, index) => e?.ten}
                optionKey={(e, index) => e?.id}
                label='Th??n/T???'
                styleContainer={{
                  flex: 1
                }}
              />
            </View>

            <Field
              name={'NoiOHienTai'}
              component={ViewCus.TextInput}
              label={"N??i ??? hi???n t???i"}
            />
            <Field
              name={'HoanCanhCaNhan'}
              component={ViewCus.TextInput}
              label={'Ho??n c???nh c?? nh??n'}
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
                {'H??y ki???m tra l???i d??? li???u'}
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
              {'Ti???p t???c'}
            </ButtonNextTab>
          }
        </View>
      </ScrollView>
    );
  },
);



