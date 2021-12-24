import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { isAndroid } from '../../../../common';
import { Header, Screen, Wallpaper } from '../../../../library/components';
import { FONT_14, typography } from '../../../../themes';
export const Report = (props: any, navigation) => {
    const user = useSelector(state => state.AppReducer.profile.user);
    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'Báo cáo'}
                />
                <View style={styles.body}>
                    <WebView
                        startInLoadingState={true}
                        originWhitelist={['*']}
                        style={styles.web}
                        source={{ uri: 'http://nkt.btxh.gov.vn/dm_baocao/Mindex?token=' + user.token }}
                    />
                </View>
            </Screen>
        </>
    );
};
const styles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ddd',
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
        width: '100%'
    },
    web: {
        flex: 1,
    },
})
