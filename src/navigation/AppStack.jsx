import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTabStack from './HomeTabStack';
import BookingStack from './BookingStack';
import ROUTES from '../constants/Routes';
import BusList from '../screen/BusList';
import Filters from '../screen/Filters';
import COLORS from '../constants/Colors';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
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
      <Stack.Screen name={ROUTES.FILTERS} component={Filters} options={{headerStyle:{backgroundColor:COLORS.RED}}}/>
      <Stack.Screen
        name="Booking Stack"
        component={BookingStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
