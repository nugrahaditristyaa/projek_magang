import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Home from "../../pages/home";
import Login_page from "../../pages/login_page";
import Profile from "../../pages/profile";
import Edit from "../../pages/edit";
import Form from "../../pages/form";
import Form2 from "../../pages/form2";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Jangan tampilkan header default pada tab navigator
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Edit" component={Edit} />
      {/* Tambahkan layar/tab lain sesuai kebutuhan */}
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Form2" component={Form2} />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
}
