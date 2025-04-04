import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Picker } from "@react-native-picker/picker";

const JemaatForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    no_kk: "",
    kode_wilayah: "",
    nama: "",
    tempat_lahir: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    hubungan_keluarga: "",
    status_nikah: "",
    golongan_darah: "",
    hobby: "",
    telepon: "",
    email: "",
    pekerjaan: "",
    bidang: "",
    kerja_sampingan: "",
    alamat_kantor: "",
    pendidikan: "",
    jurusan: "",
    alamat_sekolah: "",
    status_jemaat: "",
    keaktifan_jemaat: "",
    tgl_tidak_aktif: "",
    alasan_tidak_aktif: "",
  });

  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });

  const fieldLabels = {
    nama: "Nama",
    tempat_lahir: "Tempat Lahir",
    tgl_lahir: "Tanggal Lahir",
    jenis_kelamin: "Jenis Kelamin",
    hubungan_keluarga: "Hubungan Keluarga",
    status_nikah: "Status Nikah",
    status_jemaat: "Status Jemaat",
    kode_wilayah: "Kode Wilayah",
    keaktifan_jemaat: "Keaktifan Jemaat",
  };

  const requiredFields = [
    "nama",
    "tempat_lahir",
    "tgl_lahir",
    "jenis_kelamin",
    "hubungan_keluarga",
    "status_nikah",
    "status_jemaat",
    "kode_wilayah",
    "keaktifan_jemaat",
  ];

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

  const validateForm = () => {
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const missingFields = emptyFields
        .map((field) => fieldLabels[field])
        .join(", ");
      Alert.alert("Gagal", `Kolom yang wajib diisi: ${missingFields}`);
      return false; // Validasi gagal
    }

    return true; // Validasi berhasil
  };

  const handleNext = () => {
    if (!validateForm()) {
      return; // Hentikan navigasi jika validasi gagal
    }

    // Jika validasi berhasil, lanjutkan navigasi
    navigation.navigate("Form_detail", {
      formData,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulir Data Warga Jemaat</Text>

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
        Tempat Lahir <Text style={styles.required}>*</Text>{" "}
      </Text>
      <TextInput
        label="Masukan Tempat Lahir"
        value={formData.tempat_lahir}
        onChangeText={(text) => handleInputChange("tempat_lahir", text)}
        style={styles.input}
      />

      <Text style={styles.label}>
        Tanggal Lahir <Text style={styles.required}>*</Text>{" "}
      </Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tgl_lahir}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_lahir", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setDatePicker({ visible: true, field: "tgl_lahir" })}
          />
        }
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>
          Jenis Kelamin <Text style={styles.required}>*</Text>{" "}
        </Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("jenis_kelamin", value)}
          value={formData.jenis_kelamin}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Laki-laki" />
            <Text>Laki-laki</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Perempuan" />
            <Text>Perempuan</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>
          Hubungan Keluarga (status dalam KK)
          <Text style={styles.required}>*</Text>
        </Text>
        <RadioButton.Group
          onValueChange={(value) =>
            handleInputChange("hubungan_keluarga", value)
          }
          value={formData.hubungan_keluarga}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Ayah" />
            <Text>Ayah</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Ibu" />
            <Text>Ibu</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Anak" />
            <Text>Anak</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Keponakan" />
            <Text>Keponakan</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Cucu" />
            <Text>Cucu</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>
          Status Nikah <Text style={styles.required}>*</Text>{" "}
        </Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("status_nikah", value)}
          value={formData.status_nikah}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Kawin" />
            <Text>Kawin</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Janda" />
            <Text>Janda</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Tidak Kawin" />
            <Text>Tidak Kawin</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Duda" />
            <Text>Duda</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Dropdown Status Jemaat */}
      <Text style={styles.label}>
        Status Jemaat <Text style={styles.required}>*</Text>{" "}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.status_jemaat}
          onValueChange={(itemValue) =>
            handleInputChange("status_jemaat", itemValue)
          }
        >
          <Picker.Item label="Pilih Status jemaat" value="" />
          <Picker.Item label="Warga GKJ Dayu" value="Warga GKJ Dayu" />
          <Picker.Item label="Warga Titipan" value="Warga Titipan" />
          <Picker.Item label="Simpatisan" value="Simpatisan" />
        </Picker>
      </View>

      {/* Dropdown Kode Wilayah */}
      <Text style={styles.label}>
        Kode Wilayah <Text style={styles.required}>*</Text>{" "}
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

      {/* Dropdown Keaktifan Jemaat */}
      <Text style={styles.label}>
        Keaktifan Jemaat <Text style={styles.required}>*</Text>{" "}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.keaktifan_jemaat}
          onValueChange={(itemValue) =>
            handleInputChange("keaktifan_jemaat", itemValue)
          }
        >
          <Picker.Item label="Pilih Status" value="" />
          <Picker.Item label="Aktif" value="Aktif" />
          <Picker.Item label="Tidak Aktif" value="Tidak Aktif" />
        </Picker>
      </View>

      <Text style={styles.label}>No KK </Text>
      <TextInput
        label="Masukan NO KK"
        value={formData.no_kk}
        onChangeText={(text) => handleInputChange("no_kk", text)}
        style={styles.input}
      />

      {/* <Text style={styles.label}>Kode Wilayah</Text>
      <TextInput
        label="Masukan Kode Wilayah"
        value={formData.kode_wilayah}
        onChangeText={(text) => handleInputChange("kode_wilayah", text)}
        style={styles.input}
      /> */}

      <Text style={styles.label}>Alamat Kantor</Text>
      <TextInput
        label="Masukan Alamat Kantor"
        value={formData.alamat_kantor}
        onChangeText={(text) => handleInputChange("alamat_kantor", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Pendidikan</Text>
      <TextInput
        label="Masukan Pendidikan"
        value={formData.pendidikan}
        onChangeText={(text) => handleInputChange("pendidikan", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Jurusan</Text>
      <TextInput
        label="Masukan Jurusan"
        value={formData.jurusan}
        onChangeText={(text) => handleInputChange("jurusan", text)}
        style={styles.input}
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Golongan Darah</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("golongan_darah", value)}
          value={formData.golongan_darah}
        >
          <View style={styles.radioItem}>
            <RadioButton value="A" />
            <Text>A</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="B" />
            <Text>B</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="AB" />
            <Text>AB</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="O" />
            <Text>O</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Dropdown Hobby */}
      <Text style={styles.label}>Hobby</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.hobby}
          onValueChange={(itemValue) => handleInputChange("hobby", itemValue)}
        >
          <Picker.Item label="Pilih Hobby" value="" />
          <Picker.Item label="Hiking" value="Hiking" />
          <Picker.Item label="Memasak" value="Memasak" />
          <Picker.Item label="Membaca" value="Membaca" />
          <Picker.Item label="Olahraga" value="Olahraga" />
          <Picker.Item label="Seni Lukis" value="Seni Lukis" />
          <Picker.Item label="Seni Musik" value="Seni Musik" />
          <Picker.Item label="Seni Suara" value="Seni Suara" />
          <Picker.Item label="Seni Teater" value="Seni Teater" />
          <Picker.Item label="Traveling" value="Traveling" />
        </Picker>
      </View>

      <Text style={styles.label}>Telepon</Text>
      <TextInput
        label="Masukan Nomor Telepon"
        value={formData.telepon}
        onChangeText={(text) => handleInputChange("telepon", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        label="Masukan Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Pekerjaan</Text>
      <TextInput
        label="Masukan Pekerjaan"
        value={formData.pekerjaan}
        onChangeText={(text) => handleInputChange("pekerjaan", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Bidang Pekerjaan</Text>
      <TextInput
        label="Masukan Bidang Pekerjaan"
        value={formData.bidang}
        onChangeText={(text) => handleInputChange("bidang", text)}
        style={styles.input}
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Kerja Sampingan</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("kerja_sampingan", value)}
          value={formData.kerja_sampingan}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Ada" />
            <Text>Ada</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Tidak" />
            <Text>Tidak</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Text style={styles.label}>Alamat Sekolah</Text>
      <TextInput
        label="Masukan Alamat Sekolah"
        value={formData.alamat_sekolah}
        onChangeText={(text) => handleInputChange("alamat_sekolah", text)}
        style={styles.input}
      />
      <Text style={styles.label}>Tanggal Tidak Aktif</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={formData.tgl_tidak_aktif}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_tidak_aktif", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_tidak_aktif" })
            }
          />
        }
      />
      <Text style={styles.label}>Alasan Tidak Aktif</Text>
      <TextInput
        label=""
        value={formData.alasan_tidak_aktif}
        onChangeText={(text) => handleInputChange("alasan_tidak_aktif", text)}
        style={styles.input}
      />

      <DateTimePickerModal
        isVisible={datePicker.visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePicker({ visible: false, field: "" })}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Edit")}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Batal
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Next
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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

export default JemaatForm;
