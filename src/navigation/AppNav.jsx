import NetInfo from '@react-native-community/netinfo';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {connectionActions} from '../redux/connection';
import {NavigationContainer} from '@react-navigation/native';
import COLORS from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {authActions} from '../redux/auth';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppNav() {
  const dispatch = useDispatch();
  const connected = useSelector(state => state.connectionReducer.connection);
  const isInAuth = useSelector(state => state.authReducer.inAuth);
  const [isLoading,setisLoading] = useState(false)

  const getData = async () => {
    try {
      setisLoading(true);
      const Token = await AsyncStorage.getItem('Token');
      if (Token !== null) {
        dispatch(authActions.setToken(JSON.parse(Token)));
      }
      const User = await AsyncStorage.getItem('User');
      if (User !== null) {
        dispatch(authActions.setUser(JSON.parse(User)));
      }
      setisLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    const unsubscribe = NetInfo.addEventListener(s => {
      dispatch(connectionActions.connect(s.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!connected) {
    return (
      <View style={styles.container}>
        <Ionicons
          name="cloud-offline"
          color={COLORS.WHITE}
          size={50}></Ionicons>
        <Text style={styles.text}>No Internet</Text>
        <Text style={styles.subtext}>Please turn on your Internet</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      {isInAuth ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: COLORS.WHITE,
  },
  subtext: {
    fontSize: 20,
    color: COLORS.WHITE,
  },
});
