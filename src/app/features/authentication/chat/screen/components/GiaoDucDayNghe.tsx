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
            <Text style={styles.title}>{'Hiện trạng giáo dục'}</Text>
            <Field
              name={'D1_ThucTrangGiaoDuc'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Chưa đến tuổi đi học',
                },
                {
                  value: 2,
                  label: 'Chưa từng đi học',
                },
                {
                  value: 3,
                  label: 'Mẫu giáo, mầm non',
                },
                {
                  value: 4,
                  label: 'Tiểu học',
                }, {
                  value: 5,
                  label: 'THCS',
                }, {
                  value: 6,
                  label: 'THPT',
                },
                {
                  value: 7,
                  label: 'Cao đẳng/Đại học',
                }, {
                  value: 8,
                  label: 'Trên đại học',
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hiện trạng dạy nghề'}</Text>
            <Field
              name={'D2_ThucTrangDayNghe'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Chưa qua đào tạo',
                  name: 'CQDT'
                },
                {
                  value: 2,
                  label: 'Học nghề tại chỗ',
                  name: 'HNTC'
                },
                {
                  value: 3,
                  label: 'Sơ cấp nghề',
                  name: 'SCN'
                },
                {
                  value: 4,
                  label: 'Trung cấp nghề',
                  name: 'TCN'
                }, {
                  value: 5,
                  label: 'Cao đẳng nghề',
                  name: 'CDN'
                }, {
                  value: 6,
                  label: 'Khác',
                  name: 'Khac'
                },
              ]}
            />

            <Field
              name={'D2_ThucTrangDayNghe_KhacText'}
              component={ViewCus.TextInput}
              // label='Thực trạng dạy nghề khác'
              placeholder='Khác'
            />
            <Field
              name={'D2_ThoiGianHocNghe'}
              component={ViewCus.TextInput}
              label='Thời gian học nghề'
              placeholder='Thời gian học nghề'
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Hiện trạng việc làm'}</Text>
            <Field
              name={'D3_ThucTrangViecLam'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Có việc làm tạo thu nhập',
                  name: 'CVLTTN'
                },
                {
                  value: 2,
                  label: 'Không có việc làm tạo thu nhập',
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
              suffix={'₫'}
              label={'Thu nhập bình quân hàng tháng của NKT'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Lý do không có việc làm'}</Text>
            <Field
              name={'D3_LyDoKhongCoViec'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Không có khả năng lao động',
                  name: 'KCKNLD'
                },
                {
                  value: 2,
                  label: 'Không muốn làm việc',
                  name: 'KMLV'
                }, {
                  value: 3,
                  label: 'Không tìm được việc làm',
                  name: 'KTDVL'
                },
                {
                  value: 4,
                  label: 'Khác',
                  name: 'Khac'
                },
              ]}
            />
            <Field
              name={'D3_LyDoKhongCoViec_KhacText'}
              component={ViewCus.TextInput}
              placeholder={'Khác'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Trợ cấp BTXH hàng tháng'}</Text>
            <Field
              name={'D4_TroCapBTXH'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Được hưởng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Không được hưởng',
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
              suffix={'₫'}
              label={'Số tiền hưởng hàng tháng'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Trợ cấp hỗ trợ hộ gia đình đang trực tiếp nuôi dưỡng chăm sóc NKTĐBN'}</Text>
            <Field
              name={'D4_TroCapChamSocNKT'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Được hưởng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Không được hưởng',
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
              suffix={'₫'}
              label={'Số tiền hưởng hàng tháng'}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Các chương trình trợ giúp xã hội khác'}</Text>
            <Field
              name={'D4_ChuongTrinhTGXHKhac'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Được hưởng',
                  name: 'DuocHuong'
                },
                {
                  value: 2,
                  label: 'Không được hưởng',
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
              suffix={'₫'}
              label={'Số tiền hưởng hàng tháng'}
            />
          </ViewCus.ViewBoxShadown>
          {
            [
              {
                label: 'Nguồn thu nhập',
                list: [
                  {
                    key: 'D3_NguonThuNhap_SXKD',
                    label: 'Tự sản xuất kinh doanh',
                  },
                  {
                    key: 'D3_NguonThuNhap_NN',
                    label: 'Làm nông/lâm/diêm/ngư nghiệp',
                  },
                  {
                    key: 'D3_NguonThuNhap_CVC',
                    label: 'Công chức, viên chức',
                  },
                  {
                    key: 'D3_NguonThuNhap_CN',
                    label: 'Công nhân',
                  },
                  {
                    key: 'D3_NguonThuNhap_HT',
                    label: 'Hưu trí',
                  },
                  {
                    key: 'D3_NguonThuNhap_TCXH',
                    label: 'Trợ cấp xã hội',
                  },
                  {
                    key: 'D3_NguonThuNhap_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'D3_NguonThuNhap_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'Các dịch vụ xã hội cơ bản khác được hưởng',
                list: [
                  {
                    key: 'D4_DichVuXaHoiCoBan',
                    label: 'Y tế',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_GiaoDuc',
                    label: 'Giáo dục',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_NhaO',
                    label: 'Nhà ở',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_NuocVeSinh',
                    label: 'Nước sạch và vệ sinh',
                  },
                  {
                    key: 'D4_DichVuXaHoiCoBan_ThongTin',
                    label: 'Thông tin',
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
            {'Tiếp tục'}
          </ButtonNextTab>
        }
      </ScrollView>
    );
  },
);
