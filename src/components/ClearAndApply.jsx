import { TouchableOpacity , View , Text, StyleSheet, SafeAreaView} from "react-native"
import COLORS from "../constants/Colors";
import {useDispatch} from 'react-redux';
import {sortAndFiltersActions} from '../redux/sortAndFilters';

export default function ClearAndApply()
{
    const dispatch = useDispatch();
    function setClear()
    {
        dispatch(sortAndFiltersActions.setClear());
    }
    return (
      <View style={styles.buttonContainer}>
        <SafeAreaView style={styles.clearButton}>
          <TouchableOpacity onPress={setClear}>
            <Text style={styles.buttontext}>Clear</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.applyButton}>
          <TouchableOpacity>
            <Text style={styles.buttontext}>Apply</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
    },
    clearButton : {
        backgroundColor : COLORS.GRAY200,
        alignItems : 'center',
        flex : 1,
    },
    applyButton : {
        backgroundColor : COLORS.RED,
        alignItems : 'center',
        flex : 1,
    },
    buttontext : {
        color : COLORS.WHITE,
        padding : 15,
        fontWeight : 'bold',
    }
});