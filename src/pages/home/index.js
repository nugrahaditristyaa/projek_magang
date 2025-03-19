import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import adapter from "../../services/adapter";

export default function Home({ navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const [totalJemaat, settotalJemaat] = useState([]);
  const [totalMajelis, settotalMajelis] = useState([]);
  const [totalPegawai, settotalPegawai] = useState([]);
  const [sebaranWilayah, setsebaranWilayah] = useState({});
  const [maxValue, setmaxValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const jemaat = await adapter.getTotalJemaat();
      setData(jemaat);
      const majelis = await adapter.getTotalMajelis();
      setData(majelis);
      const pegawai = await adapter.getTotalPegawai();
      setData(pegawai);
      const wilayah = await adapter.getSebaranJemaat();
      setData(wilayah);

      const labels = wilayah.map((item) => `Wilayah ${item.kode_wilayah}`);
      const dataValues = wilayah.map((item) => item.jumlah);
      const maxValue = Math.max(...dataValues);

      const data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
          },
        ],
      };

      settotalJemaat(jemaat);
      settotalMajelis(majelis);
      settotalPegawai(pegawai);
      setsebaranWilayah(data);
      setmaxValue(maxValue);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#1E90FF",
    },
    fromZero: true,
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Sedang memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GKJ Dayu</Text>
        </View>

        {/* Statistik Card */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#fff" }]}>
            <Icon name="account-group" size={30} color="#4A90E2" />
            <Text style={styles.statTitle}>Warga Gereja</Text>
            <Text style={styles.statNumber}>
              {totalJemaat[0].jumlah_jemaat}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#fff" }]}>
            <Icon name="account-tie" size={30} color="#4A90E2" />
            <Text style={styles.statTitle}>Majelis Gereja</Text>
            <Text style={styles.statNumber}>
              {totalMajelis[0].jumlah_majelis}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#fff" }]}>
            <Icon name="briefcase-account" size={30} color="#4A90E2" />
            <Text style={styles.statTitle}>Pegawai Gereja</Text>
            <Text style={styles.statNumber}>
              {totalPegawai[0].jumlah_pegawai}
            </Text>
          </View>
        </View>

        {/* Grafik Bar */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            Total Jemaat GKJ Dayu: {totalJemaat[0].jumlah_jemaat}
          </Text>
          <BarChart
            data={sebaranWilayah}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chartStyle}
            yAxisLabel="" // Label sumbu Y (opsional)
            yAxisSuffix="" // Suffix sumbu Y (opsional)
            yAxisInterval={10} // Interval sumbu Y
            fromZero={true} // Memastikan grafik dimulai dari 0
            showValuesOnTopOfBars={true} // Menampilkan nilai di atas bar
            withInnerLines={true} // Menampilkan garis horizontal di dalam grafik
            withVerticalLabels={true} // Menampilkan label vertikal
            withHorizontalLabels={true} // Menampilkan label horizontal
            segments={8} // Jumlah segmen pada sumbu Y
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Lihat_detail_jemaat")}
          >
            <Text style={styles.detailButton}>Lihat Detail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navigasi Bawah */}
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
  scrollContainer: {
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
  statsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  statCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  statTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "semiBold",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "semiBold",
  },
  chartStyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  detailButton: {
    marginTop: 10,
    fontSize: 16,
    color: "#4A90E2",
    textDecorationLine: "underline",
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
