import {View, Text} from 'react-native';
import React from 'react';

export default function HeaderDate({date}) {
  const [month, day, year] = date.split('/').map(Number);
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
