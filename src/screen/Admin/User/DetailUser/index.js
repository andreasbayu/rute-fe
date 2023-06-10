import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const User = ({navigation, route}) => {
  const data = route?.params;
  const date = d => {
    return new Date(d);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail User {data.username}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data.email}</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{data.username}</Text>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{'*****'}</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{data.name}</Text>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{data.role}</Text>
        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>
          {date(data.createdAt).toLocaleString('id-ID')}
        </Text>
        <Text style={styles.label}>Updated At:</Text>
        <Text style={styles.value}>
          {date(data.updatedAt).toLocaleString('id-ID')}
        </Text>
      </View>
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
});

export default User;
