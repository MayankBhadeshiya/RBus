import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";

export default function Ticket({data})
{
    return(
        <View style={styles.container}>
            <Text>Booked On : {data.booked_date}</Text>
            <Text>From : {data.from}</Text>
            <Text>To : {data.to}</Text>
            {data.cancellation_date && <Text>Canelled On - {data.cancellation_date}</Text>}
            <Text>Journey Date - {data.journey_date}</Text>
            <Text>Amount - {data.amount}</Text>
            <Text>No. of Tickets - {data.no_of_tickets}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding : 10,
        backgroundColor : COLORS.WHITE,
        marginHorizontal : 10,
        marginVertical : 5,
    }
});