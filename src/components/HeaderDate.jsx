import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function HeaderDate() {
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const [month, day, year] = routeDetail.date.split('/').map(Number);
  const originalDate = new Date(year, month - 1, day);
  return (
    <View>
      <Text>
        {originalDate.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
        })}
      </Text>
    </View>
  );
}
