import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Text, Button} from '../../../../../library/components';
import {FONT_14, typography} from '../../../../../themes';
interface RowReSendProps {
  onPress: () => void;
}
export const RowReSend = ({onPress}: RowReSendProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.textNotOTp} tx={'otp:tvNotOTP'} />
      <Button preset={'link'} onPress={onPress}>
        <Text style={styles.textResend} tx={'otp:tvReSend'} />
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  textNotOTp: {
    fontSize: FONT_14,
    color: '#3D3D3D',
    fontFamily:typography.helveticaNeue_regular,
  },
  textResend: {fontSize: FONT_14, color: 'rgba(0,190,212,1)', fontFamily:typography.helveticaNeue_regular,},
});
