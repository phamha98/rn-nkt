import {StyleSheet, Platform, StatusBar} from 'react-native';
import {FONT_14, typography} from '../../../../themes';
export const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {},
  content: {
    flex: 1,
    borderTopRightRadius: 5,
    borderTopStartRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_bold,
  },
});
