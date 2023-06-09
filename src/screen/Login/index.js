import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import ButtonPrimary from '../../components/CustomButton';
import request from '../../api/request';
import storage from '../../storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginAction = async () => {
    try {
      console.log('exec');
      const body = {
        username: username.toLowerCase(),
        password,
      };
      const req = await request({
        path: '/auth/login',
        method: 'POST',
        body: body,
      });

      const resBody = await req.json();

      if (req.status === 201 || req.status === 200) {
        storage.save({
          key: 'id',
          data: {
            id: resBody.user.id,
          },
        });
        storage
          .load({
            key: 'id',
          })
          .then(ret => {
            console.log(ret.id);
          });

        return Alert.alert(
          'Login Berhasil',
          'Selamat Datang ' + resBody.user.username,
          [
            {
              text: 'OK',
              onPress: () => {
                if (resBody.user.role === 'admin') {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeAdmin'}],
                  });
                } else {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeKurir'}],
                  });
                }
              },
            },
          ],
        );
      }
      return Alert.alert('Login Gagal', 'Kesalahan Username atau Password', [
        {text: 'Ok', onPress: () => console.log('Ok')},
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.bgColor}>
      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Image */}

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.formControl}>
          <CustomInput
            placeholder="Username"
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.formControl}>
          <CustomInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={(styles.formControl, {marginTop: 30})}>
          <ButtonPrimary title="Login" onPress={loginAction} />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: 'rgba(244, 157, 26, 0.04)',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 29,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 70,
    color: '#F49D1A',
  },
  form: {
    padding: 20,
  },
  formControl: {
    marginVertical: 5,
    margin: 5,
  },
});
