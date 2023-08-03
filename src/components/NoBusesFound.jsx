import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/Colors';

const NoBusesFound = () => {
  return (
    <View style={styles.main}>
      <MaterialIcons name="bus-alert" size={100} color={COLORS.RED} />
      <Text style={styles.text}>Oops! No buses found.</Text>
      <Text style={styles.description}>No routes available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.RED,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.RED,
  },
});

export default NoBusesFound;
