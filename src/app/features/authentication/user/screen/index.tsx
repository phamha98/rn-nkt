import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CheckboxView } from '../../../../library/components/checkboxView';
import { Header,Button, Screen, Text, Wallpaper } from '../../../../library/components';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { DANHSACHNGUOIDUNGYEUCAUHOTRO } from '../../../../navigation/screenTypes';
import { navigate } from '../../../../navigation/navigationService';
import RestAPI from '../../../../RestAPI';
import { GlobalStyle } from '../../../../themes';
import ButtonNextTab from './components/ButtonNextTab';

var countCheck = 0;
export const HomeUser = reduxForm({ form: 'HomeUser' })(
  (props: any) => {

    const { handleSubmit, onSubmit } = props;
    const { navigation } = props;
    const [formData, setFormData] = useState()
    const [status, setStatus] = useState()
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    var _run = async () => {
      countCheck = 0
      RestAPI.API_Get_Info_NhuCauHoTro(dataDetailUser.userID).then(response => {
        var initData = {};
        response.map((loaiHinhHoTro, indexCate) => {
          loaiHinhHoTro.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTro, indexGroup) => {
            hinhThucHoTro.list_NoiDungHoTro.map((noiDung, indexItem) => {
              initData[noiDung.hoTro_ChiTiet.idNoiDungHoTro] = false
            });
          });
        });
        props.initialize(initData);
        setFormData(response)
      })
    }

    useEffect(() => {
      _run()
    }, []);
    var _onSave = (obj) => {
      if (countCheck > 5) {
        DropDownHolder.showError(('Chỉ lựa chọn tối đa 5 nhu cầu'));
        return;
      }
      var keys = Object.keys(obj);
      var HoTro_ChiTiet = keys.map(function (key, index) {
        var ids = key.split('-');
        var IdNoiDungHoTro = parseInt(ids[0])
        var value = obj[key];
        return {
          "Id": 0,
          "IdHoTro": 0,
          "IdNoiDungHoTro": IdNoiDungHoTro,
          "DaNhan": value,
          "UuTien": 0,
          "NoiDungHoTro": null,
          "GhiChu": null
        }
      })
      var request = {
        "HoTro": {
          "Id": 0,
          // "UserId": dataDetailUser.userID,
          // "UserId": 159923,
          "NgayTao": new Date(),
          "NguoiTao": dataDetailUser.userID,
          "NgayCapNhat": new Date(),
          "NguoiCapNhat": dataDetailUser.userID,
          "NgayDuyet": null,
          "NguoiDuyet": null,
          "DaCapQuyetDinhHoTro": null,
          "NguoiCap": null,
          "NgayCap": null,
          "TrangThai": 0,
          "DeNghiGQTCXH": false,
          "TiepNhanVaoTGXH": false,
          "QuanLyCa": false,
          "TT_MaTinh": dataDetailUser.maTinh,
          "TT_MaHuyen": dataDetailUser.maHuyen,
          "TT_MaXa": dataDetailUser.maXa,
          "TT_Ten": null,
          "TT_Id": null,
          "LyDoKhongDuyet": null,
          "NgayHuyenDuyet": null,
          "NguoiHuyenDuyet": null
        },
        "HoTro_ChiTiet": HoTro_ChiTiet
      }
      RestAPI.API_Update_NhuCauHoTro(request)
        .then(response => {
          if (response.status == true) {
            DropDownHolder.showSuccess(('Cập nhập thành công!'));
            setTimeout(() => {
              // navigate(DANHSACHNGUOIDUNGYEUCAUHOTRO);
            }, 1000)
          }
          else {
            DropDownHolder.showError(('Cập nhật thất bại!'));
            setTimeout(() => {
            }, 1000)
          }
        })
    }

    var _onSubmit = (obj) => {
      if (countCheck > 5) {
        DropDownHolder.showError(('Chỉ lựa chọn tối đa 5 nhu cầu'));
        return;
      }
      var keys = Object.keys(obj);
      var HoTro_ChiTiet = keys.map(function (key, index) {
        var ids = key.split('-');
        var IdNoiDungHoTro = parseInt(ids[0])
        var value = obj[key];
        return {
          "Id": 0,
          "IdHoTro": 0,
          "IdNoiDungHoTro": IdNoiDungHoTro,
          "DaNhan": value,
          "UuTien": 0,
          "NoiDungHoTro": null,
          "GhiChu": null
        }
      })
      var request = {
        "HoTro": {
          "Id": 0,
          // "UserId": dataDetailUser.userID,
          // "UserId": 159923,
          "NgayTao": new Date(),
          "NguoiTao": dataDetailUser.userID,
          "NgayCapNhat": new Date(),
          "NguoiCapNhat": dataDetailUser.userID,
          "NgayDuyet": null,
          "NguoiDuyet": null,
          "DaCapQuyetDinhHoTro": null,
          "NguoiCap": null,
          "NgayCap": null,
          "TrangThai": 1,
          "DeNghiGQTCXH": false,
          "TiepNhanVaoTGXH": false,
          "QuanLyCa": false,
          "TT_MaTinh": dataDetailUser.maTinh,
          "TT_MaHuyen": dataDetailUser.maHuyen,
          "TT_MaXa": dataDetailUser.maXa,
          "TT_Ten": null,
          "TT_Id": null,
          "LyDoKhongDuyet": null,
          "NgayHuyenDuyet": null,
          "NguoiHuyenDuyet": null
        },
        "HoTro_ChiTiet": HoTro_ChiTiet
      }
      RestAPI.API_Update_NhuCauHoTro(request)
        .then(response => {
          console.log(response)
          if (response.status == true) {

            setStatus(response.data.hoTro.trangThai)
            DropDownHolder.showSuccess(('Cập nhập thành công!'));
            setTimeout(() => {
            }, 1000)
          }
          else {
            DropDownHolder.showError(('Cập nhật thất bại!'));
            setTimeout(() => {
            }, 1000)
          }
        })
    }


    return (
      <>
        <Screen>
          <Wallpaper useWrap={true} />
          <Header
            isBack={true}
            headerTx={'Cập nhật thông tin nhu cầu hỗ trợ'}
          />
          {
              status == 1 ?
              <>{}
              <Button>{"Thông báo: Phiếu này đã được gửi lên và chờ xã duyệt"}</Button>
            </>
            :
            <Text></Text>
            }
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
              {
                formData != null && formData.map((loaiHinhHoTro, indexCate) => (
                  <View
                    key={indexCate}
                    style={{
                      borderColor: '#f2f2f2',
                      borderTopWidth: indexCate == 0 ? 0 : 1,
                      paddingVertical: 10
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        paddingVertical: 5,
                        fontWeight: 'bold'
                      }}
                    >
                      {loaiHinhHoTro.loaiHinhThucHoTro.ten}
                    </Text>
                    {
                      loaiHinhHoTro.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTro, indexGroup) => (
                        <View
                          key={indexGroup}
                          style={{
                            paddingVertical: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: 'black'
                            }}
                          >
                            {hinhThucHoTro.hinhThucHoTro.ten}
                          </Text>
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 10
                            }}
                          >
                            {
                              hinhThucHoTro.list_NoiDungHoTro.map((noiDung, indexItem) => {
                                return (typeof noiDung.hoTro_ChiTiet.noiDungHoTro == null) ?
                                  <Field
                                    key={indexItem}
                                    name={noiDung.hoTro_ChiTiet.noiDungHoTro}
                                    component={ViewCus.TextInput}
                                    placeholder={'Khác( ghi rõ)'}
                                  />
                                  :
                                  <Field
                                    key={indexItem}
                                    // name={'Check-{0}-{1}-{2}'.format(noiDung.noiDungHoTro.id,noiDung.hoTro_ChiTiet.idNoiDungHoTro,noiDung.hoTro_ChiTiet.id,noiDung.hoTro_ChiTiet.idHoTro)}
                                    name={noiDung.hoTro_ChiTiet.idNoiDungHoTro, noiDung.noiDungHoTro.id}
                                    component={CheckboxView}
                                    tx={noiDung.noiDungHoTro.ten}
                                    selected={noiDung.hoTro_ChiTiet.daNhan}
                                    onChange={value => {
                                      countCheck += value ? 1 : -1;
                                    }}
                                  />
                                // {
                                //   group.list.map((e, index) => {
                                //     return (e?.type == 'input' ?
                                //       <Field
                                //         key={index}
                                //         name={e.key}
                                //         component={ViewCus.TextInput}
                                //         placeholder={e.placeholder}
                                //       />
                                //       :
                                //       <Field
                                //         key={index}
                                //         name={e.key}
                                //         component={ViewCus.Checkbox}
                                //         children={e.label}
                                //         styleContainer={{
                                //           width: '100%',
                                //         }}
                                //         styleText={{
                                //           flexWrap: 'wrap',
                                //         }}
                                //       />
                                //     )
                                //   })
                                // }
                              })
                            }
                          </View>
                        </View>
                      ))
                    }
                  </View>
                ))
              }
              {
                status == 1 ?
                  <>{}
                    <Text></Text>
                  </>
                  :
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, padding: 5 }}>
                      <ButtonNextTab
                        onPress={handleSubmit(_onSave)}
                      >
                        {'Lưu lại'}
                      </ButtonNextTab>
                    </View>
                    <View style={{ flex: 0.5, padding: 5 }}>
                      <ButtonNextTab
                        onPress={handleSubmit(_onSubmit)}
                      >
                        {'Gửi xã duyệt'}
                      </ButtonNextTab>
                    </View>
                  </View>
              }

            </View>
          </ScrollView>
        </Screen>
      </>
    );
  },
);
