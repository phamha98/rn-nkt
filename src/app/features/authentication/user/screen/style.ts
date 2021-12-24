import {Platform, StyleSheet,StatusBar,} from 'react-native';
import {FONT_16, typography, FONT_14} from '../../../../themes';
const PADDING_TOP = Platform.OS === 'android' ? 140 : 160;
export const styles = StyleSheet.create({
  wrapContent: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  viewPager: {
    flex: 1,
  },
  rowTab: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  content: {
   paddingTop: PADDING_TOP,
    backgroundColor: 'transparent',
    flex: 1,
  },
  scrollContent: {
    marginTop: -PADDING_TOP,
    flex: 1,
  },
  containerStyle: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  recTop: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
  },
  recBottom: {
    borderRadius: 5,
    marginTop: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  viewInfo: {
    zIndex:1000,
    height: PADDING_TOP - 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  border: {
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  avatarDefault: {
    height: 60,
    width: 60,
    borderRadius: 0,
  },
  wrapInfo: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 15
  },
  textName: {
    fontSize: FONT_16,
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#565656',
  },
  textPhone: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
    color: '#565656',
  },
  icon: {
    top: -15,
    width: 22,
    height: 22,
    tintColor: '#565656',
  },
  background: {
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
          ? StatusBar.currentHeight - 10
          : StatusBar.currentHeight
        : 0,
  },
});
