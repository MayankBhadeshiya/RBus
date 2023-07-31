import { View, Text, StyleSheet } from 'react-native'
import React , {useMemo, useState} from 'react'
import COLORS from '../constants/Colors';
import { RadioGroup } from 'react-native-radio-buttons-group';

export default function Filters() {
  const RadioButtons = useMemo(() => ([
    {
        id : '1',
        label : 'Price - low to high',
        value : 'price-LowToHigh',
        color : COLORS.RED
    },
    {
        id : '2',
        label : 'Best rated first',
        value : 'bestRatedFirst',
        color : COLORS.RED
    },
    {
        id : '3',
        label : 'Early departure',
        value : 'earlyDeparture',
        color : COLORS.RED
    },
    {
        id : '4',
        label : 'Late departure',
        value : 'lateDeparture',
        color : COLORS.RED
    },
  ]),[]);

  const [selectedId , setSelectedId] = useState();
  const [selected , setSelected] = useState(false);
  return (
    <View style={styles.outerContainer}>
      <View>
        <Text style={styles.title}>SORT BY</Text>
        <RadioGroup
          radioButtons={RadioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={styles.radioButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer : {
    backgroundColor : COLORS.WHITE,
    padding : 15
  },
  radioButton : {
    color : COLORS.RED,
    alignItems :'flex-start',
  },
  title : {
    fontWeight : 'bold'
  }
});