import { View, Text } from 'react-native'
import React from 'react'
import ROUTES from '../constants/Routes'
import SearchBusForm from '../components/SearchBusForm'

export default function Home({navigation}) {
  return (
    <View>
      <SearchBusForm></SearchBusForm>
    </View>
  )
}