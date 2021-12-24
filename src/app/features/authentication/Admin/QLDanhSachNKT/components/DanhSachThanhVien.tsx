import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import Alert from '../../../../../library/components/Alert/index';
import { Button } from '../../../../../library/components/button/button';
import { DatePicker } from '../../../../../library/components/date/index';
import { Ionicons } from '../../../../../library/components/iconVector/index';
import { default as IoniconsFont } from '../../../../../library/components/iconVector/IoniconsFont';
import { TextField } from '../../../../../library/components/text-field/text-field';

export default function DanhSachThanhVien(props) {
    const { fields = [] } = props
    return <>
        <Text style={styles.title} >
            {'Thành viên trong gia đình'}
        </Text>
        {
            fields.map((objNameByIndex, index) => (
                <View
                    key={index}

                    style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        marginTop: 10,
                        shadowColor: "#000",
                        shadowOffset: {width: 0,height: 2,},
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderRadius:5

                    }}
                >
                    <View>
                        <Text style={styles.title} >{'Họ và tên thành viên {0}: '.format(index + 1)}</Text>
                        <Field
                            name={'{0}.HoTen'.format(objNameByIndex)}
                            placeholderTx={'Họ và tên thành viên'}
                            placeholderColor={'#A4A4A4'}
                            maxLength={100}
                            component={TextField}
                            inputStyle={{
                                color: 'black',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>{'Ngày sinh thành viên {0}:'.format(index + 1)}</Text>
                        <Field
                            name={'{0}.NgaySinh'.format(objNameByIndex)}
                            component={DatePicker}
                            placeholder='Ngày sinh thành viên'
                            mode="date"
                            locale="vi_VN"
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>{'CMND/CCCD thành viên {0}:'.format(index + 1)}</Text>
                        <Field
                            name={'{0}.CMND'.format(objNameByIndex)}
                            placeholderTx={'CMND thành viên'}
                            placeholderColor={'#A4A4A4'}
                            maxLength={100}
                            component={TextField}
                            inputStyle={{
                                color: 'black'
                            }}
                        />
                    </View>
                    <Button
                        style={{
                            position: 'absolute',
                            right: 0,
                            backgroundColor: 'transparent'
                        }}
                        onPress={() => Alert.Confirm(() => fields.remove(index))}
                    >
                        <Ionicons icon={IoniconsFont.removeCircleOutline} color='#ff0000' />
                    </Button>
                </View>
            ))
        }
        <Button
            onPress={() => fields.push()}
            style={{ backgroundColor: 'rgba(0,190,212,1)', marginTop: 15 ,marginBottom:15,paddingVertical: 10}}
        >
            <Text style={{fontSize:18,color:'#fff',fontWeight:'700'}}>
            {'Thêm thành viên'}
            </Text>
            
        </Button>
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