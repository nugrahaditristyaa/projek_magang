import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function FormulirPendaftaranScreen({ navigation }) {
  const [formData, setFormData] = useState({
    noKK: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamatLahir: "",
    hubunganKeluarga: "",
    statusNikah: "",
    statusJemaat: "",
    keaktifanJemaat: "",
  });

  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleInputChange(datePicker.field, formattedDate);
    setDatePicker({ visible: false, field: "" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Formulir Pendaftaran Warga</Text>
      </View>

      {/* Foto Profile */}
      <View style={styles.profilePicContainer}>
        <Icon name="account-circle" size={100} color="#333" />
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* NO KK */}
      <Text style={styles.label}>NO KK *</Text>
      <TextInput
        label="Masukkan No KK"
        value={formData.noKK}
        onChangeText={(text) => handleInputChange("noKK", text)}
        style={styles.input}
      />

      {/* Tempat Lahir */}
      <Text style={styles.label}>Tempat Lahir *</Text>
      <TextInput
        label="Masukkan Tempat Lahir"
        value={formData.tempatLahir}
        onChangeText={(text) => handleInputChange("tempatLahir", text)}
        style={styles.input}
      />

      {/* Tanggal Lahir */}
      <Text style={styles.label}>Tanggal Lahir *</Text>
      <TextInput
        label="Pilih Tanggal Lahir"
        value={formData.tanggalLahir}
        style={styles.input}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggalLahir" })
            }
          />
        }
      />

      {/* Jenis Kelamin */}
      <Text style={styles.label}>Jenis Kelamin *</Text>
      <RadioButton.Group
        onValueChange={(value) => handleInputChange("jenisKelamin", value)}
        value={formData.jenisKelamin}
      >
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <RadioButton value="Laki-Laki" />
            <Text>Laki-Laki</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Perempuan" />
            <Text>Perempuan</Text>
          </View>
        </View>
      </RadioButton.Group>

      {/* Alamat Rumah */}
      <Text style={styles.label}>Alamat Rumah</Text>
      <TextInput
        label="Masukkan Alamat Rumah"
        value={formData.alamatLahir}
        onChangeText={(text) => handleInputChange("tempatLahir", text)}
        style={styles.input}
      />

      {/* Hubungan Keluarga */}
      <Text style={styles.label}>Hubungan Keluarga (status dalam KK) *</Text>
      <RadioButton.Group
        onValueChange={(value) => handleInputChange("hubunganKeluarga", value)}
        value={formData.hubunganKeluarga}
      >
        <View style={styles.radioGrid}>
          <View style={styles.radioItem}>
            <RadioButton value="Ayah" />
            <Text>Ayah</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Ibu" />
            <Text>Ibu</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Kakek" />
            <Text>Kakek</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Keponakan" />
            <Text>Keponakan</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Cucu" />
            <Text>Cucu</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Nenek" />
            <Text>Nenek</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Anak" />
            <Text>Anak</Text>
          </View>
        </View>
      </RadioButton.Group>

      {/* Status Nikah */}
      <Text style={styles.label}>Status Nikah *</Text>
      <RadioButton.Group
        onValueChange={(value) => handleInputChange("statusNikah", value)}
        value={formData.statusNikah}
      >
        <View style={styles.radioGrid}>
          <View style={styles.radioItem}>
            <RadioButton value="Kawin" />
            <Text>Kawin</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Tidak Kawin" />
            <Text>Tidak Kawin</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Janda" />
            <Text>Janda</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Duda" />
            <Text>Duda</Text>
          </View>
        </View>
      </RadioButton.Group>

      {/* Status Jemaat */}
      <Text style={styles.label}>Status Jemaat</Text>
      <TextInput
        label="Masukkan Status Jemaat"
        value={formData.statusJemaat}
        onChangeText={(text) => handleInputChange("statusJemaat", text)}
        style={styles.input}
      />

      {/* Keaktifan Jemaat */}
      <Text style={styles.label}>Keaktifan Jemaat</Text>
      <TextInput
        label="Masukkan Keaktifan Jemaat"
        value={formData.keaktifanJemaat}
        onChangeText={(text) => handleInputChange("keaktifanJemaat", text)}
        style={styles.input}
      />

      {/* DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={datePicker.visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePicker({ visible: false, field: "" })}
      />

      {/* Button "Selanjutnya" */}
      <View style={styles.nextButton}>
        <Button
          mode="contained"
          buttonColor="#4A90E2" // Warna tombol
          textColor="#ffffff" // Warna teks tombol
          onPress={() => navigation.navigate("Form_warga_2")}
        >
          Selanjutnya
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  changeText: {
    color: "#4A90E2",
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    marginBottom: 1,
    backgroundColor: "#ffffff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: "#4A90E2",
    borderRadius: 10,
  },
});
