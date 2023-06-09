import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Input, Button} from '@rneui/themed';
import request from '../../../../api/request';

const TambahBarang = ({navigation, route}) => {
  const [kode, setKode] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamat, setAlamat] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [pengirimanId, setPengirimanId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      kode === '' ||
      namaPenerima === '' ||
      alamat === '' ||
      longitude === '' ||
      latitude === ''
    ) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      setIsLoading(true);
      const barang = {
        kode: kode,
        namaPenerima: namaPenerima,
        alamat: alamat,
        koordinat: {
          longitude: longitude,
          latitude: latitude,
        },
        pengirimanId: pengirimanId === '' ? null : pengirimanId,
      };

      if (route?.params) {
        barang.pengirimanId = route?.params;
      }
      const req = await request({
        path: '/barang',
        method: 'POST',
        body: barang,
      });

      setIsLoading(false);

      if (req.status === 201 || req.status === 200) {
        return Alert.alert('Berhasil', 'Data Berhasil Diinput ', [
          {text: 'OK', onPress: () => console.log('OK')},
        ]);
      }
      return Alert.alert('Errpr', 'Terjadi kesalahan', [
        {text: 'OK', onPress: () => console.log('OK')},
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Kode"
        value={kode}
        onChangeText={text => setKode(text)}
      />
      <Input
        style={styles.input}
        placeholder="Nama Penerima"
        value={namaPenerima}
        onChangeText={text => setNamaPenerima(text)}
      />
      <Input
        style={styles.input}
        placeholder="Alamat"
        value={alamat}
        onChangeText={text => setAlamat(text)}
      />
      <Input
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={text => setLongitude(text)}
      />
      <Input
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={text => setLatitude(text)}
      />
      <Input
        style={styles.input}
        placeholder="ID Pengiriman"
        value={route.params ? route.params : pengirimanId}
        onChangeText={text => setPengirimanId(text)}
        editable={route?.params ? false : true}
      />
      <Button
        title="Kirim"
        loading={isLoading}
        disabled={isLoading}
        containerStyle={styles.buttonContainerStyle}
        style={styles.buttonStyle}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainerStyle: {
    width: '100%',
  },
  buttonStyle: {
    width: 100,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
  },
});

export default TambahBarang;
