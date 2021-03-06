import React, { useEffect, useState } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Checkbox } from '../../../library/components/checkboxCus'
import RestAPI from '../../../RestAPI'
import { FONT_14, GlobalStyle, typography } from '../../../themes'
import { HomeTabState } from '../home/redux/reducer'
const draw = Platform.OS === 'android' ? true : false
export const SupportHistory = reduxForm({ form: 'SupportHistory' })(
    (props: ConfigProps & InjectedFormProps) => {
        const { handleSubmit, onSubmit } = props;
        const [formData, setFormData] = useState()
        const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
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
            var keys = Object.keys(obj);
            var HoTro_ChiTiet = keys.map(function (key, index) {
                var ids = key.split('-');
                var value = obj[key];
                console.log("value");
                console.log(value);
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
                        DropDownHolder.showSuccess(('C???p nh???p th??nh c??ng!'));
                        setTimeout(() => {
                        }, 1000)
                    }
                    else {
                        DropDownHolder.showError(('C???p nh???t th???t b???i!'));
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
                                                                name={'Check-{0}-{1}-{2}'.format(loaiHinhHoTro.loaiHinhThucHoTro.id, hinhThucHoTro.hinhThucHoTro.id, noiDung.id)}
                                                                key={indexItem}
                                                                component={Checkbox}
                                                                tx={noiDung.ten}
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
                        {/* <ButtonNextTab
                onPress={handleSubmit(_onSubmit)}
              >
                {'L??u l???i'}
              </ButtonNextTab> */}
                    </View>
                </ScrollView>
            </View>
        );
    },
);
