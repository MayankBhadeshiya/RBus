import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/auth';
import COLORS from '../constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../constants/Routes';

export default function MyAccountLogin() {
     const token = useSelector(state => state.authReducer.token);
     const userDetails = useSelector(state => state.authReducer.userDetails);
     const dispatch = useDispatch();
     const handleLogout = () => {
       dispatch(authActions.changeAuth(true));
       dispatch(authActions.setToken(''));
       dispatch(authActions.setUser({}));
     };

     const navigation = useNavigation();

     function NavigationHandler(value)
     {
        navigation.navigate(value);
     }
     function ProfileHandler()
     {
        navigation.navigate(ROUTES.PROFILE ,{details : userDetails});
     }
  return (
    <View>
      <TouchableOpacity style={styles.contaner} onPress={ProfileHandler}>
        <View style={{flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center'}}>
          <View style={{flexDirection : 'row'}}>
            <EvilIcons name='user' size={35} color={COLORS.GRAY500}/>
            <View style={{marginLeft : 6}}>
              <Text style={{color : COLORS.GRAY500}}>
                {userDetails.gender === 1 ? 'Male' : userDetails.gender === 2 ? 'Female' : 'Others'}
              </Text>
              {userDetails.email !== '' && (<Text style={{color : COLORS.GRAY500}}>{userDetails.email}</Text>)}
            </View>
          </View>
          <View>
            <EvilIcons name='chevron-right' size={35} color={COLORS.GRAY500}/>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={[styles.contaner , styles.boxStyle]} onPress={NavigationHandler.bind(this , ROUTES.MYBOOKING)}>
          <Text style={{color : COLORS.GRAY500}}>My Bookings</Text>
          <EvilIcons name='chevron-right' size={35} color={COLORS.GRAY500}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.contaner , styles.boxStyle]} onPress={NavigationHandler.bind(this , ROUTES.HELP)}>
          <Text style={{color : COLORS.GRAY500}}>Help</Text>
          <EvilIcons name='chevron-right' size={35} color={COLORS.GRAY500}/>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.contaner , styles.boxStyle]} onPress={NavigationHandler.bind(this , ROUTES.ABOUT)}>
          <Text style={{color : COLORS.GRAY500}}>About Us</Text>
          <EvilIcons name='chevron-right' size={35} color={COLORS.GRAY500}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.contaner} onPress={handleLogout}>
        <Text style={{color : COLORS.GRAY500}}>Logout</Text>
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
  boxStyle : {
    flexDirection : 'row' , 
    justifyContent : 'space-between' , 
    alignItems : 'center' ,
    padding : 10,
    margin : 0,
    marginHorizontal : 10,
    borderColor : COLORS.GRAY100,
    borderWidth : 0.5
  }
});