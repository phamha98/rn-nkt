
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../../../../themes';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../../../library/components';
import { Radio } from '../../../../../library/components/radio';
import { TextField } from '../../../../../library/components/text-field/text-field';
import { ConfigProps, Field, InjectedFormProps, reduxForm, Form as FormRDF } from 'redux-form';
import ButtonNextTab from './ButtonNextTab'
import { Checkbox } from '../../../../../library/components/checkboxCus'
export const HoaNhapCongDong = reduxForm({ form: 'HoaNhapCongDong' })((props) => {
  const { handleSubmit, onSubmit } = props;
  const formObj = useSelector(s => s.form.HoaNhapCongDong)?.values || {};
  useEffect(() => {
    var _run = async () => {
      props.initialize({
        E1_TamLy: 0,
        E1_TamLy_KhacText: "",
        E2_ThamGiaHoatDongCongDong: 0,
        E2_ThamGiaHoatDongTapThe: 0,
        E2_ThamGiaHoatDongGiaDinh: 0,
        E2_ThamGiaHoatDongKhac: "",
        E3_NangLucKyNangSong_SDL: "",
        E3_NangLucKyNangSong_GT: "",
        E3_NangLucKyNangSong_HDTT: "",
        E3_NangLucKyNangSong_Khac: "",
        E3_NangLucKyNangSong_KhacText: "",
        E4_TiepCanGiaoThongVaCongTrinh: 0,
        E5_TiepCanVanHoa: 0,
        E5_TiepCanTheThao: 0,
        E6_TroGiupPhapLy: 0,
        E6_TroGiupPhapLy_KhacText: 0,
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
            <Text style={styles.title}>{'T??m l??:'}</Text>
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 1}
              valueRadio={1}
              tx={'B??nh th?????ng'}
            />
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 2}
              valueRadio={2}
              tx={' C?? v???n ????? v??? t??m l?? (m???c c???m, t??? ti, bu???n, tr???m c???m, kh??ng h???p t??c, ...)'}
            />
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 3}
              valueRadio={3}
              tx={'Kh??c'}
            />

            <Field
              name={'E1_TamLy_KhacText'}
              placeholderTx={'T??m l?? kh??c'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />

            <Text style={styles.title}>{'Tham gia gia c??c ho???t ?????ng ??? c???ng ?????ng:'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongCongDong'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongCongDong == 1}
              valueRadio={1}
              tx={'C??'}
            />
            <Field
              name={'E2_ThamGiaHoatDongCongDong'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongCongDong == 2}
              valueRadio={2}
              tx={'Kh??ng'}
            />

            <Text style={styles.title}>{'Tham gia ho???t ?????ng nh??m, t???p th???'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongTapThe'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongTapThe == 1}
              valueRadio={1}
              tx={'C??'}
            />
            <Field
              name={'E2_ThamGiaHoatDongTapThe'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongTapThe == 2}
              valueRadio={2}
              tx={'Kh??ng'}
            />
            <Text style={styles.title}>{'Tham gia c??c ho???t ?????ng gia ????nh:'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongGiaDinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongGiaDinh == 1}
              valueRadio={1}
              tx={'C??'}
            />
            <Field
              name={'E2_ThamGiaHoatDongGiaDinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongGiaDinh == 2}
              valueRadio={2}
              tx={'Kh??ng'}
            />
            <Field
              name={'E2_ThamGiaHoatDongKhac'}
              placeholderTx={'Kh??c'}
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
                    label: 'N??ng l???c k??? n??ng s???ng:',
                    list: [
                      {
                        key: 'E3_NangLucKyNangSong_SDL',
                        label: '1. C?? k??? n??ng s???ng ?????c l???p',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_GT',
                        label: ' 2. C?? k??? n??ng giao ti???p',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_HDTT',
                        label: '3. C?? k??? n??ng ho???t ?????ng t???p th???',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_Khac',
                        label: '4. Kh??c',
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
            <Text style={styles.title}>{'Ti???p c???n giao th??ng v?? c??ng tr??nh x??y d???ng:'}</Text>
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 1}
              valueRadio={1}
              tx={'Thu???n ti???n'}
            />
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 2}
              valueRadio={2}
              tx={' Kh?? kh??n'}
            />
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 3}
              valueRadio={3}
              tx={'Kh??ng ti???p c???n'}
            />

            <Text style={styles.title}>{'V??n h??a:'}</Text>
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 1}
              valueRadio={1}
              tx={'C?? tham gia'}
            />
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 2}
              valueRadio={2}
              tx={' Kh??c'}
            />
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 3}
              valueRadio={3}
              tx={' Kh??ng ti???p c???n'}
            />

            <Text style={styles.title}>{'Th??? thao:'}</Text>
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 1}
              valueRadio={1}
              tx={'C?? tham gia'}
            />
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 2}
              valueRadio={2}
              tx={' Kh??c'}
            />
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 3}
              valueRadio={3}
              tx={'Kh??ng ti???p c???n'}
            />


            <Text style={styles.title}>{'Tr??? gi??p ph??p l??:'}</Text>
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 1}
              valueRadio={1}
              tx={'C?? tham gia'}
            />
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 2}
              valueRadio={2}
              tx={' Kh??c'}
            />
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 3}
              valueRadio={3}
              tx={'Kh??ng ti???p c???n'}
            />
            <Field
              name={'E6_TroGiupPhapLy_KhacText'}
              placeholderTx={'Tr??? gi??p ph??p l?? kh??c'}
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
            {'L??u v?? sang trang'}
          </ButtonNextTab>
        </View>
      </ScrollView>
    </View>
  );
});  
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
},
title_checkbox: {
  fontSize: 16,
  letterSpacing: 0.16,
  marginTop: 10,
  color: 'black',
  fontWeight: 'bold',
  marginBottom: 10
},
})