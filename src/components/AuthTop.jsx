import { View, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IMGS from '../constants/Img';
import {windowWidth} from '../constants/Dimensions';  
import COLORS from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/auth';

export default function AuthTop() {
    const dispatch = useDispatch()
  return (
    <View>
      <SafeAreaView style={{backgroundColor: '#d8515b'}}>
        <StatusBar
          animated={true}
          backgroundColor="#d8515b"
          barStyle="light-content"
        />
      </SafeAreaView>
      <Image source={IMGS.LOGIN} style={styles.img}></Image>
      <TouchableOpacity onPress={() => {dispatch(authActions.changeAuth(false));}} style={styles.circularButton}>
        <EvilIcons name="close" color={COLORS.RED} size={18}></EvilIcons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    height: windowWidth / 2,
  },
  circularButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 7,
    top: 50,
  },
});