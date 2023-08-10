import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";

export default function TicketSubDetail({data})
{
    return(
        <View style={styles.container}>
            <Text>{data.passenger_name}</Text>
            <View style={styles.subContainer}>
                <View style={styles.innerContainer}>
                    <Text>{data.gender == 1 ? <Text>Male, </Text> : <Text>Female, </Text>}</Text>
                    <Text>{data.passenger_age}</Text>
                </View>
                <Text>Seat No : <Text style={{color : COLORS.RED}}>{data.seat_number}</Text></Text>
            </View>
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
    },
    innerContainer : {
        flexDirection : 'row'
    },
    subContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    }
})