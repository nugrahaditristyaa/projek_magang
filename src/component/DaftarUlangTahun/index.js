import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import adapter from "../../services/adapter";

// Fungsi untuk mengonversi nama bulan menjadi angka
const getMonthNumber = (monthName) => {
  const months = [
    "jan", "feb", "mar", "apr", "mei", "jun", 
    "jul", "agu", "sep", "okt", "nov", "des"
  ];
  return months.indexOf(monthName.toLowerCase().slice(0, 3)) + 1;
};

export default function DaftarUlangTahun({ navigation }) {
  const [data, setData] = useState([]); // State untuk menyimpan data ulang tahun
  const [selectedMonth, setSelectedMonth] = useState('');  // State untuk bulan yang dipilih
  const [currentPage, setCurrentPage] = useState(1);  // Halaman saat ini
  const [pageSize, setPageSize] = useState(10);       // Jumlah data per halaman

  // Fetch data API
  const getAPI = async () => {
    try {
      const ulangTahunData = await adapter.getUlangTahunJemaat();
      console.log('Data fetched from API:', ulangTahunData); // Logging data
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
          tglLahir: birthDate, // Simpan sebagai objek Date
          umur: age,
        };
      });
      setData(formattedData); // Menyimpan data lengkap tanpa filter
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  // Filter data berdasarkan bulan yang dipilih
  const filteredData = data.filter((item) => {
    if (!selectedMonth) return true; // Tidak ada filter bulan, tampilkan semua data

    const birthDate = item.tglLahir; // item.tglLahir sudah berupa objek Date
    const itemMonth = birthDate.getMonth() + 1; // Bulan (0-based, tambah 1)

    return itemMonth === selectedMonth; // Hanya tampilkan data dengan bulan yang sama
  });

  // Fungsi untuk mengubah halaman
  const paginate = (page) => {
    setCurrentPage(page);
  };

  // Data untuk ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderRow = (item) => [
    item.id,
    item.kode,
    item.nama,
    item.tglLahir instanceof Date && !isNaN(item.tglLahir.getTime())
      ? item.tglLahir.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'Tanggal tidak valid',
    item.umur,
  ];

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Array width for each column
  const widthArr = [80, 100, 300, 110, 50]; // Width for each column (adjust as necessary)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATA ULANG TAHUN WARGA GKJ DAYU</Text>

      <ScrollView style={styles.content}>
        {/* Month Picker */}
        <View style={styles.searchContainer}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Pilih Bulan" value="" />
            <Picker.Item label="Januari" value={1} />
            <Picker.Item label="Februari" value={2} />
            <Picker.Item label="Maret" value={3} />
            <Picker.Item label="April" value={4} />
            <Picker.Item label="Mei" value={5} />
            <Picker.Item label="Juni" value={6} />
            <Picker.Item label="Juli" value={7} />
            <Picker.Item label="Agustus" value={8} />
            <Picker.Item label="September" value={9} />
            <Picker.Item label="Oktober" value={10} />
            <Picker.Item label="November" value={11} />
            <Picker.Item label="Desember" value={12} />
          </Picker>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
              <Row
                data={['No Induk Jemaat', 'Kode Wilayah', 'Nama', 'Tanggal Lahir', 'Umur']}
                style={styles.tableHeader}
                textStyle={styles.tableHeaderText}
                widthArr={widthArr} // Set width for each column
              />
              {/* Table Content */}
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableWrapper key={index} style={styles.tableRow}>
                    {renderRow(item).map((cellData, index) => (
                      <Cell
                        key={index}
                        data={cellData}
                        textStyle={styles.tableCell}
                        width={widthArr[index]} // Apply column width
                      />
                    ))}
                  </TableWrapper>
                ))
              ) : (
                <Text style={styles.noData}>Tidak ada data yang ditemukan.</Text>
              )}
            </Table>
          </ScrollView>

          {/* Pagination */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
              onPress={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>
              {currentPage} / {totalPages}
            </Text>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
              onPress={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginBottom: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#95FBFB',
    borderTopLeftRadius: 8, // Border radius for the top left corner
    borderTopRightRadius: 8, // Border radius for the top right corner
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 6,
  },
  tableCell: {
    padding: 6,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  noData: {
    textAlign: 'center',
    padding: 20,
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
