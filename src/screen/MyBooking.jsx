import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyAccountnotLogin from '../components/MyAccountnotLogin';
import { useSelector } from 'react-redux';
import CustomSwitch from '../components/CustomSwitch';
import COLORS from '../constants/Colors';

export default function MyBooking() {
  const token = useSelector(state => state.authReducer.token);
  if (token === '') {
    return <MyAccountnotLogin lable="Sign up or Login to track your bookings" />;
  }
  return (
    <View>
      <View style={styles.lableConainer}>
        <Text style={styles.lable1}>
          All your bookings have been downloaded from RBus.
        </Text>
        <Text style={styles.lable2}>Pull to refresh</Text>
      </View>
      <CustomSwitch
        selectionMode={1}
        option1="COMPLETED"
        option2="CANCELLED"
        onSelectSwitch={() => {}}></CustomSwitch>
    </View>
  );
}

const styles = StyleSheet.create({
  lableConainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
    gap:10
  },
  lable1:{
    color:COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  lable2:{
    color:COLORS.GRAY500
  }
})