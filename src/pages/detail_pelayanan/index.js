import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";

export default function Detail_pelayanan({ navigation }) {
  const [tableHead, setTableHead] = useState([
    "No Induk Jemaat",
    "Kode Wilayah",
    "Nama",
    "Pelayanan",
    "Telepon",
  ]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Jumlah baris per halaman
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null); // Kategori yang dipilih
  const [open, setOpen] = useState(false); // Untuk membuka dan menutup dropdown
  const [items, setItems] = useState([]);

  const widthArr = [80, 100, 300, 200, 150];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://apigkjdayu-1fsn3awq.b4a.run/jemaat/detailPelayanan"
        );
        const rawData = response.data.data;

        const formattedData = rawData.map((item) => [
          item.no_induk_jemaat || "",
          item.kode_wilayah || "",
          item.nama || "",
          item.pelayanan_diikuti || "Tidak Mengisi",
          item.telepon || "-",
        ]);
        setTableData(formattedData);
        setFilteredData(formattedData); // Initialize filtered data with all data
        if (category) {
          console.log("Current category:", category);
          handleCategoryChange(category);
        }

        // Fetch dropdown data
        const dropdownResponse = await axios.get(
          "https://apigkjdayu-1fsn3awq.b4a.run/pelayanan" // Replace with your API endpoint for categories
        );
        const dropdownData = dropdownResponse.data.data; // Assume this returns an array of categories
        console.log(dropdownData);

        if (Array.isArray(dropdownData)) {
          // Map the dropdown data into the format needed for DropDownPicker
          const formattedItems = dropdownData.map((category, index) => ({
            label: category.nama_pelayanan || "N/A", // Replace 'name' with the appropriate field from your response
            value: category.nama_pelayanan || `unknown-${index}`, // Replace 'value' with the appropriate field
          }));

          setItems(formattedItems);
        } else {
          console.error("Dropdown data is not an array:", dropdownData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search input
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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentTableData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          <Text style={styles.headerTitle}>Data Pelayanan</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>DATA PELAYANAN WARGA GKJ DAYU</Text>

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

      {loading ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
      ) : (
        <>
          <View style={styles.table}>
            {/* Table Header */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#ddd" }}>
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
                  <Text style={styles.noData}>
                    Tidak ada data yang ditemukan.
                  </Text>
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
                <Text style={styles.pageButtonText}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.pageInfo}>
                {currentPage} / {totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  currentPage === totalPages && styles.disabledButton,
                ]}
                onPress={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
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
    backgroundColor: "#95FBFB",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
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
    backgroundColor: "#007bff",
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
});
