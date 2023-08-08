import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../constants/Routes';

export default function Bus({data}) {
  const navigation = useNavigation();
  let bg = COLORS.SUCCESS;
  if (data.ratings < 4) {
    bg = COLORS.WARNING;
  }
  if (data.ratings < 3) {
    bg = COLORS.DANGER;
  }

  let busType = '';
  if (data.type === 1 && data.bus_type === 1) {
    busType = 'A/C Seater';
  } else if (data.type === 1 && data.bus_type === 2) {
    busType = 'A/C Sleeper';
  } else if (data.type === 2 && data.bus_type === 1) {
    busType = 'NON A/C Seater';
  } else if (data.type === 2 && data.bus_type === 2) {
    busType = 'NON A/C Sleeper';
  }
  const extractArrivalTime = (arrivalTime, departureTime) => {
    const date = new Date(arrivalTime);
    const currentDate = new Date(departureTime);
    const sameday =
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    if (!sameday) {
      const d = date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
      });

      return formattedTime + ' ' + d;
    } else {
      return formattedTime;
    }
  };
  const extractDepattureTime = departureTime => {

    const date = new Date(departureTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    return formattedTime;
  };

  const findDuration = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const timeDifferenceMs = endDate - startDate;
    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60),
    );
    const formattedTime = `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m`;
    return formattedTime;
  };

  const isDeparted = givenTimeStr => {
    const givenTime = new Date(givenTimeStr);
    const currentTime = new Date();
    const timeDifferenceMs = givenTime - currentTime;
    const isDifferenceLessThanOneHour = timeDifferenceMs < 3600000;

    return isDifferenceLessThanOneHour;
  };
  const handlePress = () => {
    if (!isDeparted(data.departure_date)) {
      navigation.navigate(ROUTES.SEATALLOCATION, {
        title: data.bus_name,
        headerRight: data.ratings,
        id: data.id,
        departureTime: extractDepattureTime(data.departure_date),
        arrivalTime: extractArrivalTime(data.arrival_date, data.departure_date),
        departure_date: data.departure_date,
        price: data.fare,
      });
    }
  };
  return (
    <TouchableOpacity
      style={
        isDeparted(data.departure_date)
          ? [styles.OuterContainer, {opacity: 0.6}]
          : styles.OuterContainer
      }
      onPress={handlePress}>
      <View style={styles.TimeAndPriceContainer}>
        <Text style={styles.durationText}>
          <Text style={styles.boldLetter}>
            {extractDepattureTime(data.departure_date)}
          </Text>{' '}
          - {extractArrivalTime(data.arrival_date, data.departure_date)}
        </Text>
        <Text style={styles.boldLetter}> ₹ {data.fare}</Text>
      </View>
      <View style={styles.departedWraper}>
        <View style={styles.infoContainer}>
          <Text style={styles.grayLetter}>
            {findDuration(data.departure_date, data.arrival_date)}
          </Text>
          <Text style={styles.grayLetter}>
            {' '}
            • {data.total_seats - data.seats_booked} seats left
          </Text>
        </View>
        {isDeparted(data.departure_date) && (
          <Text style={styles.departedText}>DEPARTED</Text>
        )}
      </View>
      <View style={styles.travelsInfo}>
        <View>
          <Text style={styles.boldLetter}>{data.bus_name}</Text>
          <Text style={styles.grayLetter}>{busType}</Text>
        </View>
        <View style={[styles.ratingContainer, {backgroundColor: bg}]}>
          <Text style={{color: COLORS.WHITE, marginRight: 5}}>
            {data.ratings}
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
    marginVertical: 5,
    marginHorizontal: 15,
  },
  TimeAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationText: {
    color: COLORS.BLACK,
  },
  boldLetter: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '900',
    color: COLORS.BLACK,
  },
  grayLetter: {
    color: COLORS.GRAY300,
    fontSize: 11.5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 5,
  },
  travelsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 8,
  },
  departedWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departedText: {
    marginTop: 5,
    color: COLORS.DANGER,
  },
});
