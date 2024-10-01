import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/services/router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FONTS from "./src/assets/Fonts";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(FONTS.Poppins);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Router />
        <StatusBar style="auto" translucent={true} />
      </NavigationContainer>
    </View>
  );
}
