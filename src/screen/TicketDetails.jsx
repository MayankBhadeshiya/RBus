import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import capitalizeString from '../util/capitalizeString';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TicketSubDetail from '../components/TicketSubDetail';
import {useNavigation, useRoute} from '@react-navigation/native';
import {showTicket} from '../API/user';
import {useSelector} from 'react-redux';
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';
import { extractArrivalTime, extractDepattureTime } from '../util/extractTime';
import isDeparted from '../util/isDeparted';
import ROUTES from '../constants/Routes';

export default function TicketDetails() {
  const authData = useSelector(state => state.authReducer);
  const connected = useSelector(state => state.connectionReducer.connection);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const ticketId = route.params.id;

  const findDate = date => {
    const originalDate = new Date(date);

    return originalDate.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    });
 }
  
  async function get() {
    setIsloading(true);
    const Ticket = await showTicket(authData.userDetails.email, ticketId);
    if (Ticket === 'noData') {
      setError(true);
    } else {
      setError(false);
      setTicketData(Ticket);
      setIsloading(false);
    }
  }

  useEffect(() => {
    if (connected) {
      get();
    }
  }, [connected]);

  if (authData.token === '') {
    return (
      <MyAccountnotLogin lable="Sign up or Login to track your bookings" />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }
  

  function CancelTicketHandler()
  {
    const seatNumbers = [];
    for(let i=0;i<ticketData.length;i++)
    {
      seatNumbers.push(ticketData[i].seat_number);
    }
    console.log(seatNumbers);
    Alert.alert('Ticket Cancellation' , 'You are about to cancel your bus ticket!' , [
      {
        text : 'Back',
        style : 'cancel'
      },
      {
        text : 'Yes, I Want!',
        style : 'destructive',
        onPress : () => navigation.navigate(ROUTES.CANCELTICKET , 
          { ticketId : ticketId , email : authData.userDetails.email , seat_numbers : seatNumbers , bus_id : parseInt(ticketData[0].bus_id)})
      },
    ]);
  }

  return (
    <>
      {ticketData.length > 0 ? (
        <View style={{backgroundColor: COLORS.WHITE, flex: 1}}>
          <View style={styles.routeContainer}>
            <View style={styles.routeFirstContainer}>
              <Text style={styles.cityName}>{capitalizeString(ticketData[0].departure_location)}</Text>
              <Text style={styles.BlackFont}>{extractDepattureTime(ticketData[0].departure_date)}</Text>
            </View>
            <View style={styles.routeSecondContainer}>
              <MaterialIcons
                name="arrow-right-alt"
                size={30}
                color={COLORS.BLACK}
              />
              <Text style={styles.date}>{findDate(ticketData[0].departure_date)}</Text>
            </View>
            <View style={styles.routeThirdContainer}>
              <Text style={styles.cityName}>{capitalizeString(ticketData[0].arrival_location)}</Text>
              <Text style={styles.BlackFont}>{extractArrivalTime(ticketData[0].arrival_date , ticketData[0].departure_date)}</Text>
            </View>
          </View>
          <View style={styles.commenDetails}>
            <View style={styles.detail}>
              <Text style={styles.GrayFont}>Ticket ID :- </Text>
              <Text style={styles.BlackFont}>{ticketId}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.GrayFont}>Email ID :- </Text>
              <Text style={styles.BlackFont}>{authData.userDetails.email}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.GrayFont}>Phone No. :- </Text>
              <Text style={styles.BlackFont}>
                {authData.userDetails.phone_number}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.GrayFont}>Travel Agency Name :- </Text>
              <Text style={styles.BlackFont}>{ticketData[0].bus_name}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={ticketData}
              renderItem={({item}) => <TicketSubDetail data={item} />}
            />
          </View>
          {!isDeparted(ticketData[0].departure_date) ? <TouchableOpacity style={styles.cancelButton} onPress={CancelTicketHandler}>
            <Text style={styles.cancelButtonText}>Cancel Ticket</Text>
          </TouchableOpacity> : <></>}
        </View>
      ) : <></>}
    </>
  );
}

const styles = StyleSheet.create({
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  routeFirstContainer: {
    flex: 1,
  },
  routeSecondContainer: {
    flex: 1,
    alignItems: 'center',
  },
  routeThirdContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cityName: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  BlackFont: {
    color: COLORS.BLACK,
  },
  GrayFont: {
    color: COLORS.GRAY500,
  },
  date: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  commenDetails: {
    marginHorizontal: 20,
  },
  detail: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.DANGER,
    margin: 10,
    borderRadius : 10,
  },
  cancelButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize : 20,
  },
});
