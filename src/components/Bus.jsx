import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../constants/Routes';

export default function Bus({data}) {
    const navigation = useNavigation();
  let bg = COLORS.SUCCESS;
  if (data.rating < 4) {
    bg = COLORS.WARNING;
  }
  if (data.rating < 3) {
    bg = COLORS.DANGER;
  }
  return (
    <TouchableOpacity
      style={styles.OuterContainer}
      onPress={() => {
        navigation.navigate(ROUTES.SEATALLOCATION, {
          title: data.travelAgencyName,
          headerRight: data.rating,
        });
      }}>
      <View style={styles.TimeAndPriceContainer}>
        <Text>
          <Text style={styles.boldLetter}>{data.departureTime}</Text> -{' '}
          {data.destinationTime}
        </Text>
        <Text style={styles.boldLetter}> ₹ {data.price}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.grayLetter}>{data.journeyTime}</Text>
        <Text style={styles.grayLetter}>
          {' '}
          • {data.seatAvailability} seats left
        </Text>
      </View>
      <View style={styles.travelsInfo}>
        <View>
          <Text style={styles.boldLetter}>{data.travelAgencyName}</Text>
          <Text style={styles.grayLetter}>{data.busType}</Text>
        </View>
        <View style={[styles.ratingContainer, {backgroundColor: bg}]}>
          <Text style={{color: COLORS.WHITE, marginRight: 5}}>
            {data.rating}
          </Text>
          <FontAwesome name="star" color={COLORS.WHITE} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  OuterContainer: {
    padding: 15,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 15,
  },
  TimeAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldLetter: {
    fontWeight: 'bold',
  },
  grayLetter: {
    color: COLORS.GRAY300,
    fontSize: 11.5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 5,
  },
  travelsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 7,
    borderRadius: 8,
  },
});
