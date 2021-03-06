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
  C1_DangKhuyetTat_VD: 0,
  C1_DangKhuyetTat_Nhin: 0,
  C1_DangKhuyetTat_NgheNoi: 0,
  C1_DangKhuyetTat_TK: 0,
  C1_DangKhuyetTat_TT: 0,
  C1_DangKhuyetTat_CXD: 0,
  C1_DangKhuyetTat_Khac: 0,
  C1_DangKhuyetTat_KhacText: '',
  C3_NguyenNhanKhuyetTat_BS: 0,
  C3_NguyenNhanKhuyetTat_BT: 0,
  C3_NguyenNhanKhuyetTat_TNLD: 0,
  C3_NguyenNhanKhuyetTat_TNSH: 0,
  C3_NguyenNhanKhuyetTat_TNGT: 0,
  C3_NguyenNhanKhuyetTat_TNBM: 0,
  C3_NguyenNhanKhuyetTat_CT: 0,
  C3_NguyenNhanKhuyetTat_Khac: 0,
  C3_NguyenNhanKhuyetTat_KhacText: '',
  C4_ThoiDiemXayRaTaiNan: 0,
  C4_ThoiDiemXayRaTaiNan_Ngay: null,
  C4_DiaDiemXayRaTaiNan_Tinh: 0,
  C4_DiaDiemXayRaTaiNan_Huyen: 0,
  C4_DiaDiemXayRaTaiNan_Thon: 0,
  C4_DiaDiemXayRaTaiNan_KhacText: '',
  C4_KhuVucXayRaTaiNan_KDC: 0,
  C4_KhuVucXayRaTaiNan_TH: 0,
  C4_KhuVucXayRaTaiNan_CCQS: 0,
  C4_KhuVucXayRaTaiNan_NTMPL: 0,
  C4_KhuVucXayRaTaiNan_CSSX: 0,
  C4_KhuVucXayRaTaiNan_Ruong: 0,
  C4_KhuVucXayRaTaiNan_Duong: 0,
  C4_KhuVucXayRaTaiNan_BS: 0,
  C4_KhuVucXayRaTaiNan_Rung: 0,
  C4_KhuVucXayRaTaiNan_Khac: 0,
  C4_KhuVucXayRaTaiNan_KhacText: '',
  C4_LoaiVuKhiGayTaiNan_Bom: 0,
  C4_LoaiVuKhiGayTaiNan_Min: 0,
  C4_LoaiVuKhiGayTaiNan_Dan: 0,
  C4_LoaiVuKhiGayTaiNan_Kip: 0,
  C4_LoaiVuKhiGayTaiNan_VKTC: 0,
  C4_LoaiVuKhiGayTaiNan_KXD: 0,
  C4_LoaiVuKhiGayTaiNan_Khac: 0,
  C4_HoanCanhGayRaTaiNan_SX: 0,
  C4_HoanCanhGayRaTaiNan_KH: 0,
  C4_HoanCanhGayRaTaiNan_SXGD: 0,
  C4_HoanCanhGayRaTaiNan_CTGS: 0,
  C4_HoanCanhGayRaTaiNan_XD: 0,
  C4_HoanCanhGayRaTaiNan_RTPL: 0,
  C4_HoanCanhGayRaTaiNan_CDVLN: 0,
  C4_HoanCanhGayRaTaiNan_CD: 0,
  C4_HoanCanhGayRaTaiNan_DungGan: 0,
  C4_HoanCanhGayRaTaiNan_CT: 0,
  C4_HoanCanhGayRaTaiNan_Khac: 0,
  C4_HoanCanhGayRaTaiNan_KhacText: '',
  C5_KhoKhanVanDong_MNCCTT: 0,
  C5_KhoKhanVanDong_DTCS: 0,
  C5_KhoKhanVanDong_MMPC: 0,
  C5_KhoKhanVanDong_NXL: 0,
  C5_KhoKhanVanDong_KTDL: 0,
  C5_KhoKhanVanDong_Khac: 0,
  C5_KhoKhanVanDong_KhacText: '',
  C5_KhoKhanNgheNoi_Diec: 0,
  C5_KhoKhanNgheNoi_TT: 0,
  C5_KhoKhanNgheNoi_KND: 0,
  C5_KhoKhanNgheNoi_DBS: 0,
  C5_KhoKhanNgheNoi_DD: 0,
  C5_KhoKhanNgheNoi_KH: 0,
  C5_KhoKhanNgheNoi_Khac: 0,
  C5_KhoKhanNgheNoi_KhacText: '',
  C5_KhoKhanThiLuc_KCM: 0,
  C5_KhoKhanThiLuc_NKR: 0,
  C5_KhoKhanThiLuc_DT: 0,
  C5_KhoKhanThiLuc_Khac: 0,
  C5_KhoKhanThiLuc_KhacText: '',
  C5_VanDeThanKinh_TTPL: 0,
  C5_VanDeThanKinh_BDK: 0,
  C5_VanDeThanKinh_RLCX: 0,
  C5_VanDeThanKinh_Khac: 0,
  C5_VanDeThanKinh_KhacText: '',
  C5_VanDeTriTue_Down: 0,
  C5_VanDeTriTue_CC: 0,
  C5_VanDeTriTue_KK: 0,
  C5_VanDeTriTue_Khac: 0,
  C5_VanDeTriTue_KhacText: '',
  C5_VanDeDangKhuyetTatKhac_DD: 0,
  C5_VanDeDangKhuyetTatKhac_DC: 0,
  C5_VanDeDangKhuyetTatKhac_TL: 0,
  C5_VanDeDangKhuyetTatKhac_TK: 0,
  C5_VanDeDangKhuyetTatKhac_Khac: 0,
  C5_VanDeDangKhuyetTatKhac_KhacText: '',
  C2_MucDoKhuyetTat: 0,
  C6_KhaNangTuPhucVu: 0,
};

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

export const TinhTrang = reduxForm({ form: 'TinhTrang' })(
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
    const [status, setStatus] = useState()
    const [isRefresh, setIsRefresh] = useState(false)
    useEffect(() => {
      isRefresh != false && setIsRefresh(false);
      init();
    }, [_isRefresh])

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      // const {
      //   ethnics,
      //   provinces,
      //   districts,
      //   wards,
      // } = masterAll;

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
        {/* <Text style={styles.titleCus}>{'T??NH TR???NG KHUY???T T???T'}</Text> */}
        <View>
          {
            [
              {
                labelTotal: 'T??nh tr???ng khuy???t t???t',
                label: 'D???ng khuy???t t???t',
                list: [
                  {
                    key: 'C1_DangKhuyetTat_VD',
                    label: 'V???n ?????ng',
                  },
                  {
                    key: 'C1_DangKhuyetTat_Nhin',
                    label: 'Nh??n',
                  },
                  {
                    key: 'C1_DangKhuyetTat_NgheNoi',
                    label: 'Nghe,N??i',
                  },
                  {
                    key: 'C1_DangKhuyetTat_TK',
                    label: 'Th???n kinh,t??m th???n',
                  },
                  {
                    key: 'C1_DangKhuyetTat_TT',
                    label: 'Tr?? tu???',
                  }, {
                    key: 'C1_DangKhuyetTat_CXD',
                    label: 'Ch??a x??c ?????nh',
                  },

                  , {
                    key: 'C1_DangKhuyetTat_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C1_DangKhuyetTat_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },


                ]
              },
              {
                label: 'Nguy??n nh??n b??? khuy???t t???t',
                list: [
                  {
                    key: 'C3_NguyenNhanKhuyetTat_BS',
                    label: 'B???m sinh',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_BT',
                    label: 'B???nh t???t',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNLD',
                    label: 'Tai n???n lao ?????ng',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNSH',
                    label: 'Tai n???n trong sinh ho???t',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNGT',
                    label: 'Tai n???n giao th??ng',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNBM',
                    label: 'Tai n???n do bom m??n',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_CT',
                    label: 'Chi???n tranh',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              },
              {
                labelTotal: 'Hi???n tr???ng s???c kho??? li??n quan ?????n khuy???t t???t',
                label: 'Kh?? kh??n v???n ?????ng, di chuy???n',
                list: [
                  {
                    key: 'C5_KhoKhanVanDong_MNCCTT',
                    label: 'M???m nh???o ho???c co c???ng to??n th??n',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_DTCS',
                    label: 'D??? t???t, d??? d???ng x????ng kh???p b???m sinh ho???c bi???n d???ng, ?????u, c???, c???t s???ng',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_MMPC',
                    label: 'M???t m???t ph???n chi (t??? khu???u tay,  ?????u g???i) ho???c kh??ng th??? c??? ?????ng ch??n, tay',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_NXL',
                    label: 'Th?????ng xuy??n ph???i ng???i xe l??n xe l???c, xe ?????y',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_KTDL',
                    label: 'Kh??ng t??? ??i l???i ???????c ho???c ??i l???i c???n s??? tr??? gi??p c???a n???ng ho???c ng?????i kh??c h??? tr???',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },

                ]
              },
              {
                label: 'Kh?? kh??n nghe n??i',
                list: [
                  {
                    key: 'C5_KhoKhanNgheNoi_Diec',
                    label: '??i???c ho??n to??n',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_TT',
                    label: 'Ph???i th?????ng xuy??n d??ng m??y tr??? th??nh m?? kh??ng nghe r??',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KND',
                    label: 'Kh??ng n??i ???????c ho???c n??i, ph??t ra ??m thanh m?? ng?????i kh??c kh??ng th??? hi???u ???????c',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_DBS',
                    label: 'C?? k???t lu???n c???a b???nh vi???n chuy??n khoa v??? c??m, ??i???c b???m sinh',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_DD',
                    label: 'D??? d???ng, d??? t???t c?? quan ph??t ??m ho???c c???u tr??c tai',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KH',
                    label: 'Kh??ng hi???u ng?????i kh??c n??i ho???c n??i ng?????i kh??c kh??ng hi???u',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              }, {
                label: 'Kh?? kh??n v??? th??? l???c',
                list: [
                  {
                    key: 'C5_KhoKhanThiLuc_KCM',
                    label: 'Kh??ng  c?? m???t, thi???u 1 m???t ho???c m?? ho??n to??n',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_NKR',
                    label: 'Nh??n kh??ng r??, m?? m??u ho???c  rung d???p nh??n th???',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_DT',
                    label: 'D??? t???t, d??? d???ng v??ng m???t, ?????c nh??n  m???t ho???c s???o lo??t gi??c m???c',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'V???n ????? th???n kinh, t??m th???n',
                list: [
                  {
                    key: 'C5_VanDeThanKinh_TTPL',
                    label: 'T??m th???n ph??n li???t (th?????ng xuy??n c?? suy ngh?? kh??ng c?? th???t, t?????ng ai ??ang n??i, theo d??i m??nh, ...)',
                  },
                  {
                    key: 'C5_VanDeThanKinh_BDK',
                    label: 'B??? ?????ng kinh',
                  },
                  {
                    key: 'C5_VanDeThanKinh_RLCX',
                    label: 'R???i lo???n c???m x??c, h??nh vi (hay la h??t, ?????p ph??, ????nh ng?????i, kh??ng ki???m so??t  ???????c c???m x??c, ...)',
                  },
                  {
                    key: 'C5_VanDeThanKinh_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'V???n ????? v??? tr?? tu???',
                list: [
                  {
                    key: 'C5_VanDeTriTue_Down',
                    label: 'C?? k???t lu???n c?? quan y t??? v??? m???c ch???ng b???i n??o/down',
                  },
                  {
                    key: 'C5_VanDeTriTue_CC',
                    label: 'Ch???m ch???p, ng??? ngh???ch khi th???c hi???n h??nh vi ho???c tham gia quan h??? x?? h???i',
                  },
                  {
                    key: 'C5_VanDeTriTue_KK',
                    label: 'Kh?? kh??n trong h???c t???p ho???c ti???p thu th??ng tin',
                  },
                  {
                    key: 'C5_VanDeTriTue_Khac',
                    label: 'Kh??c',
                  },
                  {
                    key: 'C5_VanDeTriTue_KhacText',
                    placeholder: 'Kh??c',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'V???n ????? v??? d???ng khuy???t t???t kh??c',
                list: [
                  {
                    key: 'C5_VanDeDangKhuyetTatKhac_DD',
                    label: 'G??, d??? d???ng, d??? t???t ho???c m???c ch???ng d??? t???t ?????u nh???',
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
                  {
                    key: 'C5_VanDeDangKhuyetTatKhac_KhacText',
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
                  <Text style={styles.titleCus}>{group.labelTotal}</Text>
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
                          styleContainer={{
                            width: '100%',
                          }}
                          styleText={{
                            flexWrap: 'wrap',
                          }}
                        />
                      )
                    })
                  }
                </ViewCus.ViewBoxShadown>
              )
            })
          }
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'M???c ????? khuy???t t???t'}</Text>
            <Field
              name={'C2_MucDoKhuyetTat'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: '?????c bi???t n???ng',
                  name: 'DacBietNang'
                },
                {
                  value: 2,
                  label: 'N???ng',
                  name: 'Nang'
                },
                {
                  value: 3,
                  label: 'Nh???',
                  name: 'Nhe'
                },
                {
                  value: 4,
                  label: 'Ch??a x??c ?????nh',
                  name: 'ChuaXacDinh'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Kh??? n??ng t??? ph???c v??? nhu c???u sinh ho???t h??ng'}</Text>
            <Field
              name={'C6_KhaNangTuPhucVu'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'T??? ph???c v???',
                  name: 'TPV'
                },
                {
                  value: 2,
                  label: 'T??? ph???c v??? nh??ng c???n s??? tr??? gi??p',
                  name: 'TPVNCSTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng t??? ph???c v??? ???????c',
                  name: 'KTPVD'
                },
              ]}
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
  },
);