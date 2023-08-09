import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../constants/Colors';
import capitalizeString from '../util/capitalizeString';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TicketDetails() {
  return (
    <View style={{backgroundColor:COLORS.WHITE}}>
      <View style={styles.routeContainer}>
        <View style={styles.routeFirstContainer}>
          <Text style={styles.cityName}>{capitalizeString('Ahmedabad')}</Text>
          <Text style={styles.BlackFont}>{'10:12'}</Text>
        </View>
        <View style={styles.routeSecondContainer}>
          <MaterialIcons
            name="arrow-right-alt"
            size={30}
            color={COLORS.BLACK}
          />
          <Text style={styles.date}>5, aug</Text>
        </View>
        <View style={styles.routeThirdContainer}>
          <Text style={styles.cityName}>{capitalizeString('mumbai')}</Text>
          <Text style={styles.BlackFont}>{'12:00'}</Text>
        </View>
      </View>
      <View style={styles.commenDetails}>
        <View style={styles.detail}>
          <Text style={styles.GrayFont}>Ticket ID :- </Text>
          <Text style={styles.BlackFont}>123456789123456789123456789</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.GrayFont}>Email ID :- </Text>
          <Text style={styles.BlackFont}>190020116002ait@gmail.com</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.GrayFont}>Phone No. :- </Text>
          <Text style={styles.BlackFont}>9988556677</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  routeFirstContainer: {
    flex: 1,
  },
  routeSecondContainer: {
    flex: 1,
    alignItems: 'center',
  },
  routeThirdContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cityName: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  BlackFont: {
    color: COLORS.BLACK,
  },
  GrayFont: {
    color: COLORS.GRAY500,
  },
  date: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  commenDetails:{
    marginHorizontal: 20
  },
  detail:{
    flexDirection: 'row',
    marginVertical: 5
  }
});
