import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/Colors';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RBus</Text>
      <Text style={{color: COLORS.GRAY500}}>
        Catch the Bus, Skip the Queue.
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: COLORS.GRAY500,
    fontWeight: 'bold',
  },
});