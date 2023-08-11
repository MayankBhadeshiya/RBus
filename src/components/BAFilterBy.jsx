import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/Colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch , useSelector } from "react-redux";
import { sortAndFiltersActions } from "../redux/sortAndFilters";

export default function BAFilterBy()
{
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.sortAndFiltersReducer.BusArrivalFilter);

    function setBAFsunrise()
    {
        dispatch(sortAndFiltersActions.setBAFsunrise());
    }
    function setBAFday()
    {
        dispatch(sortAndFiltersActions.setBAFday());
    }
    function setBAFsunset()
    {
        dispatch(sortAndFiltersActions.setBAFsunset());
    }
    function setBAFnight()
    {
        dispatch(sortAndFiltersActions.setBAFnight());
    }

    return(
        <View style={styles.outerContainer}>
            <Text style={styles.title}>FILTER BY</Text>
            <Text style={styles.subTitle}>BUS ARRIVAL TIME AT DESTINATION</Text>
            
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filter} onPress={setBAFsunrise}>
                    <FeatherIcon name='sunrise' size={30} color={filters.sunrise ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.sunrise ? COLORS.RED : COLORS.GRAY500,}]}>06:00 - 11:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={setBAFday}>
                    <FeatherIcon name='sun' size={30} color={filters.day ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.day ? COLORS.RED : COLORS.GRAY500,}]}>12:00 - 17:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={setBAFsunset}>
                    <FeatherIcon name='sunset' size={30} color={filters.sunset ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.sunset ? COLORS.RED : COLORS.GRAY500,}]}>18:00 - 23:59</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter} onPress={setBAFnight}>
                    <FeatherIcon name='moon' size={30} color={filters.night ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.night ? COLORS.RED : COLORS.GRAY500,}]}>00:00 - 05:59</Text>
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
        borderBottomColor : COLORS.GRAY100
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