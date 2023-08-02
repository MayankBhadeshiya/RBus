import {
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import COLORS from '../constants/Colors';
import {useDispatch} from 'react-redux';
import {sortAndFiltersActions} from '../redux/sortAndFilters';

export default function ClearAndApply() {
  const dispatch = useDispatch();
  function setClear() {
    dispatch(sortAndFiltersActions.setClear());
  }
  return (
    <SafeAreaView style={styles.buttonContainer}>
      <TouchableOpacity style={styles.clearButton} onPress={setClear}>
        <Text style={styles.buttontext}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.buttontext}>Apply</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: COLORS.GRAY200,
    alignItems: 'center',
    flex: 1,
  },
  applyButton: {
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    flex: 1,
  },
  buttontext: {
    color: COLORS.WHITE,
    padding: 15,
    fontWeight: 'bold',
  },
});
