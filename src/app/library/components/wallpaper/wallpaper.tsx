import React from 'react';
import { Dimensions, Image, Platform, View } from 'react-native';
import { presets } from './wallpaper.presets';
import { WallpaperProps } from './wallpaper.props';
const defaultImage = require('./Image-bg.png');
const { width, height } = Dimensions.get('window');
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const {
    preset = 'stretch',
    useWrap = false,
    style: styleOverride,
    backgroundImage,
    bgKeyboard,
    bgProfile
  } = props;

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch;
  const style = { ...presetToUse, ...styleOverride };

  // figure out which image to use
  const source = backgroundImage || defaultImage;

  return useWrap === false ? (
    <Image source={source} />
  ) : (
      <View style={presets.wrap}>
        <Image source={source} style={{
          width: '100%',
          height: '100%'
        }} />
        {bgKeyboard && <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, height: 300, width: 400 }} />}
        {bgProfile && <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, height: Platform.OS === 'ios' ? height * 0.655 : height * 0.76, width: '100%' }} />}
      </View>
    );
}
