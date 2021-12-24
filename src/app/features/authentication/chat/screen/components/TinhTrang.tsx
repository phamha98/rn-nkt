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
        {/* <Text style={styles.titleCus}>{'TÌNH TRẠNG KHUYẾT TẬT'}</Text> */}
        <View>
          {
            [
              {
                labelTotal: 'Tình trạng khuyết tật',
                label: 'Dạng khuyết tật',
                list: [
                  {
                    key: 'C1_DangKhuyetTat_VD',
                    label: 'Vận động',
                  },
                  {
                    key: 'C1_DangKhuyetTat_Nhin',
                    label: 'Nhìn',
                  },
                  {
                    key: 'C1_DangKhuyetTat_NgheNoi',
                    label: 'Nghe,Nói',
                  },
                  {
                    key: 'C1_DangKhuyetTat_TK',
                    label: 'Thần kinh,tâm thần',
                  },
                  {
                    key: 'C1_DangKhuyetTat_TT',
                    label: 'Trí tuệ',
                  }, {
                    key: 'C1_DangKhuyetTat_CXD',
                    label: 'Chưa xác định',
                  },

                  , {
                    key: 'C1_DangKhuyetTat_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C1_DangKhuyetTat_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },


                ]
              },
              {
                label: 'Nguyên nhân bị khuyết tật',
                list: [
                  {
                    key: 'C3_NguyenNhanKhuyetTat_BS',
                    label: 'Bẩm sinh',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_BT',
                    label: 'Bệnh tật',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNLD',
                    label: 'Tai nạn lao động',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNSH',
                    label: 'Tai nạn trong sinh hoạt',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNGT',
                    label: 'Tai nạn giao thông',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_TNBM',
                    label: 'Tai nạn do bom mìn',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_CT',
                    label: 'Chiến tranh',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C3_NguyenNhanKhuyetTat_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              },
              {
                labelTotal: 'Hiện trạng sức khoẻ liên quan đến khuyết tật',
                label: 'Khó khăn vận động, di chuyển',
                list: [
                  {
                    key: 'C5_KhoKhanVanDong_MNCCTT',
                    label: 'Mềm nhẽo hoặc co cứng toàn thân',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_DTCS',
                    label: 'Dị tật, dị dạng xương khớp bẩm sinh hoặc biến dạng, đầu, cổ, cột sống',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_MMPC',
                    label: 'Mất một phần chi (từ khuỷu tay,  đầu gối) hoặc không thể cử động chân, tay',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_NXL',
                    label: 'Thường xuyên phải ngồi xe lăn xe lắc, xe đẩy',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_KTDL',
                    label: 'Không tự đi lại được hoặc đi lại cần sự trợ giúp của nạng hoặc người khác hỗ trợ',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C5_KhoKhanVanDong_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },

                ]
              },
              {
                label: 'Khó khăn nghe nói',
                list: [
                  {
                    key: 'C5_KhoKhanNgheNoi_Diec',
                    label: 'Điếc hoàn toàn',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_TT',
                    label: 'Phải thường xuyên dùng máy trợ thính mà không nghe rõ',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KND',
                    label: 'Không nói được hoặc nói, phát ra âm thanh mà người khác không thể hiểu được',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_DBS',
                    label: 'Có kết luận của bệnh viện chuyên khoa về câm, điếc bẩm sinh',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_DD',
                    label: 'Dị dạng, dị tật cơ quan phát âm hoặc cấu trúc tai',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KH',
                    label: 'Không hiểu người khác nói hoặc nói người khác không hiểu',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C5_KhoKhanNgheNoi_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              }, {
                label: 'Khó khăn về thị lực',
                list: [
                  {
                    key: 'C5_KhoKhanThiLuc_KCM',
                    label: 'Không  có mắt, thiếu 1 mắt hoặc mù hoàn toàn',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_NKR',
                    label: 'Nhìn không rõ, mù màu hoặc  rung dập nhãn thị',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_DT',
                    label: 'Dị tật, dị dạng vùng mắt, đục nhân  mắt hoặc sẹo loét giác mạc',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'Vấn đề thần kinh, tâm thần',
                list: [
                  {
                    key: 'C5_VanDeThanKinh_TTPL',
                    label: 'Tâm thần phân liệt (thường xuyên có suy nghĩ không có thật, tưởng ai đang nói, theo dõi mình, ...)',
                  },
                  {
                    key: 'C5_VanDeThanKinh_BDK',
                    label: 'Bị động kinh',
                  },
                  {
                    key: 'C5_VanDeThanKinh_RLCX',
                    label: 'Rối loạn cảm xúc, hành vi (hay la hét, đập phá, đánh người, không kiểm soát  được cảm xúc, ...)',
                  },
                  {
                    key: 'C5_VanDeThanKinh_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C5_KhoKhanThiLuc_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'Vấn đề về trí tuệ',
                list: [
                  {
                    key: 'C5_VanDeTriTue_Down',
                    label: 'Có kết luận cơ quan y tế về mắc chứng bại não/down',
                  },
                  {
                    key: 'C5_VanDeTriTue_CC',
                    label: 'Chậm chạp, ngờ nghệch khi thực hiện hành vi hoặc tham gia quan hệ xã hội',
                  },
                  {
                    key: 'C5_VanDeTriTue_KK',
                    label: 'Khó khăn trong học tập hoặc tiếp thu thông tin',
                  },
                  {
                    key: 'C5_VanDeTriTue_Khac',
                    label: 'Khác',
                  },
                  {
                    key: 'C5_VanDeTriTue_KhacText',
                    placeholder: 'Khác',
                    type: 'input'
                  },
                ]
              },
              {
                label: 'Vấn đề về dạng khuyết tật khác',
                list: [
                  {
                    key: 'C5_VanDeDangKhuyetTatKhac_DD',
                    label: 'Gù, dị dạng, dị tật hoặc mắc chứng dị tật đầu nhỏ',
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
                  {
                    key: 'C5_VanDeDangKhuyetTatKhac_KhacText',
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
            <Text style={styles.title}>{'Mức độ khuyết tật'}</Text>
            <Field
              name={'C2_MucDoKhuyetTat'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Đặc biệt nặng',
                  name: 'DacBietNang'
                },
                {
                  value: 2,
                  label: 'Nặng',
                  name: 'Nang'
                },
                {
                  value: 3,
                  label: 'Nhẹ',
                  name: 'Nhe'
                },
                {
                  value: 4,
                  label: 'Chưa xác định',
                  name: 'ChuaXacDinh'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Khả năng tự phục vụ nhu cầu sinh hoạt hàng'}</Text>
            <Field
              name={'C6_KhaNangTuPhucVu'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Tự phục vụ',
                  name: 'TPV'
                },
                {
                  value: 2,
                  label: 'Tự phục vụ nhưng cần sự trợ giúp',
                  name: 'TPVNCSTG'
                },
                {
                  value: 3,
                  label: 'Không tự phục vụ được',
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
            {'Tiếp tục'}
          </ButtonNextTab>
        }
      </ScrollView>
    );
  },
);