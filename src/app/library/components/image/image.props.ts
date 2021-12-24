import {ImageStyle, ViewStyle} from 'react-native';
import {ImageTypes} from '../../../assets/image';

export interface ImageProps {
  /**
   * Style overrides for the icon image
   */
  style?: ImageStyle;

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle;

  /**
   * The name of the icon
   */

  source?: ImageTypes;
}
