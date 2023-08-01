import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Bus from '../components/Bus';
import COLORS from '../constants/Colors';
import {useSelector} from 'react-redux';
import HeaderDate from '../components/HeaderDate';
import ROUTES from '../constants/Routes';

export default function BusList({navigation}) {
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const capitalizeString = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderDate />,
      title: `${capitalizeString(routeDetail.start)} - ${capitalizeString(
        routeDetail.end,
      )}`,
    });
  }, []);
  function filtersHandler() {
    navigation.navigate(ROUTES.FILTERS);
  }
  const busData = [
    {
      busId: 'b1',
      departureTime: '21:25',
      destinationTime: '03:15',
      price: '400',
      journeyTime: '5h 50m',
      seatAvailability: '20',
      travelAgencyName: 'Jay Dwarkesh Travels',
      busType: 'NON A/C Sleeper',
      rating: '3.9',
    },
    {
      busId: 'b2',
      departureTime: '23:15',
      destinationTime: '04:30',
      price: '450',
      journeyTime: '5h 15m',
      seatAvailability: '18',
      travelAgencyName: 'Tulsi Travels',
      busType: 'AC Sleeper',
      rating: '3.2',
    },
    {
      busId: 'b3',
      departureTime: '22:20',
      destinationTime: '04:05',
      price: '450',
      journeyTime: '5h 45m',
      seatAvailability: '20',
      travelAgencyName: 'Samay Travels',
      busType: 'NON A/C Sleeper',
      rating: '3.1',
    },
    {
      busId: 'b4',
      departureTime: '21:50',
      destinationTime: '02:50',
      price: '749',
      journeyTime: '5h 00m',
      seatAvailability: '21',
      travelAgencyName: 'Samay Travels',
      busType: 'A/C Sleeper (2+1)',
      rating: '3.5',
    },
    {
      busId: 'b5',
      departureTime: '22:45',
      destinationTime: '04:00',
      price: '450',
      journeyTime: '5h 15m',
      seatAvailability: '36',
      travelAgencyName: 'Tulsi Travels',
      busType: 'NON A/C Sleeper',
      rating: '2.4',
    },
    {
      busId: 'b6',
      departureTime: '21:45',
      destinationTime: '02:00',
      price: '450',
      journeyTime: '4h 15m',
      seatAvailability: '36',
      travelAgencyName: 'MatruKrupa Travels',
      busType: 'NON A/C Sleeper',
      rating: '4.7',
    },
  ];
  return (
    <>
      <FlatList
        data={busData}
        renderItem={({item}) => <Bus data={item} />}
        keyExtractor={item => item.busId}
        showsVerticalScrollIndicator={false}
      />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.sortAndFilterButton}
          onPress={filtersHandler}>
          <Text style={styles.buttonText}>SORT & FILTER</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  sortAndFilterButton: {
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: COLORS.RED,
  },
});
