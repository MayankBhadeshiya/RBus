import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {busDetailActions} from '../redux/busDetails';
import {busListActions} from '../redux/BusList';
import {seatBookingActions} from '../redux/seatBooking';
import {sortAndFiltersActions} from '../redux/sortAndFilters';
import {bookSeat} from '../API/bookSeat';
import Loader from '../components/Loader';

export default function BookingStatus({navigation, route}) {
  const {paymentId} = route.params;
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [msg, setMsg] = useState('');
  const [ticket_id, setTicket_id] = useState('');
  const bookingdetails = useSelector(state => state.seatBookingReducer);
  const connected = useSelector(state => state.connectionReducer.connection);
  const dispatch = useDispatch();
  const backToHome = () => {
    dispatch(busDetailActions.setClear());
    dispatch(busListActions.setClear());
    dispatch(seatBookingActions.setClear());
    dispatch(sortAndFiltersActions.setClear());
    navigation.navigate('Tab Nav');
  };

  async function book() {
    setIsloading(true);
    const result = await bookSeat(bookingdetails, paymentId);
    setIsloading(false);
    if (result === 'noData') {
      setIsBooked(false);
    } else if (result.message !== 'Ticket ID generated successfully') {
      setIsBooked(false);
      setMsg(result.message);
    } else {
      setIsBooked(true);
      setMsg('');
      setTicket_id(result.ticket_id);
    }
  }
  useEffect(() => {
    if (connected) {
      book();
    }
  }, [connected]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <View style={styles.status}>
        <Text style={styles.statusText}>Booking Status</Text>
      </View>
      <View style={styles.conformContainer}>
        <MaterialIcons
          name={isBooked ? 'check-circle-outline' : 'highlight-off'}
          size={100}
          color={isBooked ? COLORS.SUCCESS : COLORS.DANGER}
        />
        <Text style={styles.conformText}>
          BOOKING {isBooked ? 'CONFIRMED' : 'FAILED'}
        </Text>
        {isBooked ? (
          <Text style={styles.emailText}>
            Soon you will receive an email confirming your booking details.
          </Text>
        ) : (
          <Text style={styles.emailText}>
            {msg !== '' && msg} Please don't worry, the debited amount will be
            refunded with in 3 working Days.
          </Text>
        )}
        {isBooked && (
          <View style={styles.idContainer}>
            <Text>Payment ID :- </Text>
            <Text>{paymentId}</Text>
          </View>
        )}
        {isBooked && (
          <View style={styles.idContainer}>
            <Text>Ticket ID :- </Text>
            <Text>{ticket_id}</Text>
          </View>
        )}
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
    marginHorizontal: 40,
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
  emailText: {
    marginHorizontal: 10,
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.BLACK,
  },
});
