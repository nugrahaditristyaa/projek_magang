// StackBarChart.js
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { View, Dimensions } from 'react-native';
import axios from 'axios';

const StackBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map(item => item.label), // Misalnya 'label' adalah kunci untuk label
    datasets: [
      {
        data: data.map(item => item.value1), // Misalnya 'value1' adalah kunci untuk data
        color: () => `rgba(255, 0, 0, 1)`, // Warna untuk dataset 1
      },
      {
        data: data.map(item => item.value2), // Dataset kedua
        color: () => `rgba(0, 255, 0, 1)`, // Warna untuk dataset 2
      },
    ],
    legend: ['Dataset 1', 'Dataset 2'],
  };

  return (
    <View>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#e26e5b',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#fff',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default StackBarChart;
