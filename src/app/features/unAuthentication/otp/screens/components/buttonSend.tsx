import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Button, Text} from '../../../../../library/components';

interface ButtonSendProps {
  onPress: () => void;
}
export const ButtonSend = ({onPress}: ButtonSendProps) => {
  return (
    <Button activeOpacity={0.87} style={styles.wrap} onPress={onPress}>
      <Text tx={'otp:tvSend'} />
    </Button>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    paddingVertical: 15,
    marginBottom: 15,
  },
});
