
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyle } from '../../../../../themes';
import { useSelector } from 'react-redux';
import { Text } from '../../../../../library/components';
import { Radio } from '../../../../../library/components/radio';
import { TextField } from '../../../../../library/components/text-field/text-field';
import { ConfigProps, Field, InjectedFormProps, reduxForm, Form as FormRDF } from 'redux-form';
import ButtonNextTab from './ButtonNextTab'
export const DieuKienSinhHoat = reduxForm({ form: 'DieuKienSinhHoat' })((props) => {
  const { handleSubmit, onSubmit } = props;
  const formObj = useSelector(s => s.form.DieuKienSinhHoat)?.values || {};
  useEffect(() => {
    var _run = async () => {
      props.initialize({
        DD1_NhaO: 0,
        DD1_NuocSinhHoat: 0,
        DD1_NhaVeSinh: 0,
        DD2_CoTheDiChuyenTrongNha: 0,
        DD2_CoTheSuDungNhaVeSinh: 0,
        DD2_Khac: "",
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
            <Text style={styles.title}>{'Nhà ở:'}</Text>
            <Field
              name={'DD1_NhaO'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaO == 1}
              valueRadio={1}
              tx={'Không có nhà'}
            />
            <Field
              name={'DD1_NhaO'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaO == 2}
              valueRadio={2}
              tx={'Nhà dột nát, tạm bợ'}
            />
            <Field
              name={'DD1_NhaO'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaO == 3}
              valueRadio={3}
              tx={'Nhà bán kiên cố'}
            />
            <Field
              name={'DD1_NhaO'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaO == 4}
              valueRadio={4}
              tx={'Nhà kiên cố'}
            />
            <Text style={styles.title}>{'Nước sinh hoạt:'}</Text>
            <Field
              name={'DD1_NuocSinhHoat'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NuocSinhHoat == 1}
              valueRadio={1}
              tx={' Nước hợp vệ sinh'}
            />
            <Field
              name={'DD1_NuocSinhHoat'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NuocSinhHoat == 2}
              valueRadio={2}
              tx={'Nước không hợp vệ sinh'}
            />

            <Text style={styles.title}>{'Nhà vệ sinh'}</Text>
            <Field
              name={'DD1_NhaVeSinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaVeSinh == 1}
              valueRadio={1}
              tx={'Có NVS tiêu chuẩn'}
            />
            <Field
              name={'DD1_NhaVeSinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD1_NhaVeSinh == 2}
              valueRadio={2}
              tx={'Không có NVS tiêu chuẩn'}
            />
            <Text style={styles.title}>{'Có thể di chuyển đến mọi nơi trong nhà:'}</Text>
            <Field
              name={'D3_LyDoKhongCoViec'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.D3_LyDoKhongCoViec == 1}
              valueRadio={1}
              tx={'Có'}
            />
            <Field
              name={'D3_LyDoKhongCoViec'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.D3_LyDoKhongCoViec == 2}
              valueRadio={2}
              tx={'Không'}
            />
            <Text style={styles.title}>{'Có thể sử dụng nhà vệ sinh:'}</Text>
            <Field
              name={'DD2_CoTheSuDungNhaVeSinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD2_CoTheSuDungNhaVeSinh == 1}
              valueRadio={1}
              tx={'Có'}
            />
            <Field
              name={'DD2_CoTheSuDungNhaVeSinh'}
              component={Radio}
              styleContainer={{
                flex: 1
              }}
              selected={formObj.DD2_CoTheSuDungNhaVeSinh == 2}
              valueRadio={2}
              tx={'Không'}
            />
            <Field
              name={'DD2_Khac'}
              placeholderTx={'Hiện trạng tiếp cận trong gia đình khác'}
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
})