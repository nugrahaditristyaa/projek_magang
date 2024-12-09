// App.js or main component file
import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import TabsHeader from "../../component/TabsHeader"; // Adjust the path as necessary
import SebaranPelayanan from "../../component/SebaranPelayanan";
import SebaranPekerjaan from "../../component/SebaranPekerjaan";
import SebaranGolonganDarah from "../../component/SebaranGolonganDarah";
import SebaranGender from "../../component/SebaranGender";
import SebaranDisabilitas from "../../component/SebaranDisabilitas";
import DaftarUlangTahun from "../../component/DaftarUlangTahun";


export default function Dashboard({navigation}) {
  const [activeTab, setActiveTab] = useState("grafik");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView>
        {activeTab === "grafik" && <SebaranPelayanan navigation={navigation}/>}
        {activeTab === "grafik" && <SebaranPekerjaan navigation={navigation}/>}
        {activeTab === "grafik" && <SebaranGolonganDarah navigation={navigation}/>}
        {activeTab === "grafik" && <SebaranGender navigation={navigation}/>}
        {activeTab === "grafik" && <SebaranDisabilitas navigation={navigation}/>}

        {activeTab === "ulangTahun" && <DaftarUlangTahun />}

      </ScrollView>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 5,
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
