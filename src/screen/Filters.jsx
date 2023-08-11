import { ScrollView, StatusBar, View } from "react-native";
import BusType from "../components/BusType";
import ClearAndApply from "../components/ClearAndApply";
import FilterBy from "../components/FilterBy";
import SortBy from "../components/SortBy";
import COLORS from "../constants/Colors";
import BAFilterBy from "../components/BAFilterBy";

export default function Filters() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE,
      }}>
      <StatusBar backgroundColor={COLORS.RED} />
      <ScrollView>
        <SortBy />
        <FilterBy/>
        <BusType />
        <BAFilterBy/>
      </ScrollView>
      <View>
        <ClearAndApply />
      </View>
    </View>
  );
}