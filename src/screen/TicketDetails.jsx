import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useEffect , useState } from 'react';
import COLORS from '../constants/Colors';
import capitalizeString from '../util/capitalizeString';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TicketSubDetail from '../components/TicketSubDetail';
import { useRoute } from '@react-navigation/native';
import { showTicket } from '../API/user';
import {useSelector} from 'react-redux';
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';


export default function TicketDetails() {
  const authData = useSelector(state => state.authReducer);
  const connected = useSelector(state => state.connectionReducer.connection);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [ticketData , setTicketData] = useState([]);

  const route = useRoute();
  const ticketId = route.params.id;

  async function get()
  {
    setIsloading(true);
    const Ticket = await showTicket(authData.userDetails.email , ticketId);
    setIsloading(false);
    if(Ticket === 'noData')
    {
      setError(true);
    }
    else
    {
      setError(false);
      setTicketData(Ticket);
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
  

  const subDetails = [
    {
      seat_no : '12',
      passenger_name : 'abcd',
      passenger_age : '20',
      gender : '1'
    },
  ];

  return (
    
    <View style={{backgroundColor:COLORS.WHITE , flex : 1}}>
      {ticketData  && <Text>ticket data available</Text>}
      <View style={styles.routeContainer}>
        <View style={styles.routeFirstContainer}>
          <Text style={styles.cityName}>{capitalizeString('asdfg')}</Text>
          <Text style={styles.BlackFont}>{'10:12'}</Text>
        </View>
        <View style={styles.routeSecondContainer}>
          <MaterialIcons
            name="arrow-right-alt"
            size={30}
            color={COLORS.BLACK}
          />
          <Text style={styles.date}>5, aug</Text>
        </View>
        <View style={styles.routeThirdContainer}>
          <Text style={styles.cityName}>{capitalizeString('asdf')}</Text>
          <Text style={styles.BlackFont}>{'12:00'}</Text>
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
          <Text style={styles.BlackFont}>{authData.userDetails.phone_number}</Text>
        </View>
      </View>
      <View style={{flex : 1}}>
        <FlatList
          data={subDetails}
          renderItem={({item}) => <TicketSubDetail data={item}/>}
        />
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
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
  commenDetails:{
    marginHorizontal: 20
  },
  detail:{
    flexDirection: 'row',
    marginVertical: 5
  },
  cancelButton : {
    alignItems : 'center',
    justifyContent : 'center',
    padding : 10,
    backgroundColor : COLORS.DANGER,
    marginTop : 5,

  },
  cancelButtonText : {
    color : COLORS.WHITE,
    fontWeight : 'bold',
  }
});
