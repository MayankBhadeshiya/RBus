import { View } from "react-native";
import BusType from "../components/BusType";
import ClearAndApply from "../components/ClearAndApply";
import FilterBy from "../components/FilterBy";
import SortBy from "../components/SortBy";
import COLORS from "../constants/Colors";

export default function Filters() {
  return(
    <View style={{flex : 1 , justifyContent : 'space-between', backgroundColor : COLORS.WHITE}}>
      <View>
      <SortBy/>
      <FilterBy/>
      <BusType/>
      </View>
      <View>
        <ClearAndApply/>
      </View>
    </View>
  );
}