import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Home({ navigation }) {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Wilayah 1", "Wilayah 2", "Wilayah 3", "Wilayah 4", "Wilayah 5"],
    datasets: [
      {
        data: [70, 40, 60, 55, 90],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff", // Latar belakang putih
    backgroundGradientFrom: "#ffffff", // Gradien awal putih
    backgroundGradientTo: "#ffffff", // Gradien akhir putih
    decimalPlaces: 0, // Menampilkan angka tanpa desimal
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Warna bar biru (rgba untuk transparansi)
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Warna label hitam
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#1E90FF",
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GKJ Dayu</Text>
      </View>

      {/* Statistik Card */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Warga Gereja</Text>
          <Text style={styles.statNumber}>252</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Majelis Gereja</Text>
          <Text style={styles.statNumber}>35</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Pegawai Gereja</Text>
          <Text style={styles.statNumber}>3</Text>
        </View>
      </View>

      {/* Grafik Bar */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Total Jemaat GKJ Dayu: 252</Text>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
        <Text style={styles.detailButton}>Lihat Detail</Text>
      </View>

      {/* Tombol Log Out */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login_page")} // Aksi untuk kembali ke halaman login
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontFamily: "semiBold",
    marginTop: 40,
  },
  statsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row", // Membuat layout horizontal dengan text di kiri dan angka di kanan
  },
  statTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "semiBold",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2", // Angka dengan warna biru
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "regular",
  },
  chartStyle: {
    borderRadius: 10,
    backgroundColor: "#fff", // Latar belakang putih di chart
  },
  detailButton: {
    marginTop: 10,
    fontSize: 16,
    color: "#4A90E2",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
