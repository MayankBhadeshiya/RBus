import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SleeperSeat from '../SeatUI/SleeperSeat';

export default function SleeperLayout({booked}) {
  const [row1, setRow1] = useState([
    {id: 1, empty: true, selected: false},
    {id: 7, empty: true, selected: false},
    {id: 13, empty: true, selected: false},
    {id: 19, empty: true, selected: false},
    {id: 25, empty: true, selected: false},
    {id: 31, empty: true, selected: false},
  ]);

  const [row2, setRow2] = useState([
    {id: 2, empty: true, selected: false},
    {id: 3, empty: true, selected: false},
    {id: 8, empty: true, selected: false},
    {id: 9, empty: true, selected: false},
    {id: 14, empty: true, selected: false},
    {id: 15, empty: true, selected: false},
    {id: 20, empty: true, selected: false},
    {id: 21, empty: true, selected: false},
    {id: 26, empty: true, selected: false},
    {id: 27, empty: true, selected: false},
    {id: 32, empty: true, selected: false},
    {id: 33, empty: true, selected: false},
  ]);

  const [row3, setRow3] = useState([
    {id: 4, empty: true, selected: false},
    {id: 10, empty: true, selected: false},
    {id: 16, empty: true, selected: false},
    {id: 22, empty: true, selected: false},
    {id: 28, empty: true, selected: false},
    {id: 34, empty: true, selected: false},
  ]);

  const [row4, setRow4] = useState([
    {id: 5, empty: true, selected: false},
    {id: 6, empty: true, selected: false},
    {id: 11, empty: true, selected: false},
    {id: 12, empty: true, selected: false},
    {id: 17, empty: true, selected: false},
    {id: 18, empty: true, selected: false},
    {id: 23, empty: true, selected: false},
    {id: 24, empty: true, selected: false},
    {id: 29, empty: true, selected: false},
    {id: 30, empty: true, selected: false},
    {id: 35, empty: true, selected: false},
    {id: 36, empty: true, selected: false},
  ]);
  useEffect(()=>{
   updatedRow1 = row1.map(seat =>
     booked.includes(seat.id)
       ? {
           ...seat,
           empty : false,
         }
       : seat,
   );
   setRow1(updatedRow1);

   updatedRow2 = row2.map(seat =>
     booked.includes(seat.id)
       ? {
           ...seat,
           empty: false,
         }
       : seat,
   );
   setRow2(updatedRow2);

   updatedRow3 = row3.map(seat =>
     booked.includes(seat.id)
       ? {
           ...seat,
           empty: false,
         }
       : seat,
   );
   setRow3(updatedRow3);

   updatedRow4 = row4.map(seat =>
     booked.includes(seat.id)
       ? {
           ...seat,
           empty: false,
         }
       : seat,
   );
   setRow4(updatedRow4);
  },[booked])
  const handleSeatPress = (seatId, row ,setRow) => {
    // Update the seat status when a seat is pressed
    const updatedSeats = row.map(seat =>
      seat.id === seatId
        ? {
            ...seat,
            selected: seat.empty ? !seat.selected : false,
          }
        : seat,
    );
    setRow(updatedSeats);
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
            <FlatList
              data={row1}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.seat}
                  onPress={handleSeatPress.bind(this, item.id, row1, setRow1)}>
                  <SleeperSeat
                    selected={item.selected}
                    empty={item.empty}></SleeperSeat>
                </TouchableOpacity>
              )}></FlatList>
          </View>
          <View>
            <FlatList
              data={row2}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.seat}
                  onPress={handleSeatPress.bind(this, item.id, row2, setRow2)}>
                  <SleeperSeat
                    selected={item.selected}
                    empty={item.empty}></SleeperSeat>
                </TouchableOpacity>
              )}></FlatList>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.lablecontainer}>
          <Text>Upper</Text>
        </View>
        <View style={styles.seatcontainer}>
          <View>
            <FlatList
              data={row3}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.seat}
                  onPress={handleSeatPress.bind(this, item.id, row3, setRow3)}>
                  <SleeperSeat
                    selected={item.selected}
                    empty={item.empty}></SleeperSeat>
                </TouchableOpacity>
              )}></FlatList>
          </View>
          <View>
            <FlatList
              data={row4}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.seat}
                  onPress={handleSeatPress.bind(this, item.id, row4, setRow4)}>
                  <SleeperSeat
                    selected={item.selected}
                    empty={item.empty}></SleeperSeat>
                </TouchableOpacity>
              )}></FlatList>
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
