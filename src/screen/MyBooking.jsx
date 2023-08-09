import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import {useSelector} from 'react-redux';
import CustomSwitch from '../components/CustomSwitch';
import COLORS from '../constants/Colors';
import Ticket from '../components/Ticket';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';
import {getTickets} from '../API/user';
import isDeparted from '../util/isDeparted';

export default function MyBooking() {
  const authData = useSelector(state => state.authReducer);
  const connected = useSelector(state => state.connectionReducer.connection);
  const [uocoming, setUpcoming] = useState([]);
  const [complited, setComplited] = useState([]);
  const [selected, setSelected] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  async function get() {
    setIsloading(true);
    const TicketList = await getTickets(authData.userDetails.email);
    setIsloading(false);
    if (TicketList === 'noData') {
      setError(true);
    } else {
      setError(false);
      let departedList = [];
      let notdepartedList = [];
      for (let a of Object.values(TicketList)) {
        const obj = {
          ticket_id: a[0].ticket_id,
          departure_date: a[0].departure_date,
          departure_location: a[0].departure_location,
          arrival_location: a[0].arrival_location,
          no_of_tickets: a.length,
          amount: a[0].amount,
        };
        if (isDeparted(obj.departure_date)) {
          departedList.push(obj);
        } else {
          notdepartedList.push(obj);
        }
      }
      setComplited(departedList);
      setUpcoming(notdepartedList);
    }
  }
  useEffect(() => {
    if (connected && authData.token !== '') {
      get();
    }
  }, [connected, authData.ticketBookedDuringThisSession]);

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
  return (
    <View>
      <View style={styles.lableConainer}>
        <Text style={styles.lable1}>
          All your bookings have been downloaded from RBus.
        </Text>
      </View>
      <CustomSwitch
        selectionMode={1}
        option1="UPCOMING"
        option2="HISTORY"
        onSelectSwitch={value => {
          setSelected(value);
        }}></CustomSwitch>
      {selected === 1 &&
        (uocoming.length ? (
          <FlatList
            data={uocoming}
            renderItem={({item}) => <Ticket data={item} />}
          />
        ) : (
          <Text style={styles.lable2}>
            Looks empty, no upcoming trips found.
          </Text>
        ))}
      {selected === 2 &&
        (complited.length ? (
          <FlatList
            data={complited}
            renderItem={({item}) => <Ticket data={item} />}
          />
        ) : (
          <Text style={styles.lable2}>
            Looks empty, no completed trips found.
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lableConainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    gap: 10,
  },
  lable1: {
    color: COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  lable2: {
    color: COLORS.GRAY500,
    textAlign: 'center',
    marginTop: 10,
  },
});
