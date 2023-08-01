import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../constants/Colors';

export default function HeaderRating({rating}) {
  let bg = COLORS.SUCCESS;
  if (rating < 4) {
    bg = COLORS.WARNING;
  }
  if (rating < 3) {
    bg = COLORS.DANGER;
  }
  return (
    <View style={[styles.ratingContainer, {backgroundColor: bg}]}>
      <Text style={styles.ratingText}>{rating}</Text>
      <FontAwesome name="star" color={COLORS.WHITE} />
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
  },
  ratingText:{color: COLORS.WHITE, marginRight: 3}
});
