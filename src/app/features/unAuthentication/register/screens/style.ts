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
    marginLeft: -25,
    fontSize: FONT_20,
    fontFamily: typography.helveticaNeue_regular,
  },
  header: {paddingBottom: 0},
  content: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  container: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  wrapRightIconStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wrapInput: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingBottom: 0,
    paddingRight: 40,
  },
  input: {
    // color: '#333333',
    // backgroundColor: '#F3F3F3',
    // fontSize: FONT_14,
    borderColor: '#f2f2f2',
    borderWidth: 0,
    paddingLeft: 3,
    borderBottomWidth:1
  },
  label:{
    color: 'black',
    paddingBottom: 15,
    paddingTop: 15,
    fontWeight:'700',

    flexDirection: 'row',
    
  },
  label_warrning:{
    fontSize:16,
    color: '#5e5e5f',
    fontStyle:'italic',

},
star:{
position: 'absolute',
color:'red',
left:'40%',
top:15,
fontWeight:'bold'
},
});
