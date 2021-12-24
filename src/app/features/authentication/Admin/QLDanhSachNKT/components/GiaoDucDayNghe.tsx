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

              <Text style={styles.title}>{'Hiện trạng giáo dục'}</Text>
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 1}
                valueRadio={1}
                tx={'Chưa đến tuổi đi học'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 2}
                valueRadio={2}
                tx={' Chưa từng đi học'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 3}
                valueRadio={3}
                tx={'Mẫu giáo, mầm non'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 4}
                valueRadio={4}
                tx={'Tiểu học'}
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
                tx={'Cao đẳng/Đại học'}
              />
              <Field
                name={'D1_ThucTrangGiaoDuc'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D1_ThucTrangGiaoDuc == 8}
                valueRadio={8}
                tx={'Trên đại học'}
              />
              <Text style={styles.title}>{'Hiện trạng dạy nghề'}</Text>
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 1}
                valueRadio={1}
                tx={'Chưa qua đào tạo'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 2}
                valueRadio={2}
                tx={'Học nghề tại chỗ'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 3}
                valueRadio={3}
                tx={'Sơ cấp nghề'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 4}
                valueRadio={4}
                tx={'Trung cấp nghề'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 5}
                valueRadio={5}
                tx={'Cao đẳng nghề'}
              />
              <Field
                name={'D2_ThucTrangDayNghe'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D2_ThucTrangDayNghe == 6}
                valueRadio={6}
                tx={'Khác'}
              />
              <Field
                name={'D2_ThucTrangDayNghe_KhacText'}
                placeholderTx={'Hiện trạng dạy nghề khác'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Field
                name={'D2_ThoiGianHocNghe'}
                placeholderTx={'Thời gian học nghề'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />

              <Text style={styles.title}>{'Hiện trạng việc làm'}</Text>
              <Field
                name={'D3_ThucTrangViecLam'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_ThucTrangViecLam == 1}
                valueRadio={1}
                tx={'Có việc làm tạo thu nhập'}
              />
              <Field
                name={'D3_ThucTrangViecLam'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_ThucTrangViecLam == 2}
                valueRadio={2}
                tx={' Không có việc làm tạo thu nhập'}
              />
              <Text style={styles.title}>{'Thu nhập bình quân hàng tháng của NKT (đồng):'}</Text>
              <Field
                name={'D3_ThuNhapBinhQuan'}
                placeholderTx={'Thu nhập bình quân hàng tháng của NKT'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Text style={styles.title}>{'Lý do không có việc làm'}</Text>
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 1}
                valueRadio={1}
                tx={'Không có khả năng lao động'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 2}
                valueRadio={2}
                tx={'Không muốn làm việc'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 3}
                valueRadio={3}
                tx={'Không tìm được việc làm'}
              />
              <Field
                name={'D3_LyDoKhongCoViec'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D3_LyDoKhongCoViec == 4}
                valueRadio={4}
                tx={'Khác'}
              />

              <Text style={styles.title}>{'Trợ cấp BTXH hàng tháng:'}</Text>
              <Field
                name={'D4_TroCapBTXH'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapBTXH == 1}
                valueRadio={1}
                tx={'Được hưởng'}
              />
              <Field
                name={'D4_TroCapBTXH'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapBTXH == 2}
                valueRadio={2}
                tx={'Không được hưởng'}
              />
              <Field
                name={'D4_TroCapBTXH_SoTien'}
                placeholderTx={'Số tiền hưởng hàng tháng'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />

              <Text style={styles.title}>{'Trợ cấp hỗ trợ hộ gia đình đang trực tiếp nuôi dưỡng chăm sóc NKTĐBN:'}</Text>
              <Field
                name={'D4_TroCapChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapChamSocNKT == 1}
                valueRadio={1}
                tx={'Được hưởng'}
              />
              <Field
                name={'D4_TroCapChamSocNKT'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_TroCapChamSocNKT == 2}
                valueRadio={2}
                tx={'Không được hưởng'}
              />
              <Field
                name={'D4_TroCapChamSocNKT_SoTien'}
                placeholderTx={'Số tiền hưởng hàng tháng'}
                placeholderColor={'#A4A4A4'}
                maxLength={100}
                component={TextField}
                inputStyle={{
                  color: 'black'
                }}
              />
              <Text style={styles.title}>{'Các chương trình trợ giúp xã hội khác:'}</Text>
              <Field
                name={'D4_ChuongTrinhTGXHKhac'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_ChuongTrinhTGXHKhac == 1}
                valueRadio={1}
                tx={'Được hưởng'}
              />
              <Field
                name={'D4_ChuongTrinhTGXHKhac'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.D4_ChuongTrinhTGXHKhac == 2}
                valueRadio={2}
                tx={'Không được hưởng'}
              />
              <Field
                name={'D4_ChuongTrinhTGXHKhac_SoTien'}
                placeholderTx={'Số tiền hưởng hàng tháng'}
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
                    label: 'Nguồn thu nhập:',
                    list: [
                      {
                        key: 'D3_NguonThuNhap_SXKD',
                        label: ' 1. Tự sản xuất kinh doanh',
                      },
                      {
                        key: 'D3_NguonThuNhap_NN',
                        label: '2. Làm nông/lâm/diêm/ngư nghiệp',
                      },
                      {
                        key: 'D3_NguonThuNhap_CVC',
                        label: '3. Công chức, viên chức',
                      },
                      {
                        key: 'D3_NguonThuNhap_CN',
                        label: '4. Công nhân',
                      },
                      {
                        key: 'D3_NguonThuNhap_HT',
                        label: '5. Hưu trí',
                      },
                      {
                        key: 'D3_NguonThuNhap_TCXH',
                        label: '6. Trợ cấp xã hội',
                      },
                      {
                        key: 'D3_NguonThuNhap_Khac',
                        label: '7. Khác',
                      },
                    ]
                  },
                  {
                    label: 'Các dịch vụ xã hội cơ bản khác được hưởng:',
                    list: [
                      {
                        key: 'D4_DichVuXaHoiCoBan',
                        label: '1. Y tế',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_GiaoDuc',
                        label: '2. Giáo dục',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_NhaO',
                        label: '3. Nhà ở',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_NuocVeSinh',
                        label: '4. Nước sạch và vệ sinh',
                      },
                      {
                        key: 'D4_DichVuXaHoiCoBan_ThongTin',
                        label: '5. Thông tin',
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
              {'Lưu và sang trang'}
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
