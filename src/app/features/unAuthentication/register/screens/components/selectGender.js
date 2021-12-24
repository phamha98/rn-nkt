import React, {useState, useRef, useEffect} from 'react';
import {Text, Image, View, Animated, TextInput, StyleSheet} from 'react-native';
import R from '../../../../../assets/value';
import I18n from '../../../../../library/utils/i18n';
import {Radius} from '../../../../../library/components';
import {FONT_14, FONT_16, FONT_18} from '../../../../../themes/fontSize';
export const SelectGender = props => {
  const {
    placeholder,
    secureTextEntry,
    isNumber,
    disabled,
    onChangeText,
    meta: {touched, error},
    input: {onChange, value},
  } = props;
  const [select, setSelect] = useState(0);
  const onChangeSelect = val => {
    if (val) {
      setSelect(1);
      onChange(1);
    } else {
      setSelect(0);
      onChange(0);
    }
  };
  useEffect(() => {
    onChange(0);
  }, []);
  return (
    <View style={[styles.wrapInput]}>
      <Text
        allowFontScaling={false}
        style={[
          styles.labelStyle,
          {
            color: touched && error ? '#F3534A' : '#005ec5',
            // opacity: touched && error ? 1 : 0.56,
          },
        ]}>
        {placeholder && placeholder}
      </Text>
      <View style={[styles.rowGender]}>
        <View style={[styles.itemGender]}>
          <Radius
            title={I18n.t('register:lbMale')}
            selected={select === 1 ? true : false}
            value={true}
            setSelected={onChangeSelect}
          />
        </View>
        <View style={[styles.itemGender]}>
          <Radius
            title={I18n.t('register:lbFeMale')}
            selected={select === 0 ? true : false}
            value={false}
            setSelected={onChangeSelect}
          />
        </View>
      </View>
      {touched && error ? (
        <View style={[styles.lineError]} />
      ) : (
        <View style={[styles.line]} />
      )}
      {touched && error && (
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={[styles.textError]}>
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapInput: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rowGender: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  itemGender: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btnShowPass: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
  iconView: {
    resizeMode: 'contain',
  },
  wrapPlaceholder: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    bottom: 0,
    height: 20,
    zIndex: -1,
  },
  labelStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: R.fonts.HELVETICA_REGULAR,
    textAlign: 'left',
    marginBottom: 35,
    top: 18,
    color: '#333333',
    fontSize: FONT_18,
    fontWeight: 'bold',
    zIndex: -1,
  },
  textError: {
    color: '#F3534A',
    fontFamily: R.fonts.HELVETICA_REGULAR,
    fontSize: FONT_14,
    position: 'absolute',
    bottom: -17,
    width: '100%',
    textAlign: 'right',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#a4a4ac',
    marginTop: 5,
  },
  lineError: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3534A',
    marginTop: 5,
  },
  textInput: {
    padding: 0,
    width: '100%',
    textAlignVertical: 'bottom',
    paddingBottom: 0,
    fontSize: FONT_16,
    height: 24,
    fontFamily: R.fonts.HELVETICA_MEDIUM,
  },
});
