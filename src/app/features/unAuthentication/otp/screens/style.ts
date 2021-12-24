import {StyleSheet, Platform, StatusBar} from 'react-native';
import {FONT_14, FONT_16, FONT_20, typography} from '../../../../themes';
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
  wrapRightIconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {paddingBottom: 0},
  content: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  sub: {marginTop: 15, fontSize: FONT_14, color: '#3D3D3D'},
});
