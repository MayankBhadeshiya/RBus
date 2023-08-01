import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import MyAccountnotLogin from '../components/MyAccountnotLogin';

export default function Help() {
  const token = useSelector(state => state.authReducer.token);
  if (token === ''){
    return <MyAccountnotLogin lable="Sign up or Login to get the help" />;
  }
    return (
      <View>
        
      </View>
    );
}