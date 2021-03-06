
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
  E1_TamLy: 0,
  E1_TamLy_KhacText: 0,
  E2_ThamGiaHoatDongCongDong: 0,
  E2_ThamGiaHoatDongTapThe: 0,
  E2_ThamGiaHoatDongGiaDinh: 0,
  E2_ThamGiaHoatDongKhac: 0,
  E4_TiepCanGiaoThongVaCongTrinh: 0,
  E5_TiepCanVanHoa: 0,
  E5_TiepCanTheThao: 0,
  E6_TroGiupPhapLy: 0,
  E6_TroGiupPhapLy_KhacText: '',
  E3_NangLucKyNangSong_SDL: 0,
  E3_NangLucKyNangSong_GT: 0,
  E3_NangLucKyNangSong_HDTT: 0,
  E3_NangLucKyNangSong_Khac: 0,
  E3_NangLucKyNangSong_KhacText: '',

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

export const HoaNhapCongDong = reduxForm({ form: 'HoaNhapCongDong' })((props) => {
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
          <Text style={styles.title}>{'T??m l??'}</Text>
          <Field
            name={'E1_TamLy'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'B??nh th?????ng',
                name: 'BinhThuong'
              },
              {
                value: 2,
                label: 'C?? v???n ????? v??? t??m l?? (m???c c???m, t??? ti, tr???m c???m...)',
                name: 'CVDVTL'
              },
              {
                value: 3,
                label: 'Kh??c',
                name: 'Khac'
              },
            ]}
          />
          <Field
            name={'E1_TamLy_KhacText'}
            component={ViewCus.TextInput}
            placeholder='Kh??c'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          {/* <Text style={styles.titleCus}>{'Ho?? nh???p x?? h???i:'}</Text> */}
          <Text style={styles.title}>{'Tham gia gia c??c ho???t ?????ng ??? c???ng ?????ng'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongCongDong'}
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
          <Text style={styles.title}>{'Tham gia ho???t ?????ng nh??m, t???p th???'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongTapThe'}
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
          <Text style={styles.title}>{'Tham gia c??c ho???t ?????ng gia ????nh'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongGiaDinh'}
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
          <Field
            name={'E2_ThamGiaHoatDongKhac'}
            component={ViewCus.TextInput}
            placeholder='Kh??c'
          />
        </ViewCus.ViewBoxShadown>
        {
          [
            {
              label: 'N??ng l???c k??? n??ng s???ng',
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
                {
                  key: 'E3_NangLucKyNangSong_KhacText',
                  placeholder: 'Kh??c',
                  type: 'input'
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
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Ti???p c???n giao th??ng v?? c??ng tr??nh x??y d???ng'}</Text>
          <Field
            name={'E4_TiepCanGiaoThongVaCongTrinh'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Thu???n ti???n',
                name: 'ThuanTien'
              },
              {
                value: 2,
                label: 'Kh?? kh??n',
                name: 'KhoKhan'
              },
              {
                value: 3,
                label: 'Kh??ng ti???p c???n',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          {/* <Text style={styles.titleCus}>{'E5. Ti???p c???n v??n h??a, th??? thao'}</Text> */}
          <Text style={styles.title}>{'V??n h??a'}</Text>
          <Field
            name={'E5_TiepCanVanHoa'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C?? tham gia',
                name: 'CoThamGia'
              },
              // {
              //   value: 2,
              //   label: 'Kh??c',
              //   name: 'Khac'
              // },
              {
                value: 3,
                label: 'Kh??ng ti???p c???n',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Th??? thao'}</Text>
          <Field
            name={'E5_TiepCanTheThao'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C?? tham gia',
                name: 'CoThamGia'
              },
              // {
              //   value: 2,
              //   label: 'Kh??c',
              //   name: 'Khac'
              // }, 
              {
                value: 3,
                label: 'Kh??ng ti???p c???n',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Tr??? gi??p ph??p l??'}</Text>
          <Field
            name={'E6_TroGiupPhapLy'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'C?? tham gia',
                name: 'CoThamGia'
              },
              {
                value: 3,
                label: 'Kh??ng ti???p c???n',
                name: 'KhongTiepCan'
              },
              {
                value: 2,
                label: 'Kh??c',
                name: 'Khac'
              },
            ]}
          />
          <Field
            name={'E6_TroGiupPhapLy_KhacText'}
            component={ViewCus.TextInput}
            placeholder='Kh??c'
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
        <ButtonNextTab
          onPress={handleSubmit(_onSubmit)}
        >
          {'Ti???p t???c'}
        </ButtonNextTab>
      }
    </ScrollView>
  );
});