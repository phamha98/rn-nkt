import {StyleSheet, Platform, StatusBar} from 'react-native';
import {typography, FONT_14} from '../../../../../themes';
export const styles = StyleSheet.create({
  background: {
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
          ? StatusBar.currentHeight - 10
          : StatusBar.currentHeight
        : 0,
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
    fontSize: FONT_14,
  },
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
  rightIconStyle: {
    tintColor: '#ffffff',
  },
});
