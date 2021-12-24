import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Img, Text} from '../../../../../library/components';
import {typography, FONT_14} from '../../../../../themes';

export const Center = () => {
  return (
    <View style={styles.wrap}>
      <Img style={styles.img} source={'tick_success'} />
      <Text style={styles.text} tx={'registerSuccess:tvSub'} />
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  text: {
    fontFamily: typography.helveticaNeue_regular,
    fontSize: FONT_14,
    color: '#3D3D3D',
  },
  img: {
    resizeMode: 'contain',
    tintColor: '#979797',
  },
});
