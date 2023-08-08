import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import EditProfile from "../components/EditProfile";
export default function Profile()
{
    const route = useRoute();
    const details = route.params.details;
    const [edit , setEdit] = useState(false);
    
    function editHandler()
    {
        setEdit(!edit);
    }
    return(
        <View style={styles.container}>
            <View style={[styles.subContainer , {justifyContent : 'space-between', alignItems : 'baseline'}]}>
                <Text style={styles.title}>PERSONAL DETAILS</Text>
                <Feather name={!edit ? 'edit' : 'check-square'} size={20} color={COLORS.GRAY500} onPress={editHandler}/>
            </View>
            {edit ? <EditProfile data = {details}/> : <>
                <View style={styles.subContainer}>
                    <EvilIcons name='user' size={55} color={COLORS.GRAY500}/>
                    <View style={{marginLeft : 10}}>
                        {details.full_name ? <Text style={styles.details}>Name : {details.full_name}</Text> : null}
                        {details.email ? <Text style={styles.details}>Email : {details.email}</Text> : null}
                        {details.age ? <Text style={styles.details}>Age : {details.age}</Text> : null}
                        <Text style={styles.details}>Gender : {details.gender === 1 ? 'Male' : userDetails.gender === 2 ? 'Female' : 'Others'}</Text>
                        {details.phone_number ? <Text style={styles.details}>Contact No : {details.phone_number}</Text> : null}
                    </View>
                </View>
            </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 20,
        borderColor : COLORS.GRAY200,
        borderWidth : 0.5,
        margin : 10,
        backgroundColor : COLORS.WHITE
    },
    subContainer : {
        flexDirection : 'row'
    },
    title : {
        color : COLORS.GRAY500,
        fontWeight : 'bold',
        marginBottom : 20
    },
    details : {
        color : COLORS.GRAY500
    },
});