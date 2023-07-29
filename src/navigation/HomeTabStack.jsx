import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ROUTES from '../constants/Routes';
import Home from '../screen/Home';
import MyBooking from '../screen/MyBooking';
import Help from '../screen/Help';
import MyAccount from '../screen/MyAccount';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function HomeTabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.RED,
        tabBarInactiveTintColor: COLORS.GRAY500,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarLabelStyle: {
          marginBottom: 5,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={size}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MYBOOKING}
        component={MyBooking}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'clipboard-list' : 'clipboard-list-outline'}
              color={color}
              size={size}></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HELP}
        component={Help}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'headset' : 'headset-outline'}
              color={color}
              size={size}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MYACCOUNT}
        component={MyAccount}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesome
              name={focused ? 'user-circle' : 'user-circle-o'}
              color={color}
              size={size}></FontAwesome>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
