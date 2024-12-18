import axios from "axios";

export default {
  async getTotalJemaat() {
    try {
      const response = await axios.get(
        "https://apigkjdayu-1fsn3awq.b4a.run/jemaat/jumlah"
      );
      console.log("[API] getTotalJemaat", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalJemaat error", error);
    }
  },

  async getTotalPegawai() {
    try {
      const response = await axios.get(
        "https://apigkjdayu-1fsn3awq.b4a.run/pegawai/jumlah"
      );
      console.log("[API] getTotalPegawai", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalPegawai error", error);
    }
  },

  async getTotalMajelis() {
    try {
      const response = await axios.get(
        "https://apigkjdayu-1fsn3awq.b4a.run/majelis/jumlah"
      );
      console.log("[API] getTotalMajelis", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalMajelis error", error);
    }
  },

  async getSebaranJemaat() {
    try {
      const response = await axios.get(
        "https://apigkjdayu-1fsn3awq.b4a.run/jemaat/sebaranWilayah"
      );
      console.log("[API] getSebaranJemaat", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranJemaat error", error);
    }
  },

  async postPegawai(data) {
    try {
      const response = await axios.post(
        "https://apigkjdayu-1fsn3awq.b4a.run/pegawai_dayu/tambahDataPegawai",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("[API] postPegawai", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] postPegawai error", error);
      throw error;
    }
  },

  async tambahDataMajelis(data) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tambahDataMajelis`,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Format body JSON
          },
        }
      );

      console.log("[MajelisAdapter] Response:", response.data);
      return response.data; // Mengembalikan respons dari server
    } catch (error) {
      console.error(
        "[MajelisAdapter] Error:",
        error.response?.data || error.message
      );
      throw error; // Lempar error agar bisa di-handle di komponen
    }
  },
};
