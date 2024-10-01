import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { COLORS, SIZES } from "../../styles";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat datang Admin Ganteng</Text>
      <Button
        onPress={() => {
          navigation.navigate("Login_page");
        }}
        title="Ke Login_page"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        navigasi="login_page"
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
