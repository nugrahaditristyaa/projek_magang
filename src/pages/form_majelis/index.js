import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextComponent,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const MajelisForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    kodeWilayah: "",
    jabatan: "",
    periodeJabatan: "",
    tanggalSK: "",
    tanggalPenahbisan: "",
    statusAktif: "Aktif",
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
      <Text style={styles.title}>Formulir Data Majelis</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        label="Masukan Nama "
        value={formData.nama}
        onChangeText={(text) => handleInputChange("nama", text)}
        mode="outlined"
        style={styles.input}
      />
      <Text style={styles.label}>Kode Wilayah</Text>
      <TextInput
        label="Masukan Kode Wilayah"
        value={formData.kodeWilayah}
        onChangeText={(text) => handleInputChange("kodeWilayah", text)}
        mode="outlined"
        style={styles.input}
      />
      <Text style={styles.label}>Jabatan</Text>
      <TextInput
        label="Masukan Jabatan "
        value={formData.jabatan}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setDatePicker({ visible: true, field: "jabatan" })}
          />
        }
      />
      <Text style={styles.label}>Periode Jabatan</Text>
      <TextInput
        label="Masukan Periode Jabatan "
        value={formData.periodeJabatan}
        onChangeText={(text) => handleInputChange("periodeJabatan", text)}
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal SK</Text>
      <TextInput
        label="Masukan Tanggal SK "
        value={formData.tanggalSK}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setDatePicker({ visible: true, field: "tanggalSK" })}
          />
        }
      />

      <Text style={styles.label}>Tanggal Penahbisan</Text>
      <TextInput
        label="Masukan Tanggal Penahbisan"
        value={formData.tanggalPenahbisan}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggalPenahbisan" })
            }
          />
        }
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Status Aktif</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("statusAktif", value)}
          value={formData.statusAktif}
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
        <Button mode="outlined" onPress={() => console.log("Batal")}>
          Batal
        </Button>
        <Button mode="contained" onPress={() => console.log("Simpan")}>
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  label: {
    fontWeight: "bold",
    margiVertical: 10,
  },
  radioContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default MajelisForm;
