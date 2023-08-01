import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from '../constants/Routes';


const Stack = createNativeStackNavigator();

export default function ListStack() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'left'}}>
      
      
    </Stack.Navigator>
  );
}