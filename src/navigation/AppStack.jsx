import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTabStack from './HomeTabStack';
import ROUTES from '../constants/Routes';
import BusList from '../screen/BusList';
import Filters from '../screen/Filters';
import SeatAllocation from '../screen/SeatAllocation';
import BordingDropping from '../screen/BordingDropping';
import PassengerDetail from '../screen/PassengerDetail';
import AboutUs from '../screen/AboutUs';
import Profile from '../screen/Profile';
import COLORS from '../constants/Colors';
import BookingDetails from '../screen/BookingDetails';
import BookingStatus from '../screen/BookingStatus';
import TicketDetails from '../screen/TicketDetails';
import CancelTicket from '../screen/CancelTicket';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Tab Nav"
        component={HomeTabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.BUSLIST} component={BusList} />
      <Stack.Screen
        name={ROUTES.FILTERS}
        component={Filters}
        options={{
          headerStyle: {backgroundColor: COLORS.RED},
          headerTintColor: COLORS.WHITE,
        }}
      />
      <Stack.Screen name={ROUTES.SEATALLOCATION} component={SeatAllocation} />
      <Stack.Screen name={ROUTES.BORDINGDROPING} component={BordingDropping} />
      <Stack.Screen
        name={ROUTES.PASSENGERDETAIL}
        component={PassengerDetail}
        options={{
          headerStyle: {backgroundColor: COLORS.RED},
          headerTintColor: COLORS.WHITE,
        }}
      />
      <Stack.Screen
        name={ROUTES.BOOKINGDETAILS}
        component={BookingDetails}
        options={{
          headerStyle: {backgroundColor: COLORS.RED},
          headerTintColor: COLORS.WHITE,
        }}
      />
      <Stack.Screen
        name={ROUTES.BOOKINGSUCCESS}
        component={BookingStatus}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.ABOUT} component={AboutUs} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.TICKETDETAILS} component={TicketDetails} />
      <Stack.Screen name={ROUTES.CANCELTICKET} component={CancelTicket} options={{headerShown : false}}/>
    </Stack.Navigator>
  );
}
