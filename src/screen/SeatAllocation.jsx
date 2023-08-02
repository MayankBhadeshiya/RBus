import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import HeaderRating from '../components/HeaderRating';
import SeatAllocationHeader from '../components/SeatAllocationHeader';
import {useSelector} from 'react-redux';
import SleeperLayout from '../components/SleeperLayout';
import {getBusSeat} from '../API/busSeat';
import Loader from '../components/Loader';

export default function SeatAllocation({navigation, route}) {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [bookedSeat, setBookedSeat] = useState([]);

  const {title, headerRight, id, departureTime, arrivalTime, departure_date} =
    route.params;
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const connected = useSelector(state => state.connectionReducer.connection);

  const capitalizeString = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const BusRoute = `${capitalizeString(routeDetail.start)} - ${capitalizeString(
    routeDetail.end,
  )}`;

  console.log(id);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRating rating={headerRight} />,
      title: title,
    });
  }, [route.params]);

  async function get() {
    setIsloading(true);
    const seats = await getBusSeat(id);
    setIsloading(false)
    if (seats === 'noData') {
      setError(true);
    } else {
      setError(false);
      setBookedSeat(seats.booked_seats);
    }
  }

  useEffect(() => {
    if (connected) {
      get();
    }
  }, [connected]);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <View>
        <Text>Something went Wrong...</Text>
      </View>
    );
  }
  return (
    <View>
      <SeatAllocationHeader
        departureTime={departureTime}
        arrivalTime={arrivalTime}
        BusRoute={BusRoute}
        departure_date={departure_date}
      />
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <SleeperLayout booked={bookedSeat}></SleeperLayout>
      </View>
    </View>
  );
}
