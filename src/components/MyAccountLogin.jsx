import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/auth';
import COLORS from '../constants/Colors';


export default function MyAccountLogin() {
     const token = useSelector(state => state.authReducer.token);
     const userDetails = useSelector(state => state.authReducer.userDetails);
     const dispatch = useDispatch();
     const handleLogout = () => {
       dispatch(authActions.changeAuth(true));
       dispatch(authActions.setToken(''));
       dispatch(authActions.setUser({}));
     };
  return (
    <View>
      <View style={styles.contaner}>
        {userDetails.full_name !== '' && <Text>{userDetails.full_name}</Text>}
        {userDetails.age !== null && userDetails.gender !== null && (
          <Text>
            {userDetails.gender === 1 ? 'Male' : userDetails.gender === 2 ? 'Female' : 'Others'}, {userDetails.age} years
          </Text>
        )}
        {userDetails.phone_number !== '' && (
          <Text>{userDetails.phone_number}</Text>
        )}
        <Text>{userDetails.email}</Text>
      </View>
      <TouchableOpacity style={styles.contaner} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginLable: {
    color: COLORS.GRAY500,
    marginBottom: 20,
  },
  contaner: {
    padding: 15,
    margin: 10,
    backgroundColor: COLORS.WHITE,
  },
  buttonText: {
    color: COLORS.BLUE,
    textAlign: 'center',
  },
  buttoncontainer: {
    flexDirection: 'row',
    gap: 20,
  },
});