import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from '@rneui/themed';
import request from '../../../../api/request';

function checkIsUndefined(param) {
  if (param === undefined || param === null) {
    return '';
  }
  return param;
}

const UpdateBarang = ({navigation, route}) => {
  const [id, setid] = useState('');
  const [kode, setKode] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamat, setAlamat] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [pengirimanId, setPengirimanId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = route.params;
    setid(data?.id);
    setKode(checkIsUndefined(data?.kode));
    setNamaPenerima(checkIsUndefined(data?.namaPenerima));
    setAlamat(checkIsUndefined(data?.alamat));
    setLongitude(checkIsUndefined(data?.koordinat.longitude));
    setLatitude(checkIsUndefined(data?.koordinat.latitude));
    setPengirimanId(checkIsUndefined(data.pengirimanId));
  }, [route?.params]);

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

      const req = await request({
        path: '/barang/' + id,
        method: 'PUT',
        body: barang,
      });

      setIsLoading(false);

      const res = await req.json();

      if (req.status === 201 || req.status === 200) {
        return Alert.alert('Berhasil', 'Data Berhasil Diupdate ', [
          {text: 'OK', onPress: () => console.log('OK')},
        ]);
      }
      Alert.alert('Error', 'Terjadi kesalahan', [
        {
          text: 'OK',
          onPress: () => {
            console.log('Err');
            throw JSON.stringify(res);
          },
        },
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
        value={pengirimanId}
        onChangeText={text => setPengirimanId(text)}
        editable={route?.params ? false : true}
      />
      <Button
        title="Update"
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

export default UpdateBarang;
