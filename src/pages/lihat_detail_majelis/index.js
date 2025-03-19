import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import adapter from "../../services/adapter";
import moment from "moment";

export default function DataMajelis({ navigation }) {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const majelis = await adapter.getMajelis();
      setData(majelis);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      Alert.alert("Error", "Gagal mengambil data dari server");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Filter data berdasarkan status dan pencarian
  const filteredData = data.filter((item) => {
    const matchesStatus =
      selectedStatus === "All" || item.status_aktif === selectedStatus;
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kode_wilayah.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Reset halaman saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [selectedStatus, searchQuery]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleDelete = async (id_majelis) => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus data ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        onPress: async () => {
          setIsDeleting(true);
          try {
            const response = await adapter.deleteMajelis(id_majelis);
            Alert.alert("Sukses", "Data berhasil dihapus");
            fetchData();
          } catch (error) {
            console.error("Gagal menghapus data", error.message);
            Alert.alert("Error", `Gagal menghapus data: ${error.message}`);
          } finally {
            setIsDeleting(false);
          }
        },
      },
    ]);
  };

  const handleUpdate = (id_majelis) => {
    navigation.navigate("Update_majelis", { id_majelis });
  };

  const handleNextPage = () => {
    if (endIndex < filteredData.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Sedang memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATA MAJELIS GEREJA</Text>

      {/* Pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari berdasarkan nama atau kode wilayah..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Status */}
      <Picker
        selectedValue={selectedStatus}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
      >
        <Picker.Item label="Semua Status" value="All" />
        <Picker.Item label="Aktif" value="Aktif" />
        <Picker.Item label="Tidak Aktif" value="Tidak Aktif" />
      </Picker>

      {/* Tabel */}
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={[styles.headerCell, { width: 150 }]}>Nama</Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Kode Wilayah
            </Text>
            <Text style={[styles.headerCell, { width: 100 }]}>Jabatan</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Periode Jabatan
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Tanggal Berlaku SK
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Tanggal Penahbisan
            </Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Status Aktif
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Action</Text>
          </View>

          {currentData.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                Tidak ada data yang ditemukan.
              </Text>
            </View>
          ) : (
            currentData.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text
                  style={[styles.cell, { width: 150 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.nama}
                </Text>
                <Text
                  style={[styles.cell, { width: 100 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.kode_wilayah}
                </Text>
                <Text
                  style={[styles.cell, { width: 100 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.jabatan}
                </Text>
                <Text
                  style={[styles.cell, { width: 120 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.periode_jabatan}
                </Text>
                <Text
                  style={[styles.cell, { width: 120 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {moment(item.tglBerlakuSK).format("DD-MM-YYYY")}
                </Text>
                <Text
                  style={[styles.cell, { width: 120 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {moment(item.tglPenahbisan).format("DD-MM-YYYY")}
                </Text>
                <Text
                  style={[
                    styles.cell,
                    {
                      width: 100,
                      color: item.status_aktif === "Aktif" ? "green" : "red",
                      fontWeight: "bold",
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.status_aktif}
                </Text>
                <View style={[styles.actionCell, { width: 120 }]}>
                  <TouchableOpacity
                    style={[styles.button, styles.updateButton]}
                    onPress={() => handleUpdate(item.id_majelis)}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item.id_majelis)}
                    disabled={isDeleting}
                  >
                    <Text style={styles.buttonText}>
                      {isDeleting ? "Menghapus..." : "Delete"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handlePreviousPage}
          disabled={page === 1}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText2}>
          Halaman {page} dari {Math.ceil(filteredData.length / itemsPerPage)}
        </Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handleNextPage}
          disabled={endIndex >= filteredData.length}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
    color: "#333",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  cell: {
    textAlign: "center",
    paddingHorizontal: 8,
    color: "#333",
  },
  actionCell: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#E53935",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paginationButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  paginationText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  paginationText2: {
    fontSize: 14,
    color: "#000",
  },
  noDataContainer: {
    padding: 20,
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
  },
});
