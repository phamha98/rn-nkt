import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import NetworkInfo from '@react-native-community/netinfo';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../../app/themes/color';
import { ButtonRow } from '../../features/authentication/user/screen/components/index';
import { Button, Divider, Text } from '../../library/components';
import Icon from '../../library/components/iconVector/index';
import IoniconsFont from '../../library/components/iconVector/IoniconsFont';
import { FONT_14 } from '../../themes/fontSize';
import { navigate } from '../navigationService';
import ViewCus from '../../library/components/ViewCus/ViewCus';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager } from 'react-native-fbsdk';
import LocalStorage from '../../common/LocalStorage';
import { updateDataPostSaved } from '../../RestAPI';
import API from '../../RestAPI/index';
import { CHANGE_PASSWORD, EDIT_USER, LOGIN, RATING, LICHSUNHANHOTRO, TAB_PROFILE_CC, HUONGDANSUDUNGNGUOIDUNG, FINGERPRINT, VOICE, KHIEMTHI, DANGKYTHONGTIN,CHATBOT } from '../screenTypes';
import appleAuth from '@invertase/react-native-apple-authentication';
import { resetUserDetails } from '../../features/authentication/home/redux/action';
import { onResetDataXNKT } from '../../features/authentication/capgiayxnkt/redux/action';

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
const _onGoRequestToDisabilityCertificate = () => {
    navigate(TAB_PROFILE_CC);
};
const _onGoListFirtRegister = () => {
    navigate(RATING);
};
const _onGoListSupportRequest = () => {
    navigate(LICHSUNHANHOTRO);
};
const _onGoHuongDanSuDung = () => {
    navigate(HUONGDANSUDUNGNGUOIDUNG);
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
const _onDanhChoNguoiKhiemThi = () => {
    navigate(KHIEMTHI);
}
const _onDangKyThongTin = () => {
    navigate(DANGKYTHONGTIN);
}
const _onGoChatBot = () => {
    API.isConnected ? navigate(CHATBOT) : AlerOffline()
}
const AlerOffline = () => {
    ViewCus.Alert.Alert('Chức năng không được hỗ trợ khi Offline!');
  }
const signOut = async () => {
    if (await GoogleSignin.isSignedIn()) {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    }
};
const _onGoToLogout = () => {
    // navigate(LOGIN);
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
        signOut();
        try {
            LoginManager.logOut();
        } catch (error) {

        }
        navigate(LOGIN);

    }, null, 'Bạn chắc chắn muốn đăng xuất?')
}

const _onGoLichSuNhanHoTro = () => {
    navigate(LICHSUNHANHOTRO);
};


var isConnected = null;
const LeftMenu = (props) => {
    useEffect(() => {
    }, []);
    const user = useSelector(state => state.AppReducer);
    const dispatch = useDispatch();
    const _onGoToLogout = () => {
        // navigate(LOGIN);
        ViewCus.Alert.Confirm(() => {
            dispatch(onResetDataXNKT())
            dispatch(resetUserDetails())
            LocalStorage.setUserSaved(null)
            LocalStorage.setToken(null);
            LocalStorage.setDataLogin({
                username: "",
                password: "",
                isRemember: false
            });
            updateDataPostSaved([]);
            appleAuth.Operation.LOGOUT
            signOut();
            try {
                LoginManager.logOut();
            } catch (error) {

            }
            navigate(LOGIN);

        }, null, 'Bạn chắc chắn đăng xuất?')
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <ScrollView
                style={{
                    flex: 1,
                }}
            >
                <View style={{ backgroundColor: '#f1f7f8', height: 180, }}>
                    <View style={{ flex: 1, marginTop: 40, padding: 20 }}>
                        <Text style={{ color: '#333', fontSize: 18 }}>Xin chào :</Text>
                        {
                            user.profile.userType == 2 ?
                                <>{ }
                                    <Text style={{ color: 'rgba(0,190,212,1)', fontSize: 22 }}>Admin</Text>
                                </>
                                :
                                <Text style={{ color: 'rgba(0,190,212,1)', fontSize: 22 }}>{user?.profile?.user?.displayName}</Text>
                        }
                        <Text style={{ color: '#333', fontSize: 18 }}>Ngày đăng nhập : {new Date().format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
                {
                    API.isConnected != false ?
                        <View style={{ flex: 1, backgroundColor: '#fff' }}>
                            <View style={{ marginTop: 20, padding: 20, alignItems: 'flex-start' }}>
                                {
                                    user?.profile?.userType == 1 ?
                                        <>{ }
                                            <ButtonRow
                                                onPress={() => navigate('Dashboard')}
                                                index={1}
                                                icon={'user_1'}
                                                tx={'Dashboard'}

                                            />
                                            <Divider />
                                        </>
                                        :
                                        null
                                }

                                <Button style={styles.wrap} onPress={_onNextEditUser}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.informationCircleOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Thông tin cá nhân'} />
                                </Button>

                                <Divider />
                                {
                                    user?.profile?.userType == 1 ?
                                        <>{ }
                                            <ButtonRow
                                                onPress={_onGoRequestToDisabilityCertificate}
                                                index={1}
                                                icon={'tab_profileCC'}
                                                tx={'Danh sách cấp giấy xác nhận'}
                                            />
                                        </>
                                        :
                                        null
                                }
                                {
                                    user?.profile?.userType == 1 ?
                                        <>{ }
                                            <Divider />
                                            <ButtonRow
                                                onPress={_onGoListFirtRegister}
                                                index={1}
                                                icon={'logo_confirm'}
                                                tx={'Danh sách đăng ký thông tin lần đầu'}
                                            />
                                        </>
                                        :
                                        null
                                }
                                {
                                    user?.profile?.userType == 1 ?
                                        <>{ }
                                            <Divider />
                                            <ButtonRow
                                                onPress={_onGoListSupportRequest}
                                                index={1}
                                                icon={'user_1'}
                                                tx={'Danh sách có nhu cầu hỗ trợ'}
                                            />
                                        </>
                                        :
                                        null
                                }
                                <Divider />
                                <Button style={styles.wrap} onPress={_onGoToPassword}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.lockClosedOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Đổi mật khẩu'} />
                                </Button>
                                <Divider />
                                <Button style={styles.wrap} onPress={_onGoToFingerPrint}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.fingerPrintOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Cài đặt vân tay'} />
                                </Button>
                                <Divider />
                                <Button style={styles.wrap} onPress={_onGoToVoice}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.micOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Cài đặt giọng nói'} />
                                </Button>
                                {/* <Divider />
                                <Button style={styles.wrap} onPress={_onDanhChoNguoiKhiemThi}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.videocamOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Đăng ký nhu cầu hỗ trợ'} />
                                </Button> */}
                                {/* <Divider />
                                <Button style={styles.wrap} onPress={_onDangKyThongTin}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.ribbonOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Đăng ký thông tin dành Khiếm thị'} />
                                </Button> */}
                                <Divider />
                                <Button style={styles.wrap} onPress={_onGoLichSuNhanHoTro}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.mdPricetagOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Lịch sử nhận hỗ trợ'} />
                                </Button>
                                <Divider />
                                {/* <Button style={styles.wrap} onPress={_onGoHuongDanSuDung} >
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.bookmarkOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Hướng dẫn sử dụng'} />
                                </Button>  */}
                                
                                  <Button style={styles.wrap} onPress={_onGoChatBot} >
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.headsetOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Hỗ trợ trực tuyến'} />
                                </Button>
                                <Divider />
                                <Button style={styles.wrap} >
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.phonePortraitOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Liên hệ'} />
                                </Button>
                                <Divider />
                                <Button style={styles.wrap} onPress={_onGoToLogout}>
                                    <Icon
                                        type={'Ionicons'}
                                        color={color.palette.lightGrey}
                                        icon={IoniconsFont.logInOutline}
                                    />
                                    <Text numberOfLines={1} style={styles.text} tx={'Đăng xuất'} />
                                </Button>
                                <Divider />
                            </View>
                        </View> :

                        <View style={{ marginTop: 10, padding: 20, alignItems: 'flex-start' }}>
                            <Button style={styles.wrap} >
                                <Icon
                                    type={'Ionicons'}
                                    color={color.palette.lightGrey}
                                    icon={IoniconsFont.phonePortraitOutline}
                                />
                                <Text numberOfLines={1} style={styles.text} tx={'Liên hệ'} />
                            </Button>
                            <Divider />
                            <Button style={styles.wrap} onPress={_onGoToLogout}>
                                <Icon
                                    type={'Ionicons'}
                                    color={color.palette.lightGrey}
                                    icon={IoniconsFont.logInOutline}
                                />
                                <Text numberOfLines={1} style={styles.text} tx={'Đăng xuất'} />
                            </Button>
                            <Divider />
                        </View>

                }

            </ScrollView>
        </View>
    )
}

export default LeftMenu
