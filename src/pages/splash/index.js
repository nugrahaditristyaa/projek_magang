import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS, SIZES } from "../../styles";
import ButtonApp from "../../component/ButtonApp";

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ini Splash</Text>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
      <ButtonApp navigasi={"Home"} title={"Tombol ke Home"} color={"red"}/>
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
