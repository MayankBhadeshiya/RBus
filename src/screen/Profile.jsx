import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useRoute } from "@react-navigation/native";
export default function Profile()
{
    const route = useRoute();
    const details = route.params.details;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PERSONAL DETAILS</Text>
        <View style={styles.subContainer}>
          <EvilIcons name="user" size={55} color={COLORS.GRAY500} />
          <View style={{marginLeft: 10}}>
            {details.full_name ? (
              <Text style={styles.details}>Name : {details.full_name}</Text>
            ) : null}
            {details.email ? (
              <Text style={styles.details}>Email : {details.email}</Text>
            ) : null}
            {details.age ? (
              <Text style={styles.details}>Age : {details.age}</Text>
            ) : null}
            <Text style={styles.details}>
              Gender :{' '}
              {details.gender === 1
                ? 'Male'
                : details.gender === 2
                ? 'Female'
                : 'Others'}
            </Text>
            {details.phone_number ? (
              <Text style={styles.details}>
                Contact No : {details.phone_number}
              </Text>
            ) : null}
          </View>
        </View>
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