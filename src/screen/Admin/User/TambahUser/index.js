import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Input, Button} from '@rneui/themed';
import request from '../../../../api/request';

const TambahUser = ({navigation, route}) => {
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
      const user = {
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
        user.userId = route?.params;
      }

      const req = await request({
        path: '/users',
        method: 'POST',
        body: user,
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
      Alert.alert('Error', 'An error occurred while creating a user.');
    }
  };

  return (
    <View>
      <Input placeholder="Kode" value={kode} onChangeText={setKode} />
      <Input
        placeholder="Nama Penerima"
        value={namaPenerima}
        onChangeText={setNamaPenerima}
      />
      <Input placeholder="Alamat" value={alamat} onChangeText={setAlamat} />
      <Input
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
      />
      <Input
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
      />
      <Input
        placeholder="ID Pengiriman"
        value={pengirimanId}
        onChangeText={setPengirimanId}
        editable={!route?.params}
      />
      <Button
        title="Kirim"
        style={styles.buttonStyle}
        loading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default TambahUser;

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
