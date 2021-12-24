import { StyleSheet, Platform, StatusBar } from 'react-native';

import { FONT_14, typography } from '../../../../../themes'
const isAndroid = Platform.OS === 'android' ? true : false
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
        fontWeight:'bold'
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
