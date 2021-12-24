import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { isAndroid } from '../../../../common';
import { Header, Screen, Wallpaper } from '../../../../library/components';
import { FONT_14, typography } from '../../../../themes';
export const HuongDanSuDung = () => {
    return (
        <Screen>
            <Wallpaper useWrap={true} />
            <Header
                isBack={true}
                headerTx={'Hướng dẫn sử dụng'}
            />
            <View style={styles.body}>
                <WebView
                    startInLoadingState={true}
                    originWhitelist={['*']}
                    style={styles.web}
                    source={{ uri: 'http://nkt.btxh.gov.vn/DATA/HDSD/HDSD_NKT_CanBo_2019.htm' }}
                />
            </View>
        </Screen>
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
