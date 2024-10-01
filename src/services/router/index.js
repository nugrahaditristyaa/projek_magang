import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Home from "../../pages/home";
import Login_page from "../../pages/login_page";



const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <BottomSheetModalProvider>
      <Stack.Navigator
        initialRouteName="Login_page"
        screenOptions={{
          headerShown: false,
        }}
        screenListeners={{
          state: (e) => console.log("EVENT SCREEN", JSON.stringify(e, null, 2)),
        }}
      >
        <Stack.Screen name="Login_page" component={Login_page} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
}
