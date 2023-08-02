import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../constants/Colors';

export default function SeatAllocationHeader({
  arrivalTime,
  departureTime,
  BusRoute,
  departure_date,
}) {
  const date = new Date(departure_date);
  return (
    <View style={styles.container}>
      <View style={styles.TimeAndDay}>
        <Text style={styles.blackText}>
          <Text style={styles.boldLetter}>{departureTime}</Text> - {arrivalTime}
        </Text>
        <Text style={styles.blackText}>
          {date.toLocaleDateString(undefined, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })}
        </Text>
      </View>
      <Text>{BusRoute}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.RED
  },
  TimeAndDay: {
    flexDirection: 'row',
    gap: 15,
  },
  boldLetter: {
    fontWeight: 'bold',
  },
  blackText:{
    color: COLORS.BLACK
  },
});
