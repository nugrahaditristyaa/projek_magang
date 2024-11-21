import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function FormulirPendaftaranScreen({ navigation }) {
  const [noKK, setNoKK] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [hubunganKeluarga, setHubunganKeluarga] = useState(null);
  const [statusNikah, setStatusNikah] = useState(null);
  const [statusJemaat, setStatusJemaat] = useState("");
  const [keaktifanJemaat, setKeaktifanJemaat] = useState("");

  const handleSubmit = () => {
    // Navigasi ke screen TambahData, membawa data yang sudah diisi
    navigation.navigate("Edit", {
      noKK,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      hubunganKeluarga,
      statusNikah,
      statusJemaat,
      keaktifanJemaat,
    });
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

      {/* Input Fields */}
      <Text style={styles.label}>NO KK *</Text>
      <TextInput
        style={styles.input}
        value={noKK}
        onChangeText={setNoKK}
        placeholder="Masukkan No KK"
      />

      <Text style={styles.label}>Tempat Lahir *</Text>
      <TextInput
        style={styles.input}
        value={tempatLahir}
        onChangeText={setTempatLahir}
        placeholder="Masukkan Tempat Lahir"
      />

      <Text style={styles.label}>Tanggal Lahir *</Text>
      <TextInput
        style={styles.input}
        value={tanggalLahir}
        onChangeText={setTanggalLahir}
        placeholder="Masukkan Tanggal Lahir"
      />

      {/* Jenis Kelamin */}
      <Text style={styles.label}>Jenis Kelamin *</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setJenisKelamin("Laki-Laki")}
        >
          <View style={styles.outerCircle}>
            {jenisKelamin === "Laki-Laki" && (
              <View style={styles.innerCircle} />
            )}
          </View>
          <Text>Laki-Laki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setJenisKelamin("Perempuan")}
        >
          <View style={styles.outerCircle}>
            {jenisKelamin === "Perempuan" && (
              <View style={styles.innerCircle} />
            )}
          </View>
          <Text>Perempuan</Text>
        </TouchableOpacity>
      </View>

      {/* Hubungan Keluarga */}
      <Text style={styles.label}>Hubungan Keluarga (status dalam KK) *</Text>
      <View style={styles.radioContainer}>
        {["Ayah", "Ibu", "Anak", "Cucu"].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setHubunganKeluarga(option)}
          >
            <View style={styles.outerCircle}>
              {hubunganKeluarga === option && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Status Nikah */}
      <Text style={styles.label}>Status Nikah *</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setStatusNikah("Kawin")}
        >
          <View style={styles.outerCircle}>
            {statusNikah === "Kawin" && <View style={styles.innerCircle} />}
          </View>
          <Text>Kawin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setStatusNikah("Tidak Kawin")}
        >
          <View style={styles.outerCircle}>
            {statusNikah === "Tidak Kawin" && (
              <View style={styles.innerCircle} />
            )}
          </View>
          <Text>Tidak Kawin</Text>
        </TouchableOpacity>
      </View>

      {/* Status Jemaat */}
      <Text style={styles.label}>Status Jemaat</Text>
      <TextInput
        style={styles.input}
        value={statusJemaat}
        onChangeText={setStatusJemaat}
        placeholder="Masukkan Status Jemaat"
      />

      {/* Keaktifan Jemaat */}
      <Text style={styles.label}>Keaktifan Jemaat</Text>
      <TextInput
        style={styles.input}
        value={keaktifanJemaat}
        onChangeText={setKeaktifanJemaat}
        placeholder="Masukkan Keaktifan Jemaat"
      />

      {/* Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={navigation.navigate("Form2")}
      >
        <Text style={styles.submitButtonText}>Kirim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    margin: 20,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4A90E2",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
