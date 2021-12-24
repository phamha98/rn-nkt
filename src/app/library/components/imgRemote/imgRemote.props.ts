import {ImageStyle} from 'react-native';
import {ImageTypes} from '../../../assets/image';
export interface ImageRemoteProps {
  style?: ImageStyle | ImageStyle[];
  source: string;
  sourceDefault?:ImageTypes;
  styleDefault?: ImageStyle | ImageStyle[];
}
