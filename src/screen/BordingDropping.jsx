import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomSwitch from '../components/CustomSwitch'
import BoardDrop from '../components/BoardDrop';

export default function BordingDropping() {

  const [selected , setSelected] = useState(1);
  const [selectedBoardingPlace , setSelectedBoardingPlace] = useState('');
  const [selectedDroppingPlace , setSelectedDroppingPlace] = useState('');
  console.log(selected);
  const boardingPoints = [
    {
      name : 'Naroda',
      time : '22:15',
    },
    {
      name : 'Bapu Nagar',
      time : '22:45'
    },
    {
      name : 'Khodiyar Nagar',
      time : '22:50'
    },
    {
      name : 'Virat Nagar',
      time : '22:53',
    },
    {
      name : 'Geeta Mandir bus stand',
      time : '23:15'
    },
    {
      name : 'paldi',
      time : '23:30'
    },
    {
      name : 'satalite',
      time : '23:45',
    },
    {
      name : 'iskon',
      time : '23:55',
    },
    {
      name : 'prahlad nagar',
      time : '23:59',
    }
  ];

  const droppingPoints = [
    {
      name : 'indira Marg',
      time : '06:30(next-day)'
    },
    {
      name : 'Jolly Bunglow',
      time : '06:30(next-day)'
    },
    {
      name : 'Victoria Bridge',
      time : '06:30(next-day)'
    },
  ];
  return (
    <View>
      <CustomSwitch
        selectionMode={1}
        option1="BOARDING"
        option2="DROPPING"
        onSelectSwitch={(value) => {setSelected(value)}}>
      </CustomSwitch>
      <FlatList
        data={selected == 1 ? boardingPoints : droppingPoints}
        renderItem={({item}) => <TouchableOpacity onPress={ selected == 1 ? setSelectedBoardingPlace.bind(this , item.name) : setSelectedDroppingPlace.bind(this , item.name)}>
          <BoardDrop name={item.name} time={item.time} place={selected == 1 ? selectedBoardingPlace : selectedDroppingPlace}/>
          </TouchableOpacity>
        }
      />
    </View>
  )
}