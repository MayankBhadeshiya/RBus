import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Bus from '../components/Bus';
import COLORS from '../constants/Colors';
import {useSelector} from 'react-redux';
import HeaderDate from '../components/HeaderDate';
import ROUTES from '../constants/Routes';
import {getBusList} from '../API/busList';
import Loader from '../components/Loader';

export default function BusList({navigation}) {
  const [busListData, setBusListData] = useState('');
  const [error, setError] = useState(false);
  const [listEnd, setListEnd] = useState(false);
  const [page, setPage] = useState(1);
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const connected = useSelector(state => state.connectionReducer.connection);

  async function get() {
    const buses = await getBusList(
      routeDetail.start,
      routeDetail.end,
      routeDetail.date,
      page,
    );
    if (buses === 'noData') {
      setError(true);
    } else {
      setError(false);
      if (page === 1) {
        setBusListData(buses);
        if (buses.length && !listEnd) {
          setPage(prev => prev + 1);
        } else {
          setListEnd(true);
        }
      } else {
        if (buses.length && !listEnd) {
          setBusListData(prev => [...prev, ...buses]);
          setPage(prev => prev + 1);
        } else {
          setListEnd(true);
        }
      }
    }
  }

  const capitalizeString = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderDate date={routeDetail.date} />,
      title: `${capitalizeString(routeDetail.start)} - ${capitalizeString(
        routeDetail.end,
      )}`,
    });
  }, []);

  useEffect(() => {
    if (connected) {
      get();
    }
  }, [connected]);

  function filtersHandler() {
    navigation.navigate(ROUTES.FILTERS);
  }

  if (error) {
    return (
      <View contentContainerStyle={styles.errorcontainer}>
        <Text style={styles.errortext}>Something went Wrong...</Text>
      </View>
    );
  }
  if (busListData === '') {
    return <Loader />;
  }
  if (busListData.length === 0){
    return <Text>No Bus</Text>
  }
  return (
    <>
      <FlatList
        data={busListData}
        renderItem={({item}) => <Bus data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!listEnd) {
            get();
          }
        }}
        onEndReachedThreshold={10}
      />
      <SafeAreaView>
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
  errorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errortext: {
    fontSize: 24,
  },
});
