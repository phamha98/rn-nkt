
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Field, reduxForm } from 'redux-form';
import { Button, Text } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
  DD1_NhaO: 0,
  DD1_NuocSinhHoat: 0,
  DD1_NhaVeSinh: 0,
  D3_LyDoKhongCoViec: 0,
  DD2_CoTheSuDungNhaVeSinh: 0,
  DD2_CoTheDiChuyenTrongNha: 0,
  DD2_Khac: 0,
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

export const DieuKienSinhHoat = reduxForm({ form: 'DieuKienSinhHoat' })((props) => {
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
          <Text style={styles.titleCus}>{'??i???u ki???n v??? nh?? ???, n?????c sinh ho???t, nh?? v??? sinh'}</Text>
          <Text style={styles.title}>{'Nh?? ???'}</Text>
          <Field
            name={'DD1_NhaO'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Kh??ng c?? nh??',
                name: 'KCN'
              },
              {
                value: 2,
                label: 'Nh?? d???t n??t, t???m b???',
                name: 'NDN'
              },
              {
                value: 3,
                label: 'Nh?? b??n ki??n c???',
                name: 'NBKC'
              },
              {
                value: 4,
                label: 'Nh?? ki??n c???',
                name: 'NKC'
              },
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'N?????c sinh ho???t'}</Text>
          <Field
            name={'DD1_NuocSinhHoat'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'N?????c h???p v??? sinh',
                name: 'NHVS'
              },
              {
                value: 2,
                label: 'N?????c kh??ng h???p v??? sinh',
                name: 'NKHVS'
              },
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Nh?? v??? sinh'}</Text>
          <Field
            name={'DD1_NhaVeSinh'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C?? NVS ti??u chu???n',
                name: 'Co'
              },
              {
                value: 2,
                label: 'Kh??ng c?? NVS ti??u chu???n',
                name: 'Khong'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.titleCus}>{'Hi???n tr???ng ti???p c???n trong gia ????nh'}</Text>
          <Text style={styles.title}>{'C?? th??? di chuy???n ?????n m???i n??i trong nh??'}</Text>
          <Field
            name={'D3_LyDoKhongCoViec'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C??',
                name: 'Co'
              },
              {
                value: 2,
                label: 'Kh??ng',
                name: 'Khong'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'C?? th??? s??? d???ng nh?? v??? sinh'}</Text>
          <Field
            name={'DD2_CoTheSuDungNhaVeSinh'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C??',
                name: 'Co'
              },
              {
                value: 2,
                label: 'Kh??ng',
                name: 'Khong'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <Field
          name={'DD2_Khac'}
          component={ViewCus.TextInput}
          placeholder={'Hi???n tr???ng ti???p c???n trong gia ????nh kh??c'}
          label={'Hi???n tr???ng ti???p c???n trong gia ????nh kh??c'}
        />
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
});