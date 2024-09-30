import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/services/router";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Router />
        <StatusBar style="auto" translucent={true} />
      </NavigationContainer>
    </View>
  );
}
