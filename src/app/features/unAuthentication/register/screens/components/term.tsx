import React, {useRef} from 'react';

import {View, StyleSheet} from 'react-native';
import {Text, Button} from '../../../../../library/components';
import {translate} from '../../../../../library/utils/i18n/translate';
import {FONT_14, typography} from '../../../../..//themes';

interface TermProps {
  onPress: () => void;
}
export const Term = ({onPress}: TermProps) => {
  return (
    <Text style={styles.text}>
      {translate('register:tvDes')}
      <Text
        onPress={onPress}
        style={[styles.textLink]}
        tx={'register:tvTerm'}
      />
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
    color: '#3D3D3D',
  },
  textLink: {
    fontSize: FONT_14,
    fontFamily: typography.helveticaNeue_regular,
    color: 'rgba(0,190,212,1)',
  },
});
