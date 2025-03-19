import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import axios from "axios";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";

export default function Detail_golongandarah({ navigation }) {
  const [tableHead, setTableHead] = useState([
    "No Induk Jemaat",
    "Kode Wilayah",
    "Nama",
    "Golongan Darah",
    "Telepon",
  ]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Jumlah baris per halaman
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null); // Kategori yang dipilih
  const [open, setOpen] = useState(false); // Untuk membuka dan menutup dropdown
  const [items, setItems] = useState([
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "O", value: "o" },
    { label: "AB", value: "ab" },
  ]);

  // Adjust width of Kode Wilayah column (second column) to be smaller
  const widthArr = [80, 100, 300, 200, 150]; // Shrinking Kode Wilayah column to 120

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://apigereja-production.up.railway.app/jemaat/detailGolonganDarah"
        );
        const rawData = response.data.data;

        const formattedData = rawData.map((item) => [
          item.no_induk_jemaat || "",
          item.kode_wilayah || "",
          item.nama || "",
          item.golongan_darah || "Tidak Mengisi",
          item.telepon || "-",
        ]);
        setTableData(formattedData);
        setFilteredData(formattedData); // Initialize filtered data with all data
        if (category) {
          handleCategoryChange(category);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (!value) {
      // Jika kategori kosong, tampilkan semua data
      setFilteredData(tableData);
      return;
    }

    // Filter data berdasarkan kategori yang dipilih
    const filtered = tableData.filter(
      (item) => item[3]?.toLowerCase().trim() === value.toLowerCase()
    );

    setFilteredData(filtered);
  };

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Ambil data untuk halaman saat ini
  const currentTableData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Fungsi untuk mengubah halaman
  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            style={styles.gambar}
            source={require("../../assets/Images/panahkiri.png")}
          />
          <Text style={styles.headerTitle}>Data Golongan Darah</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>DATA GOLONGAN DARAH</Text>

      {/* Search Bar */}
      <DropDownPicker
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const value = callback(category);
          handleCategoryChange(value);
        }}
        setItems={setItems}
        placeholder="Pilih Kategori"
        searchable={true}
        searchPlaceholder="Cari kategori"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownPicker}
        labelStyle={styles.dropdownLabel}
        selectedItemContainerStyle={styles.selectedItem}
        zIndex={1000}
        zIndexInverse={3000}
      />
      <Text style={styles.totalData}>Total Data: {filteredData.length}</Text>
      {loading ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
      ) : (
        <>
          <View style={styles.table}>
            {/* Table Header */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#ddd' }}>
                <Row
                  data={tableHead}
                  style={styles.tableHeader}
                  textStyle={styles.tableHeaderText}
                  widthArr={widthArr} // Set width for each column
                />

                {/* Table Content */}
                {currentTableData.length > 0 ? (
                  currentTableData.map((item, index) => (
                    <TableWrapper key={index} style={styles.tableRow}>
                      {item.map((cellData, cellIndex) => (
                        <Cell
                        key={cellIndex}
                        data={cellData}
                        textStyle={StyleSheet.flatten(styles.tableCell)} // Pastikan textStyle berupa objek
                        width={widthArr[cellIndex]} // Apply column width
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
                style={[
                  styles.pageButton,
                  currentPage === 1 && styles.disabledButton,
                ]}
                onPress={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Text style={styles.pageButtonText}>Prev</Text>
              </TouchableOpacity>
              <Text style={styles.pageInfo}>
                {currentPage} / {totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                onPress={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.pageButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#4A90E2",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    padding: 6,
  },
  tableCell: {
    padding: 6,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  pageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pageInfo: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  noData: {
    textAlign: "center",
    padding: 20,
    color: "#555",
  },
  gambar: {
    width: 20,
    height: 20,
    marginRight: 20,
  },  
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownPicker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    height: 50,
  },
  dropdownLabel: {
    fontSize: 14,
  },
  selectedItem: {
    backgroundColor: "#f0f0f0",
  },
  totalData: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
});
