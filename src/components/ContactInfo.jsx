import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../constants/Routes';
import {seatBookingActions} from '../redux/seatBooking';

export default function ContactInfo({title, departureTime, arrivalTime}) {
  const userDetails = useSelector(state => state.authReducer.userDetails);
  const token = useSelector(state => state.authReducer.token);
  const [details, setDetails] = useState({email: '', phone: ''});
  const [pEmail, setPEmail] = useState('example@example.com');
  const [pPhon, setPphone] = useState('0000000000');
  const [values, setValues] = useState();
  const [error, setError] = useState({
    show: false,
    email: true,
    phone: true,
  });
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const selectedSeat = useSelector(
    state => state.busDetailReducer.selectedSeat,
  );
  const busId = useSelector(state => state.busDetailReducer.busId);
  const totalPrice = useSelector(state => state.busDetailReducer.Totalprice);
  const routeDetails = useSelector(state => state.busListReducer.routeDetails);

  useEffect(() => {
    if (token !== '') {
      setDetails(prev => {
        return {...prev, email: userDetails.email};
      });
      setError(prev => {
        return {...prev, email:false};
      });
      if (userDetails.phone_number) {
        setDetails(prev => {
          return {...prev, phone: userDetails.phone_number};
        });
        setError(prev => {
          return {...prev, phone: false};
        });
      }
    }
    if (selectedSeat && selectedSeat.length > 0) {
      const data = new Array(selectedSeat.length)
        .fill()
        .map(i => ({username: '', age: '', gender: 'male'}));
      const errordata = new Array(selectedSeat.length)
        .fill()
        .map(i => ({username: true, age: true}));
      setError(error => ({...error, users: errordata}));
      setValues(data);
    }
  }, []);
  function onValidate() {
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phone = /^[6-9]\d{9}$/;
    const userName = /^[a-zA-Z]+[a-zA-Z\s]*[a-zA-Z]+$/;
    let flag = false;

    if (email.test(details.email)) {
      error.email = false;
    } else {
      flag = true;
      error.email = true;
    }
    if (phone.test(details.phone)) {
      error.phone = false;
    } else {
      flag = true;
      error.phone = true;
    }

    for (let i in values) {
      if (userName.test(values[i].username)) {
        error.users[i].username = false;
      } else {
        flag = true;
        error.users[i].username = true;
      }
      if (
        !isNaN(parseInt(values[i].age)) &&
        +values[i].age > 0 &&
        +values[i].age < 120
      ) {
        error.users[i].age = false;
      } else {
        flag = true;
        error.users[i].age = true;
      }
    }
    setError({...error});
    if (flag) {
      return setIsValid(false);
    }
    return setIsValid(true);
  }
  function onChangeDetail(index, field, value) {
    values[index][field] = value;
    setValues([...values]);
    const time = setTimeout(() => {
      clearTimeout(time);
      onValidate();
    }, 1000);
  }
  function onChangeMP(field, value) {
    details[field] = value;
    setDetails({...details});
    const time = setTimeout(() => {
      clearTimeout(time);
      onValidate();
    }, 1000);
  }
  const navigation = useNavigation();
  const handlePress = () => {
    if (isValid) {
      const booked_seats = [];
      for (let i = 0; i < selectedSeat.length; i++) {
        let seatDetail = {
          seat_number: parseInt(selectedSeat[i]),
          passenger_name: values[i].username,
          passenger_age: parseInt(values[i].age),
          passenger_gender: values[i].gender === 'male' ? 1 : 2,
        };
        booked_seats.push(seatDetail);
      }
      dispatch(
        seatBookingActions.onSelect({
          bus_id: busId,
          booked_seats: booked_seats,
          email: details.email,
          phone_number: details.phone,
          amount: totalPrice,
          busName: title,
          startingPoint: routeDetails.start,
          endingPoint: routeDetails.end,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
        }),
      );
      navigation.navigate(ROUTES.BOOKINGDETAILS);
    }else {
      setError((error)=>{return {...error, show: true} })
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ScrollView
        contentContainerStyle={styles.outerWraper}
        automaticallyAdjustKeyboardInsets={true}>
        <Text style={styles.viewLable}>Contact Information</Text>
        <View style={styles.whiteContainer}>
          <Text style={styles.inputLable}>Email ID</Text>
          <TextInput
            keyboardType="email-address"
            inputMode="email"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            placeholder={pEmail}
            value={details.email}
            onChangeText={text => onChangeMP('email', text.trim())}
            onBlur={() => {
              if (!details.email.length) {
                setPEmail('example@example.com❗');
              }
            }}
            onFocus={() => {
              setPEmail('example@example.com');
            }}></TextInput>
          {error.show && error.email && (
            <Text style={styles.errortext}>Enter valid email</Text>
          )}
          <Text style={styles.inputLable}>Phone</Text>
          <TextInput
            keyboardType="phone-pad"
            inputMode="tel"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            placeholder={pPhon}
            value={details.phone}
            onChangeText={text => onChangeMP('phone', text.trim())}
            maxLength={10}
            onBlur={() => {
              if (!details.phone.length) {
                setPphone('0000000000❗');
              }
            }}
            onFocus={() => {
              setPphone('0000000000');
            }}></TextInput>
          {error.show && error.phone && (
            <Text style={[styles.errortext, {marginBottom:10}]}>Enter valid Phone no.</Text>
          )}
        </View>
        <Text style={styles.viewLable}>Passenger Information</Text>
        <View>
          {selectedSeat.map((s, i) => {
            return (
              <View style={styles.pwhiteContainer} key={s}>
                <Text style={styles.pinfoLable}>
                  {i === 0 ? 'Primary Passenger' : 'Co-Passenger'}{' '}
                  <Text style={styles.pinfoSeat}>Seat {s}</Text>
                </Text>
                <Text style={styles.inputLable}>Name</Text>
                <TextInput
                  keyboardType="default"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.input}
                  value={values ? values[i]['username'] : ''}
                  onChangeText={text =>
                    onChangeDetail(i, 'username', text)
                  }></TextInput>
                {error.show && error.users[i].username && (
                  <Text style={styles.errortext}>Enter valid name</Text>
                )}
                <Text style={styles.inputLable}>Age</Text>
                <TextInput
                  keyboardType="number-pad"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.input}
                  value={values ? values[i]['age'] : ''}
                  onChangeText={text => onChangeDetail(i, 'age', text)}
                  maxLength={10}></TextInput>
                {error.show && error.users[i].age && (
                  <Text style={styles.errortext}>Enter valid age</Text>
                )}
                <View style={styles.genderContainer}>
                  <Text style={styles.inputLable}>Gender</Text>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeDetail(i, 'gender', 'male');
                    }}
                    style={[
                      values && {
                        backgroundColor:
                          values[i]['gender'] === 'male'
                            ? COLORS.RED
                            : COLORS.WHITE,
                      },
                      styles.genderButton,
                    ]}>
                    <Text
                      style={
                        values && {
                          color:
                            values[i]['gender'] === 'male'
                              ? COLORS.WHITE
                              : COLORS.BLACK,
                          fontWeight:
                            values[i]['gender'] === 'male' ? 'bold' : 'normal',
                        }
                      }>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeDetail(i, 'gender', 'female');
                    }}
                    style={[
                      values && {
                        backgroundColor:
                          values[i]['gender'] === 'female'
                            ? COLORS.RED
                            : COLORS.WHITE,
                      },
                      styles.genderButton,
                    ]}>
                    <Text
                      style={
                        values && {
                          color:
                            values[i]['gender'] === 'female'
                              ? COLORS.WHITE
                              : COLORS.BLACK,
                          fontWeight:
                            values[i]['gender'] === 'female'
                              ? 'bold'
                              : 'normal',
                        }
                      }>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{totalPrice} ₹</Text>
          <Text style={styles.lebal}>(Excluding convenience fee)</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWraper: {
    marginHorizontal: 10,
  },
  viewLable: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 13,
    color: COLORS.BLACK,
  },
  whiteContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
  },
  pwhiteContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputLable: {
    color: COLORS.GRAY500,
    marginVertical: 5,
  },
  pinfoLable: {
    color: COLORS.BLACK,
    marginTop: 5,
    marginBottom: 10,
  },
  pinfoSeat: {
    color: COLORS.BLUE,
  },
  input: {
    borderBottomColor: COLORS.BLACK,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: Platform.OS === 'ios' ? 3 : 0,
  },
  genderContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  genderButton: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  priceContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    paddingHorizontal: 20,
  },
  price: {
    color: COLORS.RED,
    fontWeight: '800',
    fontSize: 18,
    paddingVertical: 5,
  },
  lebal: {
    color: COLORS.GRAY500,
    fontSize: 12,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: '800',
    fontSize: 15,
  },
  errortext: {
    color: COLORS.RED,
  },
});
