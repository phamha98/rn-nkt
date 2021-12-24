import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Header, Screen, Wallpaper } from '../../../library/components';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import RestAPI from '../../../RestAPI';
import ButtonNextTab from './components/ButtonNextTab';
import Form from './components/form';
import Utils from '../../../library/utils/Utils';
import { toggleLoading } from '../../../../../App';

export const ChiTietNguoiDungYeuCauHoTro = (props: any) => {
  const { navigation } = props;
  const refContent = useRef()
  const user = useSelector(state => state.AppReducer.profile.user);
  useEffect(() => {
    var _itemId = navigation.getParam('VALUE', null)
    loadData(_itemId)
  }, []);
  var loadData = async (_itemId: any) => {
    var resp;
    toggleLoading()
    resp = await RestAPI.API_Get_Info_NhuCauHoTro(_itemId == null ? 0 : _itemId);
    var initData: any = [];
    resp.map((loaiHinhHoTroObj, indexCate) => {
      loaiHinhHoTroObj.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTroObj, indexGroup) => {
        hinhThucHoTroObj.list_NoiDungHoTro.map((noiDungObj, indexItem, _this) => {
          var obj;
          if (_itemId > 0) {
            obj = {
              "Id": noiDungObj.hoTro_ChiTiet.id,
              "IdHoTro": noiDungObj.hoTro_ChiTiet.idHoTro,
              "IdNoiDungHoTro": noiDungObj.hoTro_ChiTiet.idNoiDungHoTro,
              "DaNhan": noiDungObj.hoTro_ChiTiet.daNhan,
              "UuTien": 0,
              "NoiDungHoTro": noiDungObj.hoTro_ChiTiet.noiDungHoTro,
              "GhiChu": "",
              isEditNoiDung: false,

              loaiHinhThucHoTro: loaiHinhHoTroObj.loaiHinhThucHoTro.ten,
              hinhThucHoTro: hinhThucHoTroObj.hinhThucHoTro.ten,
              noiDungHoTro: noiDungObj.noiDungHoTro.ten
            }
          }
          else {
            obj = {
              "Id": 0,
              "IdHoTro": 0,
              "IdNoiDungHoTro": noiDungObj.noiDungHoTro.id,
              "DaNhan": noiDungObj.hoTro_ChiTiet.daNhan,
              "UuTien": 0,
              "NoiDungHoTro": noiDungObj.hoTro_ChiTiet.noiDungHoTro,
              "GhiChu": "",
              isEditNoiDung: false,

              loaiHinhThucHoTro: loaiHinhHoTroObj.loaiHinhThucHoTro.ten,
              hinhThucHoTro: hinhThucHoTroObj.hinhThucHoTro.ten,
              noiDungHoTro: noiDungObj.noiDungHoTro.ten
            }
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
      currentId: _itemId,
      isLock: status != '' && status != null && _itemId > 0
    });

    toggleLoading()
  }

  var onSubmit = async (listHoTro, payload) => {
    var request = {
      "HoTro": {
        "NgayTao": new Date(),
        "NguoiTao": user.userID,
        "NgayCapNhat": new Date(),
        "NguoiCapNhat": user.userID,
        "NgayDuyet": null,
        "NguoiDuyet": null,
        "DaCapQuyetDinhHoTro": null,
        "NguoiCap": null,
        "NgayCap": null,
        "DeNghiGQTCXH": false,
        "TiepNhanVaoTGXH": false,
        "QuanLyCa": false,
        "TT_MaTinh": user.maTinh,
        "TT_MaHuyen": user.maHuyen,
        "TT_MaXa": user.maXa,
        "TT_Ten": null,
        "TT_Id": null,
        "LyDoKhongDuyet": null,
        "NgayHuyenDuyet": null,
        "NguoiHuyenDuyet": null,
        ...payload
      },
      "HoTro_ChiTiet": listHoTro
    }
    request.HoTro.Id = payload.currentId == null ? 0 : payload.currentId

    toggleLoading()
    var resp = await RestAPI.API_Update_NhuCauHoTro(request);
    toggleLoading();
    if (resp.status == true) {
      DropDownHolder.showSuccess(('Cập nhập thành công!'));
      loadData(resp.result)
    }
    else {
      DropDownHolder.showError(('Cập nhật thất bại!'));
    }
  }
  return (
    <>
      <Screen >
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Cập nhật thông tin nhu cầu hỗ trợ'}
        />
        <ViewCus.ComponentDynamic
          ref={refContent}
          styleContainer={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,1)',
          }}
          render={({
            data = [],
            status,
            isLock = false,
            currentId,
          } = {}) => (
              (data.length <= 0) ? null :
                <>
                  {
                    (status != '' && status != null && currentId > 0) &&
                    <Button>
                      {status}
                    </Button>
                  }
                  <Form
                    data={data}
                    onRefresh={() => loadData(currentId)}
                    isRefresh={new Date().getTime()}
                    onSubmit={(data, payload) => onSubmit(data, payload)}
                    // isLock={isLock}
                    submitView={(handleSubmit) => (
                      !isLock &&
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, padding: 5 }}>
                          <ButtonNextTab
                            onPress={() => handleSubmit({
                              TrangThai: 0,
                              currentId
                            })}
                          >
                            {'Lưu lại'}
                          </ButtonNextTab>
                        </View>
                        <View style={{ flex: 0.5, padding: 5 }}>
                          <ButtonNextTab
                            onPress={() => handleSubmit({
                              TrangThai: 1,
                              currentId
                            })}
                          >
                            {'Gửi xã duyệt'}
                          </ButtonNextTab>
                        </View>
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

