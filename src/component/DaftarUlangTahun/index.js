import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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
  const [searchValue, setSearchValue] = useState('');  // State untuk menyimpan nilai pencarian
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

  // Filter data berdasarkan pencarian
  const filteredData = data.filter((item) => {
    if (!searchValue) return true;

    const searchLower = searchValue.toLowerCase();
    const birthDate = item.tglLahir; // item.tglLahir sudah berupa objek Date

    const itemMonth = birthDate.getMonth() + 1; // Bulan (0-based, tambah 1)
    const itemYear = birthDate.getFullYear();   // Tahun

    // Konversi searchValue menjadi angka atau bulan (jika teks)
    const searchMonthAsNumber = isNaN(searchValue)
      ? getMonthNumber(searchLower) // Jika teks, cari nomor bulan
      : Number(searchValue);

    return (
      item.nama.toLowerCase().includes(searchLower) || // Cari nama
      itemYear === Number(searchValue) ||             // Cari tahun
      itemMonth === searchMonthAsNumber               // Cari bulan
    );
  });

  // Fungsi untuk mengubah halaman
  const paginate = (page) => {
    setCurrentPage(page);
  };

  // Data untuk ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.kode}</Text>
      <Text style={styles.tableCell}>{item.nama}</Text>
      <Text style={styles.tableCell}>
        {item.tglLahir instanceof Date && !isNaN(item.tglLahir.getTime()) // Periksa apakah tglLahir valid
          ? item.tglLahir.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : 'Tanggal tidak valid'}
      </Text>
      <Text style={styles.tableCell}>{item.umur}</Text>
    </View>
  );

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATA ULANG TAHUN WARGA GKJ DAYU</Text>

      <ScrollView style={styles.content}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama, MM, atau YYYY"
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>

        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>No Induk Jemaat</Text>
            <Text style={styles.tableCell}>Kode Wilayah</Text>
            <Text style={styles.tableCell}>Nama</Text>
            <Text style={styles.tableCell}>Tanggal Lahir</Text>
            <Text style={styles.tableCell}>Umur</Text>
          </View>

          {/* Content */}
          {paginatedData.length > 0 ? (
            <FlatList
              data={paginatedData}  // Menampilkan data yang sudah difilter berdasarkan pencarian dan di-paginasi
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={
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
              }
            />
          ) : (
            <Text style={styles.noData}>Tidak ada data yang ditemukan.</Text>
          )}
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
  },
  searchInput: {
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
  },
  tableCell: {
    flex: 1,
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
    backgroundColor: '#ddd',
  },
});
