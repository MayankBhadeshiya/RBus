import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/Colors";
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function FilterBy()
{
    return(
        <View style={styles.outerContainer}>
            <Text style={styles.title}>FILTER BY</Text>
            <Text style={styles.subTitle}>BUS DEPARTURE TIME FROM SOURCE</Text>
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filter}>
                    <FeatherIcon name='sunrise' size={30} color={COLORS.GRAY300}/>
                    <Text style={styles.subTitle}>06:00 - 11:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <FeatherIcon name='sun' size={30} color={COLORS.GRAY300}/>
                    <Text style={styles.subTitle}>12:00 - 17:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <FeatherIcon name='sunset' size={30} color={COLORS.GRAY300}/>
                    <Text style={styles.subTitle}>18:00 - 23:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <FeatherIcon name='moon' size={30} color={COLORS.GRAY300}/>
                    <Text style={styles.subTitle}>00:00 - 05:59</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer : {
        backgroundColor: COLORS.WHITE,
        padding: 15,
        borderBottomWidth : 1,
        borderBottomColor : COLORS.GRAY200
    },
    title: {
        fontWeight: 'bold',
        marginTop : 10,
        marginBottom : 20
    },
    subTitle : {
        color : COLORS.GRAY500,
        marginTop : 10
    },
    filterContainer : {
        flexDirection : 'row',
        marginLeft : 25,
        marginTop : 30,
        justifyContent : 'space-between'
    },
    filter : {
        width : 50,
        marginRight : 30,
        alignItems : 'center',
        textAlign : 'center'
    }
});