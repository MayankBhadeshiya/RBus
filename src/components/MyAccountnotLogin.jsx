import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/auth';
import COLORS from '../constants/Colors';

export default function MyAccountnotLogin({lable}) {
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(authActions.changeAuth(true));
  };
  return (
    <View style={styles.contaner}>
      <Text style={styles.loginLable}>
        {lable}
      </Text>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginLable:{
    color: COLORS.GRAY500,
    marginBottom: 20
  },
  contaner: {
    padding: 15,
    margin: 10,
    backgroundColor: COLORS.WHITE,
  },
  buttonText: {
    color: COLORS.RED,
    textAlign: 'center',
  },
  buttoncontainer: {
    flexDirection: 'row',
    gap: 20
  }
});