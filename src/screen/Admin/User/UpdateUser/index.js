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

const UpdateUser = ({navigation, route}) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = route.params;
    setId(data?.id);
    setEmail(data?.email);
    setUsername(data?.username);
    setPassword(data?.password);
    setName(data?.name);
    setRole(data?.role);
  }, [route?.params]);

  const handleSubmit = async () => {
    if (
      email === '' ||
      username === '' ||
      password === '' ||
      name === '' ||
      role === ''
    ) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      setIsLoading(true);
      const user = {
        email: email,
        username: username,
        password: password,
        name: name,
        role: role,
      };

      const req = await request({
        path: '/users/' + id,
        method: 'PUT',
        body: user,
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
      Alert.alert('Error', 'An error occurred while updating user data.');
    }
  };

  return (
    <View>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        title="Update"
        loading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default UpdateUser;

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
