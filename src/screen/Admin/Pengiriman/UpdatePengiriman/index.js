import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from '@rneui/themed';
import request from '../../../../api/request';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';

function checkIsUndefined(param) {
  if (param === undefined || param === null) {
    return '';
  }
  return param;
}

const TambahPengiriman = ({navigation, route}) => {
  const [id, setId] = useState('');
  const [kode, setKode] = useState('');
  const [kurirId, setKurirId] = useState('');
  const [kantorId, setKantorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [dataKantor, setDataKantor] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const data = route?.params;
    setId(checkIsUndefined(data?.id));
    setKode(checkIsUndefined(data?.kode));
    setKurirId(checkIsUndefined(data?.userId));
    setKantorId(checkIsUndefined(data?.kantorId));
  }, [route?.params]);

  useEffect(() => {
    const fetch = async () => {
      const reqKantor = request({
        path: '/kantor',
        method: 'GET',
      });
      const reqUser = request({
        path: '/users',
        method: 'GET',
      });

      const [resKantor, resUser] = await Promise.all([reqKantor, reqUser]);

      if (resKantor.status === 200) {
        const response = await resKantor.json();
        setDataKantor(response);
        setIsDataFetched(true);
      }

      if (resUser.status === 200) {
        const response = await resUser.json();
        setDataUser(response);
        setIsDataFetched(true);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async () => {
    if (kode === '' || kurirId === '' || kantorId === '') {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      setIsLoading(true);
      const pengiriman = {
        kode: kode,
        userId: kurirId,
        kantorId: kantorId,
      };

      const req = await request({
        path: '/pengiriman/' + id,
        method: 'PUT',
        body: pengiriman,
      });
      setIsLoading(false);
      if (req.status === 201 || req.status === 200) {
        return Alert.alert('Berhasil', 'Data Berhasil DiUpdate ', [
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
    <ScrollView>
      <View style={styles.container}>
        <Input
          placeholder="Kode"
          value={kode}
          onChangeText={text => setKode(text)}
        />
        <Input placeholder="Kode Kantor" value={kantorId} disabled />
        <Dropdown
          search
          maxHeight={300}
          labelField="namaKantor"
          valueField="id"
          searchPlaceholder="Cari..."
          data={dataKantor}
          placeholder="Pilih kantor"
          disable={!isDataFetched}
          style={styles.dropdown}
          value={kantorId}
          onChange={item => {
            setKantorId(item.id);
          }}
        />
        <Input placeholder="Kode Kurir" value={kurirId} disabled />
        <Dropdown
          search
          maxHeight={300}
          labelField="username"
          valueField="id"
          searchPlaceholder="Cari..."
          data={dataUser}
          placeholder="Pilih kurir"
          disable={!isDataFetched}
          style={styles.dropdown}
          value={kurirId}
          onChange={item => {
            setKurirId(item.id);
          }}
        />
        <Button
          buttonStyle={styles.buttonStyle}
          title="Update"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          containerStyle={styles.buttonContainerStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 920,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  buttonStyle: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonContainerStyle: {
    width: '100%',
  },
  dropdown: {
    width: '93%',
    marginBottom: 25,
    marginVertical: 10,
    borderBottomWidth: 0.6,
  },
});

export default TambahPengiriman;
