import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TambahDataScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tambah Data</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.sectionTitle}>Pendaftaran Warga</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Form")}
          >
            <Text style={styles.buttonText}>Tambah Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Lihat Detail</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <Text style={styles.sectionTitle}>
          Cari Warga Berdasar Status AKtif
        </Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Value" style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Data Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>No.</Text>
            <Text style={styles.tableHeaderText}>Kode W</Text>
            <Text style={styles.tableHeaderText}>Nama</Text>
            <Text style={styles.tableHeaderText}>Tgl Lahir</Text>
          </View>
          {/* Table Rows (Repeat these views to simulate rows) */}
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableText}>Item</Text>
              <Text style={styles.tableText}>Item</Text>
              <Text style={styles.tableText}>Item</Text>
              <Text style={styles.tableText}>Item</Text>
            </View>
          ))}
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity>
            <Text style={styles.paginationText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationButton}>
            <Text style={styles.paginationText}>1</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>2</Text>
          <Text style={styles.paginationText}>3</Text>
          <Text style={styles.paginationText}>...</Text>
          <Text style={styles.paginationText}>12</Text>
          <TouchableOpacity>
            <Text style={styles.paginationText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navigasi Bawah */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={30} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Statistics pressed")}>
          <Icon name="chart-bar" size={30} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Edit")}>
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
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 5,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableText: {
    color: "#333",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  paginationButton: {
    backgroundColor: "#4A90E2",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationText: {
    color: "#333",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
});
