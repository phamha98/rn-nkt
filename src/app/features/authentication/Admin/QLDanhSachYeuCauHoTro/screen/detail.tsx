import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ConfigProps, InjectedFormProps } from 'redux-form';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import ButtonNextTab from '../../../../../library/components/buttonNext/ButtonNextTab';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import RestAPI from '../../../../../RestAPI';
import Form from '../../../danhSachNhuCauHoTro/components/form';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

let dataSaved;
export const DetailYeuCauHoTro =
  (props: ConfigProps & InjectedFormProps) => {
    const { navigation } = props;
    let params = navigation.state.params;
    const { data, index: paramIndex, callBackUpdate } = params;
    dataSaved = navigation.getParam('VALUE_USER', {});

    const refContent = useRef()
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);

    const refModalOptions = useRef();
    const refPromptCancelRequest = useRef();

    var loadData = async () => {
      toggleLoading();
      var resp = await RestAPI.API_Get_Info_NhuCauHoTro(dataSaved.id);
      var initData: any = [];
      resp.map((loaiHinhHoTro, indexCate) => {
        loaiHinhHoTro.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTro, indexGroup) => {
          hinhThucHoTro.list_NoiDungHoTro.map((noiDung, indexItem, _this) => {
            var obj = {
              "Id": noiDung.hoTro_ChiTiet.id,
              "IdHoTro": noiDung.hoTro_ChiTiet.idHoTro,
              "IdNoiDungHoTro": noiDung.hoTro_ChiTiet.idNoiDungHoTro,
              "DaNhan": noiDung.hoTro_ChiTiet.daNhan,
              "UuTien": 0,
              "NoiDungHoTro": noiDung.hoTro_ChiTiet.noiDungHoTro,
              "GhiChu": "",
              isEditNoiDung: false,

              loaiHinhThucHoTro: loaiHinhHoTro.loaiHinhThucHoTro.ten,
              hinhThucHoTro: hinhThucHoTro.hinhThucHoTro.ten,
              noiDungHoTro: noiDung.noiDungHoTro.ten
            }
            if (indexItem == _this.length - 1 && indexItem != 0) {
              obj.isEditNoiDung = true
            }
            initData.push(obj);
          });
        });
      });

      var status = resp.length > 0 ? resp[0].status : '';
      refContent.current?.setData({
        data: initData,
        status: status,
      });
      toggleLoading();
    }

    const _onDuyet = (e, index) => {
      ViewCus.Alert.Confirm(async () => {
        toggleLoading();
        var resp = await RestAPI.API_DuyetYeuCauTiepNhan({
          Id: dataSaved.id,
          TrangThai: 2,
          NguoiDuyet: dataDetailUser.userID,
          NgayDuyet: new Date()
        })
        toggleLoading();
        if (resp.status == true) {
          DropDownHolder.showSuccess((resp.messeger));
          dataSaved = {
            ...dataSaved,
            trangThai: 2,
          }
          callBackUpdate({
            trangThai: 2,
          }, paramIndex)
          loadData();
        }
        else {
          DropDownHolder.showError((resp.messeger));
        }
        setTimeout(() => {
        }, 1000)
      }, null, 'Bạn có muốn nhận hỗ trợ?')
    }
    const _onHuyDuyet = (e, index) => {
      ViewCus.Alert.Confirm(async () => {
        toggleLoading();
        var resp = await RestAPI.API_HuyDuyetYeuCauTiepNhan({
          Id: dataSaved.id,
          TrangThai: 1,
          NguoiDuyet: dataDetailUser.userID,
          NgayDuyet: new Date()
        })
        toggleLoading();
        if (resp.status == true) {
          DropDownHolder.showSuccess((resp.messeger));
          dataSaved = {
            ...dataSaved,
            trangThai: 1,
          }
          callBackUpdate({
            trangThai: 1,
          }, paramIndex)
          loadData();
        }
        else {
          DropDownHolder.showError((resp.messeger));
        }
        setTimeout(() => {
        }, 1000)
      }, null, 'Bạn có muốn huỷ duyệt yêu cầu?')
    }

    const onKhongDuyetYeuCau = () => {
      refPromptCancelRequest.current?.toggle(true, '', async (t) => {
        toggleLoading();
        var resp = await RestAPI.API_KhongDuyetYeuCauTiepNhan({
          Id: dataSaved.id,
          LyDoKhongDuyet: t,
          TrangThai: 0,
          NguoiCapNhat: dataDetailUser.userID,
          NgayCapNhat: new Date(),
        })
        toggleLoading();
        if (resp.status == true) {
          DropDownHolder.showSuccess((resp.messeger));
          callBackUpdate({
            trangThai: 0,
          }, paramIndex)
          loadData();
        }
        else {
          DropDownHolder.showError((resp.messeger));
        }
      });
    }

    useEffect(() => {
      loadData()
    }, []);
    return (
      <>
        <ViewCus.Prompt
          ref={refPromptCancelRequest}
          title='Hủy tiếp nhận thông tin'
          buttonText='Từ chối'
          placeholder='Lý do từ chối'
          multiline={true}
          numberOfLines={10}
          validate={{
            required: true,
          }}
          styleInput={[
            {
              maxHeight: 200,
            },
            Platform.OS == 'ios' && { height: 200 }
          ]}
        />
        <ModalOptions ref={refModalOptions} />
        <Screen>
          <Wallpaper useWrap={true} />
          <Header
            isBack={true}
            headerTx={'Chi tiết nội dung hỗ trợ'}
          />
          <ViewCus.ComponentDynamic
            ref={refContent}
            styleContainer={{
              flex: 1,
              backgroundColor: 'white',
            }}
            render={({ data = [], status, isLock = false, } = {}) => (
              (data.length <= 0) ? null :
                <>
                  <Form
                    data={data}
                    isLock={true}
                    topView={
                      <Text
                        style={{
                          paddingVertical: 15,
                          fontWeight: 'bold',
                          fontSize: 17,
                          textAlign: 'center',
                          color: '#a94442'
                        }}
                      >
                        {'Phiếu thông tin: {0}'.format(dataSaved.a4_HoTen)}
                      </Text>
                    }
                    submitView={() => (
                      dataSaved == null ? null : dataSaved.trangThai == 1 ?
                        <>
                          <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                            <View style={{ flex: 0.5, padding: 5 }}>
                              <ButtonNextTab
                                onPress={() => _onDuyet()}
                              >
                                {'Duyệt tiếp nhận'}
                              </ButtonNextTab>
                            </View>
                            <View style={{ flex: 0.5, padding: 5 }}>
                              <ButtonNextTab
                                onPress={() => onKhongDuyetYeuCau()}

                              >
                                {'Không tiếp nhận'}
                              </ButtonNextTab>
                            </View>
                          </View>
                        </>
                        :
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                          <ButtonNextTab
                            onPress={() => _onHuyDuyet()}
                          >
                            {'Hủy Duyệt'}
                          </ButtonNextTab>
                        </View>
                    )}
                  />
                </>
            )}
          />
        </Screen>
      </>
    );
  }
