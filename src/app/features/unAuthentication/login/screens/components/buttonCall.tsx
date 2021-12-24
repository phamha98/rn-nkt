import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from '../../../../../library/components';
import {typography, FONT_14} from '../../../../../themes';

interface ButtonCallProps {
  onPress: () => void;
  phone: string;
}

export const ButtonCall = ({onPress, phone}: ButtonCallProps) => {
  return (
    <Button style={styles.wrap} onPress={onPress}>
      <Text
        style={styles.text}
        tx={'login:tvHotline'}
        txOptions={{phone: phone}}
      />
    </Button>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 0,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  text: {
    color: '#3D3D3D',
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_bold,
  },
});
