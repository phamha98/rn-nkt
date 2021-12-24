import {StyleSheet, StatusBar, Platform} from 'react-native';
import {FONT_14, typography, FONT_12} from '../../../../../themes';
export const styles = StyleSheet.create({
  background: {
    flex:1,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
          ? StatusBar.currentHeight - 10
          : StatusBar.currentHeight
        : 0,
  },
  titleHeader: {
    color:'#ffffff',
    fontFamily:typography.helveticaNeue_regular,
    fontSize:FONT_14,
    textAlign: 'center',
    paddingLeft: 0,
    marginLeft: -12,
    fontWeight:'bold'
  },
  textGreeting: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
  },
  textUser: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
  },
  wrapContent: {
    flex: 1,
    backgroundColor: '#ebebeb',
    marginTop: 0,
  },
  quickAction: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  titleTop: {
    marginBottom: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  paddingV10: {
    paddingVertical: 10,
  },
  marginH8: {
    marginHorizontal: 8,
  },
  marginV8: {
    marginVertical: 8,
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  wrapButtonRender: {
    flexWrap: 'wrap',
    paddingHorizontal: 3,
    flexDirection: 'row',
    paddingBottom:15
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  box1: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute', 
    left:"25%",
    borderBottomColor:'#fff',
    borderBottomWidth:10,
    zIndex:2
  
  },
  box2: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute', 
    left:0,
    top:100,
    borderRightColor:'#fff',
    borderRightWidth:10,
    zIndex:1
  },
  box3: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute', 
    right:15,
    top:100,
    borderBottomColor:'#fff',
    borderBottomWidth:10,
    zIndex:1
  },
  box4: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute', 
    left:100,
    top:200,
    borderBottomColor:'#fff',
    borderBottomWidth:10,
  
  },
  rightIconStyle: {
    tintColor: '#ffffff',
  },
  leftIconStyle: {
    tintColor: '#ffffff',
  },
  buttonText: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderColor: "#ccc"
  },
  txtitle: {
    fontSize: 18,
    color: '#333',
    paddingVertical: 10,
    fontWeight: '400',

  },
});
