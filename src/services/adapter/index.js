import axios from "axios";

export default {
  async getTotalJemaat() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/jumlah"
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
        "https://apigereja-production.up.railway.app/pegawai/jumlah"
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
        "https://apigereja-production.up.railway.app/majelis/jumlah"
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
        "https://apigereja-production.up.railway.app/jemaat/sebaranWilayah"
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
        "https://apigereja-production.up.railway.app/pegawai_dayu/tambahDataPegawai",
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
  async getSebaranPelayanan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranPelayanan"
      );
      console.log("[API] getSebaranPelayanan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranPelayanan error", error);
    }
  },
  async getSebaranGrafikDisabilitas() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranGrafikDisabilitas"
      );
      console.log("[API] getSebaranGrafikDisabilitas", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranGrafikDisabilitas error", error);
    }
  },
  async getSebaranGrafikGender() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranGrafikGender"
      );
      console.log("[API] getSebaranGrafikGender", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranGrafikGender error", error);
    }
  },
  async getSebaranGrafikPelayanan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranGrafikPelayanan"
      );
      
      console.log("[API] getSebaranGrafikPelayanan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranGrafikPelayanan error", error);
    }
  },
  async getSebaranGrafikPekerjaan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranGrafikPekerjaan"
      );
      
      console.log("[API] getSebaranGrafikPekerjaan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranGrafikPekerjaan error", error);
    }
  },
  async getSebaranGrafikGolonganDarah() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/sebaranGrafikGolonganDarah"
      );
      
      console.log("[API] getSebaranGrafikGolonganDarah", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranGrafikGolonganDarah error", error);
    }
  },
  async getPelayanan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/pelayanan"
      );
      console.log("[API] getPelayanan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getPelayanan error", error);
    }
  },
  async getPekerjaan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/pekerjaan"
      );
      console.log("[API] getPekerjaan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getPekerjaan error", error);
    }
  },
  async getDetailPelayanan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/detailPelayanan"
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        pelayanan_diikuti: item.pelayanan_diikuti || "Tidak Mengisi",
        telepon: item.telepon || "-",
      }));
      setData(processedData);
      console.log("[API] getDetailPelayanan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getDetailPelayanan error", error);
    }
  },
  async getDetailPekerjaan() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/detailPekerjaan"
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        pekerjaan: item.pekerjaan || "-",
        bidang: item.bidang || "-",
        telepon: item.telepon || "-",
      }));
      setData(processedData);
      console.log("[API] getDetailPekerjaan", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getDetailPekerjaan error", error);
    }
  },
  async getDetailGolonganDarah() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/detailGolonganDarah"
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        golongan_darah: item.golongan_darah || "-",
        telepon: item.telepon || "-",
      }));
      setData(processedData);
      console.log("[API] getDetailGolonganDarah", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getDetailGolonganDarah error", error);
    }
  },
  async getDetailGender() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/detailGender"
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        telepon: item.telepon || "-",
      }));
      setData(processedData);
      console.log("[API] getDetailGender", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getDetailGender error", error);
    }
  },
  async getDetailDisabilitas() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/detailDisabilitas"
      );
      const processedData = response.data.data.map((item) => ({
        ...item,
        deskripsi_disabilitas: item.deskripsi_disabilitas || "-",
        telepon: item.telepon || "-",
      }));
      setData(processedData);
      console.log("[API] getDetailDisabilitas", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getDetailDisabilitas error", error);
    }
  },
  async getUlangTahunJemaat() {
    try {
      const response = await axios.get(
        "https://apigereja-production.up.railway.app/jemaat/ulangTahun"
      );
      console.log("[API] getUlangTahunJemaat", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getUlangTahunJemaat error", error);
    }
  },
};
