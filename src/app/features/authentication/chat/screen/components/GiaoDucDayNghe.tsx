import React, { useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Text } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
  D1_ThucTrangGiaoDuc: 0,
  D2_ThucTrangDayNghe: 0,
  D2_ThucTrangDayNghe_KhacText: '',
  D2_ThoiGianHocNghe: 0,
  D3_ThucTrangViecLam: 0,
  D3_ThuNhapBinhQuan: 0,
  D3_LyDoKhongCoViec: 0,
  D4_TroCapBTXH: 0,
  D4_TroCapBTXH_SoTien: 0,
  D4_TroCapChamSocNKT: 0,
  D4_TroCapChamSocNKT_SoTien: 0,
  D4_ChuongTrinhTGXHKhac: 0,
  D4_ChuongTrinhTGXHKhac_SoTien: 0,
  D3_NguonThuNhap_SXKD: 0,
  D3_NguonThuNhap_NN: 0,
  D3_NguonThuNhap_CVC: 0,
  D3_NguonThuNhap_CN: 0,
  D3_NguonThuNhap_HT: 0,
  D3_NguonThuNhap_TCXH: 0,
  D3_NguonThuNhap_Khac: 0,
  D3_NguonThuNhap_KhacText: '',
  D3_LyDoKhongCoViec_KhacText: '',
  D4_DichVuXaHoiCoBan: 0,
  D4_DichVuXaHoiCoBan_GiaoDuc: 0,
  D4_DichVuXaHoiCoBan_NhaO: 0,
  D4_DichVuXaHoiCoBan_NuocVeSinh: 0,
  D4_DichVuXaHoiCoBan_ThongTin: 0,
}

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
    fontWeight: 'bold',

  },
})

export const GiaoDucDayNghe = reduxForm({ form: 'GiaoDucDayNghe' })(
  (props: ConfigProps & InjectedFormProps) => {
    const {
      handleSubmit,
      reset: resetForm,
      initialize: loadForm,
      onReady,
      refOut,
      onRefresh,
      lockTab,
      isRefresh: _isRefresh,
    } = props;
    const [isRefresh, setIsRefresh] = useState(false)


    useEffect(() => {
      isRefresh != false && setIsRefresh(false);
      init();
    }, [_isRefresh])

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      var data = Utils.mapDataWithCase(defaultData, dataSaved.ttc);
      setFormData({
        ...data,
      })
    }
    const setFormData = (data) => {
      loadForm(data)
    }

    const onResetFrom = () => {
      loadForm(defaultData)
    }
    var _onSubmit = (obj) => {
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
        <View >
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hi???n tr???ng gi??o d???c'}</Text>
            <Field
              name={'D1_ThucTrangGiaoDuc'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Ch??a ?????n tu???i ??i h???c',
                },
                {
                  value: 2,
                  label: 'Ch??a t???ng ??i h???c',
                },
                {
                  value: 3,
                  label: 'M???u gi??o, m???m non',
                },
                {
                  value: 4,
                  label: 'Ti???u h???c',
                }, {
                  value: 5,
                  label: 'THCS',
                }, {
                  value: 6,
                  label: 'THPT',
                },
                {
                  value: 7,
                  label: 'Cao ?????ng/?????i h???c',
                }, {
                  value: 8,
                  label: 'Tr??n ?????i h???c',
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hi???n tr???ng d???y ngh???'}</Text>
            <Field
              name={'D2_ThucTrangDayNghe'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Ch??a qua ????o t???o',
                  name: 'CQDT'
                },
                {
                  value: 2,
                  label: 'H???c ngh??? t???i ch???',
                  name: 'HNTC'
                },
                {
                  value: 3,
                  label: 'S?? c???p ngh???',
                  name: 'SCN'
                },
                {
                  value: 4,
                  label: 'Trung c???p ngh???',
                  name: 'TCN'
                }, {
                  value: 5,
                  label: 'Cao ?????ng ngh???',
                  name: 'CDN'
                }, {
                  value: 6,
                  label: 'Kh??c',
                  name: 'Khac'
                },
              ]}
            />

            <Field
              name={'D2_ThucTrangDayNghe_KhacText'}
              component={ViewCus.TextInput}
              // label='Th???c tr???ng d???y ngh??? kh??c'
              placeholder='Kh??c'
            />
            <Field
              name={'D2_ThoiGianHocNghe'}
              component={ViewCus.TextInput}
              label='Th???i gian h???c ngh???'
              placeholder='Th???i gian h???c ngh???'
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hi???n tr???ng vi???c l??m'}</Text>
            <Field
              name={'D3_ThucTrangViecLam'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'C?? vi???c l??m t???o thu nh???p',
                  name: 'CVLTTN'
                },
                {
                  value: 2,
                  label: 'Kh??ng c?? vi???c l??m t???o thu nh???p',
                  name: 'KCVLTTN'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Field
              name={'D3_ThuNhapBinhQuan'}
              component={ViewCus.Slider}
              maximumValue={100000000}
              minimumValue={0}
              step={1000000}
              formatter={v => v.formatVND()}
              suffix={'???'}
              label={'Thu nh???p b??nh qu??n h??ng th??ng c???a NKT'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'L?? do kh??ng c?? vi???c l??m'}</Text>
            <Field
              name={'D3_LyDoKhongCoViec'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Kh??ng c?? kh??? n??ng lao ?????ng',
                  name: 'KCKNLD'
                },
                {
                  value: 2,
                  label: 'Kh??ng mu???n l??m vi???c',
                  name: 'KMLV'
                }, {
                  value: 3,
                  label: 'Kh??ng t??m ???????c vi???c l??m',
                  name: 'KTDVL'
                },
                {
                  value: 4,
                  label: 'Kh??c',
                  name: 'Khac'
                },
              ]}
            />
            <Field
              name={'D3_LyDoKhongCoViec_KhacText'}
              component={ViewCus.TextInput}
              placeholder={'Kh??c'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Tr??? c???p BTXH h??ng th??ng'}</Text>
            <Field
              name={'D4_TroCapBTXH'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: '???????c h?????ng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Kh??ng ???????c h?????ng',
                  name: 'KhongDuocHuong'
                },
              ]}
            />
            <Field
              name={'D4_TroCapBTXH_SoTien'}
              component={ViewCus.Slider}
              maximumValue={100000000}
              minimumValue={0}
              step={1000000}
              formatter={v => v.formatVND()}
              suffix={'???'}
              label={'S??? ti???n h?????ng h??ng th??ng'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Tr??? c???p h??? tr??? h??? gia ????nh ??ang tr???c ti???p nu??i d?????ng ch??m s??c NKT??BN'}</Text>
            <Field
              name={'D4_TroCapChamSocNKT'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: '???????c h?????ng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Kh??ng ???????c h?????ng',
                  name: 'KhongDuocHuong'
                },
              ]}
            />
            <Field
              name={'D4_TroCapChamSocNKT_SoTien'}
              component={ViewCus.Slider}
              maximumValue={100000000}
              minimumValue={0}
              step={1000000}
              formatter={v => v.formatVND()}
              suffix={'???'}
              label={'S??? ti???n h?????ng h??ng th??ng'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'C??c ch????ng tr??nh tr??? gi??p x?? h???i kh??c'}</Text>
            <Field
              name={'D4_ChuongTrinhTGXHKhac'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: '???????c h?????ng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Kh??ng ???????c h?????ng',
                  name: 'KhongDuocHuong'
                },
              ]}
            />
            <Field
              name={'D4_ChuongTrinhTGXHKhac_SoTien'}
              component={ViewCus.Slider}
              maximumValue={100000000}
              minimumValue={0}
              step={1000000}
              formatter={v => v.formatVND()}
              suffix={'???'}
              label={'S??? ti???n h?????ng h??ng th??ng'}
            />
          </ViewCus.ViewBoxShadown>
          {
            [
              {
                label: 'Ngu???n thu nh???p',
                list: [
                  {
                    key: 'D3_NguonThuNhap_SXKD',
                    label: 'T??? s???n xu???t kinh doanh',
                  },
                  {
                    key: 'D3_NguonThuNhap_NN',
                    label: 'L??m n??ng/l??m/di??m/ng?? nghi???p',
                  },
                  {
                    key: 'D3_NguonThuNhap_CVC',
                    label: 'C??ng ch???c, vi??n ch???c',
                  },
                  {
                    key: 'D3_NguonThuNhap_CN',
                    label: 'C??ng nh??n',
                  },
                  {
                    key: 'D3_NguonThuNhap_HT',
                    label: 'H??u tr??',
                  },
                  {
                    key: 'D3_NguonThuNhap_TCXH',
                    label: 'Tr??? c???p x?? h???i',
                  },
                  {
                    key: 'D3_NguonThuNhap_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'D3_NguonThuNhap_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'C??c d???ch v??? x?? h???i c?? b???n kh??c ???????c h?????ng',
                list: [
                  {
                    key: 'D4_DichVuXaHoiCoBan',
                    label: 'Y t???',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_GiaoDuc',
                    label: 'Gi??o d???c',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_NhaO',
                    label: 'Nh?? ???',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_NuocVeSinh',
                    label: 'N?????c s???ch v?? v??? sinh',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_ThongTin',
                    label: 'Th??ng tin',
                  },

                ]
              },
            ].map((group, index) => {
              return (
                <ViewCus.ViewBoxShadown
                  key={index}
                >
                  <Text style={styles.title}>{group.label}</Text>
                  {
                    group.list.map((e, index) => {
                      return (e?.type == 'input' ?
                        <Field
                          key={index}
                          name={e.key}
                          component={ViewCus.TextInput}
                          placeholder={e.placeholder}
                        />
                        :
                        <Field
                          key={index}
                          name={e.key}
                          component={ViewCus.Checkbox}
                          children={e.label}
                        />
                      )
                    })
                  }
                </ViewCus.ViewBoxShadown>
              )
            })
          }
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
          <ButtonNextTab
            onPress={handleSubmit(_onSubmit)}
          >
            {'Ti???p t???c'}
          </ButtonNextTab>
        }
      </ScrollView>
    );
  },
);
