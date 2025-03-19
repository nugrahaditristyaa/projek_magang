import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TabsHeader = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[
          activeTab === "grafik" ? styles.tabActive : styles.tabInactive,
          styles.touch,
        ]}
        onPress={() => setActiveTab("grafik")}
        activeOpacity={1}
      >
        <Text
          style={
            activeTab === "grafik"
              ? styles.tabTextActive
              : styles.tabTextInactive
          }
        >
          Grafik Perbandingan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          activeTab === "ulangTahun" ? styles.tabActive : styles.tabInactive,
          styles.touch,
        ]}
        onPress={() => setActiveTab("ulangTahun")}
        activeOpacity={1}
      >
        <Text
          style={
            activeTab === "ulangTahun"
              ? styles.tabTextActive
              : styles.tabTextInactive
          }
        >
          Daftar Ulang Tahun
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabActive: {
    backgroundColor: "white",
    elevation: 1,
  },
  tabInactive: {
    backgroundColor: "#E8E8E8",
  },
  tabTextActive: {
    textAlign: "center",
    color: "#63ACE1",
    fontWeight: "bold",
  },
  tabTextInactive: {
    textAlign: "center",
    color: "#BDBDBD",
  },
  touch: {
    flex: 1,
    padding: 10,
  },
});

export default TabsHeader;
