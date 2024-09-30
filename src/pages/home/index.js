import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS, SIZES } from "../../styles";

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ini Home</Text>
      <Button
        onPress={()=>{navigation.navigate("Splash")}}
        title="Ke Splash"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
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