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
    textAlign: 'center',
    marginLeft: 0,
    fontSize: FONT_16,
    fontFamily: typography.helveticaNeue_medium,
  },
  header: {
    paddingVertical:0,
    paddingTop:10,
    paddingBottom:10
  },
  wrapRightIconStyle: {
    paddingHorizontal: 0,
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
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    marginHorizontal:24,
    paddingVertical: 15,
    marginBottom: 30,
  },
  justify: {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 16,
    textAlign: 'justify',
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
        padding: 10
    },
});
