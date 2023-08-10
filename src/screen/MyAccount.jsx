import { View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import MyAccountLogin from '../components/MyAccountLogin';
import MyAccountnotLogin from '../components/MyAccountnotLogin';

export default function MyAccount() {
  const token = useSelector(state => state.authReducer.token);
  console.log(token);
  return (
    <View>
      {token !== '' ? (
        <MyAccountLogin></MyAccountLogin>
      ) : (
        <MyAccountnotLogin lable="Sign up or Login to manage your trips"></MyAccountnotLogin>
      )}
    </View>
  );
}