import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../styles";
import IMAGES from "../../assets/Images";
import ButtonApp from "../../component/ButtonApp"; // Pastikan path ini benar

export default function Login_page({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    // Navigasi ke halaman berikutnya jika login berhasil
    // navigation.navigate('NextPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GKJ Dayu</Text>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={IMAGES.logoGKJDayu} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        navigation={navigation}
        navigasi="Home" // Ganti dengan nama halaman tujuan Anda
        style={styles.button} // Tambahkan gaya
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
    borderRadius: 50, // Corner radius 50
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
    borderRadius: 50, // Corner radius 50 untuk tombol login
  },
});
