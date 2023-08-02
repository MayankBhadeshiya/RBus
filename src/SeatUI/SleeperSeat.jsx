import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/Colors';

export default function SleeperSeat({selected, empty}) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !empty
            ? COLORS.GRAY300
            : selected
            ? COLORS.SUCCESS
            : COLORS.WHITE,
        },
      ]}>
      <View style={styles.innerContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 30,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: COLORS.GRAY500,
  },
  innerContainer: {
    borderWidth: 1,
    width: 20,
    height: 5,
    marginBottom: 3,
    borderColor: COLORS.GRAY500,
  },
});