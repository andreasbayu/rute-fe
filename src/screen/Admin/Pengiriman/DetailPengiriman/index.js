import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import request from '../../../../api/request';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip} from '@rneui/themed';

const BarangList = ({navigation, route}) => {
  const handleClickedItem = parsingData => {
    navigation.navigate({
      name: 'DetailBarang',
      params: parsingData,
    });
  };

  return (
    <View>
      {route.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => {
            handleClickedItem(item);
          }}>
          <Text style={styles.itemText}>Kode: {item.kode}</Text>
          <Text style={styles.itemText}>
            Nama Penerima: {item.namaPenerima}
          </Text>
          <Text style={styles.itemText}>Alamat: {item.alamat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const DetailPengiriman = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const req = await request({
        path: '/pengiriman/' + route.params,
        method: 'GET',
      });
      if (req.status === 200) {
        const response = await req.json();
        setData(response);
        setIsDataReady(true);
      }
    };
    fetch();
  });

  const handleAddButton = parsingData => {
    navigation.navigate({
      name: 'TambahBarang',
      params: route.params,
    });
  };

  const handleClickHitung = async () => {
    try {
      const req = await request({
        path: '/pengiriman/hitung/' + route.params,
        method: 'GET',
      });

      if (req.status === 201 || req.status === 200) {
        return Alert.alert('Berhasil', 'Berhasil melakukan perhitungan', [
          {text: 'OK', onPress: () => console.log('Ok')},
        ]);
      }
      return Alert.alert('Gagal', 'Terjadi Kesalahan', [
        {text: 'Ok', onPress: () => console.error('Err')},
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isDataReady ? (
        <>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.headerText}>Detail Pengiriman</Text>
                <View style={styles.sectionContainer}>
                  <Text style={styles.labelText}>ID:</Text>
                  <Text style={styles.valueText}>{data.id}</Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.labelText}>Kode:</Text>
                  <Text style={styles.valueText}>{data.kode}</Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.labelText}>Rute:</Text>
                  <Text style={styles.valueText}>{data.rute.join(', ')}</Text>
                </View>
                <View style={styles.sectionContainerCol}>
                  <Text style={styles.labelText}>Urutan Kode Barang:</Text>
                  <Text style={styles.valueText}>
                    {data.urutanKodeBarang.join('\n')}
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.labelText}>Cost:</Text>
                  <Text style={styles.valueText}>{data.cost}</Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.labelText}>Kurir:</Text>
                  <Text style={styles.valueText}>
                    {data.kurir?.name === undefined ? '' : data.kurir.name}
                  </Text>
                </View>
                <View style={styles.sectionContainerCol}>
                  <Text style={styles.labelText}>Barang:</Text>
                  <BarangList res={data.barang} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Chip
              title="+ Barang"
              containerStyle={styles.buttonContainerStyle}
              onPress={handleAddButton}
            />
            <Chip
              title="hitung"
              containerStyle={styles.buttonContainerStyle}
              onPress={handleClickHitung}
            />
          </View>
        </>
      ) : (
        <Text>Loading fetching data</Text>
      )}
    </>
  );
};

export default DetailPengiriman;

const styles = StyleSheet.create({
  kurirContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 18,
    marginBottom: 2,
    marginTop: 8,
  },
  kurirText: {
    fontSize: 16,
  },
  content: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 1,
    padding: 12,
    marginBottom: 2,
    marginTop: 8,
  },
  itemText: {
    fontSize: 16,
  },
  container: {
    padding: 8,
    marginBottom: 60,
  },
  headerText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
    backgroundColor: '#505C62',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 3,
    color: 'white',
    paddingVertical: 9,
  },
  sectionContainer: {
    marginTop: 8,
  },
  sectionContainerCol: {
    marginTop: 8,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 4,
  },
  itemColumn: {
    width: '100%',
    marginVertical: 2,
  },
  labelText: {
    backgroundColor: '#2089dc',
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 2,
  },
  valueText: {
    fontSize: 16,
    marginLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    zIndex: 999,
    bottom: 20,
    alignSelf: 'flex-end',
    alignItems: 'stretch',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainerStyle: {
    width: 150,
  },
  center: {
    textAlign: 'center',
    color: 'white',
  },
  listBarang: {
    height: '58%',
  },
});
