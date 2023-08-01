import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../constants/Colors';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={[
          styles.button,
          {
            borderBottomColor:
              getSelectionMode == 1 ? COLORS.RED : COLORS.WHITE,
          },
        ]}>
        <Text
          style={[
            styles.buttonText,
            {color: getSelectionMode == 1 ? COLORS.RED : COLORS.BLACK},
          ]}>
          {option1}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={[
          styles.button,
          {
            borderBottomColor:
              getSelectionMode == 1 ? COLORS.WHITE : COLORS.RED,
          },
        ]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: getSelectionMode == 1 ? COLORS.BLACK : COLORS.RED,
            },
          ]}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 44,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    borderBottomWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  divider: {
    borderWidth: 1,
    marginVertical: 6,
    borderColor: COLORS.GRAY100,
  },
});
