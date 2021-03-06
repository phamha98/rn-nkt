import React, { useEffect, } from 'react';
import { View, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../../../../themes';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '../../../../../library/components';
import { useSelector } from 'react-redux';
import { Radio } from '../../../../../library/components/radio';
import { ConfigProps, Field, InjectedFormProps, reduxForm, Form as FormRDF } from 'redux-form';
import ButtonNextTab from './ButtonNextTab'
import { TextField } from '../../../../../library/components/text-field/text-field';
import { Checkbox } from '../../../../../library/components/checkboxCus'
export const GiaoDucDayNghe = reduxForm({ form: 'GiaoDucDayNghe' })(
  (props: ConfigProps & InjectedFormProps) => {
    const formObj = useSelector(s => s.form.GiaoDucDayNghe)?.values || {};
    const { handleSubmit, onSubmit } = props;
    useEffect(() => {
      var _run = async () => {
        props.initialize({
          D1_ThucTrangGiaoDuc: 0,
          D2_ThucTrangDayNghe: 0,
          D2_ThucTrangDayNghe_KhacText: "",
          D2_ThoiGianHocNghe: "",
          D3_ThucTrangViecLam: 0,
          D3_ThuNhapBinhQuan: "",
          D3_NguonThuNhap_SXKD: 0,
          D3_NguonThuNhap_NN: 0,
          D3_NguonThuNhap_CVC: 0,
          D3_NguonThuNhap_CN: 0,
          D3_NguonThuNhap_HT: 0,
          D3_NguonThuNhap_TCXH: 0,
          D3_NguonThuNhap_Khac: 0,
          D3_NguonThuNhap_KhacText: "",
          D3_LyDoKhongCoViec: 0,
          D3_LyDoKhongCoViec_KhacText: "",
          D4_TroCapBTXH: 0,
          D4_TroCapBTXH_SoTien: "",
          D4_TroCapChamSocNKT: 0,
          D4_TroCapChamSocNKT_SoTien: "",
          D4_ChuongTrinhTGXHKhac: 0,
          D4_ChuongTrinhTGXHKhac_SoTien: "",
          D4_DichVuXaHoiCoBan: 0,
          D4_DichVuXaHoiCoBan_GiaoDuc: 0,
          D4_DichVuXaHoiCoBan_NhaO: 0,
          D4_DichVuXaHoiCoBan_NuocVeSinh: 0,
          D4_DichVuXaHoiCoBan_ThongTin: 0,
        })
      }
      _run()
    }, []);
    var _onSubmit = (obj) => {
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
            <View style={styles.wrap}>

              <Text style={styles.title}>{'Hi???n tr???ng gi??o d???c'}</Text>
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 1}
                valueRadio={1}
                tx={'Ch??a ?????n tu???i ??i h???c'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 2}
                valueRadio={2}
                tx={' Ch??a t???ng ??i h???c'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 3}
                valueRadio={3}
                tx={'M???u gi??o, m???m non'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 4}
                valueRadio={4}
                tx={'Ti???u h???c'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 5}
                valueRadio={5}
                tx={'THCS'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 6}
                valueRadio={6}
                tx={' THPT'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 7}
                valueRadio={7}
                tx={'Cao ?????ng/?????i h???c'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 8}
                valueRadio={8}
                tx={'Tr??n ?????i h???c'}
              />
              <Text style={styles.title}>{'Hi???n tr???ng d???y ngh???'}</Text>
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 1}
                valueRadio={1}
                tx={'Ch??a qua ????o t???o'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 2}
                valueRadio={2}
                tx={'H???c ngh??? t???i ch???'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 3}
                valueRadio={3}
                tx={'S?? c???p ngh???'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 4}
                valueRadio={4}
                tx={'Trung c???p ngh???'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 5}
                valueRadio={5}
                tx={'Cao ?????ng ngh???'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 6}
                valueRadio={6}
                tx={'Kh??c'}
              />
              <Field
                name={'D2_ThucTrangDayNghe_KhacText'}
                placeholderTx={'Hi???n tr???ng d???y ngh??? kh??c'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Field
                name={'D2_ThoiGianHocNghe'}
                placeholderTx={'Th???i gian h???c ngh???'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />

              <Text style={styles.title}>{'Hi???n tr???ng vi???c l??m'}</Text>
              <Field
                name={'D3_ThucTrangViecLam'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_ThucTrangViecLam == 1}
                valueRadio={1}
                tx={'C?? vi???c l??m t???o thu nh???p'}
              />
              <Field
                name={'D3_ThucTrangViecLam'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_ThucTrangViecLam == 2}
                valueRadio={2}
                tx={' Kh??ng c?? vi???c l??m t???o thu nh???p'}
              />
              <Text style={styles.title}>{'Thu nh???p b??nh qu??n h??ng th??ng c???a NKT (?????ng):'}</Text>
              <Field
                name={'D3_ThuNhapBinhQuan'}
                placeholderTx={'Thu nh???p b??nh qu??n h??ng th??ng c???a NKT'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Text style={styles.title}>{'L?? do kh??ng c?? vi???c l??m'}</Text>
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 1}
                valueRadio={1}
                tx={'Kh??ng c?? kh??? n??ng lao ?????ng'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 2}
                valueRadio={2}
                tx={'Kh??ng mu???n l??m vi???c'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 3}
                valueRadio={3}
                tx={'Kh??ng t??m ???????c vi???c l??m'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 4}
                valueRadio={4}
                tx={'Kh??c'}
              />

              <Text style={styles.title}>{'Tr??? c???p BTXH h??ng th??ng:'}</Text>
              <Field
                name={'D4_TroCapBTXH'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapBTXH == 1}
                valueRadio={1}
                tx={'???????c h?????ng'}
              />
              <Field
                name={'D4_TroCapBTXH'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapBTXH == 2}
                valueRadio={2}
                tx={'Kh??ng ???????c h?????ng'}
              />
              <Field
                name={'D4_TroCapBTXH_SoTien'}
                placeholderTx={'S??? ti???n h?????ng h??ng th??ng'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />

              <Text style={styles.title}>{'Tr??? c???p h??? tr??? h??? gia ????nh ??ang tr???c ti???p nu??i d?????ng ch??m s??c NKT??BN:'}</Text>
              <Field
                name={'D4_TroCapChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapChamSocNKT == 1}
                valueRadio={1}
                tx={'???????c h?????ng'}
              />
              <Field
                name={'D4_TroCapChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapChamSocNKT == 2}
                valueRadio={2}
                tx={'Kh??ng ???????c h?????ng'}
              />
              <Field
                name={'D4_TroCapChamSocNKT_SoTien'}
                placeholderTx={'S??? ti???n h?????ng h??ng th??ng'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Text style={styles.title}>{'C??c ch????ng tr??nh tr??? gi??p x?? h???i kh??c:'}</Text>
              <Field
                name={'D4_ChuongTrinhTGXHKhac'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_ChuongTrinhTGXHKhac == 1}
                valueRadio={1}
                tx={'???????c h?????ng'}
              />
              <Field
                name={'D4_ChuongTrinhTGXHKhac'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_ChuongTrinhTGXHKhac == 2}
                valueRadio={2}
                tx={'Kh??ng ???????c h?????ng'}
              />
              <Field
                name={'D4_ChuongTrinhTGXHKhac_SoTien'}
                placeholderTx={'S??? ti???n h?????ng h??ng th??ng'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />

              {
                [
                  {
                    label: 'Ngu???n thu nh???p:',
                    list: [
                      {
                        key: 'D3_NguonThuNhap_SXKD',
                        label: ' 1. T??? s???n xu???t kinh doanh',
                      },
                      {
                        key: 'D3_NguonThuNhap_NN',
                        label: '2. L??m n??ng/l??m/di??m/ng?? nghi???p',
                      },
                      {
                        key: 'D3_NguonThuNhap_CVC',
                        label: '3. C??ng ch???c, vi??n ch???c',
                      },
                      {
                        key: 'D3_NguonThuNhap_CN',
                        label: '4. C??ng nh??n',
                      },
                      {
                        key: 'D3_NguonThuNhap_HT',
                        label: '5. H??u tr??',
                      },
                      {
                        key: 'D3_NguonThuNhap_TCXH',
                        label: '6. Tr??? c???p x?? h???i',
                      },
                      {
                        key: 'D3_NguonThuNhap_Khac',
                        label: '7. Kh??c',
                      },
                    ]
                  },
                  {
                    label: 'C??c d???ch v??? x?? h???i c?? b???n kh??c ???????c h?????ng:',
                    list: [
                      {
                        key: 'D4_DichVuXaHoiCoBan',
                        label: '1. Y t???',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_GiaoDuc',
                        label: '2. Gi??o d???c',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_NhaO',
                        label: '3. Nh?? ???',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_NuocVeSinh',
                        label: '4. N?????c s???ch v?? v??? sinh',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_ThongTin',
                        label: '5. Th??ng tin',
                      },

                    ]
                  },


                ].map((group, index) => {
                  return (
                    <View
                      key={index}
                    >
                      <Text style={styles.title_checkbox}>{group.label}</Text>
                      {
                        group.list.map((e, index) => {
                          return (
                            <Field
                              key={index}
                              name={e.key}
                              component={Checkbox}
                              isNum={true}
                              tx={e.label}
                            />
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
            <ButtonNextTab
              onPress={handleSubmit(_onSubmit)}
            >
              {'L??u v?? sang trang'}
            </ButtonNextTab>
          </View>
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  title_checkbox: {
      fontSize: 16,
      letterSpacing: 0.16,
      marginTop: 10,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 10
  },
  title: {
      fontSize: 15,
      letterSpacing: 0.16,
      marginTop: 10,
      fontWeight: 'bold',
      color: 'black',
  },
})
