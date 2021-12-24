import React from 'react';
import { StyleSheet, View,Image ,TouchableHighlight} from 'react-native';
import { IconTypes } from '../../../../../assets/icon/index';
import { Button, Text, Icon } from '../../../../../library/components';
import { FONT_14, FONT_13, typography } from '../../../../../themes';


interface ButtonSocialProps {
  tx?: string;
  text?: string;
  icon?: IconTypes;
  onPress?: () => void;
  background?: string;
}

export const ButtonSocial = ({
  icon,
  background,
  onPress,
  text,
  tx,
}: ButtonSocialProps) => {
  return (
    <Button
      activeOpacity={0.7}
      style={[styles.wrap, { backgroundColor: background }]}
      onPress={onPress}>
      <View style={styles.row}>
        <Icon icon={icon} style={{ tintColor: '#00bed4' }} />
        <Text style={styles.text} tx={tx} text={text} />
      </View>
    </Button>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 15,
  
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: '#ffffff',
    paddingLeft: 10,
    fontFamily: typography.helveticaNeue_bold,
    fontSize: FONT_13,
  },
});
