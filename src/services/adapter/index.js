import axios from "axios";

const API_BASE_URL = "https://apigereja-production.up.railway.app";

export default {
  async loginUser(email, password) {
    // Validasi input
    if (!email || !password) {
      return {
        status: "Gagal",
        message: "Email dan password harus diisi.",
      };
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        pw: password, // Sesuaikan dengan backend Anda
      });

      // Respons sukses
      return {
        status: "Sukses",
        message: "Login berhasil!",
        data: response.data, // Data tambahan dari backend
      };
    } catch (error) {
      if (error.response) {
        // Error dari server (misalnya, 400, 401, 500, dll.)
        return {
          status: "Gagal",
          message:
            error.response.data ||
            "Login gagal. Periksa kembali kredensial Anda.",
        };
      } else if (error.request) {
        // Tidak ada respons dari server
        return {
          status: "Gagal",
          message: "Tidak ada respons dari server. Silakan coba lagi.",
        };
      } else {
        // Error lainnya (misalnya, konfigurasi axios salah)
        return {
          status: "Gagal",
          message: "Terjadi kesalahan. Silakan coba lagi.",
        };
      }
    }
  },

  async getTotalJemaat() {
    try {
      const response = await axios.get(`${API_BASE_URL}/jemaat/jumlah`);
      console.log("[API] getTotalJemaat", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalJemaat error", error);
    }
  },

  async updateMajelisById(id_majelis, majelisData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateMajelis/${id_majelis}`,
        majelisData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updatePegawaiById(id, pegawaiData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updatePegawai/${id}`,
        pegawaiData
      );
      return response.data;
    } catch (error) {
      // Cek jika ada response dari server
      throw error; // Tetap melempar error agar bisa ditangani di tempat pemanggilan fungsi
    }
  },

  // async updateJemaatById(no_urut, jemaatData) {
  //   try {
  //     // Validasi input
  //     if (!no_urut || !jemaatData) {
  //       throw new Error("no_urut dan jemaatData harus diisi.");
  //     }

  //     console.log("Mengirim data update untuk no_urut:", no_urut); // Log untuk debugging
  //     console.log("Data yang dikirim:", jemaatData); // Log untuk debugging

  //     const response = await axios.put(
  //       `${API_BASE_URL}/updateJemaat/${no_urut}`,
  //       jemaatData
  //     );

  //     // Jika request berhasil, kembalikan response
  //     return {
  //       status: "Sukses",
  //       data: response.data,
  //     };
  //   } catch (error) {
  //     console.error("Error saat updateJemaatById:", error); // Log error untuk debugging

  //     // Jika error berasal dari axios (misalnya, response error dari backend)
  //     if (error.response) {
  //       // Kembalikan objek error yang lebih informatif
  //       throw {
  //         status: "Error",
  //         message:
  //           error.response.data.message ||
  //           "Terjadi kesalahan saat memperbarui data.",
  //         statusCode: error.response.status,
  //       };
  //     } else if (error.request) {
  //       // Jika request tidak terkirim (misalnya, tidak ada koneksi internet)
  //       throw {
  //         status: "Error",
  //         message:
  //           "Tidak ada respons dari server. Periksa koneksi internet Anda.",
  //       };
  //     } else {
  //       // Jika error lainnya (misalnya, error saat membuat request)
  //       throw {
  //         status: "Error",
  //         message: error.message || "Terjadi kesalahan saat mengirim request.",
  //       };
  //     }
  //   }
  // },
  // // async updatePegawaiById(id, pegawaiData) {
  // //   try {
  // //     const response = await axios.put(
  // //       `${API_BASE_URL}/updatePegawai/${id}`,
  // //       pegawaiData
  // //     );
  // //     console.log("[API] updatePegawai", response.data);
  // //     return response.data;
  // //   } catch (error) {
  // //     console.error("[API] updatePegawai error", error);

  // //     // Cek jika ada response dari server
  // //     if (error.response) {
  // //       return {
  // //         status: "Gagal",
  // //         message:
  // //           error.response.data.message ||
  // //           "Terjadi kesalahan saat memperbarui data.",
  // //       };
  // //     } else {
  // //       return {
  // //         status: "Gagal",
  // //         message: "Terjadi kesalahan saat memperbarui data.",
  // //       };
  // //     }
  // //   }
  // // },

  async deleteJemaat(no_urut) {
    try {
      console.log(`[API] Menghapus Jemaat dengan ID: ${no_urut}`);
      console.log("Menghapus ID:", no_urut); // Cek ID sebelum delete

      const response = await axios.delete(`${API_BASE_URL}/jemaat/${no_urut}`);

      console.log("[API] deleteJemaat Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] deleteJemaat Error:", error);

      if (error.response) {
        console.error(
          "[API] Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("[API] Request Error:", error.request);
      } else {
        console.error("[API] Setup Error:", error.message);
      }

      throw error;
    }
  },

  async updateJemaatById(no_urut, jemaatData) {
    try {
      // Validasi input
      if (!no_urut) {
        throw new Error("no_urut harus diisi.");
      }
      if (
        !jemaatData ||
        typeof jemaatData !== "object" ||
        Array.isArray(jemaatData)
      ) {
        throw new Error("jemaatData harus berupa objek yang valid.");
      }

      console.log("Mengirim data update untuk no_urut:", no_urut); // Log untuk debugging
      console.log("Data yang dikirim:", jemaatData); // Log untuk debugging

      const response = await axios.put(
        `${API_BASE_URL}/updateJemaat/${no_urut}`,
        jemaatData
      );

      // Jika request berhasil, kembalikan response
      return response.data;
    } catch (error) {
      console.error("Error saat updateJemaatById:", error); // Log error untuk debugging

      // Jika error berasal dari axios (misalnya, response error dari backend)
      if (error.response) {
        throw {
          status: "Error",
          message:
            error.response.data.message ||
            "Terjadi kesalahan saat memperbarui data.",
          statusCode: error.response.status,
        };
      } else if (error.request) {
        // Jika request tidak terkirim (misalnya, tidak ada koneksi internet)
        throw {
          status: "Error",
          message:
            "Tidak ada respons dari server. Periksa koneksi internet Anda.",
        };
      } else {
        // Jika error lainnya (misalnya, error saat membuat request)
        throw {
          status: "Error",
          message: error.message || "Terjadi kesalahan saat mengirim request.",
        };
      }
    }
  },

  async deleteMajelis(id_majelis) {
    try {
      console.log(`[API] Menghapus Majelis dengan ID: ${id_majelis}`);
      console.log("Menghapus ID:", id_majelis); // Cek ID sebelum delete

      const response = await axios.delete(
        `${API_BASE_URL}/deleteMajelis/${id_majelis}`
      );

      console.log("[API] deleteMajelis Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] deleteMajelis Error:", error);

      if (error.response) {
        console.error(
          "[API] Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("[API] Request Error:", error.request);
      } else {
        console.error("[API] Setup Error:", error.message);
      }

      throw error;
    }
  },

  async deletePegawai(id) {
    try {
      console.log(`[API] Menghapus Pegawai dengan ID: ${id}`);
      console.log("Menghapus ID:", id); // Cek ID sebelum delete

      const response = await axios.delete(
        `${API_BASE_URL}/deletePegawai/${id}`
      );

      console.log("[API] deletePegawai Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] deletePegawai Error:", error);

      if (error.response) {
        console.error(
          "[API] Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("[API] Request Error:", error.request);
      } else {
        console.error("[API] Setup Error:", error.message);
      }

      throw error;
    }
  },

  async getTotalPegawai() {
    try {
      const response = await axios.get(`${API_BASE_URL}/pegawai/jumlah`);
      console.log("[API] getTotalPegawai", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalPegawai error", error);
    }
  },

  async getTotalMajelis() {
    try {
      const response = await axios.get(`${API_BASE_URL}/majelis/jumlah`);
      console.log("[API] getTotalMajelis", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getTotalMajelis error", error);
    }
  },

  async getJemaat() {
    try {
      const response = await axios.get(`${API_BASE_URL}/jemaat`);
      console.log("[API] getJemaat:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("[API] getJemaat error:", error);
      throw error;
    }
  },

  async getMajelis() {
    try {
      const response = await axios.get(`${API_BASE_URL}/majelis`);
      console.log("[API] getMajelis:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("[API] getMajelis error:", error);
      throw error;
    }
  },

  async getPegawai() {
    try {
      const response = await axios.get(`${API_BASE_URL}/pegawai`);
      console.log("[API] getPegawai:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("[API] getPegawai error:", error);
      throw error;
    }
  },

  async getMajelisById(id_majelis) {
    try {
      const url = `${API_BASE_URL}/majelis/${id_majelis}`;
      console.log("Fetching data from:", url);

      const response = await axios.get(url);
      console.log("API Response:", response);

      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Unknown Error:", error.message);
      }
      throw error;
    }
  },

  async getJemaatById(no_urut) {
    try {
      const url = `${API_BASE_URL}/jemaat/${no_urut}`;
      console.log("Fetching data from:", url);

      const response = await axios.get(url);
      console.log("get data jemaat by id:", response);

      // Pastikan struktur data benar
      if (!response.data || !response.data.data) {
        throw new Error("Data jemaat tidak ditemukan atau kosong");
      }

      return response.data.data; // Hanya mengembalikan bagian data yang diperlukan
    } catch (error) {
      console.error("[API] getJemaatById Error:", error.message);
      throw error;
    }
  },

  async getDetailById(no_induk_jemaat) {
    try {
      const url = `${API_BASE_URL}/detailJemaat/${no_induk_jemaat}`;
      console.log("Fetching data from:", url);

      const response = await axios.get(url);
      console.log("get data  detailjemaat by id:", response);

      // Pastikan struktur data benar
      if (!response.data || !response.data.data) {
        throw new Error("Data jemaat tidak ditemukan atau kosong");
      }

      return response.data.data; // Hanya mengembalikan bagian data yang diperlukan
    } catch (error) {
      console.error("[API] getDetailById Error:", error.message);
      throw error;
    }
  },

  //   async getMajelisById(id_majelis) {
  //   try {
  //     const url = `${API_BASE_URL}/majelis/${id_majelis}`;
  //     console.log("Fetching data from:", url);

  //     const response = await axios.get(url);
  //     console.log("API Response:", response);

  //     return response.data.data;
  //   } catch (error) {
  //     if (error.response) {
  //       console.error(
  //         "Response Error:",
  //         error.response.status,
  //         error.response.data
  //       );
  //     } else if (error.request) {
  //       console.error("Request Error:", error.request);
  //     } else {
  //       console.error("Unknown Error:", error.message);
  //     }
  //     throw error;
  //   }
  // },

  // async getPegawai() {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/pegawai`);
  //     console.log("[API] getPegawai:", response.data.data);
  //     return response.data.data;
  //   } catch (error) {
  //     console.error("[API] getPegawai error:", error);
  //     throw error;
  //   }
  // },

  async getPegawaiById(id) {
    try {
      const url = `${API_BASE_URL}/pegawai_dayu/${id}`;
      console.log("Fetching data from:", url);

      const response = await axios.get(url);
      console.log("Full API Response:", response);

      // Cek apakah response.data benar-benar memiliki key "data"
      if (!response.data || !response.data.data) {
        console.error("Unexpected response format:", response.data);
        throw new Error("Invalid response format");
      }

      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Unknown Error:", error.message);
      }
      throw error;
    }
  },

  async getSebaranJemaat() {
    try {
      const response = await axios.get(`${API_BASE_URL}/jemaat/sebaranWilayah`);
      console.log("[API] getSebaranJemaat", response.data["data"]);
      return response.data["data"];
    } catch (error) {
      console.error("[API] getSebaranJemaat error", error);
    }
  },

  async postMajelis(data) {
    try {
      // Kirim request POST ke server
      const response = await axios.post(
        `${API_BASE_URL}/tambahDataMajelis`, // Endpoint API
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async postJemaat(data) {
    try {
      // Kirim request POST ke server
      const response = await axios.post(
        `${API_BASE_URL}/tambahDataJemaat`, // Endpoint API
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async postDetailJemaat(data) {
    try {
      console.log("Hit API Jemaat:", data);

      // Kirim request POST ke server
      const response = await axios.post(
        `${API_BASE_URL}/tambahDetailJemaat`, // Endpoint API
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[API] postDetail Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API] postDetail Error:", error);

      // Menangani error berdasarkan kategori
      if (error.response) {
        console.error(
          "[API] Response Error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.log("error dalam req");
        console.error("[API] Request Error:", error.request);
      } else {
        console.error("[API] Setup Error:", error.message);
      }

      throw error;
    }
  },

  async postPegawai(data) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tambahDataPegawai`, // Endpoint API
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[API] postPegawai Success:", response.data);
      return response.data;
    } catch (error) {
      throw error; // Tetap melempar error agar bisa ditangani di tempat pemanggilan fungsi
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
