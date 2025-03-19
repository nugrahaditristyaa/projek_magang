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
import adapter from "../../services/adapter";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

export default function DataJemaat({ navigation }) {
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
      const jemaat = await adapter.getJemaat();
      setData(jemaat);
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

  const filteredData = data.filter((item) => {
    const matchesStatus =
      selectedStatus === "All" || item.keaktifan_jemaat === selectedStatus;
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

  const handleDelete = async (no_urut) => {
    console.log("🔍 ID yang akan dihapus:", no_urut); // Debugging
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus data ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        onPress: async () => {
          setIsDeleting(true);
          try {
            const response = await adapter.deleteJemaat(no_urut);
            console.log("Respons dari server:", response.data);
            Alert.alert("Sukses", "Data berhasil dihapus");
            fetchData();
          } catch (error) {
            console.error(
              "Gagal menghapus data",
              error.response?.data || error.message
            );
            Alert.alert(
              "Error",
              `Gagal menghapus data: ${
                error.response?.data?.message || error.message
              }`
            );
          } finally {
            setIsDeleting(false);
          }
        },
      },
    ]);
  };

  const handleUpdate = (no_urut) => {
    if (navigation) {
      navigation.navigate("Update_jemaat", { no_urut });
    } else {
      console.error("Navigation prop is not available.");
    }
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
      <Text style={styles.title}>DATA JEMAAT GKJ DAYU</Text>

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
            <Text style={[styles.headerCell, { width: 100 }]}>
              No Induk Jemaat
            </Text>
            <Text style={[styles.headerCell, { width: 150 }]}>Nama</Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Kode Wilayah
            </Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Jenis Kelamin
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Status Jemaat
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Keaktifan Jemaat
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Tanggal Tidak Aktif
            </Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Action</Text>
          </View>

          {currentData.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text
                style={[styles.cell, { width: 100 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.no_induk_jemaat}
              </Text>
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
                {item.jenis_kelamin}
              </Text>
              <Text
                style={[styles.cell, { width: 120 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.status_jemaat}
              </Text>
              <Text
                style={[
                  styles.cell,
                  {
                    width: 120,
                    color: item.keaktifan_jemaat === "Aktif" ? "green" : "red",
                    fontWeight: "bold",
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.keaktifan_jemaat}
              </Text>
              <Text
                style={[styles.cell, { width: 120 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.tanggal_tidak_aktif
                  ? moment(item.tanggal_tidak_aktif).format("DD-MM-YYYY")
                  : "-"}
              </Text>
              <View style={[styles.actionCell, { width: 120 }]}>
                <TouchableOpacity
                  style={[styles.button, styles.updateButton]}
                  onPress={() => handleUpdate(item.no_urut)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(item.no_urut)}
                  disabled={isDeleting}
                >
                  <Text style={styles.buttonText}>
                    {isDeleting ? "Menghapus..." : "Delete"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingBottom: 10,
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
  },
  cell: {
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
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
});
