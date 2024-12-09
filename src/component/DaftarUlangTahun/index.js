import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

export default function DaftarUlangTahun({ navigation }) {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const itemsPerPage = 6;

  const inputRef = useRef(null);

  const data = [];

  const showPicker = useCallback((value) => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);

      // Format bulan dan tahun untuk pencarian
      const formattedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`;
      setSearchValue(formattedDate);
    },
    [date, showPicker],
  );

  // Filter data berdasarkan bulan/tahun
  const filteredData = data.filter((item) => {
    if (!searchValue) return true;
    const [searchMonth, searchYear] = searchValue.split('/').map(Number);
    const [itemMonth, itemYear] = item.tglLahir.split('/').map(Number);
    return searchMonth === itemMonth && searchYear === itemYear;
  });

  // Paginasi
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
      <Text style={styles.title}>DATA ULANG TAHUN WARGA GKJ DAYU</Text>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="MM/YYYY"
          value={searchValue}
          onFocus={() => {
            setShow(true);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
        />
        {show && (
          <MonthPicker
            value={date}
            minimumDate={new Date(2000, 0)}
            maximumDate={new Date(2025, 11)}
            onChange={onValueChange}
          />
        )}
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>No Induk Jemaat</Text>
          <Text style={styles.tableCell}>Kode Wilayah</Text>
          <Text style={styles.tableCell}>Nama</Text>
          <Text style={styles.tableCell}>Tanggal Lahir</Text>
          <Text style={styles.tableCell}>Umur Saat Ini</Text>
        </View>

        {paginatedData.length > 0 ? (
          <FlatList
            data={paginatedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noData}>Tidak ada data yang ditemukan.</Text>
        )}
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
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#95FBFB',
  },
  tableCell: {
    flex: 1,
    padding: 6,
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
  noData: {
    textAlign: 'center',
    padding: 20,
    color: '#555',
  },
});
