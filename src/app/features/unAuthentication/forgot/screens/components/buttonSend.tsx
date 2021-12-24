import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Button, Text } from '../../../../../library/components';

interface ButtonSendProps {
  onPress: () => void;
  disabled?: boolean;
}
export const ButtonSend = ({ onPress, disabled = false }: ButtonSendProps) => {
  return (
    <Button activeOpacity={disabled ? 1 : 0.87} disabled={disabled} style={[styles.wrap, disabled === true && styles.disabled]} onPress={onPress}>
      <Text tx={'forgot:tvSend'} />
    </Button>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(0,190,212,1)',
    paddingVertical: 15,
    marginBottom: 20,
    marginHorizontal: 24,
  },
  disabled: {
    opacity: 0.4
  }
});
