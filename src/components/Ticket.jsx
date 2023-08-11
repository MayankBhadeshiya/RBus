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

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text><Text style={{fontWeight : 'bold'}}>From : </Text>{capitalizeString(data.departure_location)}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>To :  </Text>{capitalizeString(data.arrival_location)}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>Journey Date -  </Text>{findDate(data.departure_date)}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>Departure Time :  </Text>{extractDepattureTime(data.departure_date)}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>No. of Tickets -  </Text>{data.no_of_tickets}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>Travel Agency Name :  </Text>{data.travel_agency_name}</Text>
      <Text><Text style={{fontWeight : 'bold'}}>Amount - </Text>{data.amount} ₹</Text>
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
