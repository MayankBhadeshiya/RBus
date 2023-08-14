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
import {useDispatch, useSelector} from 'react-redux';
import HeaderDate from '../components/HeaderDate';
import ROUTES from '../constants/Routes';
import {getBusList} from '../API/busList';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';
import NoBusesFound from '../components/NoBusesFound';
import {getBusFilteredList} from '../API/busFilter';
import ClearFilterButton from '../components/ClearFilterButton';
import { sortAndFiltersActions } from '../redux/sortAndFilters';
import capitalizeString from '../util/capitalizeString';

export default function BusList({navigation, route}) {
  const [busListData, setBusListData] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [hasClear, setHasClear] = useState(route.params.isClear);
  const [error, setError] = useState(false);
  const [listEnd, setListEnd] = useState(false);
  const [page, setPage] = useState(1);
  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const connected = useSelector(state => state.connectionReducer.connection);
  const FilterBy = useSelector(state => state.sortAndFiltersReducer.FilterBy);
  const BAFilterBy = useSelector(state => state.sortAndFiltersReducer.BusArrivalFilter)
  const SortBy = useSelector(state => state.sortAndFiltersReducer.SortBy);
  const dispatch = useDispatch()
  async function get() {
    setIsloading(true);
    const buses = await getBusList(
      routeDetail.start,
      routeDetail.end,
      routeDetail.date,
      page,
    );
    setIsloading(false);
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
          setPage(1);
        }
      }
    }
  }

  async function getFilterData() {
    setIsloading(true);
    const buses = await getBusFilteredList(
      routeDetail.start,
      routeDetail.end,
      routeDetail.date,
      FilterBy,
      BAFilterBy,
      SortBy,
      page,
    );
    setIsloading(false);
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
        setPage(1);
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderDate date={routeDetail.date} />,
      title: `${capitalizeString(routeDetail.start)} - ${capitalizeString(
        routeDetail.end,
      )}`,
    });
  }, []);

  useEffect(() => {
    if (route.params.applyedFilters === true) {
      setListEnd(false);
    }
    if (connected) {
      if (route.params.applyedFilters) {
        getFilterData();
      } else {
        get();
      }
    }
    setHasClear(route.params.isClear);
  }, [connected, route.params]);

  function filtersHandler() {
    navigation.navigate(ROUTES.FILTERS);
  }

  async function clearFilter(){
    setHasClear(true);
    dispatch(sortAndFiltersActions.setClear());
    get();
  }

  if (error) {
    return <SomethingWentWrong />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (busListData.length === 0) {
    if (route.params.applyedFilters){
      return (
        <View style={styles.nobus}>
          <NoBusesFound />
          <SafeAreaView>
            <ClearFilterButton onPress={clearFilter} />
          </SafeAreaView>
        </View>
      );
    };
    return <NoBusesFound />;
    
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
        ListFooterComponent={!route.params.isClear && !hasClear && <ClearFilterButton onPress={clearFilter} />}
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
  nobus: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },
});
