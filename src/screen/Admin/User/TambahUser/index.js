import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Input, Button} from '@rneui/themed';
import request from '../../../../api/request';

const TambahUser = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (username === '' || password === '' || name === '' || role === '') {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      setIsLoading(true);

      // Create the user object
      const user = {
        username: username,
        password: password,
        name: name,
        role: role,
        email: email,
      };

      // Perform your request here
      if (route?.params) {
        user.userId = route?.params;
      }

      const req = await request({
        path: '/auth/register',
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
        {text: 'OK', onPress: () => console.log(req)},
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating a user.');
    }
  };

  return (
    <View>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Role" value={role} onChangeText={setRole} />
      <Button
        title="Submit"
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
