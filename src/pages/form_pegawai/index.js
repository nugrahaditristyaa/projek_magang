import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import { postPegawai } from "../../services/adapter"; // Pastikan impor benar

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    tanggalMasuk: new Date(),
    tanggalKeluar: new Date(),
    statusAktif: "Aktif",
  });

  const [showMasuk, setShowMasuk] = useState(false);
  const [showKeluar, setShowKeluar] = useState(false);

  const handleTextChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || formData[field];
    if (field === "tanggalMasuk") {
      setShowMasuk(false);
      setFormData({ ...formData, tanggalMasuk: currentDate });
    } else if (field === "tanggalKeluar") {
      setShowKeluar(false);
      setFormData({ ...formData, tanggalKeluar: currentDate });
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        nama: formData.nama,
        posisi: formData.posisi,
        tanggal_masuk: formData.tanggalMasuk.toISOString().split("T")[0],
        tanggal_keluar: formData.tanggalKeluar.toISOString().split("T")[0],
        status_aktif: formData.statusAktif,
        kode_user: "12345", // Ganti dengan nilai sesuai aplikasi Anda
      };

      console.log("Mengirim data ke server:", dataToSend);

      const response = await postPegawai(dataToSend);
      console.log("Response dari server:", response);

      alert(response.message || "Data berhasil disimpan!");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Gagal mengirim data");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Formulir Data Pegawai</Text>

      {/* Input Nama */}
      <Text style={styles.label}>Nama *</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        value={formData.nama}
        onChangeText={(text) => handleTextChange("nama", text)}
      />

      {/* Input Posisi */}
      <Text style={styles.label}>Posisi *</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Posisi"
        value={formData.posisi}
        onChangeText={(text) => handleTextChange("posisi", text)}
      />

      {/* Tanggal Masuk */}
      <Text style={styles.label}>Tanggal Masuk *</Text>
      <TouchableOpacity
        onPress={() => setShowMasuk(true)}
        style={styles.dateInput}
      >
        <Text>
          {formData.tanggalMasuk.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      {showMasuk && (
        <DateTimePicker
          value={formData.tanggalMasuk}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) =>
            handleDateChange(event, date, "tanggalMasuk")
          }
        />
      )}

      {/* Tanggal Keluar */}
      <Text style={styles.label}>Tanggal Keluar</Text>
      <TouchableOpacity
        onPress={() => setShowKeluar(true)}
        style={styles.dateInput}
      >
        <Text>
          {formData.tanggalKeluar.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </TouchableOpacity>
      {showKeluar && (
        <DateTimePicker
          value={formData.tanggalKeluar}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) =>
            handleDateChange(event, date, "tanggalKeluar")
          }
        />
      )}

      {/* Status Aktif */}
      <Text style={styles.label}>Status Aktif</Text>
      <RadioButton.Group
        onValueChange={(value) =>
          setFormData({ ...formData, statusAktif: value })
        }
        value={formData.statusAktif}
      >
        <View style={styles.radioGroup}>
          <View style={styles.radioItem}>
            <RadioButton value="Aktif" />
            <Text style={styles.radioText}>Aktif</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Tidak Aktif" />
            <Text style={styles.radioText}>Tidak Aktif</Text>
          </View>
        </View>
      </RadioButton.Group>

      {/* Tombol */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonTextCancel}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonTextSave}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonTextCancel: {
    color: "white",
  },
  buttonTextSave: {
    color: "white",
  },
});

export default EmployeeRegistrationForm;
