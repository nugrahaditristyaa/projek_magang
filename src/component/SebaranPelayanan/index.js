import React, { useState, useEffect, useRef } from "react";
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
import adapter from "../../services/adapter";

export default function SebaranPelayanan({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [grafikData, setGrafikData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState(null);
  const timeoutRef = useRef(null);

  const processData = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const groupedData = data.reduce((acc, item) => {
      const key = item.pelayanan_diikuti || "Tidak Diketahui";
      acc[key] = (acc[key] || 0) + (item.total || 0);
      return acc;
    }, {});

    return Object.keys(groupedData).map((key, index) => ({
      value: groupedData[key],
      label: key,
      frontColor: "#27aeef",
      onPress: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setSelectedBar({
          index,
          total: groupedData[key],
          pelayanan_diikuti: key,
        });
        timeoutRef.current = setTimeout(() => {
          setSelectedBar(null);
        }, 3000);
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grafikDataResponse = await adapter.getSebaranGrafikPelayanan();
        setGrafikData(processData(grafikDataResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <TouchableOpacity
        style={[
          styles.headerDropdown,
          isExpanded && styles.headerDropdownExpanded,
        ]}
        onPress={toggleDropdown}
      >
        <Text style={styles.headerText}>SEBARAN PELAYANAN</Text>
        <Image
          style={styles.gambar}
          source={
            isExpanded
              ? require("../../assets/Images/panahatas.png")
              : require("../../assets/Images/panahbawah.png")
          }
        />
      </TouchableOpacity>

      <Animated.View
        style={[styles.contentContainer, { height: animatedHeight }]}
      >
        <View style={styles.infoContainer}>
          <View style={styles.separator} />

          {loading ? (
            <Text style={styles.loadingText}>Loading data...</Text>
          ) : (
            <View style={{ position: "relative", marginTop: 30 }}>
              <BarChart
                data={grafikData}
                barWidth={25}
                spacing={60}
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
                    top: -40,
                    left: selectedBar.index , // Adjust based on bar width and spacing
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    {selectedBar.pelayanan_diikuti}
                  </Text>
                  <Text style={{ color: "gray" }}>
                    Total: {selectedBar.total}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.chartFooter}>Pelayanan</Text>
        </View>

        <ButtonDetail
          title="Lihat Detail"
          navigation={navigation}
          navigasi="Detail_pelayanan"
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