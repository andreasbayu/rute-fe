import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import request from '../../../../api/request';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip} from '@rneui/themed';

const BarangList = ({res}) => (
  <View>
    {res.map(item => (
      <View key={item.id} style={styles.itemContainer}>
        <Text style={styles.itemText}>Kode: {item.kode}</Text>
        <Text style={styles.itemText}>Nama Penerima: {item.namaPenerima}</Text>
        <Text style={styles.itemText}>Alamat: {item.alamat}</Text>
      </View>
    ))}
  </View>
);

const KurirDetailPengiriman = ({navigation, route}) => {
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

  const handleShowMaps = parsingData => {
    navigation.navigate({
      name: 'Maps',
      params: data,
    });
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
              title="Tampilkan Peta"
              containerStyle={styles.buttonContainerStyle}
              onPress={handleShowMaps}
            />
          </View>
        </>
      ) : (
        <Text>Loading fetching data</Text>
      )}
    </>
  );
};

export default KurirDetailPengiriman;

const styles = StyleSheet.create({
  kurirContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    padding: 16,
    borderRadius: 12,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 1,
    padding: 18,
    marginBottom: 2,
    marginTop: 8,
  },
  itemText: {
    fontSize: 16,
  },
  container: {
    padding: 16,
    marginBottom: 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionContainerCol: {
    marginTop: 8,
  },
  labelText: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
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
