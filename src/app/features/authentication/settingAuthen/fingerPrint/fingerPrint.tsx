import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import RestAPI from '../../../../RestAPI';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Header, Screen, Wallpaper } from '../../../../library/components';
import DeviceInfo from 'react-native-device-info';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
export const FingerPrint = reduxForm({ form: 'FingerPrint' })(
    (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
        const {
            initialize: loadForm,
            isRefresh: _isRefresh,
        } = props;
        const user = useSelector(state => state.AppReducer);
        const refFingerPrint = useRef()
        var DeviceId: any;
        useEffect(() => {
            var isLoginByFinger = user?.profile?.user?.isLoginByFinger
            GetIdDevice()
            setFormData(isLoginByFinger)
        }, [])

        const setFormData = (data) => {
            refFingerPrint.current?.setData(data == false);
            loadForm({
                isLoginByFinger: data
            })
        }

        const GetIdDevice = async () => {
            let uniqueId = await DeviceInfo.getUniqueId();
            DeviceId = uniqueId.toString()
        }

        const changeSettingFingerPrint = async (value) => {
            let uniqueId = await DeviceInfo.getUniqueId();
            DeviceId = uniqueId.toString()
            var resp = await RestAPI.SettingLoginbyFinger({
                "userId": user?.profile?.user?.userID,
                "isLoginByFinger": value,
                "UUID": DeviceId
            });
            if (resp.result.isSuccess == true) {
                if (value) {
                    ViewCus.Alert.Alert('Cài đặt vân tay thành công!');
                }
                else {
                    ViewCus.Alert.Alert('Hủy vân tay thành công!');
                }
            }
            else {
                ViewCus.Alert.Alert('Cài đặt vân tay thất bại');
            }
        }

        return (
            <Screen>
                <Header
                    isBack={true}
                    headerTx={'Cài đặt vân tay'}
                />
                <View style={{ padding: 10 }}>
                    <ViewCus.ViewBoxShadown>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '400' }}>{'Sử dụng vân tay của bạn để đăng nhập:'}</Text>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Field
                                name={'isLoginByFinger'}
                                component={ViewCus.RadioGroup}
                                options={[
                                    {
                                        value: false,
                                        label: 'Không',
                                        name: 'Khong'
                                    },
                                    {
                                        value: true,
                                        label: 'Có',
                                        name: 'Co'
                                    },
                                ]}
                                onChange={value => {
                                    changeSettingFingerPrint(value)
                                }}
                                render={({ RadioComponent }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <RadioComponent.Khong />
                                        <RadioComponent.Co />
                                    </View>
                                )}
                            />
                        </View>
                    </ViewCus.ViewBoxShadown>
                </View>
            </Screen>
        );
    },
);
