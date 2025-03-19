import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Home from "../../pages/home";
import Login_page from "../../pages/login_page";
import Profile from "../../pages/profile";
import Edit from "../../pages/edit";
import Dashboard from "../../pages/dashboard";
import Detail_pelayanan from "../../pages/detail_pelayanan";
import Detail_disabilitas from "../../pages/detail_disabilitas";
import Detail_gender from "../../pages/detail_gender";
import Detail_golongandarah from "../../pages/detail_golongandarah";
import Detail_pekerjaan from "../../pages/detail_pekerjaan";
import Form_warga from "../../pages/form_warga";
import Form_detail from "../../pages/form_detail";
import Form_pegawai from "../../pages/form_pegawai";
import Form_majelis from "../../pages/form_majelis";
import Lihat_detail_majelis from "../../pages/lihat_detail_majelis";
import Lihat_detail_pegawai from "../../pages/lihat_detail_pegawai";
import Lihat_detail_jemaat from "../../pages/lihat_detail_jemaat";
import Update_majelis from "../../pages/update_majelis";
import Update_pegawai from "../../pages/update_pegawai";
import Update_jemaat from "../../pages/update_jemaat";
import Update_detail from "../../pages/update_detail";
import Cetak_informasi from "../../pages/cetak_informasi";
import Dashboard from "../../pages/dashboard";

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
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Edit" component={Edit} />
      <Tab.Screen name="Profile" component={Profile} />
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
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Detail_pelayanan" component={Detail_pelayanan} />
        <Stack.Screen name="Detail_pekerjaan" component={Detail_pekerjaan} />
        <Stack.Screen name="Detail_golongandarah" component={Detail_golongandarah} />
        <Stack.Screen name="Detail_gender" component={Detail_gender} />
        <Stack.Screen name="Detail_disabilitas" component={Detail_disabilitas} />
        <Stack.Screen name="Form_warga" component={Form_warga} />
        <Stack.Screen name="Form_detail" component={Form_detail} />
        <Stack.Screen name="Form_pegawai" component={Form_pegawai} />
        <Stack.Screen name="Form_majelis" component={Form_majelis} />
        <Stack.Screen
          name="Lihat_detail_majelis"
          component={Lihat_detail_majelis}
        />
        <Stack.Screen
          name="Lihat_detail_pegawai"
          component={Lihat_detail_pegawai}
        />
        <Stack.Screen
          name="Lihat_detail_jemaat"
          component={Lihat_detail_jemaat}
        />
        <Stack.Screen name="Cetak_informasi" component={Cetak_informasi} />
        <Stack.Screen name="Update_majelis" component={Update_majelis} />
        <Stack.Screen name="Update_pegawai" component={Update_pegawai} />
        <Stack.Screen name="Update_jemaat" component={Update_jemaat} />
        <Stack.Screen name="Update_detail" component={Update_detail} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
}
