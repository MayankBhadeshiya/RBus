import {View, Text} from 'react-native';
import React from 'react';
import ContactInfo from '../components/ContactInfo';

export default function PassengerDetail({route}) {
  const {departureTime, arrivalTime, title} = route.params;

  return (
    <View style={{flex: 1}}>
      <ContactInfo
        title={title}
        departureTime={departureTime}
        arrivalTime={arrivalTime}
      />
    </View>
  );
}
