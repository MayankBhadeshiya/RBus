import { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/Colors';
import { cancelSeat } from '../API/cancelSeat';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';

export default function CancelTicket({navigation , route}) {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const connected = useSelector(state => state.connectionReducer.connection);
  const [msg, setMsg] = useState('');

  const backToHome = () => {
    navigation.navigate('Tab Nav');
  };
  
  const {bus_id , email , seat_numbers , ticketId} = route.params;
  async function cancelBusSeat()
  {
    setIsloading(true);
    const seatCancel = await cancelSeat(bus_id , email , seat_numbers , ticketId);
    if(seatCancel === 'noData')
    {
        setError(true);   
    }
    else
    {
        setError(false); 
        setIsCancelled(true);
        setIsloading(false);
    }
  }

  useEffect(() => {
    if(connected)
    {
        cancelBusSeat();
    }
  },[connected]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }
  return (
    <SafeAreaView>
      <View style={styles.status}>
        <Text style={styles.statusText}>Booking Status</Text>
      </View>
      <View style={styles.conformContainer}>
        <MaterialIcons
          name={isCancelled ? 'check-circle-outline' : 'highlight-off'}
          size={100}
          color={isCancelled ? COLORS.SUCCESS : COLORS.DANGER}
        />
        <Text style={styles.conformText}>
          CANCELLATION {isCancelled ? 'CONFIRMED' : 'FAILED'}
        </Text>
        {isCancelled ? (
          <Text style={styles.emailText}>
            Soon you will receive an email for cancelling your seat.
          </Text>
        ) : (
          <Text style={styles.emailText}>
            {msg !== '' && msg} Sorry, We are not able to cancel your ticket at this Moment.
          </Text>
        )}
        {isCancelled && (
          <View style={styles.idContainer}>
            <Text>Ticket ID :- </Text>
            <Text>{ticketId}</Text>
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
