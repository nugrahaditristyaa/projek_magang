import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles"; // Pastikan path ini benar

export default function ButtonApp({
  navigation,
  navigasi,
  title,
  color,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // Terapkan gaya tambahan
      onPress={() => navigation.navigate(navigasi)}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
