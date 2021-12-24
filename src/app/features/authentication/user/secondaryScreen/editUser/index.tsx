import React from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Screen, Wallpaper } from '../../../../../library/components'
import DropDownHolder from '../../../../../library/utils/dropDownHolder'
import RestAPI from '../../../../../RestAPI'
import { EditUserActionTypes } from "../../../user/secondaryScreen/editUser/redux/type"
import { Form } from './components/form'
import { styles } from './style'
export const EditUser = (props: any) => {
    const { navigation } = props
    const { status }: EditUserActionTypes = useSelector(
        (state: any) => state.EditUserReducer
    );
    const dispatch = useDispatch();
    const { profile } = useSelector((state: any) => state.AppReducer);
    const validateNumber = (number: any) => {
        var numberRegex = /^[0-9]*$/;
        return numberRegex.test(number);
    };
    const validatePhone = (phone: any) => {
        var phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const onSubmit = (value: any) => {
        let ob = value;
        ob.UserID = profile.user.userID;
        RestAPI.EDIT_USER_API(value)
            .then(response => {
                console.log(response);
                if (response.status == true) {
                    DropDownHolder.showSuccess(('Câp nhật thành công!'));
                    setTimeout(() => {
                        navigation.goBack();
                    }, 1000)
                }
                else {
                    DropDownHolder.showSuccess(('Câp nhật thất bại!'));
                }
            })
    }
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'Thông tin cá nhân'} />
                <View style={styles.body}>
                    <ScrollView contentContainerStyle={styles.containerStyle} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <Form onSubmit={onSubmit} />
                    </ScrollView>
                </View>
            </Screen>
        </>
    )
}
