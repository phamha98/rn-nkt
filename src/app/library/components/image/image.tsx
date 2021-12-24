import * as React from 'react';
import {View, Image, ImageStyle} from 'react-native';
import {ImageProps} from './image.props';
import {images} from '../../../assets/image';

const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export function Img(props: ImageProps) {
  const {style: styleOverride, source, containerStyle} = props;
  const style: ImageStyle = {...ROOT, ...styleOverride};

  return (
    <View style={containerStyle}>
      <Image style={style} source={images[source]} />
    </View>
  );
}
