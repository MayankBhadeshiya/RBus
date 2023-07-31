import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthTop from '../components/AuthTop';
import COLORS from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {authActions} from '../redux/auth';
import { getToken } from '../API/user';

export default function Otp({route}) {
  const {otp, email} = route.params;
  const [count, setCount] = useState(3);
  const [currOTP, setCurrOTP] = useState(otp);
  const [enterdOTP, setEnterdOTP] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleverify = () => {
    if (Number(currOTP) === Number(enterdOTP)) {
        async function get() {
          const res = await getToken(email);
          if (res === 'noData') {
            setError(true);
            console.log(res)
          } else {
            dispatch(authActions.changeAuth(false));
            dispatch(authActions.setToken(res));
            console.log(res)
          }
        }
        get();
    } else {
      setError(true);
    }
  };
  const handResend = () => {
    if ((count = 0)) {
      navigation.goBack();
    }
    setCount(prev => prev - 1);
  };
  return (
    <View>
      <AuthTop />
      <View style={styles.container}>
        <Text style={styles.lable}>EMAIL ID</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.lable}>ONE TIME PASSWORD</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.inputfiled}
          value={enterdOTP}
          onChangeText={text => {
            setEnterdOTP(text);
            setError(false);
          }}></TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleverify}>
          <Text style={styles.buttonText}>VERIFY OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resendContainer} onPress={handResend}>
          <Text style={styles.resendText}>RESEND OTP ({count})</Text>
        </TouchableOpacity>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>OTP Verification failed</Text>
            <Text style={styles.errorText}>Invalid OTP</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  lable: {
    color: COLORS.GRAY500,
    marginVertical: 10,
  },
  emailText: {
    color: COLORS.BLACK,
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '800',
  },
  inputfiled: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    paddingHorizontal: 5,
    color: COLORS.BLACK,
  },
  buttonContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
  },
  resendContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY200,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontWeight: '800',
  },
  resendText: {
    textAlign: 'center',
    color: COLORS.BLUE,
    fontWeight: '800',
  },
  errorContainer: {
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.DANGER,
  },
});
