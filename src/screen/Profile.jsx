import {StyleSheet, Text, View} from 'react-native';
import COLORS from '../constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from 'react-redux';

export default function Profile()
{
    const details = useSelector(state => state.authReducer.userDetails);
    const [edit , setEdit] = useState(false);
    
    function editHandler()
    {
        setEdit(!edit);
    }
    return(
        <View style={styles.container}>
            <View style={[styles.subContainer , {justifyContent : 'space-between', alignItems : 'baseline'}]}>
                <Text style={styles.title}>PERSONAL DETAILS</Text>
                <Feather name={!edit ? 'edit' : null} size={20} color={COLORS.GRAY500} onPress={editHandler}/>
            </View>
            {edit ? <EditProfile data = {details} editHandler={editHandler}/> : <>
                <View style={styles.subContainer}>
                    <EvilIcons name='user' size={55} color={COLORS.GRAY500}/>
                    <View style={{marginLeft : 10}}>
                        {details.full_name ? <Text style={styles.details}>Name : {details.full_name}</Text> : null}
                        {details.email ? <Text style={styles.details}>Email : {details.email}</Text> : null}
                        {details.age ? <Text style={styles.details}>Age : {details.age}</Text> : null}
                        {details.gender ? <Text style={styles.details}>Gender : {details.gender === 1 ? 'Male' : details.gender === 2 ? 'Female' : 'Others'}</Text> : null}
                        {details.phone_number ? <Text style={styles.details}>Contact No : {details.phone_number}</Text> : null}
                    </View>
                </View>
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: COLORS.GRAY200,
    borderWidth: 0.5,
    margin: 10,
    backgroundColor: COLORS.WHITE,
  },
  subContainer: {
    flexDirection: 'row',
  },
  title: {
    color: COLORS.GRAY500,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    color: COLORS.GRAY500,
  },
});
