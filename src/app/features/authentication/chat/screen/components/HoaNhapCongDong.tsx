
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
          <Text style={styles.title}>{'Tâm lý'}</Text>
          <Field
            name={'E1_TamLy'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Bình thường',
                name: 'BinhThuong'
              },
              {
                value: 2,
                label: 'Có vấn đề về tâm lý (mặc cảm, tự ti, trầm cảm...)',
                name: 'CVDVTL'
              },
              {
                value: 3,
                label: 'Khác',
                name: 'Khac'
              },
            ]}
          />
          <Field
            name={'E1_TamLy_KhacText'}
            component={ViewCus.TextInput}
            placeholder='Khác'
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          {/* <Text style={styles.titleCus}>{'Hoà nhập xã hội:'}</Text> */}
          <Text style={styles.title}>{'Tham gia gia các hoạt động ở cộng đồng'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongCongDong'}
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
          <Text style={styles.title}>{'Tham gia hoạt động nhóm, tập thể'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongTapThe'}
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
          <Text style={styles.title}>{'Tham gia các hoạt động gia đình'}</Text>
          <Field
            name={'E2_ThamGiaHoatDongGiaDinh'}
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
          <Field
            name={'E2_ThamGiaHoatDongKhac'}
            component={ViewCus.TextInput}
            placeholder='Khác'
          />
        </ViewCus.ViewBoxShadown>
        {
          [
            {
              label: 'Năng lực kỹ năng sống',
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
                {
                  key: 'E3_NangLucKyNangSong_KhacText',
                  placeholder: 'Khác',
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
          <Text style={styles.title}>{'Tiếp cận giao thông và công trình xây dựng'}</Text>
          <Field
            name={'E4_TiepCanGiaoThongVaCongTrinh'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Thuận tiện',
                name: 'ThuanTien'
              },
              {
                value: 2,
                label: 'Khó khăn',
                name: 'KhoKhan'
              },
              {
                value: 3,
                label: 'Không tiếp cận',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          {/* <Text style={styles.titleCus}>{'E5. Tiếp cận văn hóa, thể thao'}</Text> */}
          <Text style={styles.title}>{'Văn hóa'}</Text>
          <Field
            name={'E5_TiepCanVanHoa'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Có tham gia',
                name: 'CoThamGia'
              },
              // {
              //   value: 2,
              //   label: 'Khác',
              //   name: 'Khac'
              // },
              {
                value: 3,
                label: 'Không tiếp cận',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Thể thao'}</Text>
          <Field
            name={'E5_TiepCanTheThao'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Có tham gia',
                name: 'CoThamGia'
              },
              // {
              //   value: 2,
              //   label: 'Khác',
              //   name: 'Khac'
              // }, 
              {
                value: 3,
                label: 'Không tiếp cận',
                name: 'KhongTiepCan'
              }
            ]}
          />
        </ViewCus.ViewBoxShadown>
        <ViewCus.ViewBoxShadown>
          <Text style={styles.title}>{'Trợ giúp pháp lý'}</Text>
          <Field
            name={'E6_TroGiupPhapLy'}
            component={ViewCus.RadioGroup}
            options={[
              {
                value: 1,
                label: 'Có tham gia',
                name: 'CoThamGia'
              },
              {
                value: 3,
                label: 'Không tiếp cận',
                name: 'KhongTiepCan'
              },
              {
                value: 2,
                label: 'Khác',
                name: 'Khac'
              },
            ]}
          />
          <Field
            name={'E6_TroGiupPhapLy_KhacText'}
            component={ViewCus.TextInput}
            placeholder='Khác'
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
          {'Tiếp tục'}
        </ButtonNextTab>
      }
    </ScrollView>
  );
});