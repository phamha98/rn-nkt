import React, { useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { isAndroid } from '../../../../../common'
import { Header, Screen, Wallpaper } from '../../../../../library/components'
import DropDownHolder from '../../../../../library/utils/dropDownHolder'
import RestAPI from '../../../../../RestAPI'
import { FONT_14, typography } from '../../../../../themes'
import { Form } from './components'
import { ResetState } from './redux/action'
const draw = Platform.OS === 'android' ? true : false
export const ChangePassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.AppReducer);// get ra từ redux
    const goBack = () => {
        navigation.goBack();
    }
    const onSubmit = (value: any) => {
        var value;
        var confirm_NewPasswor = value.confirm_NewPassword;
        value = {
            UserID: user.profile.user.userID,
            Password: value.Password,
            NewPassword: value.NewPassword,

        };
        if (value.NewPassword == confirm_NewPasswor) {
            RestAPI.API_Change_PassWord(value)
                .then(response => {
                    console.log(response);
                    if (response.status == true) {
                        DropDownHolder.showSuccess(('Câp nhật thành công!'));
                        setTimeout(() => {
                            navigation.goBack();
                        }, 1000)
                    }
                    else {
                        DropDownHolder.showError(('Câp nhật thất bại!'));
                    }
                })
        }
        else {
            DropDownHolder.showSuccess(('Nhập sai mật khẩu!'));
        }

    }
    useEffect(() => {
        dispatch(ResetState())
    }, []);
    // CHANG_PASSWORD
    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'main:user:tvPassword'} />
                <View style={styles.body}>
                    <Form onSubmit={onSubmit} />
                </View>

            </Screen>
        </>
    )
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
    },
})
