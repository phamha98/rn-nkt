import React, { useRef, useState, useEffect } from 'react';

import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import { FONT_32, typography, FONT_25 } from '../../../../../themes';

// import { Container } from './styles';
const CODE_LENGTH = new Array(4).fill(0);

interface TextOTPProps {
  onChangeOTP: (value: string) => void
}

export const TextOTP = ({ onChangeOTP }: TextOTPProps) => {
  const _input = useRef(null);
  const [otp, setOtp] = useState('');
  const [values, setValues] = useState(otp.split(''));
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1,
  );
  const _handlePress = () => {
    _input.current.focus();
  };
  const _handleKeyPress = e => {
    if (e.nativeEvent.key === 'Backspace') {
      setOtp(otp.slice(0, otp.length - 1));
    }
  };
  const _handleFocus = () => {
    setFocused(true);
  };
  const _handleBlur = () => {
    setFocused(false);
  };
  const _handleChange = value => {
    if (otp.length >= CODE_LENGTH.length) {
      return;
    }
    setOtp((otp + value).slice(0, CODE_LENGTH.length));
  };
  useEffect(() => {
    setValues(otp.split(''));
    onChangeOTP && onChangeOTP(otp)
  }, [otp]);
  useEffect(() => {
    setSelectedIndex(
      values.length < CODE_LENGTH.length
        ? values.length
        : CODE_LENGTH.length - 1,
    );
  }, [values]);
  return (
    <TouchableWithoutFeedback onPress={_handlePress}>
      <View style={[styles.wrapperOtp]}>
        <TextInput
          onKeyPress={_handleKeyPress}
          onChangeText={_handleChange}
          underlineColorAndroid={'transparent'}
          onFocus={_handleFocus}
          onBlur={_handleBlur}
          keyboardType="numeric"
          value=""
          selectionColor="transparent"
          style={[styles.inputOtp]}
          ref={_input}
        />
        {CODE_LENGTH.map((v, index) => {
          return (
            <View
              key={index}
              style={[values[index] ? styles.displayOtpAc : styles.displayOtp]}>
              <Text style={styles.textVerify}>{values[index] || ''}</Text>
            </View>
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapperOtp: {
    paddingVertical: 25,
    flexDirection: 'row',
    position: 'relative',
    alignSelf: 'center',
  },
  textVerify: {
    color: '#018E42',
    fontFamily: typography.helveticaNeue_bold,
    fontSize: FONT_25,
    fontWeight: 'bold',
  },
  displayOtpAc: {
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
    height: 36,
    width: 36,
    marginRight: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  displayOtp: {
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
    height: 36,
    width: 36,
    marginRight: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  inputOtp: {
    opacity: 0,
    position: 'absolute',
    fontSize: FONT_32,
    color: 'transparent',
    top: 3,
    bottom: 0,
    width: 36,
    backgroundColor: 'transparent',
  },
});
