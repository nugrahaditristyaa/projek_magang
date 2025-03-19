import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { postPegawai } from "../../services/adapter"; // Pastikan path sesuai dengan lokasi file api.js
import adapter from "../../services/adapter";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const PegawaiForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
    status_aktif: "",
    kode_user: "1",
  });

  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Fungsi untuk menangani input manual tanggal dalam format yyyy-mm-dd
  const handleManualDateInput = (field, text) => {
    // Hapus karakter non-numerik dari input
    const cleanedText = text.replace(/[^0-9]/g, "");

    let formattedText = cleanedText;

    // Format teks menjadi yyyy-mm-dd
    if (cleanedText.length > 4) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(4, 6)}`;
      if (cleanedText.length > 6) {
        formattedText += `-${cleanedText.slice(6, 8)}`;
      }
    }

    // Update state formData dengan nilai yang sudah diformat
    setFormData({ ...formData, [field]: formattedText });
  };

  // Fungsi untuk menangani tanggal yang dipilih dari DatePicker
  const handleDateConfirm = (date) => {
    // Format tanggal menjadi yyyy-mm-dd
    const formattedDate = date.toISOString().split("T")[0];

    // Update state formData dengan tanggal yang sudah diformat
    handleInputChange(datePicker.field, formattedDate);
    setDatePicker({ visible: false, field: "" });
  };

  const fieldLabels = {
    nama: "Nama",
    posisi: "Posisi",
    tanggal_masuk: "Tanggal Masuk",
    tanggal_keluar: "Tanggal Keluar",
    status_aktif: "Status Aktif",
  };

  const handleSubmit = async () => {
    // Field wajib diisi
    const requiredFields = ["nama", "posisi", "tanggal_masuk"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const missingFields = emptyFields
        .map((field) => fieldLabels[field])
        .join(", ");
      Alert.alert("Gagal", `Kolom yang wajib diisi: ${missingFields}`);
      return;
    }

    // Buat salinan formData untuk dikirim ke API
    const requestData = { ...formData };

    // Hapus field opsional jika kosong
    if (!requestData.tanggal_keluar) {
      delete requestData.tanggal_keluar;
    }
    if (!requestData.status_aktif) {
      delete requestData.status_aktif;
    }

    setIsLoading(true);
    try {
      const response = await adapter.postPegawai(requestData); // Kirim data ke API
      Alert.alert("Sukses", "Data berhasil disimpan!");
      navigation.goBack(); // Kembali ke halaman sebelumnya setelah berhasil

      // Reset form setelah berhasil
      setFormData({
        nama: "",
        posisi: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
        status_aktif: "",
        kode_user: "1",
      });
    } catch (error) {
      Alert.alert("Gagal", "Harap isi data dengan format yang benar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulir Data Pegawai</Text>

      <Text style={styles.label}>
        Nama <Text style={styles.required}>*</Text>{" "}
      </Text>
      <TextInput
        label="Masukan Nama"
        value={formData.nama}
        onChangeText={(text) => handleInputChange("nama", text)}
        style={styles.input}
      />

      <Text style={styles.label}>
        Posisi <Text style={styles.required}>*</Text>{" "}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.posisi}
          onValueChange={(itemValue) => handleInputChange("posisi", itemValue)}
        >
          <Picker.Item label="Pilih Posisi" value="" />
          <Picker.Item label="Pendeta" value="Pendeta" />
          <Picker.Item label="Majelis" value="Majelis" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>
      </View>

      <Text style={styles.label}>
        Tanggal Masuk <Text style={styles.required}>*</Text>{" "}
      </Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tanggal_masuk}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tanggal_masuk", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggal_masuk" })
            }
          />
        }
      />

      <Text style={styles.label}>Tanggal Keluar</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tanggal_keluar}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tanggal_keluar", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggal_keluar" })
            }
          />
        }
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Status Aktif</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("status_aktif", value)}
          value={formData.status_aktif}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Aktif" />
            <Text>Aktif</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Tidak Aktif" />
            <Text>Tidak Aktif </Text>
          </View>
        </RadioButton.Group>
      </View>

      <DateTimePickerModal
        isVisible={datePicker.visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePicker({ visible: false, field: "" })}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Edit")}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Batal
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333333",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333333",
  },
  label: {
    fontWeight: "600",
    marginVertical: 8,
    fontSize: 16,
    color: "#444444",
  },
  radioContainer: {
    marginTop: 12,
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#444444",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  required: {
    color: "red",
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
});
export default PegawaiForm;
