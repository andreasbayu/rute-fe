import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './src/screen/Login';

import TambahBarang from './src/screen/Admin/Barang/TambahBarang';
import UpdateBarang from './src/screen/Admin/Barang/UpdateBarang';
import HomeAdmin from './src/screen/Admin/Home';
import Barang from './src/screen/Admin/Barang';
import DetailBarang from './src/screen/Admin/Barang/DetailBarang';
import Pengiriman from './src/screen/Admin/Pengiriman';
import DetailPengiriman from './src/screen/Admin/Pengiriman/DetailPengiriman';
import TambahPengiriman from './src/screen/Admin/Pengiriman/TambahPengiriman';
import UpdatePengiriman from './src/screen/Admin/Pengiriman/UpdatePengiriman';

import HomeKurir from './src/screen/Kurir/Home';
import KurirPengiriman from './src/screen/Kurir/Pengiriman';
import KurirDetailPengiriman from './src/screen/Kurir/Pengiriman/DetailPengiriman';
import Maps from './src/screen/Kurir/Maps';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={Login}
          />
          {/* <Stack.Screen name="Splash" component={Splash} /> */}
          <Stack.Screen
            options={{headerShown: false}}
            name="Maps"
            component={Maps}
          />
          <Stack.Screen name="HomeKurir" component={HomeKurir} />
          <Stack.Screen name="KurirPengiriman" component={KurirPengiriman} />
          <Stack.Screen
            name="KurirDetailPengiriman"
            component={KurirDetailPengiriman}
          />

          {/* Admin */}
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="Pengiriman" component={Pengiriman} />
          <Stack.Screen name="TambahPengiriman" component={TambahPengiriman} />
          <Stack.Screen name="UpdatePengiriman" component={UpdatePengiriman} />
          <Stack.Screen name="DetailPengiriman" component={DetailPengiriman} />
          <Stack.Screen name="Barang" component={Barang} />
          <Stack.Screen name="TambahBarang" component={TambahBarang} />
          <Stack.Screen name="UpdateBarang" component={UpdateBarang} />
          <Stack.Screen name="DetailBarang" component={DetailBarang} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
