import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from '../constants/Routes';
import SeatAllocation from "../screen/SeatAllocation" ;
import BordingDropping from "../screen/BordingDropping" ;
import PassengerDetail from "../screen/PassengerDetail" ;

const Stack = createNativeStackNavigator();


export default function BookingStack() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'left'}}>
      <Stack.Screen name={ROUTES.SEATALLOCATION} component={SeatAllocation} />
      <Stack.Screen name={ROUTES.BORDINGDROPING} component={BordingDropping} />
      <Stack.Screen name={ROUTES.PASSENGERDETAIL} component={PassengerDetail} />
    </Stack.Navigator>
  );
}