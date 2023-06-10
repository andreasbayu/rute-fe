import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DetailBarang = ({navigation, route}) => {
  const data = route?.params;
  const date = d => {
    return new Date(d);
  };

  const handleClickedMap = data => {
    navigation.navigate({
      name: 'MapsLocation',
      params: data,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Barang {data.kode}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id}</Text>
        <Text style={styles.label}>Kode:</Text>
        <Text style={styles.value}>{data.kode}</Text>
        <Text style={styles.label}>Pengiriman ID:</Text>
        <Text style={styles.value}>{data.pengirimanId}</Text>
        <Text style={styles.label}>Nama Penerima:</Text>
        <Text style={styles.value}>{data.namaPenerima}</Text>
        <Text style={styles.label}>Alamat Penerima:</Text>
        <Text style={styles.value}>{data.alamat}</Text>
        <Text style={styles.label}>Kordinat Penerima:</Text>
        <Text style={styles.value}>
          {data.koordinat.longitude}, {data.koordinat.latitude}
        </Text>
        <Text style={styles.label}>Tanggal Dibuat:</Text>
        <Text style={styles.value}>
          {date(data.createdAt).toLocaleString('id-ID')}
        </Text>
        <Text style={styles.label}>Tanggal Diupdate:</Text>
        <Text style={styles.value}>
          {date(data.updatedAt).toLocaleString('id-ID')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.showMap}
        onPress={() => {
          handleClickedMap(data);
        }}>
        <Text style={styles.showMapText}>Tampilkan Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 12,
  },
  title: {
    padding: 14,
    fontSize: 16,
    backgroundColor: '#505C62',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    textAlign: 'center',
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  value: {
    marginBottom: 16,
  },
  showMap: {
    backgroundColor: '#36a339',
    padding: 16,
    borderRadius: 8,
    marginTop: 5,
  },
  showMapText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DetailBarang;
