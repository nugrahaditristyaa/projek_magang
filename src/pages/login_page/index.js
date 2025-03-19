import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, SIZES } from "../../styles";
import IMAGES from "../../assets/Images";
import ButtonApp from "../../component/ButtonApp"; // Pastikan path ini benar
import adapter from "../../services/adapter";
// import { useNavigation } from "@react-navigation/native";

export default function Login_page({ navigation }) {
  // const navigation = useNavigation(); // Ini akan mengambil navigation dari konteks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email dan password harap diisi.");
      return;
    }

    const result = await adapter.loginUser(email, password);
    console.log(result);

    if (result.status === "Gagal") {
      Alert.alert("Error", result.message.message);
    } else {
      Alert.alert("Success", "Login berhasil!");
      navigation.replace("Home"); // Navigasi ke halaman Home
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GKJ Dayu</Text>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={IMAGES.logoGKJDayu} />
      </View>

      <Text style={styles.title}>{message}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={rememberMe ? styles.checked : styles.unchecked} />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>

      <ButtonApp
        title="Login"
        color={COLORS.primary}
        onPress={handleLogin} // Panggil handleLogin saat tombol ditekan
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: SIZES.largeText,
    color: COLORS.black,
    fontFamily: "semiBold",
  },
  logoContainer: {
    alignItems: "center", // Memastikan logo terletak di tengah
    marginVertical: 30,
  },
  logo: {
    width: 160,
    height: 160,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%", // Memastikan checkboxContainer selebar input
  },
  checked: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  unchecked: {
    width: 20,
    height: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 12, // Ubah ukuran font menjadi lebih kecil
  },
  button: {
    width: "100%",
  },
});
