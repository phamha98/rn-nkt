import React, { useEffect } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import NetworkInfo from '@react-native-community/netinfo';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Button, Divider, Text } from '../../library/components';
import Icon from '../../library/components/iconVector/index';
import IoniconsFont from '../../library/components/iconVector/IoniconsFont';
import { FONT_14 } from '../../themes/fontSize';
import { navigate } from '../navigationService';
import ViewCus from '../../library/components/ViewCus/ViewCus';
import LocalStorage from '../../common/LocalStorage';
import { updateDataPostSaved } from '../../RestAPI';
import appleAuth from '@invertase/react-native-apple-authentication';
import { LoginManager } from 'react-native-fbsdk';
import API from '../../RestAPI/index';

import { CHANGE_PASSWORD, EDIT_USER, LOGIN, REPORT, TAB_PROFILE_CC, QLDANHSACHYEUCAUHOTRO, LICHSUNHANHOTRO, DISABILITY, APPOINTMENT, HUONGDANSUDUNG, VOICE, FINGERPRINT,CHATBOT } from '../screenTypes';

const styles = StyleSheet.create({
    wrap: {
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff'
    },
    text: {
        color: '#484848',
        fontSize: FONT_14,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
        // flex: 1,
    },
    icon: {
        tintColor: '#565656',

    }
})
const _onNextEditUser = () => {
    navigate(EDIT_USER);
};
// const _onGoRequestToDisabilityCertificate = () => {
//     navigate(TAB_PROFILE_CC);
// };
const _onGoDanhSachNhuCauHoTro = () => {
    navigate(QLDANHSACHYEUCAUHOTRO);
};
const _onGoLichSuNhanHoTro = () => {
    navigate(LICHSUNHANHOTRO);
};
const _onGoReport = () => {
    navigate(REPORT);
};
const _onGoCapCapLaiXNKT = () => {
    navigate(DISABILITY);
};
const _onGoToPassword = () => {
    navigate(CHANGE_PASSWORD);
}
const _onGoToFingerPrint = () => {
    navigate(FINGERPRINT);
}
const _onGoToVoice = () => {
    navigate(VOICE);
}
const _onGoToGiude = () => {
    navigate(HUONGDANSUDUNG);
    // Linking.openURL('http://nkt.btxh.gov.vn/HDSD/HDSD_NKT_CAN BO_Mobile_2020.docx');
}
const _onGoToChatBot = () => {
    API.isConnected ? navigate(CHATBOT) : AlerOffline()
}
const _onGoToLogout = () => {
    // ViewCus.Alert.Confirm(() => {
    //     navigate(LOGIN);
    // }, null, 'B???n ch???c ch???n ????ng xu???t?')
    ViewCus.Alert.Confirm(() => {
        LocalStorage.setUserSaved(null)
        LocalStorage.setToken(null);
        LocalStorage.setDataLogin({
            username: "",
            password: "",
            isRemember: false
        });
        updateDataPostSaved([]);
        appleAuth.Operation.LOGOUT
        try {
            LoginManager.logOut();
        } catch (error) {

        }
        navigate(LOGIN);

    }, null, 'B???n ch???c ch???n mu???n ????ng xu???t?')

}

const LeftMenu = (props) => {
    const user = useSelector(state => state.AppReducer);
    useEffect(() => {
    }, []);

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ScrollView
                style={{
                    flex: 1,
                }}
            >
                <View style={{ backgroundColor: '#f1f7f8', height: 180, }}>
                    <View style={{ flex: 1, marginTop: 40, padding: 20 }}>
                        <Text style={{ color: '#333', fontSize: 18 }}>Xin ch??o :</Text>
                        {
                            user.profile.userType == 1 ?
                                <>{ }
                                    <Text style={{ color: 'rgba(0,190,212,1)', fontSize: 22 }}>Admin</Text>
                                </>
                                :
                                <Text style={{ color: 'rgba(0,190,212,1)', fontSize: 22 }}>{user.profile.user.displayName}</Text>
                        }
                        <Text style={{ color: '#333', fontSize: 18 }}>Ng??y ????ng nh???p : {new Date().format('DD/MM/YYYY')}</Text>
                    </View>
                </View>



                {
                    API.isConnected != false ?
                        <View style={{ flex: 1, backgroundColor: '#fff' }}>
                            <View style={{ marginTop: 20, padding: 20, alignItems: 'flex-start' }}>
                                {
                                    [
                                        {
                                            label: 'Dashboard',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.homeOutline} />,
                                            onPress: () => navigate('Dashboard')
                                        },
                                        {
                                            label: 'Danh s??ch ????ng k?? th??ng tin l???n ?????u',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                            onPress: () => navigate('FirstRegister_List')
                                        },
                                        {
                                            label: 'Danh s??ch ?????i t?????ng NKT',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                            onPress: () => navigate('UpdateRegister_List')
                                        },
                                        {
                                            label: 'Danh s??ch c?? nhu c???u h??? tr???',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                            onPress: _onGoDanhSachNhuCauHoTro

                                        },
                                        {
                                            label: 'Qu???n l?? c???p/c???p l???i gi???y XNKT',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                            onPress: _onGoCapCapLaiXNKT
                                        },
                                        {
                                            label: 'B??o c??o th???ng k??',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.barChartOutline} />,
                                            onPress: _onGoReport
                                        },
                                        {
                                            label: 'Th??ng tin c?? nh??n',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                            onPress: _onNextEditUser
                                        },
                                        {
                                            label: '?????i m???t kh???u',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.lockClosedOutline} />,
                                            onPress: _onGoToPassword
                                        },
                                        {
                                            label: 'C??i ?????t v??n tay',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.fingerPrintOutline} />,
                                            onPress: _onGoToFingerPrint
                                        },
                                        {
                                            label: 'C??i ?????t gi???ng n??i',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.micOutline} />,
                                            onPress: _onGoToVoice
                                        },


                                        {
                                            label: 'L???ch s??? nh???n h??? tr???',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.mdPricetagOutline} />,
                                            onPress: _onGoLichSuNhanHoTro
                                        },

                                        {
                                            label: 'Li??n h???',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.phonePortraitOutline} />,
                                            onPress: () => { }
                                        },
                                        {
                                            label: 'H??? tr??? tr???c tuy???n',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.headsetOutline} />,
                                            onPress: _onGoToChatBot
                                        },
                                        // {
                                        //     label: 'H?????ng d???n s??? d???ng',
                                        //     icon: <Icon type='Ionicons' icon={IoniconsFont.readerOutline} />,
                                        //     onPress: _onGoToGiude
                                        // },
                                        {
                                            label: '????ng xu???t',
                                            icon: <Icon type='Ionicons' icon={IoniconsFont.logInOutline} />,
                                            onPress: _onGoToLogout
                                        },
                                    ].map((e, index) => (
                                        [
                                            index != 0 && <Divider key={index + 's'} />,
                                            <Button key={index} style={styles.wrap}
                                                onPress={e.onPress}
                                            >
                                                {e.icon}
                                                <Text numberOfLines={1} style={styles.text} tx={e.label} />
                                            </Button>
                                        ]
                                    ))
                                }
                            </View>
                        </View>
                        : <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={{ marginTop: 20, padding: 20, alignItems: 'flex-start' }}>
                            {
                                [
                                    {
                                        label: 'Danh s??ch ????ng k?? th??ng tin l???n ?????u',
                                        icon: <Icon type='Ionicons' icon={IoniconsFont.informationCircleOutline} />,
                                        onPress: () => navigate('FirstRegister_List')
                                    },
                                    {
                                        label: 'Dashboard',
                                        icon: <Icon type='Ionicons' icon={IoniconsFont.homeOutline} />,
                                        onPress: () => navigate('Dashboard')
                                    },
                                    {
                                        label: 'H?????ng d???n s??? d???ng',
                                        icon: <Icon type='Ionicons' icon={IoniconsFont.readerOutline} />,
                                        onPress: _onGoToGiude
                                    },
                                    {
                                        label: '????ng xu???t',
                                        icon: <Icon type='Ionicons' icon={IoniconsFont.logInOutline} />,
                                        onPress: _onGoToLogout
                                    },
                                ].map((e, index) => (
                                    [
                                        index != 0 && <Divider key={index + 's'} />,
                                        <Button key={index} style={styles.wrap}
                                            onPress={e.onPress}
                                        >
                                            {e.icon}
                                            <Text numberOfLines={1} style={styles.text} tx={e.label} />
                                        </Button>
                                    ]
                                ))
                            }
                        </View>
                    </View>
                }

            </ScrollView>
        </View>
    )
}

export default LeftMenu
