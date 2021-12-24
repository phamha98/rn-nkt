import { StyleSheet, Platform, StatusBar } from 'react-native';
import { FONT_14, FONT_16, FONT_20, typography } from '../../../../themes';
export const styles = StyleSheet.create({
  background: {
    zIndex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleHeader: {
    color: '#3D3D3D',
    textAlign: 'left',
    marginLeft: -28,
    fontSize: FONT_20,
    fontFamily: typography.helveticaNeue_regular,
  },
  sub: {
    color: '#3D3D3D',
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
  },
  content: {
    paddingHorizontal: 20,
  },
  wrapRightIconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wrapInput: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  input: {
    paddingLeft: 10,
    color: '#333333',
    backgroundColor: '#F3F3F3',
    fontFamily: typography.helveticaNeue_regular,
    fontSize: FONT_14,
  },
});
