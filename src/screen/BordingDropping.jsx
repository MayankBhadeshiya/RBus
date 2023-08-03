import {View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomSwitch from '../components/CustomSwitch';
import BoardDrop from '../components/BoardDrop';
import {useSelector} from 'react-redux';
import CustomButtonFooter from '../components/CustomButtonFooter';
import ROUTES from '../constants/Routes';
import COLORS from '../constants/Colors';

export default function BordingDropping({navigation,route}) {
  const [selected, setSelected] = useState(1);
  const [selectedBoardingPlace, setSelectedBoardingPlace] = useState('');
  const [selectedDroppingPlace, setSelectedDroppingPlace] = useState('');

  const routeDetail = useSelector(state => state.busListReducer.routeDetails);
  const capitalizeString = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const {departureTime, arrivalTime} = route.params;

  const boardingPoints = [
    {
      name: capitalizeString(routeDetail.start) + ' Bus station',
      time: departureTime,
    },
  ];
  const droppingPoints = [
    {
      name: capitalizeString(routeDetail.end) + ' Bus Station',
      time: arrivalTime,
    },
  ];

  const handlePress = () => {
    navigation.navigate(ROUTES.PASSENGERDETAIL);
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomSwitch
          selectionMode={1}
          option1="BOARDING"
          option2="DROPPING"
          onSelectSwitch={value => {
            setSelected(value);
          }}></CustomSwitch>
        <FlatList
          data={selected == 1 ? boardingPoints : droppingPoints}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={
                selected == 1
                  ? setSelectedBoardingPlace.bind(this, item.name)
                  : setSelectedDroppingPlace.bind(this, item.name)
              }>
              <BoardDrop
                name={item.name}
                time={item.time}
                place={
                  selected == 1 ? selectedBoardingPlace : selectedDroppingPlace
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <SafeAreaView>
        {selectedBoardingPlace !== '' && selectedDroppingPlace !== '' && (
          <CustomButtonFooter
            buttonText={'PROCEED'}
            onPress={handlePress}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex: 1, justifyContent: 'space-between', backgroundColor:COLORS.WHITE}
})