import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from '../constants/Routes';
import BusList from '../screen/BusList';
import Filters from '../screen/Filters';

const Stack = createNativeStackNavigator();

export default function ListStack() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'left'}}>
      <Stack.Screen
        name={'List Stack first'}
        component={BusList}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.FILTERS} component={Filters} />
    </Stack.Navigator>
  );
}