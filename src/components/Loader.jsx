import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../constants/Colors';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={COLORS.RED} />
    </View>
  );
}