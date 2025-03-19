import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import TabsHeader from "../../component/TabsHeader"; // Adjust the path as necessary
import SebaranPelayanan from "../../component/SebaranPelayanan";
import SebaranPekerjaan from "../../component/SebaranPekerjaan";
import SebaranGolonganDarah from "../../component/SebaranGolonganDarah";
import SebaranGender from "../../component/SebaranGender";
import SebaranDisabilitas from "../../component/SebaranDisabilitas";
import DaftarUlangTahun from "../../component/DaftarUlangTahun";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Dashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState("grafik");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView>
        {activeTab === "grafik" && <SebaranPelayanan navigation={navigation} />}
        {activeTab === "grafik" && <SebaranPekerjaan navigation={navigation} />}
        {activeTab === "grafik" && (
          <SebaranGolonganDarah navigation={navigation} />
        )}
        {activeTab === "grafik" && <SebaranGender navigation={navigation} />}
        {activeTab === "grafik" && (
          <SebaranDisabilitas navigation={navigation} />
        )}

        {activeTab === "ulangTahun" && <DaftarUlangTahun />}
      </ScrollView>

      <View style={styles.bottomNavigation}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={30} color="#4A90E2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Icon name="chart-bar" size={30} color="#4A90E2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
        <Icon name="note" size={30} color="#4A90E2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("User pressed")}>
        <Icon name="account" size={30} color="#4A90E2" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    
  },
  header: {
    backgroundColor: "#63ACE1",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "semiBold",
    marginTop: 20,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
});