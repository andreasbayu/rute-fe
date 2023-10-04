import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import ButtonPrimary from '../../components/CustomButton';
import request from '../../api/request';
import storage from '../../storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const loginAction = async () => {
    try {
      setLoading(true);
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

      setLoading(false);

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
          'Login Berhasil,',
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
    <ScrollView>
      <View style={styles.bgColor}>
        {/* Title */}
        <Text style={styles.title}>Login</Text>

        {/* Image */}
        <Image
          style={styles.logo}
          source={require('../../assets/images/login.png')}
        />

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
          <View style={(styles.formControl, {marginTop: 20, marginBottom: 20})}>
            <ButtonPrimary
              title="Login"
              onPress={loginAction}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: 'rgba(233, 245, 66, 0.06)',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 29,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    color: '#780404',
  },
  form: {
    padding: 20,
  },
  formControl: {
    marginVertical: 5,
    margin: 5,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
});
