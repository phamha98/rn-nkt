import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { TextField, Button, Icon } from '../../../../../library/components';
import { typography, FONT_14 } from '../../../../../themes';
interface InputProps {
  placeholderTx: string;
  placeholderColor: string;
  isSecurity: boolean;
  rightPress: () => void;
  type: string;
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
  type,
  maxLength,
  placeholderColor,
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
        useTitle={false}
        secureTextEntry={secureTextEntry}
        style={styles.textField}
        inputStyle={styles.input}
        onChangeText={onChangeText}
        autoCapitalize = 'none'
        selectionColor={'#8C8C8C'}
        placeholderTextColor={placeholderColor}
        placeholderTx={placeholderTx}
        keyboardType={type ?? 'default'}
        maxLength={maxLength ?? 255}
        {...restInput}
      />
      {isSecurity === true && (
        <Button onPress={onButtonPress} style={styles.buttonRight}>
          <Icon
            style={styles.icon}
            icon={secureTextEntry ? 'eye' : 'eye_dis'}
          />
        </Button>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    fontSize: FONT_14,
    paddingLeft: 10,
    color: '#8C8C8C',
    fontFamily: typography.helveticaNeue_regular,
  },
  textField: {
    paddingVertical: 0,
    flex: 1,
  },
  icon: {
    resizeMode: 'contain',
    tintColor: '#6F6F6F',
  },
  wrap: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  wrapError: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#F3F3F3',
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
