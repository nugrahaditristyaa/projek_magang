import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonDetail({
  navigation,
  navigasi,
  title,
  color,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.detailButton, style]}
      onPress={() => navigation.navigate(navigasi)}
    >
    <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  detailButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
