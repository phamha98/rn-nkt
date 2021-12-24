import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        top: 30,
        zIndex: 1,
        position: 'absolute',
        paddingBottom: 5,
        paddingTop: 5
    },
    iconBack: {
        tintColor: '#ffffff'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    wrapImageCaptured: {
        width: '100%',
        height: '100%',
        bottom: 20,
        left: 10,
        backgroundColor: 'transparent',
        // position: 'absolute',
        zIndex: 1,
        overflow: 'hidden'
    },
    imgCaptured: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    btnBack: {marginTop:25, backgroundColor: 'gray',justifyContent:'center', alignItems:'center',paddingRight: 0, borderRadius: 20, width: 40,height: 40}
})
