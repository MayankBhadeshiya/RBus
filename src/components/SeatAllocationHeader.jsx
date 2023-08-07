import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../constants/Colors';
import {useSelector} from 'react-redux';
import capitalizeString from '../util/capitalizeString';

export default function SeatAllocationHeader({
  arrivalTime,
  departureTime,
  departure_date,
}) {
  const date = new Date(departure_date);
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);

  const BusRoute = `${capitalizeString(routeDetail.start)} - ${capitalizeString(
    routeDetail.end,
  )}`;
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
    borderBottomColor: COLORS.RED,
  },
  TimeAndDay: {
    flexDirection: 'row',
    gap: 15,
  },
  boldLetter: {
    fontWeight: 'bold',
  },
  blackText: {
    color: COLORS.BLACK,
  },
});
