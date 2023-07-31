import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from '../constants/Routes';
import Login from '../screen/Login';
import Otp from '../screen/Otp';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.OTP} component={Otp} />
    </Stack.Navigator>
  );
}