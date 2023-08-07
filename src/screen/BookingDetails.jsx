import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import COLORS from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import capitalizeString from '../util/capitalizeString';
import {getOrderId} from '../API/orderId';
import Loader from '../components/Loader';
import SomethingWentWrong from '../components/SomethingWentWrong';
import RazorpayCheckout from 'react-native-razorpay';
import ROUTES from '../constants/Routes';
import {bookSeat} from '../API/bookSeat';

export default function BookingDetails({navigation}) {
  const bookingdetails = useSelector(state => state.seatBookingReducer);
  const connected = useSelector(state => state.connectionReducer.connection);
  const [error, setError] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [ticket_id, setTicket_id] = useState('');
  async function get() {
    setIsloading(true);
    const id = await getOrderId(bookingdetails.amount);
    setIsloading(false);
    if (id === 'noData') {
      setError(true);
    } else {
      setError(false);
      setOrderID(id);
    }
  }

  async function book(razorpay_payment_id) {
    setIsloading(true);
    const id = await bookSeat(bookingdetails, razorpay_payment_id);
    setIsloading(false);
    if (id === 'noData') {
      setIsBooked(false);
    } else {
      setIsBooked(true);
      setTicket_id(id);
    }
  }
  useEffect(() => {
    if (connected) {
      get();
    }
  }, [connected]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <SomethingWentWrong />;
  }

  const goToRozorPay = () => {
    var options = {
      description: 'Credits towards consultation',
      currency: 'INR',
      key: 'rzp_test_zJ8QvS3EjoLDEc',
      amount: bookingdetails.amount * 100,
      name: 'RBus',
      order_id: orderID, //Replace this with an order_id created using Orders API.
      //   callback_url: `/${ROUTES.BOOKINGSUCCESS}`,
      //   redirect: true,
      prefill: {
        email: bookingdetails.email,
        contact: bookingdetails.phone_number,
        name: bookingdetails.booked_seats[0].passenger_name,
      },
      theme: {color: COLORS.RED},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        async function run() {
          await book(data.razorpay_payment_id);
          console.log(isBooked);
          if (isBooked) {
            navigation.navigate(ROUTES.BOOKINGSUCCESS, {
              paymentId: data.razorpay_payment_id,
              ticket_id: ticket_id,
            });
          } else {
            alert(`Error | Ticket is not booked. Please try again later`);
          }
        }
        run();
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        <View style={styles.routeContainer}>
          <View style={styles.routeFirstContainer}>
            <Text style={styles.cityName}>
              {capitalizeString(bookingdetails.startingPoint)}
            </Text>
            <Text style={styles.time}>{bookingdetails.departureTime}</Text>
          </View>
          <View style={styles.routeSecondContainer}>
            <MaterialIcons
              name="arrow-right-alt"
              size={40}
              color={COLORS.WHITE}
            />
          </View>
          <View style={styles.routeThirdContainer}>
            <Text style={styles.cityName}>
              {capitalizeString(bookingdetails.endingPoint)}
            </Text>
            <Text style={styles.time}>{bookingdetails.arrivalTime}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.lableContainer}>
            <Text style={styles.lableText}>BUS DETAILS</Text>
          </View>
          <View>
            <Text style={styles.busTital}>{bookingdetails.busName}</Text>
            <Text style={styles.lable}>
              Boarding Point :-{' '}
              <Text style={styles.boldtext}>
                {capitalizeString(bookingdetails.startingPoint)} Bus station
              </Text>
            </Text>
            <Text style={styles.lable}>
              Dropping Point :-{' '}
              <Text style={styles.boldtext}>
                {capitalizeString(bookingdetails.endingPoint)} Bus station
              </Text>
            </Text>
          </View>
          <View style={styles.lableContainer}>
            <Text style={styles.lableText}>PASSENGER DETAILS</Text>
          </View>
          {bookingdetails.booked_seats.map(p => {
            return (
              <View key={p.seat_number}>
                <Text style={styles.pName}>{p.passenger_name}</Text>
                <View style={styles.pDetailContaier}>
                  <Text style={styles.pDetails}>
                    {p.passenger_gender === 1 ? 'Male' : 'Female'},{' '}
                    <Text>{p.passenger_age} years</Text>
                  </Text>
                  <Text style={styles.seatText}>{p.seat_number}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.lableContainer}>
            <Text style={styles.lableText}>FARE BREAKUP</Text>
          </View>
          <View style={styles.between}>
            <Text style={styles.BaseFairText}>Base Fare</Text>
            <Text style={styles.BaseFairText}>₹ {bookingdetails.amount}</Text>
          </View>
          <View style={styles.between}>
            <Text style={styles.BaseFairText}>GST</Text>
            <Text style={styles.BaseFairText}>₹ 00</Text>
          </View>
          <View style={styles.betweenWithBorder}>
            <Text style={styles.totalText}>TOTAL PAYABLE</Text>
            <Text style={styles.totalText}>₹ {bookingdetails.amount}</Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity style={styles.buttonContainer} onPress={goToRozorPay}>
          <Text style={styles.buttonText}>PAY NOW</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.RED,
    justifyContent: 'space-between',
  },
  routeContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  routeFirstContainer: {
    flex: 1,
  },
  routeSecondContainer: {
    flex: 1,
    alignItems: 'center',
  },
  routeThirdContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cityName: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  time: {
    color: COLORS.WHITE,
  },
  detailContainer: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
  },
  lableText: {
    color: COLORS.GRAY300,
    fontWeight: 'bold',
  },
  lableContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY100,
  },
  busTital: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  lable: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLORS.BLACK,
  },
  boldtext: {
    fontWeight: 'bold',
  },
  pName: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  pDetails: {
    color: COLORS.BLACK,
  },
  pDetailContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  seatText: {
    color: COLORS.RED,
    fontWeight: 'bold',
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  betweenWithBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingTop: 5,
    marginTop: 5,
    borderTopColor: COLORS.GRAY100,
    borderTopWidth: 1,
  },
  BaseFairText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.RED,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.RED,
    fontWeight: '800',
    fontSize: 16,
  },
});
