import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";

export default function TicketSubDetail({data})
{
    return(
        <View style={styles.container}>
            <Text>Seat No. : {data.seat_no}</Text>
            <Text>Passenger Name : {data.passenger_name}</Text>
            <Text>Passenger Age : {data.passenger_age}</Text>
            <Text>Gender : {data.gender == 1 ? <Text>Male</Text> : <Text>Female</Text>}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 10,
        borderWidth : 1,
        marginHorizontal : 10,
        marginVertical : 5,
        borderColor : COLORS.BLACK,
        borderRadius : 10,
    }
})