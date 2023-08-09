import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import { useSelector } from 'react-redux';
import CustomSwitch from '../components/CustomSwitch';
import COLORS from '../constants/Colors';
import Ticket from '../components/Ticket';

export default function MyBooking() {
  const token = useSelector(state => state.authReducer.token);
  if (token === '') {
    return <MyAccountnotLogin lable="Sign up or Login to track your bookings" />;
  }
  const [selected , setSelected] = useState(1);

  const completed = [
    {
      booked_date : '31/07/2023',
      journey_date : '02/08/2023',
      from : 'Ahmedabad',
      to : 'Dhoraji',
      no_of_tickets : '1',
      amount : '200'
    },
    {
      booked_date : '02/08/2023',
      journey_date : '05/08/2023',
      from : 'Ahmedabad',
      to : 'Rajkot',
      no_of_tickets : '2',
      amount : '450'
    },
  ];

  const cancled = [
    {
      booked_date : '30/07/2023',
      cancellation_date : '01/08/2023',
      journey_date : '02/08/2023',
      from : 'Ahmedabad',
      to : 'jamnagar',
      no_of_tickets : '1',
      amount : '250'
    },
    {
      booked_date : '02/08/2023',
      cancellation_date : '04/08/2023',
      journey_date : '05/08/2023',
      from : 'Ahmedabad',
      to : 'Diu',
      no_of_tickets : '8',
      amount : '1600'
    },
  ];

  return (
    <View>
      <View style={styles.lableConainer}>
        <Text style={styles.lable1}>
          All your bookings have been downloaded from RBus.
        </Text>
        <Text style={styles.lable2}>Pull to refresh</Text>
      </View>
      <CustomSwitch
        selectionMode={1}
        option1="UPCOMING"
        option2="COMPLETED"
        onSelectSwitch={(value) => {setSelected(value)}}>
      </CustomSwitch>
      <FlatList
        data={selected == 1 ? completed : cancled}
        renderItem={({item}) => <Ticket data={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lableConainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    gap:10
  },
  lable1:{
    color:COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  lable2:{
    color:COLORS.GRAY500
  }
})