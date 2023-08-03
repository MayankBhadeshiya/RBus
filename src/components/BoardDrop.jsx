import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function BoardDrop({name , time , place})
{   
    return(
        <View style={styles.container}>
            <MaterialCommunityIcons name={place == name ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} size={17} color={COLORS.RED}/>
            <Text>{name}</Text>
            <Text>{time}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderBottomColor : COLORS.GRAY200,
        borderBottomWidth : 0.5,
        backgroundColor : COLORS.WHITE,
        padding : 10
    }
});