import { StyleSheet, Platform, StatusBar } from 'react-native';
import { typography, FONT_14 } from '../../../../themes';
export const styles = StyleSheet.create({
  background: {
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
          ? StatusBar.currentHeight - 10
          : StatusBar.currentHeight
        : 0,
  },
  rightIconStyle: {
    color: '#fff'
  },
  titleHeaderChat: {
    // textAlign: 'center',
    fontFamily: typography.helveticaNeue_bold,
    color: '#565656',
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
  },
  wrapContent: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  viewPager: {
    flex: 1,
  },
  rowTab: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
});
