import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../constants/Routes';
import { useDispatch } from 'react-redux';
import { busListActions } from '../redux/BusList';
import { sortAndFiltersActions } from '../redux/sortAndFilters';

export default function SearchBusForm() {
    const [date, setDate] = useState(new Date());
    const [from, setFrom] = useState('');
    const [pfrom, setPfrom] = useState('From');
    const [to, setTo] = useState('');
    const [pto, setPto] = useState('To');
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSwap = () => {
      const temp = from;
      setFrom(to);
      setTo(temp)
    }
    const handleSearch = () => {
      if (from === '' || to === '') {
        if (from === '') {
          setPfrom('From❗');
        } 
        if (to === '') {
          setPto('To❗');
        }
      }  else {
        dispatch(
          busListActions.setRouteDetails({
            start: from.trim().toLowerCase(),
            end: to.trim().toLowerCase(),
            date: date.toLocaleDateString('en-GB'),
          }),
        );
        dispatch(sortAndFiltersActions.setClear());
        navigation.navigate(ROUTES.BUSLIST, {applyedFilters: false, isClear: true});
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.containerText}>BUS TICKETS</Text>
        <MaterialCommunityIcons
          name="bus-side"
          color={COLORS.WHITE}
          size={25}></MaterialCommunityIcons>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="bus"
            color={COLORS.GRAY300}
            size={25}></MaterialCommunityIcons>
          <TextInput
            autoComplete="off"
            autoCorrect={false}
            style={styles.textInput}
            placeholderTextColor={COLORS.GRAY200}
            placeholder={pfrom}
            value={from}
            onChangeText={text => {
              setFrom(text);
            }}></TextInput>
        </View>
        <TouchableOpacity onPress={handleSwap} style={styles.circularButton}>
          <Fontisto
            style={styles.arrow}
            name="arrow-swap"
            color={COLORS.WHITE}
            size={16}></Fontisto>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="bus"
            color={COLORS.GRAY300}
            size={25}></MaterialCommunityIcons>
          <TextInput
            autoComplete="off"
            autoCorfalse={false}
            style={styles.textInput}
            placeholderTextColor={COLORS.GRAY200}
            placeholder={pto}
            value={to}
            onChangeText={text => {
              setTo(text);
            }}></TextInput>
        </View>
        <View style={[styles.inputContainer, {paddingVertical: 12}]}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            color={COLORS.GRAY300}
            size={25}></MaterialCommunityIcons>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={[styles.textInput, {marginLeft: Platform.OS === "ios" ? 10 : 14, width: '100%'}]}>
              {date.toLocaleDateString(undefined, {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            minimumDate={new Date()}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={styles.searchButttonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.SearchText}>SEARCH BUSES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    searchButttonContainer:{
        padding: 10
    },
    searchButton:{
      padding: 10,
      borderRadius:5,
      backgroundColor:COLORS.RED
    }, 
    SearchText:{
      color: COLORS.WHITE,
      fontWeight: "800",
      textAlign: "center",
    } ,
  container: {
    backgroundColor: COLORS.RED,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  containerText: {
    color: COLORS.WHITE,
    fontWeight: '800',
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY100,
  },
  textInput: {
    marginLeft: 10,
    width: '80%',
    color: COLORS.GRAY500,
    fontWeight: '800',
  },
  circularButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 10,
    backgroundColor: COLORS.GRAY500,
    borderRadius: 30,
    padding: 10,
    top: 30,
  },
  arrow: {
    transform: [{rotate: '90deg'}],
  },
});
