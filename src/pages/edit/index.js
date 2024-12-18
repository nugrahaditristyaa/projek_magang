import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
        {/* Pendaftaran Warga */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pendaftaran Warga</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Form_warga")}
            >
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.detail}>Lihat Detail</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pendaftaran Majelis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pendaftaran Majelis</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Form_majelis")}
            >
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.detail}>Lihat Detail</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pendaftaran Pegawai */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pendaftaran Pegawai</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Form_pegawai")}
            >
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.detail}>Lihat Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
  section: {
    marginBottom: 15, // Jarak antar bagian diperbaiki
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8, // Jarak bawah diperbaiki
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#63ACE1",
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
    color: "#fff",
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
  detail: {
    color: "#333",
    fontWeight: "bold",
  },
});
