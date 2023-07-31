import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthTop from '../components/AuthTop';
import ROUTES from '../constants/Routes';
import {getOTP} from '../API/user';

export default function Login({navigation}) {
  const [pEmail, setPemial] = useState('example@example.com');
  const [email, setEmial] = useState('');
  const [otp, setOtp] = useState();
  const [apisuccess, setapisuccess] = useState(false);

  function validateEmail() {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(regex);
  }
  function generateOTP() {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNumber;
  }

  const handleOTPButton = () => {
    if (email === '') {
      setPemial('example@example.com❗');
    } else if (!validateEmail()) {
      setEmial('');
      setPemial('example@example.com❗');
    } else {
      const OTP = generateOTP();
      setOtp(OTP);
      const res = getOTP(OTP, email);
      setapisuccess(res);
    }
  };

  useEffect(() => {
    if (apisuccess) {
      navigation.navigate(ROUTES.OTP, {email, otp});
    }
  }, [apisuccess]);
  return (
    <View style={styles.outerContainer}>
      <AuthTop />
      <Text style={styles.createText}>Create Account or Sign in</Text>
      <View style={styles.emialContainer}>
        <MaterialIcons
          name="alternate-email"
          color={COLORS.BLACK}
          style={styles.icon}
          size={18}></MaterialIcons>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholderTextColor={COLORS.GRAY200}
          placeholder={pEmail}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmial(text)}></TextInput>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleOTPButton}>
        <Text style={styles.buttonText}>
          GENERATE OTP <Text style={styles.innerText}>(ONE TIME PASSWORD)</Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.orText}>
        <Text style={{fontWeight: '800'}}>OR</Text>, Connect using social
        accounts
      </Text>
      <View style={styles.socialContainer}>
        <View style={styles.innerSocial}>
          <FontAwesome
            name="google"
            color={COLORS.BLACK}
            style={styles.icontainer}
            size={30}></FontAwesome>
          <Text style={styles.iconText}>Google</Text>
        </View>
        <View style={styles.innerSocial}>
          <FontAwesome
            name="facebook-official"
            color={COLORS.BLACK}
            style={styles.icontainer}
            size={30}></FontAwesome>
          <Text style={styles.iconText}>Facebook</Text>
        </View>
      </View>
      <Text style={styles.smallText}>
        By logging in, you agree to our{' '}
        <Text style={styles.linkText}>Terms and Conditions</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  createText: {
    fontWeight: '800',
    fontSize: 20,
    color: COLORS.BLACK,
    padding: 15,
    textAlign: 'center',
  },
  emialContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    padding: 0,
    margin: Platform.OS === 'ios' ? 0 : -5,
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 25,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: COLORS.RED,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontWeight: '800',
  },
  innerText: {
    fontWeight: 'normal',
  },
  orText: {
    textAlign: 'center',
    color: COLORS.BLACK,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    marginVertical: 20,
  },
  icontainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  iconText: {
    fontSize: 10,
  },
  innerSocial: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  smallText: {
    fontSize: 12,
    marginHorizontal: 40,
    textAlign: 'center',
    color: COLORS.GRAY300,
  },
  linkText: {
    color: COLORS.BLUE,
    textDecorationLine: 'underline',
  },
});
