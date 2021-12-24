import * as React from 'react';
import { View, TextInput, TextStyle, ViewStyle } from 'react-native';
import { color, spacing, } from '../../../themes';
import { translate } from '../../utils/i18n/translate';
import { Text } from '../';
import { TextFieldProps } from './text-field.props';
import { mergeAll, flatten } from 'ramda';
import { _onChange_Alias } from 'src/app/common';
import { FONT_12,FONT_18,FONT_16 ,typography, FONT_14 } from '../../../themes'
// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[1],
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.helveticaNeue_regular,
  color: 'black',
  minHeight: 30,
  fontSize: FONT_14,
  backgroundColor: 'transparent',
  borderBottomWidth:0.5,
  borderBottomColor:'#ccc'
};

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

/**
 * A component which has a label and an input together.
 */
export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    labelStyle,
    useTitle = true,
    // value,
    value,
    onChangeText,
    ...rest
  } = props;

  const [_value, setValue] = React.useState(value)
  React.useEffect(() => {
    setValue(value);
  }, [value])
  React.useEffect(() => {
    if (props.input != null) {
      setValue(props.input.value);
    }
  }, [props.input])

  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] };
  containerStyle = enhance(containerStyle, styleOverride);

  let inputStyle: TextStyle = INPUT;
  inputStyle = enhance(inputStyle, inputStyleOverride);
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  var _onChangeText = (t) => {
    onChangeText != null && onChangeText(t);
    props.input != null && props.input.onChange != null && props.input.onChange(t);
  }

  return (
    <View style={containerStyle}>
      {useTitle === true && (
        <Text style={labelStyle} preset="fieldLabel" tx={labelTx} text={label} />
      )}
      <TextInput
        allowFontScaling={false}
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        onChangeText={t => _onChangeText(t)}
        value={_value}
        style={[{color: 'black'},inputStyle]}
        ref={forwardedRef}
      />
    </View>
  );
};
