import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const User = ({navigation, route}) => {
  const data = route?.params;
  const date = d => {
    return new Date(d);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{data.id}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{data.email}</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{data.username}</Text>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{data.password}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default User;
