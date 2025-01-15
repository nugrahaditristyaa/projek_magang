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
      golongan_darah: item.golongan_darah || "Tidak Mengisi",
      frontColor:
        item.kode_wilayah && item.golongan_darah === "A"
          ? "#ea5545"
          : item.kode_wilayah && item.golongan_darah === "B"
          ? "#87bc45"
          : item.kode_wilayah && item.golongan_darah === "O"
          ? "#27aeef"
          : item.kode_wilayah && item.golongan_darah === "AB"
          ? "#b33dc6"
          : "#8E44AD",
      onPress: () => {
        setSelectedBar({
          index,
          total: item.total || 0,
          label: item.kode_wilayah || "Unknown",
          golongan_darah: item.golongan_darah || "Tidak Mengisi",
        });
      },
    }));
  };

  const calculateHeaderRows = (data, itemsPerRow = 3) => {
    const uniqueItems = Array.from(new Set(data.map((item) => item.golongan_darah)));
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
        const grafikDataResponse = await adapter.getSebaranGrafikGolonganDarah();
        setGrafikData(validateData(grafikDataResponse));
        const formattedTableData = grafikDataResponse.map((item) => [
          item.golongan_darah,
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
    outputRange: [0, 460],
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
        <Text style={styles.headerText}>SEBARAN GOLONGAN DARAH</Text>
        <Image
          style={styles.gambar}
          source={
            isExpanded
              ? require("../../assets/Images/panahatas.png")
              : require("../../assets/Images/panahbawah.png")
          }
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
                  data={row.map((golongan_darah) => (
                    <View style={styles.headerCell} key={golongan_darah}>
                      <View
                        style={[
                          styles.circle,
                          {
                            backgroundColor:
                              golongan_darah === "A"
                                ? "#ea5545"
                                : golongan_darah === "B"
                                ? "#87bc45"
                                : golongan_darah === "O"
                                ? "#27aeef"
                                : golongan_darah === "AB"
                                ? "#b33dc6"
                                : "#8E44AD",
                          },
                        ]}
                      />
                      <Text style={styles.tableHeaderText}>{golongan_darah}</Text>
                    </View>
                  ))}
                  style={[styles.tableHeader, { marginBottom: 10 }]}
                />
              ))}
            </View>
          )}

          {grafikData.length > 0 && (
            <View style={{ position: "relative", marginTop: 30,marginLeft: -6 }}>
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
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    {selectedBar.golongan_darah}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Wilayah: {selectedBar.label}
                  </Text>
                  <Text style={{ color: "gray" }}>Total: {selectedBar.total}</Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.chartFooter}>Golongan Darah</Text>
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
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
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
  chartFooter: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
});
