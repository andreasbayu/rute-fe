import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import request from '../../../api/request';
import storage from '../../../storage';

const KurirPengiriman = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const date = d => {
    return new Date(d);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const id = await storage.load({
          key: 'id',
        });

        const req = await request({
          path: '/pengiriman/kurir/' + id.id,
          method: 'GET',
        });
        if (req.status === 200) {
          const response = await req.json();
          setData(response);
          setIsDataReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  });

  const handleClickedItem = parsingData => {
    navigation.navigate({
      name: 'KurirDetailPengiriman',
      params: parsingData,
    });
  };
  return (
    <>
      {isDataReady ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
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
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.loadingText}>Loading Fetching Data...</Text>
      )}
    </>
  );
};

export default KurirPengiriman;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 18,
    marginBottom: 2,
    marginTop: 8,
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
});
