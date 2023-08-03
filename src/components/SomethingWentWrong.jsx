import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/Colors';


const SomethingWentWrong = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error" size={100} color={COLORS.WHITE} />
      <Text style={styles.text}>Something Went Wrong</Text>
      <Text style={styles.description}>
        An error occurred while loading the content
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.RED,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
});

export default SomethingWentWrong;
