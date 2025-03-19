import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import adapter from "../../services/adapter";

export default function DaftarUlangTahun({ navigation }) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getAPI = async () => {
    try {
      const ulangTahunData = await adapter.getUlangTahunJemaat();
      const currentDate = new Date();
      const formattedData = ulangTahunData.map((item) => {
        const birthDate = new Date(item.tanggal_lahir);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
        ) {
          age -= 1;
        }
        return {
          id: item.no_induk_jemaat,
          kode: item.kode_wilayah,
          nama: item.nama,
          tglLahir: birthDate,
          umur: age,
        };
      });
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const filteredData = data.filter((item) => {
    if (!selectedMonth) return true;
    return item.tglLahir.getMonth() + 1 === selectedMonth;
  });

  const totalFilteredData = filteredData.length;
  const totalPages = Math.ceil(totalFilteredData / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const tableHeaders = ['No Induk Jemaat', 'Kode Wilayah', 'Nama', 'Tanggal Lahir', 'Umur'];
  const widthArr = [78, 70, 300, 100, 60];

  const renderRow = (item) => [
    item.id,
    item.kode,
    item.nama,
    item.tglLahir instanceof Date && !isNaN(item.tglLahir.getTime())
      ? item.tglLahir.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'Tanggal tidak valid',
    item.umur,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATA ULANG TAHUN WARGA GKJ DAYU</Text>

      <View style={styles.searchContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => {
            setSelectedMonth(itemValue);
            setCurrentPage(1);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Bulan" value="" />
          {[...Array(12)].map((_, i) => (
            <Picker.Item key={i + 1} label={new Date(0, i).toLocaleString('id-ID', { month: 'long' })} value={i + 1} />
          ))}
        </Picker>
      </View>

      <Text style={styles.dataCount}>
        Total Data: {totalFilteredData} 
      </Text>

      <ScrollView horizontal>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
          <Row
            data={tableHeaders}
            widthArr={widthArr}
            style={styles.tableHeader}
            textStyle={styles.tableHeaderText}
          />
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <TableWrapper key={index} style={styles.tableRow}>
                {renderRow(item).map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellData} textStyle={styles.tableCell} style={{ width: widthArr[cellIndex] }} />
                ))}
              </TableWrapper>
            ))
          ) : (
            <Text style={styles.noData}>Tidak ada data yang ditemukan.</Text>
          )}
        </Table>
      </ScrollView>

      {/* PAGINATION */}
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>

        <ScrollView horizontal contentContainerStyle={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <TouchableOpacity
              key={page}
              style={[
                styles.pageNumber,
                currentPage === page && styles.activePageNumber,
              ]}
              onPress={() => setCurrentPage(page)}
            >
              <Text style={[
                  styles.pageNumberText,
                  currentPage === page && styles.activePageNumberText
                ]}>
                  {page}
                </Text>
              </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          onPress={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginBottom: 20, marginTop: -20 },
  searchContainer: { marginBottom: 10, backgroundColor: "white", borderRadius: 8 },
  picker: { flex: 1, height: 50 },
  dataCount: { fontSize: 16, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  tableHeader: { backgroundColor: '#4A90E2', height: 50 },
  tableHeaderText: { textAlign: 'center', fontWeight: 'bold', padding: 8, color: '#fff' },
  tableRow: { flexDirection: 'row', backgroundColor: '#F8FAFC' },
  tableCell: { padding: 8, textAlign: 'center', borderWidth: 1, borderColor: '#ddd' },
  noData: { textAlign: 'center', padding: 20, color: '#555' },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    marginHorizontal: 5,
    width: 60,
    alignItems: 'center',
  },
  pageButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center',},
  disabledButton: { backgroundColor: '#B0BEC5' },

  pageNumbers: { flexDirection: 'row', alignItems: 'center' },
  pageNumber: { padding: 10, marginHorizontal: 5, backgroundColor: '#E3F2FD', borderRadius: 5 },
  activePageNumber: { backgroundColor: '#4A90E2'},
  pageNumberText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  activePageNumberText: { color: '#fff' },
});
