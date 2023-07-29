import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTabStack from './HomeTabStack';
import ListStack from './ListStack';
import BookingStack from './BookingStack';
import ROUTES from '../constants/Routes';

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
      <Stack.Screen name={ROUTES.BUSLIST} component={ListStack} />
      <Stack.Screen
        name="Booking Stack"
        component={BookingStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
