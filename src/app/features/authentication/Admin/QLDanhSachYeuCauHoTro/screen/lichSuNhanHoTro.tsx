import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isAndroid } from '../../../../../common';
import { Header, Screen, Text, Wallpaper } from '../../../../../library/components';
import RestAPI from '../../../../../RestAPI';
import { FONT_14, GlobalStyle, typography } from '../../../../../themes';
import { color } from '../../../../../themes/color';
import { useSelector } from 'react-redux';
export const lichSuNhanHoTro = ({ navigation }, props: any) => {
    const User = navigation.getParam('VALUE_USER', {})
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const [listdata, setListData] = useState([])
    var _run = async () => {
        RestAPI.API_Get_LichSuHoTro(User.userId)
            .then(response => { 
                console.log(response) 
                 setListData(response.noiDungHoTro)
            })
    }
    useEffect(() => {
        _run()
    }, []);
    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'Quản lý lịch sử hỗ trợ'}
                />

                <View style={styles.body}>
                    <Text></Text>
                    <ScrollView
                        style={{
                            flex: 1,
                        }}
                    >
                        {
                            listdata.length != 0 ?
                                <>{
                                    listdata.map((e, i) => {
                                        return <View
                                            key={i}
                                            style={{
                                                backgroundColor: '#f7f7f7',
                                                marginTop: 10,
                                                margin: 15,
                                                ...GlobalStyle.boxShadow,
                                                borderLeftColor: 'rgba(0,190,212,1)',
                                                padding: 15,
                                                borderLeftWidth: 4
                                            }}
                                        >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, flexDirection: 'column', }}>
                                                    <Text style={styles.txname}>
                                                        {e.noiDungHoTro}
                                                    </Text>
                                                    <Text style={styles.date}>
                                                        {'Đã nhận lần: '+ (e.soLanCap)}
                                                    </Text>
                                                    <Text style={styles.date}>
                                                        {'Ngày nhận gần nhất: ' + (new Date(e.ngayCapGanNhat).format('DD/MM/YYYY'))}
                                                    </Text>
                                                    <Text style={styles.txtitle}>
                                                        {e.hinhThucHoTro}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    })

                                }

                                </>
                                :
                                <Text style={{ color: color.palette.primary, fontSize: 28, textAlign: 'center', marginTop: 50 }}>{'Chưa có lịch sử!'}</Text>
                        }
                    </ScrollView>
                </View>

            </Screen>
        </>
    );
}
export const styles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleHeader: {
        fontSize: FONT_14,
        alignSelf: 'center',
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold'
    },
    iconRightHeader: {
        tintColor: '#ffffff'
    },
    header: {
        paddingTop: isAndroid ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 15,
        paddingBottom: isAndroid ? 19 : 15,
    },
    containerStyle: {
        flexGrow: 1,
    },
    wrapContent: {
        flex: 1,
        overflow: 'hidden',
        minHeight: 50,
        width: '100%'
    },
    txname: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: 'bold',


    },
    txtitle: {
        fontSize: 17,
        color: '#aaa',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: '400',

    },
    date: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: '400',

    },
    modal: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: '90%',
        height: 50,
        maxHeight: 250,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 250,
        alignItems: 'flex-start',
        textAlign: 'left'

    },
    buttonText: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
})
