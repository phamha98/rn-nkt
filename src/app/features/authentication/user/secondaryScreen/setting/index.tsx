import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { isAndroid } from '../../../../../common'
import { Header, Screen, Wallpaper } from '../../../../../library/components'
import { navigate } from '../../../../../navigation/navigationService'
import { CHANGE_PASSWORD } from '../../../../../navigation/screenTypes'
import { FONT_14, typography } from '../../../../../themes'
import { ButtonRow } from './components/buttonRow'
export const Setting = ({ navigation }) => {
    const dispatch = useDispatch();


    const goBack = () => {
        navigation.goBack();
    }
    const _onGoToPassword = () => {
        navigate(CHANGE_PASSWORD);
    }

    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'main:user:tvSetting'} />
                <View style={styles.body}>
                    <ButtonRow
                        onPress={_onGoToPassword}
                        index={1}
                        icon={'privacy'}
                        tx={'main:user:tvPassword'}
                    />
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
