import {ImageStyle, ViewStyle, Dimensions} from 'react-native';

/**
 * All wallpaper will start off looking like this.
 */
export const BASE: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

/**
 * All the variations of wallpaper styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default wallpaper styles.
   */
  stretch: {
    ...BASE,
    opacity: 0.1,
    resizeMode: 'cover',
    width: null, // Have to set these to null because android ¯\_(ツ)_/¯
    height: null,
  } as ImageStyle,
  wrap: {
    ...BASE,
    backgroundColor: 'rgba(0,190,212,1)',
  } as ViewStyle,
};

/**
 * A list of preset names.
 */
export type WallpaperPresets = keyof typeof presets;
