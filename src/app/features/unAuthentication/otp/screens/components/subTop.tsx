import React from 'react';

import { View, StyleSheet } from 'react-native';
import { FONT_14, typography } from '../../../../../themes';

import { Text } from '../../../../../library/components';

export const SubTop = () => {
  return (
    <View>
      <Text style={styles.sub} tx={'otp:tvSub'} />
      <Text style={styles.sub} tx={'otp:tvWarn'} />
    </View>
  );
};

const styles = StyleSheet.create({
  sub: {
    marginTop: 15,
    fontSize: FONT_14,
    color: '#3D3D3D',
     fontFamily: typography.helveticaNeue_regular,
  },
});
