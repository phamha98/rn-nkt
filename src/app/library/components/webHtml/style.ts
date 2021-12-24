import { StyleSheet, Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android' ? true : false
export const styles = StyleSheet.create({

    iconRightHeader: {
        tintColor: '#ffffff'
    },
    header: {
        paddingTop: isAndroid ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 15,
        paddingBottom: isAndroid ? 19 : 15,
        // backgroundColor:'rgb(131, 25, 19)'
    },
  web: {
    flex: 1,
  },
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // paddingHorizontal: 5,
        // paddingBottom: 10,
        paddingTop: 0,
    },
});
