import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SleeperSeat from '../SeatUI/SleeperSeat';
import {useDispatch, useSelector} from 'react-redux';
import {busDetailActions} from '../redux/busDetails';

export default function SleeperLayout() {
  const booked = useSelector(state => state.busDetailReducer.bookedSeat);
  const selectedSeat = useSelector(
    state => state.busDetailReducer.selectedSeat,
  );
  const dispatch = useDispatch();
  const defultSeat = [
    {id: 1, empty: true, selected: false},
    {id: 2, empty: true, selected: false},
    {id: 3, empty: true, selected: false},
    {id: 4, empty: true, selected: false},
    {id: 5, empty: true, selected: false},
    {id: 6, empty: true, selected: false},
    {id: 7, empty: true, selected: false},
    {id: 8, empty: true, selected: false},
    {id: 9, empty: true, selected: false},
    {id: 10, empty: true, selected: false},
    {id: 11, empty: true, selected: false},
    {id: 12, empty: true, selected: false},
    {id: 13, empty: true, selected: false},
    {id: 14, empty: true, selected: false},
    {id: 15, empty: true, selected: false},
    {id: 16, empty: true, selected: false},
    {id: 17, empty: true, selected: false},
    {id: 18, empty: true, selected: false},
    {id: 19, empty: true, selected: false},
    {id: 20, empty: true, selected: false},
    {id: 21, empty: true, selected: false},
    {id: 22, empty: true, selected: false},
    {id: 23, empty: true, selected: false},
    {id: 24, empty: true, selected: false},
    {id: 25, empty: true, selected: false},
    {id: 26, empty: true, selected: false},
    {id: 27, empty: true, selected: false},
    {id: 28, empty: true, selected: false},
    {id: 29, empty: true, selected: false},
    {id: 30, empty: true, selected: false},
    {id: 31, empty: true, selected: false},
    {id: 32, empty: true, selected: false},
    {id: 33, empty: true, selected: false},
    {id: 34, empty: true, selected: false},
    {id: 35, empty: true, selected: false},
    {id: 36, empty: true, selected: false},
  ];
  const [seats, setSeats] = useState([]);
  const row1 = seats.filter((item, index) => index >= 0 && index % 6 === 0);
  const row2 = seats.filter(
    (item, index) => index >= 1 && (index - 1) % 6 === 0,
  );
  const row3 = seats.filter(
    (item, index) => index >= 2 && (index - 2) % 6 === 0,
  );
  const row4 = seats.filter(
    (item, index) => index >= 3 && (index - 3) % 6 === 0,
  );
  const row5 = seats.filter(
    (item, index) => index >= 4 && (index - 4) % 6 === 0,
  );
  const row6 = seats.filter(
    (item, index) => index >= 5 && (index - 5) % 6 === 0,
  );
  useEffect(() => {
    updatedData = defultSeat.map(seat => {
      (seat = booked.includes(seat.id)
        ? {
            ...seat,
            empty: false,
          }
        : seat),
        (seat = selectedSeat.includes(seat.id)
          ? {
              ...seat,
              selected: true,
            }
          : seat);
      return seat;
    });
    setSeats(updatedData);
  }, [booked]);
  const handleSeatPress = seatId => {
    dispatch(busDetailActions.onselect(seatId));
    const updatedSeats = seats.map(seat =>
      seat.id === seatId
        ? {
            ...seat,
            selected: seat.empty ? !seat.selected : false,
          }
        : seat,
    );
    setSeats(updatedSeats);
  };
  return (
    <View style={styles.outerconainer}>
      <View>
        <View style={styles.lablecontainer}>
          <Text>Lower</Text>
          <MaterialCommunityIcons
            name="steering"
            color={COLORS.BLACK}
            size={25}></MaterialCommunityIcons>
        </View>
        <View style={styles.seatcontainer}>
          <View>
            {row1.map(seat => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={seat.id}
                  style={styles.seat}
                  onPress={
                    seat.empty ? handleSeatPress.bind(this, seat.id) : null
                  }>
                  <SleeperSeat
                    selected={seat.selected}
                    empty={seat.empty}></SleeperSeat>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              {row2.map(seat => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={seat.id}
                    style={styles.seat}
                    onPress={
                      seat.empty ? handleSeatPress.bind(this, seat.id) : null
                    }>
                    <SleeperSeat
                      selected={seat.selected}
                      empty={seat.empty}></SleeperSeat>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              {row3.map(seat => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={seat.id}
                    style={styles.seat}
                    onPress={
                      seat.empty ? handleSeatPress.bind(this, seat.id) : null
                    }>
                    <SleeperSeat
                      selected={seat.selected}
                      empty={seat.empty}></SleeperSeat>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.lablecontainer}>
          <Text>Upper</Text>
        </View>
        <View style={styles.seatcontainer}>
          <View>
            {row4.map(seat => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={seat.id}
                  style={styles.seat}
                  onPress={
                    seat.empty ? handleSeatPress.bind(this, seat.id) : null
                  }>
                  <SleeperSeat
                    selected={seat.selected}
                    empty={seat.empty}></SleeperSeat>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              {row5.map(seat => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={seat.id}
                    style={styles.seat}
                    onPress={
                      seat.empty ? handleSeatPress.bind(this, seat.id) : null
                    }>
                    <SleeperSeat
                      selected={seat.selected}
                      empty={seat.empty}></SleeperSeat>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              {row6.map(seat => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={seat.id}
                    style={styles.seat}
                    onPress={
                      seat.empty ? handleSeatPress.bind(this, seat.id) : null
                    }>
                    <SleeperSeat
                      selected={seat.selected}
                      empty={seat.empty}></SleeperSeat>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outerconainer: {
    flexDirection: 'row',
    gap: 20,
  },
  lablecontainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 15,
    height: 40,
  },
  seatcontainer: {borderWidth: 1, flexDirection: 'row', gap: 30, padding: 10},
  seat: {margin: 3},
});
