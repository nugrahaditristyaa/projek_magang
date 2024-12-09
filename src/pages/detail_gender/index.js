import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Function to generate random birth dates
const getRandomBirthDate = () => {
  const year = Math.floor(Math.random() * (2005 - 1950 + 1)) + 1950;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
};

// Function to calculate age based on birth date
const calculateAge = (birthDate) => {
  const [day, month, year] = birthDate.split('/').map(Number);
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Function to generate random names
const getRandomName = () => {
  const firstNames = ["Dewi", "Eka", "Fajar", "Gita", "Hadi"];
  const middleNames = ["Putra", "Sari", "Wibowo", "Puspita", "Anggara", "Nugraha"];
  const lastNames = ["Santoso", "Pratama", "Wijaya", "Lestari", "Sukma", "Utama"];

  const namePartsCount = Math.floor(Math.random() * 3) + 1;
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  if (namePartsCount === 1) {
    return randomFirstName;
  } else if (namePartsCount === 2) {
    return `${randomFirstName} ${randomLastName}`;
  } else {
    return `${randomFirstName} ${randomMiddleName} ${randomLastName}`;
  }
};

export default function Detail_gender({ navigation }) {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const itemsPerPage = 6;

  // Generate data
  const data = Array.from({ length: 12 }, (_, index) => {
    const tglLahir = getRandomBirthDate();
    const umur = calculateAge(tglLahir);
    const kodeWilayah = [1, 3, 4, 5][Math.floor(Math.random() * 4)];
    const nama = getRandomName();
    return {
      id: (index + 1).toString(),
      kode: `${kodeWilayah}`,
      nama,
      tglLahir,
      umur: umur.toString(),
    };
  });

  // Filter data based on search
  const filteredData = data.filter((item) => {
    if (!searchValue) return true;
    const [searchMonth, searchYear] = searchValue.split('/').map(Number);
    const [itemDay, itemMonth, itemYear] = item.tglLahir.split('/').map(Number);
    return searchMonth === itemMonth && searchYear === itemYear;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.kode}</Text>
      <Text style={styles.tableCell}>{item.nama}</Text>
      <Text style={styles.tableCell}>{item.tglLahir}</Text>
      <Text style={styles.tableCell}>{item.umur}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          style={styles.gambar}
          source={require("../../assets/Images/panahkiri.png")}
        />
          <Text style={styles.headerTitle}>Data Gender</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>DATA GENDER WARGA GKJ DAYU</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="MM/YYYY"
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>No Induk Jemaat</Text>
          <Text style={styles.tableCell}>Kode Wilayah</Text>
          <Text style={styles.tableCell}>Nama</Text>
          <Text style={styles.tableCell}>Pelayanan Diikuti</Text>
          <Text style={styles.tableCell}>Telepon</Text>
        </View>

        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.pagination}>
        <Text style={styles.itemCount}>
          {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} items
        </Text>
        <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)}>
          <Text style={[styles.pageNumber, page === 1 && styles.disabled]}>{'<'}</Text>
        </TouchableOpacity>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
          <TouchableOpacity key={item} onPress={() => setPage(item)}>
            <Text style={[styles.pageNumber, item === page && styles.activePage]}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity disabled={page === totalPages} onPress={() => setPage(page + 1)}>
          <Text style={[styles.pageNumber, page === totalPages && styles.disabled]}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gambar: {
    width: 20,
    height: 20,
    padding: 13,
    marginRight: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#95FBFB',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  itemCount: {
    fontSize: 14,
    marginRight: 10,
  },
  pageNumber: {
    padding: 10,
    fontSize: 16,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activePage: {
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#ddd',
  },
  disabled: {
    color: '#aaa',
    backgroundColor: '#f0f0f0',
  },
});
