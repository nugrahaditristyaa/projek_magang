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
import { Table, Row } from "react-native-table-component";
import adapter from "../../services/adapter";
import ButtonDetail from "../ButtonNavigate";

export default function SebaranPekerjaan({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [tableData, setTableData] = useState([]);
  const [grafikData, setGrafikData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState(null);

  const validateData = (data) => {
    if (!data || !Array.isArray(data)) return [];

    // Group data by kode_wilayah
    const groupedData = data.reduce((acc, item) => {
      const key = item.kode_wilayah || "Unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    // For each wilayah, sort and take the top 4
    const filteredData = Object.keys(groupedData).map((wilayah) => {
      const sortedItems = groupedData[wilayah]
        .sort((a, b) => b.total - a.total) // Sort by total in descending order
        .slice(0, 4); // Take top 4

      return sortedItems.map((item, index) => ({
        value: item.total || 0,
        label: item.kode_wilayah || "Unknown",
        pekerjaan: item.pekerjaan || "Tidak Mengisi",
        frontColor: "#8E44AD", // Default color, you can change if needed
        onPress: () => {
          setSelectedBar({
            index,
            total: item.total || 0,
            label: item.kode_wilayah || "Unknown",
            pekerjaan: item.pekerjaan || "Tidak Mengisi",
          });
        },
      }));
    });

    // Flatten the grouped data to a single array
    return filteredData.flat();
  };

  const calculateHeaderRows = (data, itemsPerRow = 3) => {
    const uniqueItems = Array.from(new Set(data.map((item) => item.pekerjaan)));
    return uniqueItems.reduce((acc, item, index) => {
      if (index % itemsPerRow === 0) {
        acc.push([item]);
      } else {
        acc[acc.length - 1].push(item);
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grafikDataResponse = await adapter.getSebaranGrafikPekerjaan();
        setGrafikData(validateData(grafikDataResponse));
        const formattedTableData = grafikDataResponse.map((item) => [item.pekerjaan]);
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
    outputRange: [0, 600],
  });

  const maxValue =
    grafikData.length > 0
      ? Math.max(...grafikData.map((item) => item.value), 75)
      : 75;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[styles.headerDropdown, isExpanded && styles.headerDropdownExpanded]}
        onPress={toggleDropdown}
      >
        <Text style={styles.headerText}>SEBARAN PELAYANAN</Text>
        <Image
          style={styles.gambar}
          source={isExpanded ? require("../../assets/Images/panahatas.png") : require("../../assets/Images/panahbawah.png")}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <View style={styles.infoContainer}>
          <View style={styles.separator} />

          {loading ? (
            <Text style={styles.loadingText}>Loading data...</Text>
          ) : (
            <View>
              {calculateHeaderRows(grafikData).map((row, rowIndex) => (
                <Row
                  key={rowIndex}
                  data={row.map((pekerjaan) => (
                    <View style={styles.headerCell} key={pekerjaan}>
                      <View style={[styles.circle, { backgroundColor: "#8E44AD" }]} />
                      <Text style={styles.tableHeaderText}>{pekerjaan}</Text>
                    </View>
                  ))}
                  style={[styles.tableHeader, { marginBottom: 10 }]}
                />
              ))}
            </View>
          )}

          {grafikData.length > 0 && (
            <View style={{ position: "relative", marginTop: 30, marginLeft: -6 }}>
              <BarChart
                data={grafikData}
                barWidth={15}
                spacing={12}
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
                    top: -20,
                    left: 24 + selectedBar.index * (8 + 24),
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>{selectedBar.pekerjaan}</Text>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>Wilayah: {selectedBar.label}</Text>
                  <Text style={{ color: "gray" }}>Total: {selectedBar.total}</Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.chartFooter}>Pekerjaan</Text>
        </View>

        <ButtonDetail
          title="Lihat Detail"
          navigation={navigation}
          navigasi="Detail_golongandarah"
          style={styles.detailButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  headerCell: {
    alignItems: "center",
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
  },
  chartFooter: {
    textAlign: "center",
    fontSize: 12,
    color: "gray",
    marginTop: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
  },
  detailButton: {
    marginTop: 20,
  },
});
