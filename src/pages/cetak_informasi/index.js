import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import adapter from "../../services/adapter"; // Sesuaikan path ke adapter
import moment from "moment"; // Import moment untuk format tanggal

const CetakInformasiJemaat = () => {
  const [kodeWilayah, setKodeWilayah] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [golonganDarah, setGolonganDarah] = useState("");
  const [dataJemaat, setDataJemaat] = useState([]); // State untuk menyimpan data jemaat
  const [filteredData, setFilteredData] = useState([]); // State untuk menyimpan data yang sudah difilter
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Fungsi untuk mengambil data jemaat dari backend
  const fetchDataJemaat = async () => {
    setIsLoading(true);
    try {
      const data = await adapter.getJemaat(); // Panggil fungsi getJemaat dari adapter
      setDataJemaat(data); // Simpan data ke state
      setFilteredData(data); // Set filteredData dengan data awal
    } catch (error) {
      console.error("Gagal mengambil data jemaat:", error);
      Alert.alert("Error", "Gagal mengambil data jemaat dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data jemaat saat komponen dimuat
  useEffect(() => {
    fetchDataJemaat();
  }, []);

  // Fungsi untuk mencari data jemaat berdasarkan filter
  const handleSearch = () => {
    const filtered = dataJemaat.filter((item) => {
      return (
        (kodeWilayah === "" || item.kode_wilayah === kodeWilayah) &&
        (jenisKelamin === "" || item.jenis_kelamin === jenisKelamin) &&
        (golonganDarah === "" || item.golongan_darah === golonganDarah)
      );
    });
    setFilteredData(filtered); // Update filteredData dengan hasil filter
  };

  // Fungsi untuk export data ke Excel
  const handleExport = () => {
    // Format data untuk Excel
    const worksheetData = filteredData.map((item) => ({
      "No Induk Jemaat": item.no_induk_jemaat,
      Nama: item.nama,
      "Kode Wilayah": item.kode_wilayah,
      "Jenis Kelamin": item.jenis_kelamin,
      "Golongan Darah": item.golongan_darah,
      "Status Jemaat": item.status_jemaat,
      "Keaktifan Jemaat": item.keaktifan_jemaat,
      "Tanggal Tidak Aktif": item.tanggal_tidak_aktif
        ? moment(item.tanggal_tidak_aktif).format("DD-MM-YYYY")
        : "-",
    }));

    // Buat worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Buat workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Jemaat");

    // Generate file Excel
    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    // Simpan file ke sistem
    const uri = FileSystem.cacheDirectory + "DataJemaat.xlsx";
    FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(() => {
        // Bagikan file
        Sharing.shareAsync(uri);
      })
      .catch((error) => {
        console.error("Gagal menyimpan file:", error);
        Alert.alert("Error", "Gagal menyimpan file Excel.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pilih Informasi Yang Akan Ditampilkan</Text>

      {/* Pilih Kode Wilayah */}
      <View style={styles.section}>
        <Text style={styles.label}>Pilih Kode Wilayah</Text>
        <Picker
          selectedValue={kodeWilayah}
          onValueChange={(itemValue) => setKodeWilayah(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Kode Wilayah" value="" />
          <Picker.Item label="Wilayah 1" value="1" />
          <Picker.Item label="Wilayah 3" value="3" />
          <Picker.Item label="Wilayah 4" value="4" />
          <Picker.Item label="Wilayah 5" value="5" />
        </Picker>
      </View>

      {/* Pilih Jenis Kelamin */}
      <View style={styles.section}>
        <Text style={styles.label}>Pilih Jenis Kelamin</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setJenisKelamin("Laki-Laki")}
          >
            <View
              style={[
                styles.radioCircle,
                jenisKelamin === "Laki-Laki" && styles.radioCircleSelected,
              ]}
            />
            <Text style={styles.radioLabel}>Laki-Laki</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setJenisKelamin("Perempuan")}
          >
            <View
              style={[
                styles.radioCircle,
                jenisKelamin === "Perempuan" && styles.radioCircleSelected,
              ]}
            />
            <Text style={styles.radioLabel}>Perempuan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pilih Golongan Darah */}
      <View style={styles.section}>
        <Text style={styles.label}>Pilih Golongan Darah</Text>
        <Picker
          selectedValue={golonganDarah}
          onValueChange={(itemValue) => setGolonganDarah(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Golongan Darah" value="" />
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="AB" value="AB" />
          <Picker.Item label="O" value="O" />
        </Picker>
      </View>

      {/* Tombol Cari dan Export */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExport}>
          <Text style={styles.buttonText}>Export Report</Text>
        </TouchableOpacity>
      </View>

      {/* Tabel Jemaat */}
      <ScrollView horizontal={true} style={styles.tableScrollView}>
        <View style={styles.tableContainer}>
          {/* Header Tabel */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: 100 }]}>No Induk</Text>
            <Text style={[styles.headerCell, { width: 150 }]}>Nama</Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Kode Wilayah
            </Text>
            <Text style={[styles.headerCell, { width: 100 }]}>
              Jenis Kelamin
            </Text>
            <Text style={[styles.headerCell, { width: 100 }]}>Gol. Darah</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Status</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Keaktifan</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>
              Tgl Tidak Aktif
            </Text>
          </View>
          {/* Baris Data */}
          {filteredData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, { width: 100 }]}>
                {item.no_induk_jemaat}
              </Text>
              <Text style={[styles.cell, { width: 150 }]}>{item.nama}</Text>
              <Text style={[styles.cell, { width: 100 }]}>
                {item.kode_wilayah}
              </Text>
              <Text style={[styles.cell, { width: 100 }]}>
                {item.jenis_kelamin}
              </Text>
              <Text style={[styles.cell, { width: 100 }]}>
                {item.golongan_darah}
              </Text>
              <Text style={[styles.cell, { width: 120 }]}>
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
              >
                {item.keaktifan_jemaat}
              </Text>
              <Text style={[styles.cell, { width: 120 }]}>
                {item.tanggal_tidak_aktif
                  ? moment(item.tanggal_tidak_aktif).format("DD-MM-YYYY")
                  : "-"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Memuat data...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333333",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  radioLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4A90E2",
  },
  tableScrollView: {
    marginTop: 20,
  },
  tableContainer: {
    flexDirection: "column",
  },
  tableHeader: {
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
  tableRow: {
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
});

export default CetakInformasiJemaat;
