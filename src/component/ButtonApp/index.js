import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS, SIZES } from "../../styles";

export default function ButtonApp({navigation, navigasi, title, color, }) {
    console.log(navigasi)
  return (
      <Button
        onPress={()=>{navigation.navigate({navigasi})}}
        title={title}
        color={color}
        accessibilityLabel="Learn more about this purple button"
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.largeText,
    color: COLORS.white,
  },
});
