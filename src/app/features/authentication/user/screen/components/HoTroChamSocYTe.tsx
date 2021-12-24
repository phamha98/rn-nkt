import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text } from '../../../../../library/components';
import { Checkbox } from '../../../../../library/components/checkboxCus';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import RestAPI from '../../../../../RestAPI';
import { GlobalStyle } from '../../../../../themes';
import { HomeTabState } from '../../../home/redux/reducer';
import ButtonNextTab from '../components/ButtonNextTab';


var countCheck = 0;
export const HoTroChamSocYTe = reduxForm({ form: 'HoTroChamSocYTe' })(
  (props: any) => {
    const { handleSubmit, onSubmit } = props;
     const { navigation } = props;
    const [formData, setFormData] = useState()
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const User = navigation.getParam('VALUE_USER', {})
    console.log(User)
    var _run = async () => {
      RestAPI.API_Get_Info_NhuCauHoTro().then(response => {
        var initData = {};
        response.map((loaiHinhHoTro, indexCate) => {
          loaiHinhHoTro.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTro, indexGroup) => {
            hinhThucHoTro.list_NoiDungHoTro.map((noiDung, indexItem) => {
              initData['Check-{0}-{1}-{2}'.format(loaiHinhHoTro.loaiHinhThucHoTro.id, hinhThucHoTro.hinhThucHoTro.id, noiDung.id)] = false
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
    var _onSubmit = (obj) => {
      if (countCheck > 5) {
        DropDownHolder.showError(('Chỉ lựa chọn tối đa 5 nhu cầu'));
        return;
      }
      var keys = Object.keys(obj);
      var HoTro_ChiTiet = keys.map(function (key, index) {
        var ids = key.split('-');
        var value = obj[key];
        return {
          "Id": ids[1],
          "IdHoTro": ids[2],
          "IdNoiDungHoTro": ids[3],
          "DaNhan": value,
          "UuTien": 1,
          "NoiDungHoTro": null,
          "GhiChu": null
        }
      })
      var request = {
        "HoTro": {
          "Id": 0,
          "UserId": dataDetailUser.userID,
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
          "TT_MaTinh": 0,
          "TT_MaHuyen": 0,
          "TT_MaXa": 0,
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
          console.log(response);
          if (response.status == true) {
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
                              return <Field
                                key={indexItem}
                                name={'Check-{0}-{1}-{2}'.format(loaiHinhHoTro.loaiHinhThucHoTro.id, hinhThucHoTro.hinhThucHoTro.id, noiDung.id)}
                                component={Checkbox}
                                tx={noiDung.ten}
                                onPress={value => {
                                  countCheck += value ? 1 : -1;
                                  if (countCheck >5) {
                                    DropDownHolder.showError(('Chỉ lựa chọn tối đa 5 nhu cầu'));
                                  }
                                }}
                              />
                            })
                          }
                        </View>
                      </View>
                    ))
                  }
                </View>
              ))
            }
            <ButtonNextTab
              onPress={handleSubmit(_onSubmit)}
            >
              {'Lưu lại'}
            </ButtonNextTab>
          </View>
        </ScrollView>
      </View>
    );
  },
);
