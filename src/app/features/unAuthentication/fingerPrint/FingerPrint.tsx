'use strict';
import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    Text
} from 'react-native';
import TouchID from 'react-native-touch-id'
import { Button, IoniconsFont } from '../../../library/components';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import AsyncStorage from '@react-native-community/async-storage';
import RestAPI from '../../../RestAPI';
import { useDispatch } from 'react-redux';
import LocalStorage from '../../../common/LocalStorage';
import { navigate } from '../../../navigation/navigationService';
import { AUTHORIZE, AUTHORIZE_MANAGER, FORGOT } from '../../../navigation/screenTypes';
import DeviceInfo from 'react-native-device-info';
import { setHomeUserDetails } from '../../authentication/home/redux/action';
import { onSetToken, onSetUser } from '../../../store/app_redux/action';

export const FingerPrint = (props: any) => {
    const dispatch = useDispatch();
    const authenticate = () => {
        return TouchID.authenticate()
            .then(success => {
                LoginFingerPrint();
            })
            .catch(error => {
                console.log(error)
                ViewCus.Alert.Alert(error.message);
            });
    }
    const clickHandler = () => {
        TouchID.isSupported()
            .then(authenticate)
            .catch(error => {
                ViewCus.Alert.Alert('Thiết bị không được hỗ trợ, hoặc chưa cài đặt vân tay');
            });
    }

    const LoginFingerPrint = () => {
        AsyncStorage.getItem('dataUserLocal').then(async (value) => {
            var DeviceID = DeviceInfo.getUniqueId().toString();
            let data = JSON.parse(value)
            let username = data.user.username
            var resp = await RestAPI.LoginFingerPrint({
                "Username": username,
                "UUID": DeviceID
            });
            if (resp.status == 0 && resp.user != null) {
                console.log(resp)
                dispatch(setHomeUserDetails(resp?.user))
                // dispatch(onSetToken(resp?.token));
                dispatch(onSetUser(resp));
                LocalStorage.setToken(resp?.token);
                LocalStorage.setUserSaved(resp);
                if (resp.user?.capQuanLy == 7)
                    navigate('CHOOSE_FUNCTION');
                else
                    navigate(AUTHORIZE_MANAGER);
            }
            else {
                ViewCus.Alert.Alert('Vui lòng cài đặt vân tay hoặc faceID để sử dụng chức năng này');
            }
        }).then(res => {
            //do something else
        });
    }
    return (
        <View style={styles.container}>
            {/* <Button
                style={styles.btn}
                onPress={clickHandler}
            >
                <ViewCus.Ionicons icon={IoniconsFont.fingerPrint} color={'#00bed4'} />

            </Button> */}
            <TouchableHighlight onPress={clickHandler}>
                <Image style={styles.button} source={require('../../../assets/icon/fingerPrint.png')} />
            </TouchableHighlight>
            <Text style={{ fontSize: 16,  color: '#333',marginVertical:10}}>{'Vân tay'}</Text>
        </View>

    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: 'transparent',
        borderColor: '#00bed4',
        borderWidth: 1,
        borderRadius: 10

    },
    button:{
        width:40,
        height:40
    }
});