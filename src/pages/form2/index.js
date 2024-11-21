import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RadioButton } from "react-native-paper";

export default function FormLanjutanScreen({ navigation }) {
  const [golonganDarah, setGolonganDarah] = useState("");
  const [hobi, setHobi] = useState("");
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [bidangPekerjaan, setBidangPekerjaan] = useState("");
  const [kerjaSampingan, setKerjaSampingan] = useState("");
  const [alamatKantor, setAlamatKantor] = useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [tanggalTidakAktif, setTanggalTidakAktif] = useState("");
  const [alasanTidakAktif, setAlasanTidakAktif] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Formulir Pendaftaran Warga</Text>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Golongan Darah */}
        <Text>Golongan Darah</Text>
        <View style={styles.radioGroup}>
          {["A", "B", "AB", "O"].map((item) => (
            <View key={item} style={styles.radioOption}>
              <RadioButton
                value={item}
                status={golonganDarah === item ? "checked" : "unchecked"}
                onPress={() => setGolonganDarah(item)}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>

        {/* Hobi */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>Hobi *</Text>
        <TextInput style={styles.input} value={hobi} onChangeText={setHobi} />

        {/* Telepon */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>
          No. Telepon *
        </Text>
        <TextInput
          style={styles.input}
          value={telepon}
          keyboardType="phone-pad"
          onChangeText={setTelepon}
        />

        {/* E-mail */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>E-mail *</Text>
        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        {/* Pekerjaan */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>Pekerjaan *</Text>
        <TextInput
          style={styles.input}
          value={pekerjaan}
          onChangeText={setPekerjaan}
        />

        {/* Bidang Pekerjaan */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>
          Bidang Pekerjaan *
        </Text>
        <TextInput
          style={styles.input}
          value={bidangPekerjaan}
          onChangeText={setBidangPekerjaan}
        />

        {/* Kerja Sampingan */}
        <Text style={[styles.label, { fontWeight: "bold" }]}>
          Kerja Sampingan *
        </Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioOption}>
            <RadioButton
              value="Ada"
              status={kerjaSampingan === "Ada" ? "checked" : "unchecked"}
              onPress={() => setKerjaSampingan("Ada")}
            />
            <Text>Ada</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="Tidak"
              status={kerjaSampingan === "Tidak" ? "checked" : "unchecked"}
              onPress={() => setKerjaSampingan("Tidak")}
            />
            <Text>Tidak</Text>
          </View>
        </View>

        {/* Alamat Kantor */}
        <TextInput
          style={styles.input}
          placeholder="Alamat Kantor"
          value={alamatKantor}
          onChangeText={setAlamatKantor}
        />

        {/* Pendidikan Terakhir */}
        <TextInput
          style={styles.input}
          placeholder="Pendidikan Terakhir"
          value={pendidikanTerakhir}
          onChangeText={setPendidikanTerakhir}
        />

        {/* Jurusan/Program Studi */}
        <TextInput
          style={styles.input}
          placeholder="Jurusan/Program Studi"
          value={jurusan}
          onChangeText={setJurusan}
        />

        {/* Alamat Sekolah */}
        <TextInput
          style={styles.input}
          placeholder="Alamat Sekolah"
          value={alamatSekolah}
          onChangeText={setAlamatSekolah}
        />

        {/* Tanggal Tidak Aktif */}
        <TextInput
          style={styles.input}
          placeholder="Tanggal Tidak Aktif (Kosongkan jika aktif)"
          value={tanggalTidakAktif}
          onChangeText={setTanggalTidakAktif}
        />

        {/* Alasan Tidak Aktif */}
        <TextInput
          style={styles.input}
          placeholder="Alasan Tidak Aktif (Kosongkan jika aktif)"
          value={alasanTidakAktif}
          onChangeText={setAlasanTidakAktif}
        />

        {/* Tombol Navigasi */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("FormBerikutnya")}
          >
            <Text style={styles.buttonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
  },
  nextButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
  },
});
