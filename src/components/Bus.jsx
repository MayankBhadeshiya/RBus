import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Bus({data})
{
    let bg = COLORS.SUCCESS
    if(data.rating < 4){
        bg = COLORS.WARNING
    } 
    if(data.rating < 3){
        bg = COLORS.DANGER
    }
    return(
        <View style={styles.OuterContainer}>
            <View style={styles.TimeAndPriceContainer}>
                <Text><Text style={styles.boldLetter}>{data.departureTime}</Text> - {data.destinationTime}</Text>
                <Text style={styles.boldLetter}> ₹ {data.price}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.grayLetter}>{data.journeyTime}</Text>
                <Text style={styles.grayLetter}> • {data.seatAvailability} seats left</Text>
            </View>
            <View style={styles.travelsInfo}>
                <View>
                    <Text style={styles.boldLetter}>{data.travelAgencyName}</Text>
                    <Text style={styles.grayLetter}>{data.busType}</Text>
                </View>
                <View style={[styles.ratingContainer , {backgroundColor : bg}]}>
                    <Text style={{color : COLORS.WHITE , marginRight : 5}}>{data.rating}</Text>
                    <FontAwesome name="star" color={COLORS.WHITE}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    OuterContainer : {
        padding : 15,
        backgroundColor : COLORS.WHITE,
        borderRadius : 20,
        marginTop : 10,
        marginHorizontal : 15
    },
    TimeAndPriceContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    boldLetter : { 
        fontWeight : 'bold'
    },
    grayLetter : {
        color : COLORS.GRAY300,
        fontSize : 11.5
    },
    infoContainer : {
        flexDirection : 'row',
        alignItems : 'baseline',
        padding : 5
    },
    travelsInfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 10
    },
    ratingContainer : {
        flexDirection : 'row',
        alignItems : 'baseline',
        padding : 7,
        borderRadius : 8
    }
});