import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from '../../../../../library/components';
import { typography, FONT_14 } from '../../../../../themes';

interface ButtonForgotProps {
  onPress: () => void;
}

export const ButtonForgot = ({onPress}: ButtonForgotProps) => {
  return (
    <Button style={styles.wrap} onPress={onPress}>
      <Text style={styles.text} tx={'login:tvForgot'} />
    </Button>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 0,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  text:{
    color:'#333',
    marginTop:10,
    marginBottom:10,
    
  }
});
