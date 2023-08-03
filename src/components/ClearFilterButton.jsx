import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../constants/Colors';

export default function ClearFilterButton({onPress}) {
  return (
    <View style={styles.container}>
      <Text style={styles.labletext}>Clear Filter To See All the Buses</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Clear All Filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  labletext: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});
