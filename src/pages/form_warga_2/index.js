import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function FormulirPendaftaranScreen({ navigation }) {
  const [golonganDarah, setGolonganDarah] = useState(null);
  const [hobi, setHobi] = useState("");
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [bidangPekerjaan, setBidangPekerjaan] = useState("");
  const [kerjaSampingan, setKerjaSampingan] = useState(null);
  const [alamatKantor, setAlamatKantor] = useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [tanggalTidakAktif, setTanggalTidakAktif] = useState("");
  const [alasanTidakAktif, setAlasanTidakAktif] = useState("");

  const handleNext = () => {
    navigation.navigate("HalamanSelanjutnya", {
      golonganDarah,
      hobi,
      telepon,
      email,
      pekerjaan,
      bidangPekerjaan,
      kerjaSampingan,
      alamatKantor,
      pendidikanTerakhir,
      jurusan,
      alamatSekolah,
      tanggalTidakAktif,
      alasanTidakAktif,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Formulir Pendaftaran Warga</Text>

      {/* Golongan Darah */}
      <Text style={styles.label}>Golongan Darah</Text>
      <View style={styles.radioContainer}>
        {["A", "B", "AB", "O"].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setGolonganDarah(option)}
          >
            <View style={styles.outerCircle}>
              {golonganDarah === option && <View style={styles.innerCircle} />}
            </View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hobi */}
      <Text style={styles.label}>Hobi</Text>
      <TextInput
        style={styles.input}
        value={hobi}
        onChangeText={setHobi}
        placeholder="Masukkan Hobi"
      />

      {/* Telepon */}
      <Text style={styles.label}>Telepon</Text>
      <TextInput
        style={styles.input}
        value={telepon}
        onChangeText={setTelepon}
        placeholder="Masukkan Telepon"
        keyboardType="phone-pad"
      />

      {/* Email */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan E-mail"
        keyboardType="email-address"
      />

      {/* Pekerjaan */}
      <Text style={styles.label}>Pekerjaan</Text>
      <TextInput
        style={styles.input}
        value={pekerjaan}
        onChangeText={setPekerjaan}
        placeholder="Masukkan Pekerjaan"
      />

      {/* Bidang Pekerjaan */}
      <Text style={styles.label}>Bidang Pekerjaan</Text>
      <TextInput
        style={styles.input}
        value={bidangPekerjaan}
        onChangeText={setBidangPekerjaan}
        placeholder="Masukkan Bidang Pekerjaan"
      />

      {/* Kerja Sampingan */}
      <Text style={styles.label}>Kerja Sampingan</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setKerjaSampingan("Ada")}
        >
          <View style={styles.outerCircle}>
            {kerjaSampingan === "Ada" && <View style={styles.innerCircle} />}
          </View>
          <Text>Ada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setKerjaSampingan("Tidak")}
        >
          <View style={styles.outerCircle}>
            {kerjaSampingan === "Tidak" && <View style={styles.innerCircle} />}
          </View>
          <Text>Tidak</Text>
        </TouchableOpacity>
      </View>

      {/* Alamat Kantor */}
      <Text style={styles.label}>Alamat Kantor</Text>
      <TextInput
        style={styles.input}
        value={alamatKantor}
        onChangeText={setAlamatKantor}
        placeholder="Masukkan Alamat Kantor"
      />

      {/* Pendidikan Terakhir */}
      <Text style={styles.label}>Pendidikan Terakhir</Text>
      <TextInput
        style={styles.input}
        value={pendidikanTerakhir}
        onChangeText={setPendidikanTerakhir}
        placeholder="Masukkan Pendidikan Terakhir"
      />

      {/* Jurusan/Program Studi */}
      <Text style={styles.label}>Jurusan/Program Studi</Text>
      <TextInput
        style={styles.input}
        value={jurusan}
        onChangeText={setJurusan}
        placeholder="Masukkan Jurusan/Program Studi"
      />

      {/* Alamat Sekolah */}
      <Text style={styles.label}>Alamat Sekolah</Text>
      <TextInput
        style={styles.input}
        value={alamatSekolah}
        onChangeText={setAlamatSekolah}
        placeholder="Masukkan Alamat Sekolah"
      />

      {/* Tanggal Tidak Aktif */}
      <Text style={styles.label}>
        Tanggal Tidak Aktif (Kosongkan jika aktif)
      </Text>
      <TextInput
        style={styles.input}
        value={tanggalTidakAktif}
        onChangeText={setTanggalTidakAktif}
        placeholder="dd/mm/yyyy"
      />

      {/* Alasan Tidak Aktif */}
      <Text style={styles.label}>
        Alasan Tidak Aktif (Kosongkan jika aktif)
      </Text>
      <TextInput
        style={styles.input}
        value={alasanTidakAktif}
        onChangeText={setAlasanTidakAktif}
        placeholder="Masukkan Alasan Tidak Aktif"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.previousButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Form_warga_3")}
        >
          <Text style={styles.nextButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  previousButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
