import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Splash = () => {

  useEffect(() => {
    // run()
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator size='large' color='white' />
    </View>
  )
};
