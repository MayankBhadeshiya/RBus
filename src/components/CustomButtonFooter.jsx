import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from '../constants/Colors';
import {useSelector} from 'react-redux';
import {windowWidth} from '../constants/Dimensions';

export default function CustomButtonFooter({onPress, buttonText}) {
  const selectedSeat = useSelector(
    state => state.busDetailReducer.selectedSeat,
  );
  const totalPrice = useSelector(state => state.busDetailReducer.Totalprice);

  return (
    <View>
      <View style={styles.innerContainer}>
        <Text style={styles.seattext}>
          {selectedSeat.length} seats |{' '}
          {selectedSeat.map((seat, index) => (
            <Text key={seat}>
              {seat}
              {index === selectedSeat.length - 1 ? '' : ', '}
            </Text>
          ))}
        </Text>
        <Text style={styles.priceText}>{totalPrice} ₹</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttontext}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    padding: 10,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  innerContainer: {
    width: windowWidth,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY100,
  },
  priceText: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: 16,
  },
  seattext: {
    color: COLORS.BLACK,
    width: (windowWidth / 3) * 2,
  },
});
