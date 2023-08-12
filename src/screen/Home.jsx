import { View, Text } from 'react-native'
import React from 'react'
import SearchBusForm from '../components/SearchBusForm'
import Welcome from '../components/Welcome'

export default function Home({navigation}) {
  return (
    <View style={{flex:1}}>
      <SearchBusForm></SearchBusForm>
      <Welcome></Welcome>
    </View>
  );
}