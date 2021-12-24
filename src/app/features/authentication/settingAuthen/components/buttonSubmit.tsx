import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from '../../../../library/components';
import {typography, FONT_14} from '../../../../themes';
interface ButtonLoginProps {
  onPress: () => void;
}
export const ButtonSubmit = ({onPress}: ButtonLoginProps) => {
  return (
    <Button style={styles.wrap} onPress={onPress}>
      <Text style={styles.text} tx={"Cập nhật"} />
    </Button>
  );
};
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    borderRadius: 50  ,
    marginTop: 20,
    flexDirection: 'row',
    width:'100%',
    height: 50
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_bold,
    
  },
});
