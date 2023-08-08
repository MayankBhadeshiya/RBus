import { View ,Text, StyleSheet} from "react-native";
import COLORS from "../constants/Colors";

export default function AboutUs()
{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                We are RBus
            </Text>
            <Text style={{color : COLORS.GRAY500}}>
                This is a dummy project - Clone of RedBus.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        fontSize : 25,
        color : COLORS.GRAY500,
        fontWeight : 'bold'
    }
})