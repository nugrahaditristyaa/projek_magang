import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated ,Image} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import ButtonDetail from "../ButtonNavigate";
import Images from "../../assets/Images";

export default function SebaranGolonganDarah({navigation}){
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0)); // Start with height 0
  const toggleDropdown = () => {
    const toValue = isExpanded ? 0 : 1; // Determine final value based on expanded state

    Animated.timing(animation, {
      toValue,
      duration: 700,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  // Interpolate the animation value to height
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 455], // Adjust the height values as needed
  });

  return (
    <View style={styles.card}>
      {/* Header as a toggle for the dropdown */}
      <TouchableOpacity 
        style={[styles.headerDropdown, isExpanded && styles.headerDropdownExpanded]} 
        onPress={toggleDropdown}
      >
        <Text style={styles.headerText}>SEBARAN GOLONGAN DARAH</Text>
        <Image style={styles.gambar} source={isExpanded ? require('../../assets/Images/panahatas.png') : require('../../assets/Images/panahbawah.png')}/>
      </TouchableOpacity>

      
      {/* Dropdown content */}
      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <View style={styles.infoContainer}>
        <View style={styles.separator} />
        <View style={styles.infoItemwarga}>
            <Text style={styles.wargaText}>Jumlah Warga</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.dot, { backgroundColor: 'red' }]} />
            <Text style={styles.wilayahText}>Wilayah 1</Text>
            <Text style={styles.number}>62</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.dot, { backgroundColor: 'green' }]} />
            <Text style={styles.wilayahText}>Wilayah 3</Text>
            <Text style={styles.number}>37</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.dot, { backgroundColor: 'blue' }]} />
            <Text style={styles.wilayahText}>Wilayah 4</Text>
            <Text style={styles.number}>66</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.dot, { backgroundColor: 'purple' }]} />
            <Text style={styles.wilayahText}>Wilayah 5</Text>
            <Text style={styles.number}>87</Text>
          </View>
          <View style={[styles.infoItem, styles.totalItem]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.number}>252</Text>
          </View>
        </View>

        <BarChart
          data={{
            labels: ['Tidak Mengisi', 'O', 'B', 'A'],
            datasets: [
              {
                data: [62, 37, 66, 87],
              },
            ],
            colors: [
              () => 'red',
              () => 'green',
              () => 'blue',
              () => 'purple',
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel=""
          showValuesOnTopOfBars={false} // Menyembunyikan nilai di atas bar
          fromZero // Mulai dari nol
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />

        <ButtonDetail
          title="Lihat Detail"
          navigation={navigation}
          navigasi="Detail_golongandarah"
          style={styles.detailButton}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  headerDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDropdownExpanded: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gambar: {
    width: 20,  
    height: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginVertical: 10,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItemwarga: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 15,
  },
  wilayahText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 15,
  },
  wargaText: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 25,
  },
  totalText: {
    fontWeight: 'bold',
    marginLeft: 40,
  },
  number: {
    marginRight: 25,
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalItem: {
    marginTop: 5,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 20,
  },
  detailButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});