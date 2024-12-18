import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Bagian atas profil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>F</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>GKJ Yogyakarta</Text>
          <Text style={styles.profileEmail}>gkjdayu.yogyakarta@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pencil" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Bagian Info */}
      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoItem}>
          <Icon name="file-document-outline" size={24} color="#4A90E2" />
          <Text style={styles.infoText}>Cetak Informasi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="logout" size={24} color="#4A90E2" />
          <Text style={styles.infoText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 50,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
  },
  editIcon: {
    padding: 5,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute", // Tambahkan posisi absolute
    bottom: 0, // Tetapkan posisi ke bawah layar
    left: 0, // Pastikan di bagian kiri
    right: 0, // Pastikan di bagian kanan
  },
});

export default ProfileScreen;
