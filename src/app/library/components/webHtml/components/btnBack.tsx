import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon} from '../..';
interface ButtonBackProps {
  onPress : () => void,
}
export const ButtonBack = ({onPress} : ButtonBackProps) => {
  return (
    <Button  onPress={onPress} style={styles.btn}>
      <Icon icon={'BUTTON_BACK'} style={styles.icon} />
    </Button>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
  },
  icon: {
    resizeMode: 'contain',
    tintColor: '#ffffff',
    width: 30,
    height: 20
  },
});
