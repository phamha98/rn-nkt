import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, InjectedFormProps, reduxForm } from 'redux-form';
import { GlobalStyle } from '../../../../../themes';
import { FONT_14, FONT_18 } from '../../../../../themes/fontSize';
const styles = StyleSheet.create({
  contentStyle: {
    paddingVertical: 5,
    paddingBottom: 45,
  },
  input: {
    borderColor: '#f2f2f2',
    borderWidth: 0,
    paddingLeft: 5,
    borderBottomWidth: 1,
    marginTop: 10
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    borderRadius: 50,
    marginTop: 20,
    top: 0,
    width: '100%',
    height: 50

  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_radio: {
    color: '#333',
    fontSize: 15,
  },
  viewBottom: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewLeft: {
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 50,
    elevation: 5,
    overflow: 'visible',
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  textDate: {
    color: '#333333',
    fontSize: FONT_18,
    fontStyle: 'normal',
    flex: 0.5,
    flexDirection: 'row'
  },

  textStartDate: {
    flex: 0.5,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row'

  },
});

export const ThongBao = reduxForm({ form: 'ThongBao' })(
  (props: ConfigProps & InjectedFormProps) => {
    
    return (
      <View style={[GlobalStyle.fullScreen]}>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#ddd',
            }}
          />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 5,
              margin: 10,
              ...GlobalStyle.boxShadow
            }}
          >
            
          </View>
        </ScrollView>
      </View>
    );
  },
);