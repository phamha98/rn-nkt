import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { IconTypes } from '../../../assets/icon';

export interface HeaderProps {
  isMenu?: boolean;
  isBack?: boolean;
  isCreate?: boolean;
  /**
   * Main header, e.g. POWERED BY BOWSER
   */
  headerTx?: string;

  /**
   * header non-i18n
   */
  headerText?: string;

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes;

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void;

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes;

  childrenText?: React.ReactNode;

  childrenRight?: React.ReactNode;

  childrenLeft?: React.ReactNode;

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void;

  /**
   * Container style overrides.
   */
  style?: ViewStyle;

  /**
   * Title style overrides.
   */
  titleStyle?: TextStyle;

  wrapRightIconStyle?: ViewStyle | ViewStyle[];

  rightIconStyle?: ImageStyle | ImageStyle[];

  wrapLeftIconStyle?: ViewStyle | ViewStyle[];

  leftIconStyle?: ImageStyle | ImageStyle[];
  onGoBack: void
}
