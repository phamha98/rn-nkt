import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View ,ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { Header, Screen, Text, Wallpaper } from '../../../../library/components';
import { Ionicons } from '../../../../library/components/iconVector';
import { default as IoniconsFont } from '../../../../library/components/iconVector/IoniconsFont';
import RestAPI from '../../../../RestAPI';
import { FONT_14, typography } from '../../../../themes';
import { color } from '../../../../themes/color';
import constants from '../../../../common/constants';

export const Notication = (props: any) => {
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const itemWidth = constants.window.width * (constants.window.width < 400 ? .7 : constants.window.width > 800 ? .45 : .6);
    const scaleWidth = (itemWidth / 5);
    var date_ngaygui : any;
    console.log(dataDetailUser)
    const [listdata, setListData] = useState([])
    var _run = async () => {
        RestAPI.API_Get_DanhSachThongBao(
            {
                maTinh: dataDetailUser.maTinh,
                maHuyen: dataDetailUser.maHuyen,
                maXa: dataDetailUser.maXa,
                typeId : -1
            }
        )
            .then(response => {
                setListData(response.data)
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
                    headerTx={'Thông báo'}

                />
                <View style={styles.body}>
                    <ScrollView
                        style={{
                            flex: 1,
                        }}
                    >
                        {
                            listdata.length != 0 ?
                                <>{
                                    listdata.map((e, i) => {
                                        date_ngaygui = e.ngayGui;
                                        date_ngaygui  =  moment(new Date(date_ngaygui)).format('DD/MM/YYYY')
                                        return <View key={i} style={{ flex: 1, flexDirection: 'row', padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 0.2, flexDirection: 'column', backgroundColor: '#fff',alignItems:'center' }}>
                                                <Ionicons icon={IoniconsFont.mailUnreadOutline} color={color.palette.lightGrey} size={scaleWidth} />
                                            </View>
                                            <View style={{ flex: 0.8, flexDirection: 'column', backgroundColor: '#fff', marginLeft: 20 }}>
                                                <Text style={{ color: color.palette.socialTumblr, fontSize: 18, }}>{e.tenLoai}</Text>
                                                <Text style={{ color: 'green', marginTop: 10 }}>{'Ngày gửi: ' + (date_ngaygui)}</Text>
                                            </View>
                                        </View>
                                    })
                                }
                                </>
                                :
                                <Text style={{ color: color.palette.primary, fontSize: 28, textAlign: 'center', marginTop: 50 }}>{'Chưa có thông báo!'}</Text>
                        }
                    </ScrollView>
                </View>
            </Screen>
        </>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop:
            Platform.OS === 'android'
                ? StatusBar.currentHeight
                    ? StatusBar.currentHeight - 10
                    : StatusBar.currentHeight
                : 0,
    },
    titleHeader: {
        color: '#ffffff',
        fontFamily: typography.helveticaNeue_regular,
        fontSize: FONT_14,
        textAlign: 'center',
        paddingLeft: 0,
        marginLeft: -12,
        fontWeight: 'bold'
    },
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row'
    },
});
