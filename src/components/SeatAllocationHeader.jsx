import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/Colors';
import {useSelector} from 'react-redux';
import capitalizeString from '../util/capitalizeString';
import SleeperSeat from '../SeatUI/SleeperSeat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SeatAllocationHeader({
  arrivalTime,
  departureTime,
  departure_date,
}) {
  const date = new Date(departure_date);
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const [isShow, setIsShow] = useState(false);
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
      <View style={styles.routeContainer}>
        <Text>{BusRoute}</Text>
        <TouchableOpacity onPress={() => setIsShow(prev => !prev)}>
          <MaterialIcons name="info" size={20} color={COLORS.BLUE} />
        </TouchableOpacity>
      </View>
      {isShow && (
        <View style={styles.infocontainer}>
          <View style={styles.itemCenter}>
            <SleeperSeat selected={false} empty={false}></SleeperSeat>
            <Text style={styles.tagtext}>Booked</Text>
          </View>
          <View style={styles.itemCenter}>
            <SleeperSeat selected={false} empty={true}></SleeperSeat>
            <Text style={styles.tagtext}>Available</Text>
          </View>
          <View style={styles.itemCenter}>
            <SleeperSeat selected={true} empty={true}></SleeperSeat>
            <Text style={styles.tagtext}>Selected</Text>
          </View>
        </View>
      )}
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
  tagtext: {
    fontSize: 12,
    marginTop: 3,
    color: COLORS.BLACK,
  },
  infocontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemCenter: {alignItems: 'center'},
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
