
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
          <Text style={styles.titleCus}>{'Điều kiện về nhà ở, nước sinh hoạt, nhà vệ sinh'}</Text>
          <Text style={styles.title}>{'Nhà ở'}</Text>
          <Field
            name={'DD1_NhaO'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Không có nhà',
                name: 'KCN'
              },
              {
                value: 2,
                label: 'Nhà dột nát, tạm bợ',
                name: 'NDN'
              },
              {
                value: 3,
                label: 'Nhà bán kiên cố',
                name: 'NBKC'
              },
              {
                value: 4,
                label: 'Nhà kiên cố',
                name: 'NKC'
              },
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Nước sinh hoạt'}</Text>
          <Field
            name={'DD1_NuocSinhHoat'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Nước hợp vệ sinh',
                name: 'NHVS'
              },
              {
                value: 2,
                label: 'Nước không hợp vệ sinh',
                name: 'NKHVS'
              },
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Nhà vệ sinh'}</Text>
          <Field
            name={'DD1_NhaVeSinh'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Có NVS tiêu chuẩn',
                name: 'Co'
              },
              {
                value: 2,
                label: 'Không có NVS tiêu chuẩn',
                name: 'Khong'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.titleCus}>{'Hiện trạng tiếp cận trong gia đình'}</Text>
          <Text style={styles.title}>{'Có thể di chuyển đến mọi nơi trong nhà'}</Text>
          <Field
            name={'D3_LyDoKhongCoViec'}
            component={ViewCus.RadioGroup}
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
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Có thể sử dụng nhà vệ sinh'}</Text>
          <Field
            name={'DD2_CoTheSuDungNhaVeSinh'}
            component={ViewCus.RadioGroup}
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
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <Field
          name={'DD2_Khac'}
          component={ViewCus.TextInput}
          placeholder={'Hiện trạng tiếp cận trong gia đình khác'}
          label={'Hiện trạng tiếp cận trong gia đình khác'}
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
          {'Tiếp tục'}
        </ButtonNextTab>
      }
    </ScrollView>
  );
});