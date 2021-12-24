import { ViewStyle } from 'react-native';
import { KeyboardOffsets, ScreenPresets } from './screen.presets';
import { SafeAreaViewForceInsetValue } from 'react-navigation';
interface ForceInsetProps {
  top?: SafeAreaViewForceInsetValue;
  bottom?: SafeAreaViewForceInsetValue;
  left?: SafeAreaViewForceInsetValue;
  right?: SafeAreaViewForceInsetValue;
  vertical?: SafeAreaViewForceInsetValue;
  horizontal?: SafeAreaViewForceInsetValue;
}
export interface ScreenProps {
  children?: React.ReactNode;

  style?: ViewStyle | ViewStyle[];

  preset?: ScreenPresets;

  backgroundColor?: string;

  statusBar?: 'light-content' | 'dark-content';

  unsafe?: boolean;

  keyboardOffset?: KeyboardOffsets;

  hidden?: boolean;

  statusColor?: string;

  draw?: boolean;

  drawBottom?: boolean;

  bottomIPX?: string;

  outer0?: ViewStyle;

  showVertical?: boolean;

  showHorizontal?: boolean;

  isScroll?: boolean;

  forceInset?: ForceInsetProps;
}
