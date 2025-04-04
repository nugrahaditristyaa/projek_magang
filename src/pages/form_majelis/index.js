import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import adapter from "../../services/adapter";
import { useNavigation, useRoute } from "@react-navigation/native";

const MajelisForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nama: "",
    kode_wilayah: "",
    jabatan: "",
    periode_jabatan: "",
    tanggal_SK: "",
    tgl_penahbisan: "",
    status_aktif: "",
    kode_user: "1",
  });

  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleInputChange(datePicker.field, formattedDate);
    setDatePicker({ visible: false, field: "" });
  };

  const fieldLabels = {
    nama: "Nama",
    kode_wilayah: "Kode Wilayah",
    jabatan: "Jabatan",
    periode_jabatan: "Periode Jabatan",
    tanggal_SK: "Tanggal SK",
    // tgl_penahbisan: "Tanggal Penahbisan",
    // status_aktif: "Status Aktif",
  };

  const handleSubmit = async () => {
    // Field yang wajib diisi (tidak termasuk tgl_penahbisan dan status_aktif)
    const requiredFields = [
      "nama",
      "kode_wilayah",
      "jabatan",
      "periode_jabatan",
      "tanggal_SK",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const missingFields = emptyFields
        .map((field) => fieldLabels[field])
        .join(", ");
      Alert.alert("Gagal", `Kolom yang wajib diisi: ${missingFields}`);
      return;
    }

    // Jika tgl_penahbisan tidak diisi, kirim sebagai null atau string kosong
    const dataToSend = {
      ...formData,
      tgl_penahbisan: formData.tgl_penahbisan ? formData.tgl_penahbisan : null,
      status_aktif: formData.status_aktif
        ? formData.status_aktif
        : "Tidak Aktif",
    };

    setIsLoading(true);
    try {
      await adapter.postMajelis(dataToSend);
      Alert.alert("Sukses", "Data berhasil disimpan!");
      navigation.goBack(); // Kembali ke halaman sebelumnya setelah berhasil

      // Reset form setelah sukses
      setFormData({
        nama: "",
        kode_wilayah: "",
        jabatan: "",
        periode_jabatan: "",
        tanggal_SK: "",
        tgl_penahbisan: "",
        status_aktif: "",
        kode_user: "",
      });
    } catch (error) {
      Alert.alert("Gagal", "Harap isi data dengan format yang benar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulir Majelis Gereja</Text>

      <Text style={styles.label}>
        Nama <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        label="Masukan Nama"
        value={formData.nama}
        onChangeText={(text) => handleInputChange("nama", text)}
        style={styles.input}
      />

      <Text style={styles.label}>
        Kode Wilayah <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.kode_wilayah}
          onValueChange={(itemValue) =>
            handleInputChange("kode_wilayah", itemValue)
          }
        >
          <Picker.Item label="Pilih Kode Wilayah" value="" />
          <Picker.Item label="Wilayah 1" value="1" />
          <Picker.Item label="Wilayah 3" value="3" />
          <Picker.Item label="Wilayah 4" value="4" />
          <Picker.Item label="Wilayah 5" value="5" />
        </Picker>
      </View>

      <Text style={styles.label}>
        Jabatan <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.jabatan}
          onValueChange={(itemValue) => handleInputChange("jabatan", itemValue)}
        >
          <Picker.Item label="Pilih Jabatan" value="" />
          <Picker.Item label="Penatua" value="Penatua" />
          <Picker.Item label="Diaken" value="Diaken" />
          <Picker.Item label="Pendeta" value="Pendeta" />
        </Picker>
      </View>

      <Text style={styles.label}>
        Periode Jabatan <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        label="Masukan Periode Jabatan"
        value={formData.periode_jabatan}
        onChangeText={(text) => handleInputChange("periode_jabatan", text)}
        style={styles.input}
      />

      <Text style={styles.label}>
        Tanggal SK <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tanggal_SK}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tanggal_SK", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggal_SK" })
            }
          />
        }
      />

      <Text style={styles.label}>Tanggal Penahbisan</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tgl_penahbisan}
        style={styles.input}
        onChangeText={(text) =>
          handleManualDateInput("tanggal_penahbisan", text)
        } // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_penahbisan" })
            }
          />
        }
      />

      <Text style={styles.label}>Status Aktif</Text>
      <View style={styles.radioContainer}>
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
            <Text>Tidak Aktif</Text>
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

export default MajelisForm;
