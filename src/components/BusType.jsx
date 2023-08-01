import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from "../constants/Colors";
import { useDispatch , useSelector } from "react-redux";
import { sortAndFiltersActions } from "../redux/sortAndFilters";

export default function BusType()
{
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.sortAndFiltersReducer.FilterBy);
    function setSeater()
    {
        dispatch(sortAndFiltersActions.setSeater());
    }
    function setSleeper()
    {
        dispatch(sortAndFiltersActions.setSleeper());
    }
    function setAC()
    {
        dispatch(sortAndFiltersActions.setAC());
    }
    function setNonAc()
    {
        dispatch(sortAndFiltersActions.setNonAC());
    }
    return(
        <View style={styles.outerContainer}>
            <Text style={styles.title}>BUS TYPE</Text>
            <View style={styles.busTypeContainer}>
                <TouchableOpacity style={styles.busType} onPress={setSeater}>
                    <MaterialIcons name="airline-seat-recline-extra" size={30} color={filters.seater ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.seater ? COLORS.RED : COLORS.GRAY500,}]}>SEATER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.busType} onPress={setSleeper}>
                    <MaterialIcons name="airline-seat-individual-suite" size={30} color={filters.sleeper ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.sleeper ? COLORS.RED : COLORS.GRAY500,}]}>SLEEPER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.busType} onPress={setAC}>
                    <MaterialCommunityIcons name='air-conditioner' size={30} color={filters.AC ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.AC ? COLORS.RED : COLORS.GRAY500,}]}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.busType} onPress={setNonAc}>
                    <MaterialCommunityIcons name="fan-off"  size={30} color={filters.NonAc ? COLORS.RED : COLORS.GRAY300}/>
                    <Text style={[styles.subTitle,{color : filters.NonAc ? COLORS.RED : COLORS.GRAY500,}]}>NONAC</Text>
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
    },
    subTitle : {
        color : COLORS.GRAY500,
        marginTop : 10
    },
    busTypeContainer : {
        flexDirection : 'row',
        marginLeft : 15,
        marginTop : 20,
        justifyContent : 'space-between'
    },
    busType : {
        width : 60,
        marginRight : 20,
        alignItems : 'center',
        textAlign : 'center'
    }
});