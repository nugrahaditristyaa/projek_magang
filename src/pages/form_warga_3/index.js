import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegistrationForm = ({ navigation }) => {
  const [datePicker, setDatePicker] = useState({ visible: false, field: "" });
  const [formData, setFormData] = useState({
    selectedService: "",
    desiredService: "",
    childBaptismDate: "",
    childBaptismPlace: "",
    adultBaptismDate: "",
    adultBaptismPlace: "",
    confirmationDate: "",
    confirmationPlace: "",
    weddingDate: "",
    churchJoinDate: "",
    previousChurch: "",
    churchLeaveDate: "",
    targetChurch: "",
    reasonForLeaving: "",
  });

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
      <Text style={styles.header}>Formulir Pendaftaran Warga</Text>

      <Text style={styles.label}>Pelayanan yang Diikuti</Text>
      <TextInput
        style={styles.input}
        value={formData.selectedService}
        onChangeText={(text) => handleInputChange("selectedService", text)}
        placeholder="Masukkan pelayanan yang diikuti"
      />

      <Text style={styles.label}>Pelayanan yang Diminati</Text>
      <TextInput
        style={styles.input}
        value={formData.desiredService}
        onChangeText={(text) => handleInputChange("desiredService", text)}
        placeholder="Masukkan pelayanan yang diminati"
      />

      {[
        { label: "Tanggal Baptis Anak", field: "childBaptismDate" },
        { label: "Tanggal Baptis Dewasa", field: "adultBaptismDate" },
        { label: "Tanggal Sidhi", field: "confirmationDate" },
        { label: "Tanggal Pernikahan", field: "weddingDate" },
        { label: "Tanggal Masuk Gereja", field: "churchJoinDate" },
        { label: "Tanggal Keluar Gereja", field: "churchLeaveDate" },
      ].map((item, index) => (
        <View key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setDatePicker({ visible: true, field: item.field })}
          >
            <Text style={styles.dateText}>
              {formData[item.field] || "Pilih Tanggal"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <DateTimePickerModal
        isVisible={datePicker.visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePicker({ visible: false, field: "" })}
      />

      {[
        { label: "Tempat Baptis Anak", field: "childBaptismPlace" },
        { label: "Tempat Baptis Dewasa", field: "adultBaptismPlace" },
        { label: "Tempat Sidhi", field: "confirmationPlace" },
        { label: "Asal Gereja", field: "previousChurch" },
        { label: "Gereja Tujuan", field: "targetChurch" },
        { label: "Alasan Keluar", field: "reasonForLeaving" },
      ].map((item, index) => (
        <View key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={formData[item.field]}
            onChangeText={(text) => handleInputChange(item.field, text)}
            placeholder={`Masukkan ${item.label}`}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.previousButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Form_warga_4")}
        >
          <Text style={styles.nextButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  dateText: {
    color: "#333",
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

export default RegistrationForm;
