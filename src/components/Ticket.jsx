import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../constants/Colors';
import capitalizeString from '../util/capitalizeString';
import {extractDepattureTime} from '../util/extractTime';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../constants/Routes';

export default function Ticket({data}) {
 const findDate = date => {
    const originalDate = new Date(date);

    return originalDate.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    });
 }
const navigation = useNavigation();
 const handlePress = () => {
    navigation.navigate(ROUTES.TICKETDETAILS, {id: data.ticket_id});
 }
 console.log(data);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text>From : {capitalizeString(data.departure_location)}</Text>
      <Text>To : {capitalizeString(data.arrival_location)}</Text>
      <Text>Journey Date - {findDate(data.departure_date)}</Text>
      <Text>Departure Time : {extractDepattureTime(data.departure_date)}</Text>
      <Text>No. of Tickets - {data.no_of_tickets}</Text>
      <Text>Amount - {data.amount}</Text>
      <Text style={styles.id}>Id : {data.ticket_id}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  id:{
    fontSize: 12
  }
});
