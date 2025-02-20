import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import ButtonDetail from "../ButtonNavigate";
import { Table, Row } from "react-native-table-component";
import adapter from "../../services/adapter";


export default function SebaranGender({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [tableData, setTableData] = useState([]);
  const [grafikData, setGrafikData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState(null);

  const validateData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item, index) => ({
      value: item.total || 0, // Nilai default 0 jika jumlah null
      label: item.kode_wilayah || "Unknown", // Label default jika kondisi null
      jenis_kelamin: item.jenis_kelamin || "Tidak Diketahui",
      frontColor:
        item.kode_wilayah && item.jenis_kelamin === "Laki-Laki"
          ? "#0E3EDA"
          : "#F473B9",
      onPress: () => {
        setSelectedBar({
          index,
          total: item.total || 0,
          label: item.kode_wilayah || "Unknown",
          jenis_kelamin: item.jenis_kelamin || "Tidak Diketahui",
        });
      },
    }));
  };

  // Fetch data for table and chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const grafikDataResponse = await adapter.getSebaranGrafikGender();
        setGrafikData(validateData(grafikDataResponse));
        const formattedTableData = grafikDataResponse.map((item) => [
          item.jenis_kelamin,
        ]);
        setTableData(formattedTableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if (selectedBar) {
      console.log("Selected Bar Data:", selectedBar);
      const timer = setTimeout(() => setSelectedBar(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedBar]);

  const toggleDropdown = () => {
    const toValue = isExpanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 700,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 420],
  });

  const maxValue =
    grafikData.length > 0
      ? Math.max(...grafikData.map((item) => item.value), 75)
      : 75;

  return (
    <View style={styles.card}>
      {/* Header as a toggle for the dropdown */}
      <TouchableOpacity
        style={[
          styles.headerDropdown,
          isExpanded && styles.headerDropdownExpanded,
        ]}
        onPress={toggleDropdown}
      >
        <Text style={styles.headerText}>SEBARAN GENDER</Text>
        <Image
          style={styles.gambar}
          source={
            isExpanded
              ? require("../../assets/Images/panahatas.png")
              : require("../../assets/Images/panahbawah.png")
          }
        />
      </TouchableOpacity>

      {/* Dropdown content */}
      <Animated.View
        style={[styles.contentContainer, { height: animatedHeight }]}
      >
        <View style={styles.infoContainer}>
          <View style={styles.separator} />

          {/* Table showing data */}
          {loading ? (
            <Text style={styles.loadingText}>Loading data...</Text>
          ) : (
            <Table >
              {/* Header with circles next to labels */}
              <Row
                data={Array.from(
                  new Set(grafikData.map((item) => item.jenis_kelamin))
                ).map((jenis_kelamin) => (
                  <View style={styles.headerCell} key={jenis_kelamin}>
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor:
                            jenis_kelamin === "Laki-Laki"
                              ? "#0E3EDA"
                              : "#F473B9",
                        },
                      ]}
                    />
                    <Text style={styles.tableHeaderText}>{jenis_kelamin}</Text>
                  </View>
                ))}
                style={styles.tableHeader}
              />
            </Table>
          )}

          {/* Chart */}
          {grafikData.length > 0 && (
            <View style={{ position: "relative", marginTop: 30 }}>
              <BarChart
                data={grafikData}
                barWidth={15}
                spacing={24}
                roundedTop
                roundedBottom
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray" }}
                noOfSections={3}
                maxValue={maxValue}
              />
              {selectedBar && (
                <View
                  style={{
                    position: "absolute",
                    top: -40, // Atur posisi vertikal relatif terhadap chart
                    left: 24 + selectedBar.index * (8 + 24), // Kalkulasi posisi horizontal
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    {selectedBar.jenis_kelamin}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Wilayah: {selectedBar.label}
                  </Text>
                  <Text style={{ color: "gray" }}>
                    Total: {selectedBar.total}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.chartFooter}>Wilayah</Text>
        </View>

        <ButtonDetail
          title="Lihat Detail"
          navigation={navigation}
          navigasi="Detail_gender"
          style={styles.detailButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Tambahkan gaya untuk teks info

  selectedInfo: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  headerDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerDropdownExpanded: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  gambar: {
    width: 20,
    height: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    marginVertical: 10,
  },
  contentContainer: {
    overflow: "hidden",
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: "bold",
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  lakilakiCircle: {
    backgroundColor: "#0E3EDA",
  },
  perempuanCircle: {
    backgroundColor: "#F473B9",
  },
  tableHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "gray",
  },
  detailButton: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  chartFooter: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
});
