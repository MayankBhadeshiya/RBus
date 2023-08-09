import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../constants/Colors';
import {useEffect, useState} from 'react';
import { updateProfile } from '../API/user';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/auth';
import Loader from './Loader';
import SomethingWentWrong from './SomethingWentWrong';
export default function EditProfile({data, editHandler}) {
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gender, setGender] = useState('');
  const [nameError , setNameError] = useState(false);
  const [ageError , setAgeError] = useState(false);
  const [contactNoError , setContactNoError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(()=>{
    {data.full_name ? setName(data.full_name) : null}
    {data.age ? setAge(data.age.toString()) : null}
    {data.phone_number ? setContactNo(data.phone_number) : null}
    {data.gender ? setGender(data.gender) : null};
  },[data]);

  async function get(user) {
    setIsloading(true);
    const userData = await updateProfile(token, user);
    setIsloading(false);
    if (userData.result === 'noData') {
      setError(true);
    } else {
      setError(false);
      dispatch(authActions.setUser({...data, full_name:user.name, age:user.age, phone_number:user.phone, gender:user.gender}));
      editHandler()
    }
  }

  function updateHandler()
  {
    if(name.trim() == '')
    {
      setNameError(true);
    }
    else if(age.trim() == '' || age < 0 || age > 120)
    {
      setAgeError(true);
    }
    else if(contactNo.trim() == '' || contactNo.length < 10)
    {
      setContactNoError(true)
    }
    else
    {
      setNameError(false);
      setAgeError(false);
      setContactNoError(false);
      const user = {
        name: name,
        phone: contactNo,
        age: age,
        gender: gender,
      }
      get(user);
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <SomethingWentWrong />;
  }
  return (
    <View>
      <Text style={styles.inputLable}>Name</Text>
      <TextInput
        placeholder='Enter Name'
        inputMode="text"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      {nameError && <Text style={{color : COLORS.DANGER}}>Enter Valid Name</Text>}
      <Text style={styles.inputLable}>Email</Text>
      <TextInput
        placeholder="Enter Email"
        keyboardType="email-address"
        inputMode="email"
        style={[styles.input , {color : COLORS.GRAY300}]}
        editable={false}
        value={data.email}
      />
      <Text style={styles.inputLable}>Age</Text>
      <TextInput
        placeholder='Enter Age'
        keyboardType="number-pad"
        inputMode="numeric"
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
      />
      {ageError && <Text style={{color : COLORS.DANGER}}>Enter Valid Age</Text>}
      <Text style={styles.inputLable}>Contact No.</Text>
      <TextInput
        placeholder='Enter Contact No.'
        keyboardType="number-pad"
        inputMode="tel"
        style={styles.input}
        value={contactNo}
        onChangeText={text => setContactNo(text)}
      />
      {contactNoError && <Text style={{color : COLORS.DANGER}}>Enter Valid Contact No.</Text>}

      <View style={styles.genderContainer}>
        <Text style={styles.inputLable}>Gender</Text>
        <TouchableOpacity
          onPress={() => {setGender(1)}}
          style={[
            gender && {
              backgroundColor: gender === 1 ? COLORS.RED : COLORS.WHITE,
            },
            styles.genderButton,
          ]}>
          <Text
            style={
              gender && {
                color : gender === 1 ? COLORS.WHITE : COLORS.BLACK
              }
            }
          >Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {setGender(2)}}
          style={[
            gender && {
              backgroundColor: gender === 2 ? COLORS.RED : COLORS.WHITE,
            },
            styles.genderButton,
          ]}>
          <Text
            style={
              gender && {
                color : gender === 2 ? COLORS.WHITE : COLORS.BLACK
              }
            }>
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={updateHandler}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  inputLable: {
    color: COLORS.GRAY500,
    marginVertical: 5,
  },
  genderButton: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    borderBottomColor: COLORS.BLACK,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: Platform.OS === 'ios' ? 3 : 0,
  },
  updateButton : {
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor : COLORS.RED,
    alignItems : 'center',
    margin : 10,

  },
  updateButtonText : {
    color : COLORS.WHITE,
    padding : 10
  }
});
