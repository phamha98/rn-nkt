import {typography} from './../../../../themes/typography';
import {FONT_14} from './../../../../themes/fontSize';
import {StyleSheet, StatusBar, Dimensions, Platform} from 'react-native';
import { color } from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
  },
  wallpaper: {
    width: width,
    height: height,
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 100, height: 100,
    marginTop: 40,
  },
  title: {
    fontSize: FONT_14,
    letterSpacing: 0.16,
    marginTop: 44,
    fontWeight: 'bold',
    fontFamily: typography.helveticaNeue_bold,
  },
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  wrapForm: {
    paddingHorizontal: 28,
  },
  wrapSocial: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginTop: 15,
    paddingTop:13,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 28,
  },
  appleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 20,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 20,
      paddingVertical: 15,
      height: 50 
  },
  input:{
    // textAlign: 'center', alignSelf: 'stretch', fontSize: 36, fontWeight: '700', textTransform: 'uppercase', marginTop: 10,
    borderColor: '#f2f2f2',
    borderWidth: 0,
    paddingLeft: 10,
    borderBottomWidth:1,
  }
});
