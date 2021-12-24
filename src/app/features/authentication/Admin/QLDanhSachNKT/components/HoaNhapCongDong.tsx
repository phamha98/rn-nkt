
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
            <Text style={styles.title}>{'Tâm lý:'}</Text>
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 1}
              valueRadio={1}
              tx={'Bình thường'}
            />
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 2}
              valueRadio={2}
              tx={' Có vấn đề về tâm lý (mặc cảm, tự ti, buồn, trầm cảm, không hợp tác, ...)'}
            />
            <Field
              name={'E1_TamLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E1_TamLy == 3}
              valueRadio={3}
              tx={'Khác'}
            />

            <Field
              name={'E1_TamLy_KhacText'}
              placeholderTx={'Tâm lý khác'}
              placeholderColor={'#A4A4A4'}
              maxLength={100}
              component={TextField}
              inputStyle={{
                color: 'black'
              }}
            />

            <Text style={styles.title}>{'Tham gia gia các hoạt động ở cộng đồng:'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongCongDong'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongCongDong == 1}
              valueRadio={1}
              tx={'Có'}
            />
            <Field
              name={'E2_ThamGiaHoatDongCongDong'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongCongDong == 2}
              valueRadio={2}
              tx={'Không'}
            />

            <Text style={styles.title}>{'Tham gia hoạt động nhóm, tập thể'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongTapThe'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongTapThe == 1}
              valueRadio={1}
              tx={'Có'}
            />
            <Field
              name={'E2_ThamGiaHoatDongTapThe'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongTapThe == 2}
              valueRadio={2}
              tx={'Không'}
            />
            <Text style={styles.title}>{'Tham gia các hoạt động gia đình:'}</Text>
            <Field
              name={'E2_ThamGiaHoatDongGiaDinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongGiaDinh == 1}
              valueRadio={1}
              tx={'Có'}
            />
            <Field
              name={'E2_ThamGiaHoatDongGiaDinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E2_ThamGiaHoatDongGiaDinh == 2}
              valueRadio={2}
              tx={'Không'}
            />
            <Field
              name={'E2_ThamGiaHoatDongKhac'}
              placeholderTx={'Khác'}
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
                    label: 'Năng lực kỹ năng sống:',
                    list: [
                      {
                        key: 'E3_NangLucKyNangSong_SDL',
                        label: '1. Có kỹ năng sống độc lập',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_GT',
                        label: ' 2. Có kỹ năng giao tiếp',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_HDTT',
                        label: '3. Có kỹ năng hoạt động tập thể',
                      },
                      {
                        key: 'E3_NangLucKyNangSong_Khac',
                        label: '4. Khác',
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
            <Text style={styles.title}>{'Tiếp cận giao thông và công trình xây dựng:'}</Text>
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 1}
              valueRadio={1}
              tx={'Thuận tiện'}
            />
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 2}
              valueRadio={2}
              tx={' Khó khăn'}
            />
            <Field
              name={'E4_TiepCanGiaoThongVaCongTrinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E4_TiepCanGiaoThongVaCongTrinh == 3}
              valueRadio={3}
              tx={'Không tiếp cận'}
            />

            <Text style={styles.title}>{'Văn hóa:'}</Text>
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 1}
              valueRadio={1}
              tx={'Có tham gia'}
            />
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 2}
              valueRadio={2}
              tx={' Khác'}
            />
            <Field
              name={'E5_TiepCanVanHoa'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanVanHoa == 3}
              valueRadio={3}
              tx={' Không tiếp cận'}
            />

            <Text style={styles.title}>{'Thể thao:'}</Text>
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 1}
              valueRadio={1}
              tx={'Có tham gia'}
            />
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 2}
              valueRadio={2}
              tx={' Khác'}
            />
            <Field
              name={'E5_TiepCanTheThao'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E5_TiepCanTheThao == 3}
              valueRadio={3}
              tx={'Không tiếp cận'}
            />


            <Text style={styles.title}>{'Trợ giúp pháp lý:'}</Text>
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 1}
              valueRadio={1}
              tx={'Có tham gia'}
            />
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 2}
              valueRadio={2}
              tx={' Khác'}
            />
            <Field
              name={'E6_TroGiupPhapLy'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.E6_TroGiupPhapLy == 3}
              valueRadio={3}
              tx={'Không tiếp cận'}
            />
            <Field
              name={'E6_TroGiupPhapLy_KhacText'}
              placeholderTx={'Trợ giúp pháp lý khác'}
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
            {'Lưu và sang trang'}
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