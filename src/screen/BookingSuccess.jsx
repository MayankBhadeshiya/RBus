import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {busDetailActions} from '../redux/busDetails';
import {busListActions} from '../redux/BusList';
import {seatBookingActions} from '../redux/seatBooking';
import {sortAndFiltersActions} from '../redux/sortAndFilters';

export default function BookingSuccess({navigation, route}) {
  const {paymentId, ticket_id} = route.params;
  const dispatch = useDispatch();
  const backToHome = () => {
    dispatch(busDetailActions.setClear());
    dispatch(busListActions.setClear());
    dispatch(seatBookingActions.setClear());
    dispatch(sortAndFiltersActions.setClear());
    navigation.navigate('Tab Nav');
  };

  return (
    <SafeAreaView>
      <View style={styles.status}>
        <Text style={styles.statusText}>Booking Status</Text>
      </View>
      <View style={styles.conformContainer}>
        <MaterialIcons
          name="check-circle-outline"
          size={100}
          color={COLORS.SUCCESS}
        />
        <Text style={styles.conformText}>BOOKING CONFIRMED</Text>
        <Text style={styles.emailText}>
          Soon you will receive an email confirming your booking details.
        </Text>
        <View style={styles.idContainer}>
          <Text>Payment ID :- </Text>
          <Text>{paymentId}</Text>
        </View>
        <View style={styles.idContainer}>
          <Text>Ticket ID :- </Text>
          <Text>{ticket_id}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={backToHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  status: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statusText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 18,
  },
  conformContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 10,
  },
  conformText: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  idContainer: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: COLORS.GRAY200,
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: COLORS.BLACK,
  },
  emailText:{
    marginHorizontal: 10,
    textAlign: 'center',
    marginBottom:15,
    color: COLORS.BLACK
  }
});
