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
              <Icon name="account-plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Lihat_detail_jemaat")}
            >
              <Icon name="eye" size={20} color="#4A90E2" />
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
              <Icon name="account-plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Lihat_detail_majelis")}
            >
              <Icon name="eye" size={20} color="#4A90E2" />
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
              <Icon name="account-plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Tambah Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Lihat_detail_pegawai")}
            >
              <Icon name="eye" size={20} color="#4A90E2" />
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
  },
  header: {
    backgroundColor: "#63ACE1",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "semiBold",
    marginTop: 10,
    paddingTop: 30,
    marginBottom: 5,
    paddingBottom: 5,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: "#333",
    fontFamily: "semiBold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#63ACE1",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    borderColor: "#4A90E2",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  detail: {
    color: "#4A90E2",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
