import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../';
import { viewPresets, textPresets } from './button.presets';
import { ButtonProps } from './button.props';
import { mergeAll, flatten } from 'ramda';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  );

  const content = children || <Text tx={tx} text={text} style={textStyle} />;

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content.constructor == String ?
        <Text style={[
          {},
          textStyleOverride
        ]}>
          {content}
        </Text>
        : content
      }
    </TouchableOpacity>
  );
}

const ButtonPrimary = (props) => {
  return (
    <Button
      {...props}
      style={[
        {
          backgroundColor: 'rgba(0,190,212,1)',
          borderRadius: 50,
          top: 0,
          width: '100%',
          height: 50
        },
        props.style
      ]}
    >
      <Text
        style={{
          fontWeight: 'bold'
        }}
      >
        {
          props.children
        }
      </Text>
    </Button>
  );
};

export { ButtonPrimary };
