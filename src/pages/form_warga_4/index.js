import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    tanggalMeninggal: "",
    tempatMeninggal: "",
    tempatPemakaman: "",
    penghasilan: "",
    kondisiFisik: "",
    deskripsiDisabilitas: "",
    penyakitSeringDiderita: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View>
        <Text style={styles.header}>Formulir Pendaftaran Warga</Text>

        {/* Tanggal Meninggal */}
        <Text style={styles.label}>Tanggal Meninggal</Text>
        <TextInput
          style={styles.input}
          value={formData.tanggalMeninggal}
          onChangeText={(text) => handleInputChange("tanggalMeninggal", text)}
          placeholder="dd/mm/yyyy"
        />

        {/* Tempat Meninggal */}
        <Text style={styles.label}>Tempat Meninggal</Text>
        <TextInput
          style={styles.input}
          value={formData.tempatMeninggal}
          onChangeText={(text) => handleInputChange("tempatMeninggal", text)}
          placeholder="Masukkan Tempat Meninggal"
        />

        {/* Tempat Pemakaman */}
        <Text style={styles.label}>Tempat Pemakaman</Text>
        <TextInput
          style={styles.input}
          value={formData.tempatPemakaman}
          onChangeText={(text) => handleInputChange("tempatPemakaman", text)}
          placeholder="Masukkan Tempat Pemakaman"
        />

        {/* Penghasilan */}
        <Text style={styles.label}>Penghasilan</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("penghasilan", value)}
          value={formData.penghasilan}
        >
          {[
            "< 1 jt",
            "1 - 2 jt",
            "2 - 3 jt",
            "3 - 4 jt",
            "4 - 5 jt",
            "> 5 jt",
          ].map((item, index) => (
            <View style={styles.radioItem} key={index}>
              <RadioButton value={item} />
              <Text style={styles.radioText}>{item}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Kondisi Fisik */}
        <Text style={styles.label}>Kondisi Fisik *</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("kondisiFisik", value)}
          value={formData.kondisiFisik}
        >
          {["Disabilitas", "Non Disabilitas"].map((item, index) => (
            <View style={styles.radioItem} key={index}>
              <RadioButton value={item} />
              <Text style={styles.radioText}>{item}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Deskripsi Disabilitas */}
        <Text style={styles.label}>Deskripsi Disabilitas</Text>
        <TextInput
          style={styles.input}
          value={formData.deskripsiDisabilitas}
          onChangeText={(text) =>
            handleInputChange("deskripsiDisabilitas", text)
          }
          placeholder="Masukkan Deskripsi Disabilitas"
        />

        {/* Penyakit Sering Diderita */}
        <Text style={styles.label}>Penyakit Sering Diderita</Text>
        <TextInput
          style={styles.input}
          value={formData.penyakitSeringDiderita}
          onChangeText={(text) =>
            handleInputChange("penyakitSeringDiderita", text)
          }
          placeholder="Masukkan Penyakit"
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.previousButton]}>
            <Text style={styles.buttonText}>Sebelumnya</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  input: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  previousButton: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RegistrationForm;
