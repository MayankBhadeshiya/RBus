import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import COLORS from '../constants/Colors';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {useDispatch, useSelector} from 'react-redux';
import {sortAndFiltersActions} from '../redux/sortAndFilters';

export default function SortBy() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const SelectedSort = useSelector(state => state.sortAndFiltersReducer.SortBy);
  useEffect(() => {
    if(SelectedSort == '')
    {
      setSelectedId('');
    }
  },[SelectedSort]);
  
  const RadioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Price - low to high',
        labelStyle : {color : COLORS.GRAY300},   
        value: 'price-LowToHigh',
        color: COLORS.RED,
        size : 18,
        containerStyle : {marginBottom : 14},
      },
      {
        id: '2',
        label: 'Best rated first',
        labelStyle : {color : COLORS.GRAY300},
        value: 'bestRatedFirst',
        color: COLORS.RED,
        size : 18,
        containerStyle : {marginBottom : 14},
      },
      {
        id: '3',
        label: 'Early departure',
        labelStyle : {color : COLORS.GRAY300},
        value: 'earlyDeparture',
        color: COLORS.RED,
        size : 18,
        containerStyle : {marginBottom : 14},
      },
      {
        id: '4',
        label: 'Late departure',
        labelStyle : {color : COLORS.GRAY300},
        value: 'lateDeparture',
        color: COLORS.RED,
        size : 18,
        containerStyle : {marginBottom : 10},
      },
    ],[],
  );
  
  

  function radioButtonHandler(id) {
    setSelectedId(id);
    const selectedRB = RadioButtons.find(rb => id == rb.id);
    dispatch(sortAndFiltersActions.setSort(selectedRB.value));
  }
  return (
    <View style={styles.outerContainer}>
     <Text style={styles.title}>SORT BY</Text>
        <RadioGroup
          radioButtons={RadioButtons}
          onPress={radioButtonHandler}
          selectedId={selectedId}
          containerStyle={styles.radioButton}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderBottomWidth : 1,
    borderBottomColor : COLORS.GRAY100
  },
  radioButton: {
    color: COLORS.RED,
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    marginBottom : 15
  },
});
