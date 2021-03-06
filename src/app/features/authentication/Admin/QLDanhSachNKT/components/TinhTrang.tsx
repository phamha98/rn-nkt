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
                    label: 'D???ng khuy???t t???t:',
                    list: [
                      {
                        key: 'C1_DangKhuyetTat_VD',
                        label: '1. V???n ?????ng',
                      },
                      {
                        key: 'C1_DangKhuyetTat_Nhin',
                        label: '2. Nh??n',
                      },
                      {
                        key: 'C1_DangKhuyetTat_NgheNoi',
                        label: '3. Nghe,N??i',
                      },
                      {
                        key: 'C1_DangKhuyetTat_TK',
                        label: '4. Th???n kinh,t??m th???n',
                      },
                      {
                        key: 'C1_DangKhuyetTat_TT',
                        label: '5. Tr?? tu???',
                      }, {
                        key: 'C1_DangKhuyetTat_CXD',
                        label: '6. Ch??a x??c ?????nh',
                      },

                      , {
                        key: 'C1_DangKhuyetTat_Khac',
                        label: '7. Kh??c',
                      },

                    ]
                  },
                  {
                    label: 'Nguy??n nh??n b??? khuy???t t???t:',
                    list: [
                      {
                        key: 'C3_NguyenNhanKhuyetTat_BS',
                        label: '1. B???m sinh',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_BT',
                        label: '2. B???nh t???t',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNLD',
                        label: '3. Tai n???n lao ?????ng',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNSH',
                        label: '4. Tai n???n trong sinh ho???t',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNGT',
                        label: '5. Tai n???n giao th??ng',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_TNBM',
                        label: '6. Tai n???n do bom m??n',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_CT',
                        label: '7. Chi???n tranh',
                      },
                      {
                        key: 'C3_NguyenNhanKhuyetTat_Khac',
                        label: '8. Kh??c',
                      },


                    ]
                  },
                  {
                    label: 'Kh?? kh??n v???n ?????ng, di chuy???n:',
                    list: [
                      {
                        key: 'C5_KhoKhanVanDong_MNCCTT',
                        label: '1. M???m nh???o ho???c co c???ng to??n th??n',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_DTCS',
                        label: '2. D??? t???t, d??? d???ng x????ng kh???p b???m sinh ho???c bi???n d???ng, ?????u, c???, c???t s???ng',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_MMPC',
                        label: '3. M???t m???t ph???n chi (t??? khu???u tay,  ?????u g???i) ho???c kh??ng th??? c??? ?????ng ch??n, tay',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_NXL',
                        label: '4. Th?????ng xuy??n ph???i ng???i xe l??n xe l???c, xe ?????y',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_KTDL',
                        label: '5. Kh??ng t??? ??i l???i ???????c ho???c ??i l???i c???n s??? tr??? gi??p c???a n???ng ho???c ng?????i kh??c h??? tr???',
                      },
                      {
                        key: 'C5_KhoKhanVanDong_Khac',
                        label: '6. Kh??c',
                      },


                    ]
                  },
                  {
                    label: 'Kh?? kh??n nghe n??i:',
                    list: [
                      {
                        key: 'C5_KhoKhanNgheNoi_Diec',
                        label: '1. ??i???c ho??n to??n',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_TT',
                        label: '2. Ph???i th?????ng xuy??n d??ng m??y tr??? th??nh m?? kh??ng nghe r??',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_KND',
                        label: '3. Kh??ng n??i ???????c ho???c n??i, ph??t ra ??m thanh m?? ng?????i kh??c kh??ng th??? hi???u ???????c',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_DBS',
                        label: '4. C?? k???t lu???n c???a b???nh vi???n chuy??n khoa v??? c??m, ??i???c b???m sinh',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_DD',
                        label: '5. D??? d???ng, d??? t???t c?? quan ph??t ??m ho???c c???u tr??c tai',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_KH',
                        label: '6. Kh??ng hi???u ng?????i kh??c n??i ho???c n??i ng?????i kh??c kh??ng hi???u',
                      },
                      {
                        key: 'C5_KhoKhanNgheNoi_Khac',
                        label: 'Kh??c',
                      },

                    ]
                  }, {
                    label: 'Kh?? kh??n v??? th??? l???c:',
                    list: [
                      {
                        key: 'C5_KhoKhanThiLuc_KCM',
                        label: '1. Kh??ng  c?? m???t, thi???u 1 m???t ho???c m?? ho??n to??n',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_NKR',
                        label: '2. Nh??n kh??ng r??, m?? m??u ho???c  rung d???p nh??n th???',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_DT',
                        label: '3. D??? t???t, d??? d???ng v??ng m???t, ?????c nh??n  m???t ho???c s???o lo??t gi??c m???c',
                      },
                      {
                        key: 'C5_KhoKhanThiLuc_Khac',
                        label: '4. Kh?? kh??n kh??c khi nh??n',
                      },

                    ]
                  },
                  {
                    label: 'V???n ????? th???n kinh, t??m th???n:',
                    list: [
                      {
                        key: 'C5_VanDeThanKinh_TTPL',
                        label: '1. T??m th???n ph??n li???t (th?????ng xuy??n c?? suy ngh?? kh??ng c?? th???t, t?????ng ai ??ang n??i, theo d??i m??nh, ...)',
                      },
                      {
                        key: 'C5_VanDeThanKinh_BDK',
                        label: '2. B??? ?????ng kinh',
                      },
                      {
                        key: 'C5_VanDeThanKinh_RLCX',
                        label: '3. R???i lo???n c???m x??c, h??nh vi (hay la h??t, ?????p ph??, ????nh ng?????i, kh??ng ki???m so??t  ???????c c???m x??c, ...)',
                      },
                      {
                        key: 'C5_VanDeThanKinh_Khac',
                        label: '4. Kh??c',
                      },

                    ]
                  },
                  {
                    label: 'V???n ????? v??? tr?? tu???:',
                    list: [
                      {
                        key: 'C5_VanDeTriTue_Down',
                        label: '1. C?? k???t lu???n c?? quan y t??? v??? m???c ch???ng b???i n??o/down',
                      },
                      {
                        key: 'C5_VanDeTriTue_CC',
                        label: '2. Ch???m ch???p, ng??? ngh???ch khi th???c hi???n h??nh vi ho???c tham gia quan h??? x?? h???i',
                      },
                      {
                        key: 'C5_VanDeTriTue_KK',
                        label: '3. Kh?? kh??n trong h???c t???p ho???c ti???p thu th??ng tin',
                      },
                      {
                        key: 'C5_VanDeTriTue_Khac',
                        label: '4. Kh??c',
                      },

                    ]
                  },
                  {
                    label: 'V???n ????? v??? d???ng khuy???t t???t kh??c:',
                    list: [
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_DD',
                        label: ' G??, d??? d???ng, d??? t???t ho???c m???c ch???ng d??? t???t ?????u nh???',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_DC',
                        label: 'Di ch???ng b???ng n???ng to??n th??n',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_TL',
                        label: 'Ng?????i tr??n 16 tu???i cao d?????i 1m (th??? th???p l??n do thi???u tuy???n y??n)',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_TK',
                        label: 'T??? k??? (R???i lo???n ph??? t??? k???)',
                      },
                      {
                        key: 'C5_VanDeDangKhuyetTatKhac_Khac',
                        label: 'Kh??c',
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
              <Text style={styles.title}>{'M???c ????? khuy???t t???t'}</Text>
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 1}
                valueRadio={1}
                tx={'?????c bi???t n???ng'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 2}
                valueRadio={2}
                tx={'N???ng'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 3}
                valueRadio={3}
                tx={'Nh???'}
              />
              <Field
                name={'C2_MucDoKhuyetTat'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C2_MucDoKhuyetTat == 4}
                valueRadio={4}
                tx={'Ch??a x??c ?????nh'}
              />
              <Text style={styles.title}>{'Kh??? n??ng t??? ph???c v??? nhu c???u sinh ho???t h??ng'}</Text>
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 1}
                valueRadio={1}
                tx={'T??? ph???c v???'}
              />
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 2}
                valueRadio={2}
                tx={'T??? ph???c v??? nh??ng c???n s??? tr??? gi??p'}
              />
              <Field
                name={'C6_KhaNangTuPhucVu'}
                component={Radio}
                styleContainer={{
                  flex: 1
                }}
                selected={formObj.C6_KhaNangTuPhucVu == 3}
                valueRadio={3}
                tx={'Kh??ng t??? ph???c v??? ???????c'}
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