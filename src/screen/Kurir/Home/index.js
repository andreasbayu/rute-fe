import {CommonActions} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const HomeKurir = ({navigation}) => {
  const handleCardPress = screenName => {
    console.log(screenName);
    navigation.navigate(screenName);
  };

  const handleExitButton = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Login'}],
      }),
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleCardPress('KurirPengiriman');
          }}
          style={styles.card}>
          <Icon name="truck" type="feather" />
          <Text style={styles.cardText}>Pengiriman</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleExitButton()}
          style={styles.card}>
          <Icon name="log-out" type="feather" />
          <Text style={styles.cardText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: '60%',
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#eee',
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeKurir;
