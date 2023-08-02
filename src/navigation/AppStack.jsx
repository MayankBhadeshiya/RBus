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

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        
        headerTintColor: 'black',
        headerBackTitleVisible:false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Tab Nav"
        component={HomeTabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.BUSLIST} component={BusList}/>
      <Stack.Screen name={ROUTES.FILTERS} component={Filters} />
      <Stack.Screen name={ROUTES.SEATALLOCATION} component={SeatAllocation} />
      <Stack.Screen name={ROUTES.BORDINGDROPING} component={BordingDropping} />
      <Stack.Screen name={ROUTES.PASSENGERDETAIL} component={PassengerDetail} />
      <Stack.Screen name={ROUTES.ABOUT} component={AboutUs}/>
      <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
    </Stack.Navigator>
  );
}
