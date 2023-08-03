import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import HeaderRating from '../components/HeaderRating';
import SeatAllocationHeader from '../components/SeatAllocationHeader';
import {useDispatch, useSelector} from 'react-redux';
import SleeperLayout from '../components/SleeperLayout';
import {getBusSeat} from '../API/busSeat';
import Loader from '../components/Loader';
import {busDetailActions} from '../redux/busDetails';
import CustomButtonFooter from '../components/CustomButtonFooter';
import ROUTES from '../constants/Routes';
import SomethingWentWrong from '../components/SomethingWentWrong';

export default function SeatAllocation({navigation, route}) {
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const selectedSeat = useSelector(
    state => state.busDetailReducer.selectedSeat,
  );

  const {
    title,
    headerRight,
    id,
    departureTime,
    arrivalTime,
    departure_date,
    price,
  } = route.params;
  const connected = useSelector(state => state.connectionReducer.connection);
  const dispatch = useDispatch();

  const handlePress = () => {
    navigation.navigate(ROUTES.BORDINGDROPING, {
      departureTime: departureTime,
      arrivalTime: arrivalTime,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRating rating={headerRight} />,
      title: title,
    });
  }, [route.params]);

  async function get() {
    setIsloading(true);
    const seats = await getBusSeat(id);
    setIsloading(false);
    if (seats === 'noData') {
      setError(true);
    } else {
      setError(false);
      dispatch(busDetailActions.setBook(seats.booked_seats));
      dispatch(busDetailActions.setAvlilable(seats.available_seats));
    }
  }

  useEffect(() => {
    dispatch(busDetailActions.setPrice(price));
    dispatch(busDetailActions.setId(id));
    if (connected) {
      get();
    }
  }, [connected]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <SomethingWentWrong />
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <SeatAllocationHeader
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          departure_date={departure_date}
        />
        <View style={styles.layoutContainer}>
          <SleeperLayout></SleeperLayout>
        </View>
      </ScrollView>
      <SafeAreaView>
        {selectedSeat.length > 0 && (
          <CustomButtonFooter
            buttonText={
              'SELECT BOARDING & DROPPING POINTS'
            }
            onPress={handlePress}
            />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between'},
  layoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
