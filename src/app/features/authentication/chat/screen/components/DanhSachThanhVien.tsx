import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import Alert from '../../../../../library/components/Alert/index';
import { Button, } from '../../../../../library/components';
import { Ionicons } from '../../../../../library/components/iconVector/index';
import Utils from '../../../../../library/utils/Utils';
import { default as IoniconsFont } from '../../../../../library/components/iconVector/IoniconsFont';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';

export default function DanhSachThanhVien(props) {
    const { fields = [] } = props
    var options = [
        {
            id: 0,
            label: 'Chủ hộ'
        }, {
            id: 1,
            label: 'Vợ/Chồng'
        }, {
            id: 2,
            label: 'Con'
        }, {
            id: 3,
            label: 'Cha/Mẹ'
        }, {
            id: 4,
            label: 'Ông/Bà'
        }, {
            id: 5,
            label: 'Cháu ruột'
        }, {
            id: 6,
            label: 'Anh/Chị/Em ruột'
        }, {
            id: 7,
            label: 'Khác'
        },
    ]
    return <>
        <ViewCus.ViewBoxShadown>
            <Text style={styles.title} >
                {'Thành viên trong gia đình'}
            </Text>
            {
                fields.map((nameObject, index) => (
                    <View
                        key={index}
                        style={{
                            backgroundColor: index % 2 ? '#fff' : '#fdfdfd',
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            marginTop: 10,
                            borderColor: '#f2f2f2',
                            borderTopWidth: index == 0 ? 0 : 1,
                            borderWidth: 1,
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                paddingBottom: 10,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}
                        >
                            {'Thành viên {0}'.format(index + 1)}
                        </Text>
                        {/* <Field
                            name={'{0}.Id'.format(nameObject)}
                            component={ViewCus.HiddenField}
                        /> */}
                        <Field
                            name={'{0}.HoTen'.format(nameObject)}
                            component={ViewCus.TextInput}
                            placeholder={'Họ và tên thành viên'}
                            label={'Họ và tên'.format(index + 1)}
                        />
                        <Field
                            name={'{0}.NgaySinh'.format(nameObject)}
                            component={ViewCus.TextDate}
                            // validate={[Utils.objectValid.isValidDate]}
                            label={'Ngày sinh'.format(index + 1)}
                        />
                        <Field
                            name={'{0}.CMND'.format(nameObject)}
                            component={ViewCus.TextInput}
                            placeholder={'CMND thành viên'}
                            label={'CMND/CCCD'.format(index + 1)}
                        />
                        <Field
                            name={'{0}.QuanHeChuHo'.format(nameObject)}
                            component={ViewCus.Selector}
                            label='Quan hệ với chủ hộ'
                            options={options}
                            optionLabel={(e, index) => e.label}
                            optionKey={(e, index) => e.id}
                        />
                        <Button
                            style={{
                                position: 'absolute',
                                right: 0,
                                backgroundColor: 'transparent'
                            }}
                            onPress={() => Alert.Confirm(() => fields.remove(index))}
                        >
                            <Ionicons icon={IoniconsFont.close} color='#ff0000' />
                        </Button>
                    </View>
                ))
            }
            <Button
                onPress={() => fields.push({
                    HoTen: '',
                    NgaySinh: null,
                    CMND: '',
                    QuanHeChuHo: -1,
                    Id: 0
                })}
                style={{ backgroundColor: 'rgba(0,190,212,1)', marginTop: 15, marginBottom: 15, paddingVertical: 10 }}
            >
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: '700' }}>
                    {'Thêm thành viên'}
                </Text>

            </Button>
        </ViewCus.ViewBoxShadown>
    </>
}
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        letterSpacing: 0.16,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',

    },
})