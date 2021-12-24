
import { toggleLoading } from '../../../../../../../App';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Field, reduxForm } from 'redux-form';
import { Button, Text } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import RestAPI from '../../../../../RestAPI/index';

const defaultData = {
  H1_HoTenNguoiGiamHo: "",
  H2_NgaySinhNguoiGiamHo: "",
  H2_GioiTinhNguoiGiamHo: 0,
  H3_SoCMNDNguoiGiamHo: 0,
  H4_SoDienThoaiNguoiGiamHo: 0,
  H5_QuanHeVoiNKT: 0,
  H5_QuanHeVoiNKT_Khac: 0,
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
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    paddingVertical: 5,
    color: 'black',
    textTransform: 'capitalize'
  },
})
var temp = {}
export const GiamHoKhaiThay = reduxForm({
  form: 'GiamHoKhaiThay', validate: data => {
    var valids = Utils.objectValid.valid({
      ...defaultData,
      ...data,
    }, {
      H1_HoTenNguoiGiamHo: {
        // required: true
      },
      H2_NgaySinhNguoiGiamHo: {
      },
      H2_GioiTinhNguoiGiamHo: {
      },
      H3_SoCMNDNguoiGiamHo: {
        // CMTND: true,
      },
      H4_SoDienThoaiNguoiGiamHo: {
      },
      H5_QuanHeVoiNKT: {
      },
      H5_QuanHeVoiNKT_Khac: {
      },
      H6_DiaChiNguoiGiamHo: {
      },
      H6_DiaChi_TinhTP: {
        // required: true,
      },
      H6_DiaChi_QuanHuyen: {
        // required: true,
      },
      H6_DiaChi_PhuongXa: {
        // required: true,
      },
      H6_DiaChi_ThonTo: {
        // required: true,
      },
      I1_HoTenNguoiKeKhai: {
      },
      I2_NgaySinhNguoiKeKhai: {
      },
      I2_GioiTinhNguoiGiamHo: {
      },
      I3_SoCMNDNguoiKeKhai: {
        // CMTND: true,
      },
      I4_SoDienThoaiNguoiKeKhai: {
      },
      I5_QuanHeVoiNKT: {
      },
      I5_QuanHeVoiNKT_Khac: {
      },
      I6_DiaChiNguoiKhaiThay: {
      },
      I6_DiaChi_TinhTP: {
        // required: true,
      },
      I6_DiaChi_QuanHuyen: {
        // required: true,
      },
      I6_DiaChi_PhuongXa: {
        // required: true,
      },
      I6_DiaChi_ThonTo: {
        // required: true,
      },
    }, { lan: 'redux-form' })
    return valids.toObject(e => e.field, e => e.message);
  }
})((props) => {
  const {
    handleSubmit,
    reset: resetForm,
    initialize: loadForm,
    refOut,
    onReady,
    submitView = null,
    onRefresh,
    lockTab,
    isRefresh: _isRefresh,
  } = props;

  const refDanToc = useRef()
  const refProvinceNGH = useRef()
  const refDistrictNGH = useRef()
  const refWardNGH = useRef()
  const refVillageNGH = useRef()
  const refProvinceNT = useRef()
  const refDistrictNT = useRef()
  const refWardNT = useRef()
  const refVillageNT = useRef()
  const [isRefresh, setIsRefresh] = useState(false)

  useEffect(() => {
    isRefresh != false && setIsRefresh(false);
    init();
  }, [_isRefresh])

  var init = async () => {
    var { master: masterAll, dataSaved } = onReady() || {};
    const {
      ethnics,
      provinces,
      districts,
      wards,
    } = masterAll;
    var data = Utils.mapDataWithCase(defaultData, dataSaved.ttc);

    refDanToc.current?.getRenderedComponent().updateOptions(ethnics);
    refProvinceNGH.current?.getRenderedComponent().updateOptions(provinces);
    refDistrictNGH.current?.getRenderedComponent().updateOptions(districts).updateParentId(-1)
    refWardNGH.current?.getRenderedComponent().updateOptions(wards).updateParentId(-1)
    toggleLoading(true)
    var village = data.H6_DiaChi_PhuongXa > 0 ? (await RestAPI.Master_Village({
      maTinh: data.H6_DiaChi_TinhTP || 0,
      maHuyen: data.H6_DiaChi_QuanHuyen || 0,
      maXa: data.H6_DiaChi_PhuongXa || 0,
    })).data : [];
    refVillageNGH.current?.getRenderedComponent().updateOptions(village)

    refProvinceNT.current?.getRenderedComponent().updateOptions(provinces);
    refDistrictNT.current?.getRenderedComponent().updateOptions(districts).updateParentId(-1)
    refWardNT.current?.getRenderedComponent().updateOptions(wards).updateParentId(-1)
    village = data.I6_DiaChi_PhuongXa > 0 ? (await RestAPI.Master_Village({
      maTinh: data.I6_DiaChi_TinhTP || 0,
      maHuyen: data.I6_DiaChi_QuanHuyen || 0,
      maXa: data.I6_DiaChi_PhuongXa || 0,
    })).data : [];

    refVillageNT.current?.getRenderedComponent().updateOptions(village)
    setFormData(data)
    toggleLoading()
  }
  const setFormData = (data) => {
    refDistrictNGH.current?.getRenderedComponent().updateParentId(data.H6_DiaChi_TinhTP).select(data.H6_DiaChi_QuanHuyen);
    refWardNGH.current?.getRenderedComponent().updateParentId(data.H6_DiaChi_QuanHuyen).select(data.H6_DiaChi_PhuongXa);
    refVillageNGH.current?.getRenderedComponent().updateParentId(data.H6_DiaChi_PhuongXa).select(data.H6_DiaChi_ThonTo);

    refDistrictNT.current?.getRenderedComponent().updateParentId(data.I6_DiaChi_TinhTP).select(data.I6_DiaChi_QuanHuyen);
    refWardNT.current?.getRenderedComponent().updateParentId(data.I6_DiaChi_QuanHuyen).select(data.I6_DiaChi_PhuongXa);
    refVillageNT.current?.getRenderedComponent().updateParentId(data.I6_DiaChi_PhuongXa).select(data.I6_DiaChi_ThonTo);
    loadForm(data)
  }

  const onResetFrom = () => {
    loadForm(defaultData)
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
          <Text style={styles.title}>{'THÔNG TIN VỀ NGƯỜI GIÁM HỘ '}</Text>
          <Field
            name={'H1_HoTenNguoiGiamHo'}
            component={ViewCus.TextInput}
            label='Họ và tên'
            placeholder='Họ và tên giám hộ'
          />
          <Field
            name={'H2_NgaySinhNguoiGiamHo'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Ngày Sinh'
          />
          <Field
            name={'H2_GioiTinhNguoiGiamHo'}
            component={ViewCus.RadioGroup}
            label="Giới tính"
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
          <Field
            name={'H3_SoCMNDNguoiGiamHo'}
            component={ViewCus.TextInput}
            placeholder={'Số CMND người giám hộ'}
            label='Số CMND người giám hộ'
          />
          <Field
            name={'H4_SoDienThoaiNguoiGiamHo'}
            component={ViewCus.TextInput}
            label='Số điện thoại'
            placeholder={'Số điện thoại chủ hộ'}
          />
          <Field
            name={'H5_QuanHeVoiNKT'}
            component={ViewCus.RadioGroup}
            label="Quan hệ với NKT"
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
            name={'H5_QuanHeVoiNKT_Khac'}
            component={ViewCus.TextInput}
            placeholder='Khác'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Địa chỉ người giám hộ'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'H6_DiaChi_TinhTP'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refProvinceNGH}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              onSelected={(e, index) => {
                temp.H6_DiaChi_TinhTP = e.id
                refDistrictNGH.current?.getRenderedComponent().updateParentId(e.id);
                refWardNGH.current?.getRenderedComponent().updateParentId(-1);
                refVillageNGH.current?.getRenderedComponent().updateOptions([])
              }}
              label='Tỉnh/Thành phố'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'H6_DiaChi_QuanHuyen'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refDistrictNGH}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maTinh}
              onSelected={(e, index) => {
                temp.H6_DiaChi_QuanHuyen = e.id;
                refWardNGH.current?.getRenderedComponent().updateParentId(e.id);
                refVillageNGH.current?.getRenderedComponent().updateOptions([]);
              }}
              label='Quận/Huyện'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'H6_DiaChi_PhuongXa'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refWardNGH}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maHuyen}
              onSelected={async (e, index) => {
                temp.H6_DiaChi_PhuongXa = e.id;
                toggleLoading(true);
                var village = (await RestAPI.Master_Village({
                  maTinh: temp.H6_DiaChi_TinhTP || 0,
                  maHuyen: temp.H6_DiaChi_QuanHuyen || 0,
                  maXa: temp.H6_DiaChi_PhuongXa || 0,
                })).data;
                toggleLoading()
                refVillageNGH.current?.getRenderedComponent().updateOptions(village)
              }}
              label='Xã/Phường'
              styleContainer={{
                flex: 1
              }}
            />

            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'H6_DiaChi_ThonTo'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refVillageNGH}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              label='Thôn/Tổ'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
          <Field
            name={'H6_DiaChiNguoiGiamHo'}
            component={ViewCus.TextInput}
            label='Địa chỉ người giám hộ'
            placeholder='Địa chỉ người giám hộ'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'THÔNG TIN VỀ NGƯỜI KHAI THAY'}</Text>
          <Field
            name={'I1_HoTenNguoiKeKhai'}
            component={ViewCus.TextInput}
            label='Họ và tên'
            placeholder='Họ và tên'
          />
           <Field
            name={'I2_NgaySinhNguoiKeKhai'}
            component={ViewCus.TextDate}
            // validate={[Utils.objectValid.isValidDate]}
            label='Ngày Sinh'
          />
          <Field
            name={'I2_GioiTinhNguoiGiamHo'}
            component={ViewCus.RadioGroup}
            label="Giới tính"
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
          <Field
            name={'I3_SoCMNDNguoiKeKhai'}
            component={ViewCus.TextInput}
            label={'Số CMND'}
            placeholder='Số CMND người khai thay'
          />
          <Field
            name={'I4_SoDienThoaiNguoiKeKhai'}
            component={ViewCus.TextInput}
            label={'Số điện thoại'}
            placeholder='Số điện thoại'
          />
          <Field
            name={'I5_QuanHeVoiNKT'}
            component={ViewCus.RadioGroup}
            label="Quan hệ với NKT"
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
            name={'I5_QuanHeVoiNKT_Khac'}
            component={ViewCus.TextInput}
            placeholder='Khác'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Địa chỉ người khai thay'}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'I6_DiaChi_TinhTP'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refProvinceNT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              onSelected={(e, index) => {
                temp.I6_DiaChi_TinhTP = e.id
                refDistrictNT.current?.getRenderedComponent().updateParentId(e.id);
                refWardNT.current?.getRenderedComponent().updateParentId(-1);
                refVillageNT.current?.getRenderedComponent().updateOptions([])
              }}
              label='Tỉnh/Thành phố'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'I6_DiaChi_QuanHuyen'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refDistrictNT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maTinh}
              onSelected={(e, index) => {
                temp.I6_DiaChi_QuanHuyen = e.id
                refWardNT.current?.getRenderedComponent().updateParentId(e.id);
                refVillageNT.current?.getRenderedComponent().updateOptions([])
              }}
              label='Quận/Huyện'
              styleContainer={{
                flex: 1
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Field
              name={'I6_DiaChi_PhuongXa'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refWardNT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              optionParentId={(e, index) => e.maHuyen}
              onSelected={async (e, index) => {
                toggleLoading(true);
                temp.I6_DiaChi_PhuongXa = e.id
                var village = (await RestAPI.Master_Village({
                  maTinh: temp.I6_DiaChi_TinhTP || 0,
                  maHuyen: temp.I6_DiaChi_QuanHuyen || 0,
                  maXa: temp.I6_DiaChi_PhuongXa || 0,
                })).data;
                toggleLoading()
                refVillageNT.current?.getRenderedComponent().updateOptions(village)
              }}
              label='Xã/Phường'
              styleContainer={{
                flex: 1
              }}
            />
            <View style={{ paddingHorizontal: 5 }} />
            <Field
              name={'I6_DiaChi_ThonTo'}
              component={ViewCus.Selector}
              forwardRef={true}
              ref={refVillageNT}
              optionLabel={(e, index) => e?.ten}
              optionKey={(e, index) => e?.id}
              label='Thôn/Tổ'
              styleContainer={{
                flex: 1
              }}
            />
          </View>
          <Field
            name={'I6_DiaChiNguoiKhaiThay'}
            component={ViewCus.TextInput}
            placeholder={'Địa chỉ người giám hộ'}
            label='Địa chỉ người giám hộ'
          />
        </ViewCus.ViewBoxShadown>
      </View>
      {/* {__DEV__ &&
        <Button
          onPress={() => onResetFrom()}
        >
          {'Reset'}
        </Button>
      } */}
      {
        lockTab &&
        submitView != null && submitView((payload: object) => {
          handleSubmit((obj) => {
            props.onSubmitNext('TTC', obj, payload)
          })()
        })
      }
    </ScrollView>
  );
});