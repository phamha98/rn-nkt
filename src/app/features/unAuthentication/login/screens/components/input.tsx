import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { TextField, Button, Icon } from '../../../../../library/components';
import { typography, FONT_14 } from '../../../../../themes';
import {maxLength} from "../../../../../config/ruleForm";
interface InputProps {
  placeholderTx: string;
  placeholderColor: string;
  isSecurity: boolean;
  rightPress: () => void;
  maxLength: number;
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
}
export const Input = ({
  input: { onChange, value, ...restInput },
  meta: { touched, error },
  isSecurity = false,
  placeholderTx,
  rightPress,
  placeholderColor,
  maxLength,
}: InputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isSecurity);
  const onToggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const onChangeText = (value: string) => {
    onChange(value);
  };
  const onButtonPress = () => {
    if (isSecurity) {
      onToggleSecureTextEntry();
    } else {
      rightPress && rightPress();
    }
  };
  return (
    <View style={touched && error ? styles.wrapError : styles.wrap}>
      <TextField
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.textField}
        inputStyle={styles.input}
        onChangeText={onChangeText}
        autoCapitalize = 'none'
        selectionColor={'#F3F3F3'}
        placeholderTextColor={placeholderColor}
        placeholderTx={placeholderTx}
        maxLength={maxLength || 255}
        {...restInput}
      />
      <Button onPress={onButtonPress} style={styles.buttonRight}>
        <Icon
          icon={isSecurity ? (secureTextEntry ? 'eye' : 'eye_dis') : 'user'}
        />
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
    color:'#333'

  },
  textField: {
    paddingVertical: 0,
    flex: 1,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  wrapError: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#BA1B24',
  },
  buttonRight: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});
