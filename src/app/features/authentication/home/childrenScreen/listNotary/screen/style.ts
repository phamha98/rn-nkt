import { typography } from './../../../../../../themes/typography';
import { FONT_14 } from './../../../../../../themes/fontSize';
import { StyleSheet,Platform,StatusBar } from 'react-native';
const isAndroid = Platform.OS ==='android'?true:false

export const styles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    titleHeader: {
        fontSize: FONT_14,
        alignSelf: 'center',
        fontFamily: typography.helveticaNeue_bold,
        fontWeight:'bold'
    },
    header: {
        paddingTop: isAndroid?StatusBar.currentHeight?StatusBar.currentHeight+10:20:8,
        paddingBottom: isAndroid?10:20,
    },
    iconLeft: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 0,
    },
    viewMap: {
        flex: 3,
        backgroundColor: '#ffffff',
    },
    viewList: {
        overflow: 'hidden',
        flex: 2,
        backgroundColor: '#ffffff',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    flex2: {
        flex: 2,
        paddingLeft: 10,
    },
    flex3: {
        flex: 3,
        paddingHorizontal: 0,
    },
    searchLocation: {
        backgroundColor: 'transparent',
        paddingVertical: 5,
        width: '100%',
        position: 'absolute',
        top: 20,
        zIndex: 1,
        paddingHorizontal: 40
    },
    height60:{
        flex:3,
    },
    height40:{
        flex:2
    },
    wrapMap:{
        width:'100%',height:'100%',position:'absolute',backgroundColor:'transparent'
    },
    viewSearchData: {
        paddingHorizontal: 10,
        height: 130,
        overflow: 'hidden',
        paddingRight: 15,
        width: '100%',
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowSelect: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleInput: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 8,
        flexDirection: 'row', marginBottom: 8
    },

    viewLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: '100%'

    },
    iconSearch: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        tintColor: 'gray'
    },
    viewRight: {
        flex:1,
        justifyContent: 'center'

    },
    viewInputSearch: { height: 40, borderColor: 'gray', width: '100%' },
})
