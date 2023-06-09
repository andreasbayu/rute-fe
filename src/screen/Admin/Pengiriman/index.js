import {Button, Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import request from '../../../api/request';

const Pengiriman = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [itemId, setItemId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const date = d => {
    return new Date(d);
  };

  const handleDeleteButton = async id => {
    Alert.alert('Peringatan!', 'Yakin Menghapus data ? ', [
      {
        text: 'Ya',
        onPress: async () => {
          try {
            setItemId(id);
            setIsLoading(true);
            const req = await request({
              path: '/pengiriman/' + id,
              method: 'DELETE',
            });

            const res = await req.json();

            setIsLoading(false);

            if (req.status === 201 || req.status === 200) {
              return Alert.alert('Berhasil', 'Data Berhasil Dihapus ', [
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
        },
      },
      {
        text: 'Batal',
        onPress: () => {
          return;
        },
      },
    ]);
  };

  useEffect(() => {
    const fetch = async () => {
      const req = await request({
        path: '/pengiriman',
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
  const handleAddButton = () => {
    navigation.push('TambahPengiriman');
  };

  const handleClickedUpdate = parsingData => {
    navigation.navigate({
      name: 'UpdatePengiriman',
      params: parsingData,
    });
  };

  const handleClickedItem = parsingData => {
    navigation.navigate({
      name: 'DetailPengiriman',
      params: parsingData,
    });
  };
  return (
    <>
      <View style={styles.buttonAddContainerStyle}>
        <TouchableOpacity
          style={styles.buttonAddStyle}
          onPress={handleAddButton}>
          <Icon
            size={26}
            style={styles.buttonAddTextStyle}
            name="plus"
            type="feather"
          />
        </TouchableOpacity>
      </View>
      {isDataReady ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                              containerStyle={styles.container}

                onPress={() => {
                  handleClickedItem(item.id);
                }}>
                <View style={styles.card}>
                  <Text>{item.kode}</Text>
                  <Text style={styles.date}>
                    {date(item.createdAt).toString()}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Button
                  title="Update"
                  icon={{
                    name: 'edit',
                    type: 'feather',
                    color: 'white',
                    size: 18,
                  }}
                  containerStyle={styles.buttonContainerStyle}
                  onPress={() => {
                    handleClickedUpdate(item);
                  }}
                />
                <Button
                  loading={itemId === item.id ? isLoading : false}
                  disabled={itemId === item.id ? isLoading : false}
                  title="Hapus"
                  color="error"
                  icon={{
                    name: 'trash',
                    type: 'feather',
                    color: 'white',
                    size: 18,
                  }}
                  containerStyle={styles.buttonContainerStyle}
                  onPress={() => {
                    handleDeleteButton(item.id);
                  }}
                />
              </View>
            </>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.loadingText}>Loading Fetching Data...</Text>
      )}
    </>
  );
};

export default Pengiriman;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    padding: 20,
    marginHorizontal: 10,
  },
  loadingText: {
    marginTop: 40,
    textAlign: 'center',
  },
  alamatText: {
    fontSize: 10,
  },
  date: {
    fontSize: 12,
  },
  buttonStyle: {
    margin: 10,
  },
  buttonAddContainerStyle: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  buttonAddStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C00FF',
  },
  buttonAddTextStyle: {
    textAlign: 'center',
    margin: 17,
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 5,
    alignItems: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  buttonContainerStyle: {
    flex: 1,
    margin: 5,
  },
});
