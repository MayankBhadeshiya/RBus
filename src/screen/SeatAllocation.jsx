import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import HeaderRating from '../components/HeaderRating';

export default function SeatAllocation({navigation, route}) {
  const {title, headerRight} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRating rating={headerRight} />,
      title: title,
    });
  }, [route.params]);
  return (
    <View>
      <Text>SeatAllocation</Text>
    </View>
  );
}