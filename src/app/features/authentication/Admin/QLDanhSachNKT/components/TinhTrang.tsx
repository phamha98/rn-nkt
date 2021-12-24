import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../../../../themes';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from '../../../../../library/components/checkboxCus'
import { Radio } from '../../../../../library/components/radio';
import { Text } from '../../../../../library/components';
import { ConfigProps, Field, InjectedFormProps, reduxForm, Form as FormRDF } from 'redux-form';
import ButtonNextTab from './ButtonNextTab'
export const TinhTrang = reduxForm({ form: 'TinhTrang' })(
  (props: ConfigProps & InjectedFormProps) => {
    const { handleSubmit, onSubmit } = props;
    const dispatch = useDispatch();
    const formObj = useSelector(s => s.form.TinhTrang)?.values || {};
    var _onSubmit = (obj) => {
      props.onSubmitNext('TTC', obj, false)
    }
    useEffect(() => {
      var _run = async () => {
        props.initialize({
          C1_DangKhuyetTat_VD: 0,
          C1_DangKhuyetTat_Nhin: 0,
          C1_DangKhuyetTat_NgheNoi: 0,
          C1_DangKhuyetTat_TK: 0,
          C1_DangKhuyetTat_TT: 0,
          C1_DangKhuyetTat_CXD: 0,
          C1_DangKhuyetTat_KhacText: "",
          C3_NguyenNhanKhuyetTat_BS: 0,
          C3_NguyenNhanKhuyetTat_BT: 0,
          C3_NguyenNhanKhuyetTat_TNLD: 0,
          C3_NguyenNhanKhuyetTat_TNSH: 0,
          C3_NguyenNhanKhuyetTat_TNGT: 0,
          C3_NguyenNhanKhuyetTat_TNBM: 0,
          C3_NguyenNhanKhuyetTat_CT: 0,
          C3_NguyenNhanKhuyetTat_Khac: 0,
          C3_NguyenNhanKhuyetTat_KhacText: "",
          C5_KhoKhanVanDong_MNCCTT: 0,
          C5_KhoKhanVanDong_DTCS: 0,
          C5_KhoKhanVanDong_MMPC: 0,
          C5_KhoKhanVanDong_NXL: 0,
          C5_KhoKhanVanDong_KTDL: 0,
          C5_KhoKhanVanDong_Khac: 0,
          C5_KhoKhanVanDong_KhacText: "",
          C5_KhoKhanNgheNoi_Diec: 0,
          C5_KhoKhanNgheNoi_TT: 0,
          C5_KhoKhanNgheNoi_KND: 0,
          C5_KhoKhanNgheNoi_DBS: 0,
          C5_KhoKhanNgheNoi_DD: 0,
          C5_KhoKhanNgheNoi_KH: 0,
          C5_KhoKhanNgheNoi_Khac: 0,
          C5_KhoKhanNgheNoi_KhacText: "",
          C5_KhoKhanThiLuc_KCM: 0,
          C5_KhoKhanThiLuc_NKR: 0,
          C5_KhoKhanThiLuc_DT: 0,
          C5_KhoKhanThiLuc_Khac: 0,
          C5_KhoKhanThiLuc_KhacText: "",
          C5_VanDeThanKinh_TTPL: 0,
          C5_VanDeThanKinh_BDK: 0,
          C5_VanDeThanKinh_RLCX: 0,
          C5_VanDeThanKinh_Khac: 0,
          C5_VanDeThanKinh_KhacText: "",
          C5_VanDeTriTue_Down: 0,
          C5_VanDeTriTue_CC: 0,
          C5_VanDeTriTue_KK: 0,
          C5_VanDeTriTue_Khac: 0,
          C5_VanDeTriTue_KhacText: "",
          C5_VanDeDangKhuyetTatKhac_DD: 0,
          C5_VanDeDangKhuyetTatKhac_DC: 0,
          C5_VanDeDangKhuyetTatKhac_TL: 0,
          C5_VanDeDangKhuyetTatKhac_TK: 0,
          C5_VanDeDangKhuyetTatKhac_Khac: 0,
          C5_VanDeDangKhuyetTatKhac_KhacText: "",
          C6_KhaNangTuPhucVu: 0,
        })
      }
      _run()
    }, []);

    return (
      <View style={[GlobalStyle.fullScreen]}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
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
              {
                [
                  {
                    label: 'Dạng khuyết tật:',
                    list: [
                      {
                        key: 'C1_DangKhuyetTat_VD',
                        label: '1. Vận động',
                      },
                      {
                        key: 'C1_DangKhuyetTat_Nhin',
                        label: '2. Nhìn',
                      },
                      {
                        key: 'C1_DangKhuyetTat_NgheNoi',
                        label: '3. Nghe,Nói',
                      },
                      {
                        key: 'C1_DangKhuyetTat_TK',
                        label: '4. Thần kinh,tâm thần',
                      },
                      {
                        key: 'C1_DangKhuyetTat_TT',
                        label: '5. Trí tuệ',
                      }, {
                        key: 'C1_DangKhuyetTat_CXD',
                        label: '6. Chưa xác định',
                      },

                      , {
                        key: 'C1_DangKhuyetTat_Khac',
                        label: '7. Khác',
                      },

                    ]
                  },
                  {
                    label: 'Nguyên nhân bị khuyết tật:',
                    list: [
                      {
                        key: 'C3_NguyenNhanKhuyetTat_BS',
                        label: '1. Bẩm sinh',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_BT',
                        label: '2. Bệnh tật',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNLD',
                        label: '3. Tai nạn lao động',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNSH',
                        label: '4. Tai nạn trong sinh hoạt',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNGT',
                        label: '5. Tai nạn giao thông',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNBM',
                        label: '6. Tai nạn do bom mìn',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_CT',
                        label: '7. Chiến tranh',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_Khac',
                        label: '8. Khác',
                      },


                    ]
                  },
                  {
                    label: 'Khó khăn vận động, di chuyển:',
                    list: [
                      {
                        key: 'C5_KhoKhanVanDong_MNCCTT',
                        label: '1. Mềm nhẽo hoặc co cứng toàn thân',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_DTCS',
                        label: '2. Dị tật, dị dạng xương khớp bẩm sinh hoặc biến dạng, đầu, cổ, cột sống',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_MMPC',
                        label: '3. Mất một phần chi (từ khuỷu tay,  đầu gối) hoặc không thể cử động chân, tay',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_NXL',
                        label: '4. Thường xuyên phải ngồi xe lăn xe lắc, xe đẩy',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_KTDL',
                        label: '5. Không tự đi lại được hoặc đi lại cần sự trợ giúp của nạng hoặc người khác hỗ trợ',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_Khac',
                        label: '6. Khác',
                      },


                    ]
                  },
                  {
                    label: 'Khó khăn nghe nói:',
                    list: [
                      {
                        key: 'C5_KhoKhanNgheNoi_Diec',
                        label: '1. Điếc hoàn toàn',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_TT',
                        label: '2. Phải thường xuyên dùng máy trợ thính mà không nghe rõ',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_KND',
                        label: '3. Không nói được hoặc nói, phát ra âm thanh mà người khác không thể hiểu được',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_DBS',
                        label: '4. Có kết luận của bệnh viện chuyên khoa về câm, điếc bẩm sinh',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_DD',
                        label: '5. Dị dạng, dị tật cơ quan phát âm hoặc cấu trúc tai',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_KH',
                        label: '6. Không hiểu người khác nói hoặc nói người khác không hiểu',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_Khac',
                        label: 'Khác',
                      },

                    ]
                  }, {
                    label: 'Khó khăn về thị lực:',
                    list: [
                      {
                        key: 'C5_KhoKhanThiLuc_KCM',
                        label: '1. Không  có mắt, thiếu 1 mắt hoặc mù hoàn toàn',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_NKR',
                        label: '2. Nhìn không rõ, mù màu hoặc  rung dập nhãn thị',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_DT',
                        label: '3. Dị tật, dị dạng vùng mắt, đục nhân  mắt hoặc sẹo loét giác mạc',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_Khac',
                        label: '4. Khó khăn khác khi nhìn',
                      },

                    ]
                  },
                  {
                    label: 'Vấn đề thần kinh, tâm thần:',
                    list: [
                      {
                        key: 'C5_VanDeThanKinh_TTPL',
                        label: '1. Tâm thần phân liệt (thường xuyên có suy nghĩ không có thật, tưởng ai đang nói, theo dõi mình, ...)',
                      },
                      {
                        key: 'C5_VanDeThanKinh_BDK',
                        label: '2. Bị động kinh',
                      },
                      {
                        key: 'C5_VanDeThanKinh_RLCX',
                        label: '3. Rối loạn cảm xúc, hành vi (hay la hét, đập phá, đánh người, không kiểm soát  được cảm xúc, ...)',
                      },
                      {
                        key: 'C5_VanDeThanKinh_Khac',
                        label: '4. Khác',
                      },

                    ]
                  },
                  {
                    label: 'Vấn đề về trí tuệ:',
                    list: [
                      {
                        key: 'C5_VanDeTriTue_Down',
                        label: '1. Có kết luận cơ quan y tế về mắc chứng bại não/down',
                      },
                      {
                        key: 'C5_VanDeTriTue_CC',
                        label: '2. Chậm chạp, ngờ nghệch khi thực hiện hành vi hoặc tham gia quan hệ xã hội',
                      },
                      {
                        key: 'C5_VanDeTriTue_KK',
                        label: '3. Khó khăn trong học tập hoặc tiếp thu thông tin',
                      },
                      {
                        key: 'C5_VanDeTriTue_Khac',
                        label: '4. Khác',
                      },

                    ]
                  },
                  {
                    label: 'Vấn đề về dạng khuyết tật khác:',
                    list: [
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_DD',
                        label: ' Gù, dị dạng, dị tật hoặc mắc chứng dị tật đầu nhỏ',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_DC',
                        label: 'Di chứng bỏng nặng toàn thân',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_TL',
                        label: 'Người trên 16 tuổi cao dưới 1m (thể thấp lùn do thiếu tuyến yên)',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_TK',
                        label: 'Tự kỷ (Rối loạn phổ tự kỷ)',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_Khac',
                        label: 'Khác',
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
              <Text style={styles.title}>{'Mức độ khuyết tật'}</Text>
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 1}
                valueRadio={1}
                tx={'Đặc biệt nặng'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 2}
                valueRadio={2}
                tx={'Nặng'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 3}
                valueRadio={3}
                tx={'Nhẹ'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 4}
                valueRadio={4}
                tx={'Chưa xác định'}
              />
              <Text style={styles.title}>{'Khả năng tự phục vụ nhu cầu sinh hoạt hàng'}</Text>
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 1}
                valueRadio={1}
                tx={'Tự phục vụ'}
              />
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 2}
                valueRadio={2}
                tx={'Tự phục vụ nhưng cần sự trợ giúp'}
              />
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 3}
                valueRadio={3}
                tx={'Không tự phục vụ được'}
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
  },
);
const styles = StyleSheet.create({
  title_checkbox: {
    fontSize: 16,
    letterSpacing: 0.16,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,

  },
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',

  },
})