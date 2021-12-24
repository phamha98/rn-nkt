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
  header: {
    paddingVertical:0,
    paddingTop:0,
    paddingBottom:0
  },
  wrapRightIconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  content: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  wrapInput: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingBottom: 0,
    paddingRight: 40,
  },
  input: {
    color: '#333333',
    backgroundColor: '#F3F3F3',
    fontSize: FONT_14,
  },
  justify: {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 16,
    textAlign: 'justify',
  },
});
