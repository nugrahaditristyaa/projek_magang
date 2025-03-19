import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import adapter from "../../services/adapter";
import { Picker } from "@react-native-picker/picker";
import DetailForm from "../form_detail";

const UpdateDetailForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { formData, no_urut, no_induk_jemaat } = route.params; // Ambil ID dari parameter route

  console.log("no_induk_jemaat:", no_induk_jemaat); // Debugging

  const [detailData, setDetailData] = useState({
    pelayanan_diikuti: "",
    pelayanan_diminati: "",
    tgl_baptis_anak: "",
    tempat_baptis_anak: "",
    tanggal_baptis_dewasa: "",
    tempat_baptis_dewasa: "",
    tgl_sidhi: "",
    tampat_sidhi: "",
    tgl_nikah: "",
    tempat_nikah: "",
    tgl_masuk_gereja: "",
    asal_gereja: "",
    tgl_keluar_gereja: "",
    gereja_tujuan: "",
    alasan_keluar: "",
    tgl_meninggal: "",
    tempat_meninggal: "",
    tempat_pemakaman: "",
    penghasilan: "",
    transportasi: "",
    kondisi_fisik: "",
    deskripsi_disabilitas: "",
    penyakit_sering_diderita: "",
    alamat_rumah: "",
  });

  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Inisialisasi detailData dengan data dari form pertama
  useEffect(() => {
    if (formData) {
      setDetailData(formData);
    }
  }, [formData]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!no_induk_jemaat) {
        Alert.alert("Gagal", "Nomor induk jemaat tidak valid.");
        return;
      }

      // Ambil data detail berdasarkan no_induk_jemaat
      const response = await adapter.getDetailById(no_induk_jemaat);
      console.log("no induk", no_induk_jemaat);
      console.log("API Response:", response);

      if (response && response) {
        setDetailData(response);
      } else {
        Alert.alert("Info", "Data detail tidak ditemukan.");
      }
    } catch (error) {
      console.error("[API] getDetailById Error:", error);
      Alert.alert("Gagal", "Gagal mengambil data.");
    } finally {
      setIsLoading(false);
    }
  }, [no_induk_jemaat]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (field, value) => {
    setDetailData({ ...detailData, [field]: value });
  };

  const handleManualDateInput = (field, text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    let formattedText = cleanedText;

    if (cleanedText.length > 4) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(4, 6)}`;
      if (cleanedText.length > 6) {
        formattedText += `-${cleanedText.slice(6, 8)}`;
      }
    }

    setDetailData((prev) => ({ ...prev, [field]: formattedText }));
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return null;
  //   const date = new Date(dateString);
  //   return date.toISOString().split("T")[0]; // Konversi ke format YYYY-MM-DD
  // };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleInputChange(datePicker.field, formattedDate);
    setDatePicker({ visible: false, field: "" });
  };

  const validateForm = () => {
    const requiredFieldsDetail = ["alamat_rumah"];
    const fieldLabelsDetail = {
      alamat_rumah: "Alamat Rumah",
    };

    const emptyFields = requiredFieldsDetail.filter(
      (field) => !detailData[field]
    );

    if (emptyFields.length > 0) {
      const missingFields = emptyFields
        .map((field) => fieldLabelsDetail[field])
        .join(", ");
      Alert.alert("Gagal", `Kolom yang wajib diisi: ${missingFields}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Aktifkan loading

    try {
      if (!validateForm()) {
        setIsLoading(false); // Matikan loading jika validasi gagal
        return;
      }

      // Prepare payload with default values for fields that cannot be null
      const dataToSend = {
        ...formData,
        ...detailData,
      };

      console.log("Data to send:", dataToSend); // Log payload before sending

      // Make the API call to update the data
      const response = await adapter.updateJemaatById(
        no_induk_jemaat,
        dataToSend
      );

      // Check if the response is successful
      if (response && response.status === 200) {
        Alert.alert("Sukses", "Data berhasil diupdate!");
        navigation.goBack();
      } else {
        Alert.alert(
          "Sukses",
          response?.data?.message || "Data berhasil diupdate."
        );
        navigation.navigate("Lihat_detail_jemaat");
      }
    } catch (error) {
      console.error("Error saat update:", error);

      if (error.response) {
        Alert.alert(
          "Gagal",
          error.response.data?.message || "Terjadi kesalahan."
        );
      } else if (error.request) {
        Alert.alert("Gagal", "Tidak ada respons dari server.");
      } else {
        Alert.alert("Gagal", "Terjadi kesalahan saat mengirim data.");
      }
    } finally {
      setIsLoading(false); // Matikan loading setelah proses selesai
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulir Update Data Warga Jemaat</Text>
      <Text style={styles.label}>
        Alamat Rumah <Text style={styles.required}>*</Text>{" "}
      </Text>
      <TextInput
        label="Masukan Alamat Rumah"
        value={detailData.alamat_rumah}
        onChangeText={(text) => handleInputChange("alamat_rumah", text)}
        style={styles.input}
      />

      {/* Input untuk pelayanan diikuti
      <Text style={styles.label}>Pelayanan Diikuti</Text>
      <TextInput
        label="Masukan Pelayanan Diikuti"
        value={detailData.pelayanan_diikuti}
        onChangeText={(text) => handleInputChange("pelayanan_diikuti", text)}
        style={styles.input}
      /> */}

      <Text style={styles.label}>Pelayanan Diikuti</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={detailData.pelayanan_diikuti} // Gunakan detailData, bukan formData
          onValueChange={(itemValue) =>
            handleInputChange("pelayanan_diikuti", itemValue)
          }
        >
          <Picker.Item label="Pilih Pelayanan Diikuti" value="" />
          <Picker.Item label="Majelis Gereja" value="Majelis Gereja" />
          <Picker.Item
            label="Komisi Pangruktilaya"
            value="Komisi Pangruktilaya"
          />
          <Picker.Item label="Komisi Pelayanan" value="Komisi Pelayanan" />
          <Picker.Item label="Komisi Ibadah" value="Komisi Ibadah" />
          <Picker.Item label="Pengurus Wilayah" value="Pengurus Wilayah" />
          <Picker.Item label="Komisi Pastoral" value="Komisi Pastoral" />
          <Picker.Item
            label="Komisi Anak - Praremaja"
            value="Komisi Anak - Praremaja"
          />
          <Picker.Item
            label="Komisi Pemuda - Remaja"
            value="Komisi Pemuda - Remaja"
          />
          <Picker.Item label="Komisi Dewasa Muda" value="Komisi Dewasa Muda" />
          <Picker.Item label="Komisi PAK" value="Komisi PAK" />
          <Picker.Item label="Komisi Kesenian" value="Komisi Kesenian" />
          <Picker.Item
            label="Komisi Komunikasi Massa"
            value="Komisi Komunikasi Massa"
          />
          <Picker.Item label="Komisi Verifikasi" value="Komisi Verifikasi" />
          <Picker.Item
            label="Komisi Kerumahtanggaan"
            value="Komisi Kerumahtanggaan"
          />
          <Picker.Item
            label="Komisi Kajian & Pengembangan"
            value="Komisi Kajian & Pengembangan"
          />
        </Picker>
      </View>

      {/* Input untuk pelayanan diminati */}
      <Text style={styles.label}>Pelayanan Diminati</Text>
      <TextInput
        label="Masukan Pelayanan Diminati"
        value={detailData.pelayanan_diminati}
        onChangeText={(text) => handleInputChange("pelayanan_diminati", text)}
        style={styles.input}
      />

      {/* Input untuk tanggal baptis anak */}
      <Text style={styles.label}>Tanggal Baptis Anak</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_baptis_anak}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_baptis_anak", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_baptis_anak" })
            }
          />
        }
      />

      <Text style={styles.label}>Tempat Baptis Anak</Text>
      <TextInput
        label="Masukan Tempat Baptis Anak"
        value={detailData.tempat_baptis_anak}
        onChangeText={(text) => handleInputChange("tempat_baptis_anak", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Baptis Dewasa</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tanggal_baptis_dewasa}
        style={styles.input}
        onChangeText={(text) =>
          handleManualDateInput("tanggal_baptis_dewasa", text)
        } // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tanggal_baptis_dewasa" })
            }
          />
        }
      />

      <Text style={styles.label}>Tempat Baptis Dewasa</Text>
      <TextInput
        label="Masukan Tempat Baptis Dewasa"
        value={detailData.tempat_baptis_dewasa}
        onChangeText={(text) => handleInputChange("tempat_baptis_dewasa", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Sidhi</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_sidhi}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_sidhi", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setDatePicker({ visible: true, field: "tgl_sidhi" })}
          />
        }
      />

      <Text style={styles.label}>Tempat Sidhi</Text>
      <TextInput
        label="Masukan Tempat Sidhi"
        value={detailData.tampat_sidhi}
        onChangeText={(text) => handleInputChange("tampat_sidhi", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Pernikahan</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_nikah}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_nikah", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setDatePicker({ visible: true, field: "tgl_nikah" })}
          />
        }
      />

      <Text style={styles.label}>Tempat Pernikahan</Text>
      <TextInput
        label="Masukan Tempat Pernikahan"
        value={detailData.tempat_nikah}
        onChangeText={(text) => handleInputChange("tempat_nikah", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Masuk Gereja</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_masuk_gereja}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_masuk_gereja", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_masuk_gereja" })
            }
          />
        }
      />

      <Text style={styles.label}>Asal Gereja</Text>
      <TextInput
        label="Masukan Asal Gereja"
        value={detailData.asal_gereja}
        onChangeText={(text) => handleInputChange("asal_gereja", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Keluar Gereja</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_keluar_gereja}
        style={styles.input}
        onChangeText={(text) =>
          handleManualDateInput("tgl_keluar_gereja", text)
        } // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_keluar_gereja" })
            }
          />
        }
      />

      <Text style={styles.label}>Alasan Keluar</Text>
      <TextInput
        label="Masukan Asal Gereja"
        value={detailData.alasan_keluar}
        onChangeText={(text) => handleInputChange("alasan_keluar", text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal Meninggal</Text>
      <TextInput
        label="YYYY-MM-DD"
        value={detailData.tgl_meninggal}
        style={styles.input}
        onChangeText={(text) => handleManualDateInput("tgl_meninggal", text)} // Menangani input manual
        keyboardType="numeric" // Hanya memperbolehkan input numerik
        maxLength={10} // Batas panjang input untuk format yyyy-mm-dd
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() =>
              setDatePicker({ visible: true, field: "tgl_meninggal" })
            }
          />
        }
      />

      <Text style={styles.label}>Tempat Pemakaman</Text>
      <TextInput
        label="Masukan Tempat Pemakaman"
        value={detailData.tempat_pemakaman}
        onChangeText={(text) => handleInputChange("tempat_pemakaman", text)}
        style={styles.input}
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Penghasilan</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("penghasilan", value)}
          value={detailData.penghasilan}
        >
          <View style={styles.radioItem}>
            <RadioButton value="< 1 jt" />
            <Text> {"< 1 Jt"} </Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="1 - 2 Jt" />
            <Text>{"1 - 2 Jt"}</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="2 - 3 Jt" />
            <Text>{"2 - 3 Jt"}</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="3 - 4 Jt" />
            <Text>{"3 - 4 Jt"}</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="4 - 5 Jt" />
            <Text>{"4 - 5 Jt"}</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value=" > 5 Jt" />
            <Text>{" > 5 Jt"}</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Text style={styles.label}>Transportasi</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={detailData.transportasi}
          onValueChange={(itemValue) =>
            handleInputChange("transportasi", itemValue)
          }
        >
          <Picker.Item label="Pilih Transportasi Harian" value="" />
          <Picker.Item label="Sepeda" value="Sepeda" />
          <Picker.Item label="Kendaraan Umum" value="Kendaraan" />
          <Picker.Item label="Becak" value="Becak" />
          <Picker.Item label="Motor" value="Motor" />
          <Picker.Item label="Mobil" value="Mobil" />
        </Picker>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Kondisi Fisik</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("kondisi_fisik", value)}
          value={detailData.kondisi_fisik}
        >
          <View style={styles.radioItem}>
            <RadioButton value="Disabilitas" />
            <Text>Disabilitas</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="Non Disabilitas" />
            <Text>Non Disabilitas</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Text style={styles.label}>Deskripsi Disabilitas</Text>
      <TextInput
        label="Masukan Deskripsi Disabilitas"
        value={detailData.deskripsi_disabilitas}
        onChangeText={(text) =>
          handleInputChange("deskripsi_disabilitas", text)
        }
        style={styles.input}
      />

      <Text style={styles.label}>Penyakit Sering Diderita</Text>
      <TextInput
        label="Masukan Penyakit Sering Diderita"
        value={detailData.penyakit_sering_diderita}
        onChangeText={(text) =>
          handleInputChange("penyakit_sering_diderita", text)
        }
        style={styles.input}
      />

      {/* ... (lanjutkan dengan input lainnya) ... */}

      {/* Input lainnya (sama seperti form tambah) */}

      <DateTimePickerModal
        isVisible={datePicker.visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePicker({ visible: false, field: "" })}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Kembali
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          buttonColor="#4A90E2"
          textColor="#ffff"
        >
          Update
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

export default UpdateDetailForm;
