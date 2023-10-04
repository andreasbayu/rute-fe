import {Button} from '@rneui/themed';
import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {GetLocation} from 'react-native-get-location';
const MapsLocation = ({navigation, route}) => {
  const showMyLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        showsUserLocation={true}
        initialRegion={{
          latitude: Number.parseFloat(route.params.koordinat.latitude),
          longitude: Number.parseFloat(route.params.koordinat.longitude),
          latitudeDelta: 0.021,
          longitudeDelta: 0.041,
        }}>
        <Marker
          coordinate={{
            latitude: Number.parseFloat(route.params.koordinat.latitude),
            longitude: Number.parseFloat(route.params.koordinat.longitude),
          }}
          title={route.namaPenerima}
          description={route.alamat}
        />
        <Marker
          coordinate={{
            latitude: Number.parseFloat(route.params.koordinat.latitude),
            longitude: Number.parseFloat(route.params.koordinat.longitude),
          }}
          title={route.namaPenerima}
          description={route.alamat}
          style={{backgroundColor: 'blue'}}
        />
      </MapView>
      <Button
        onPress={() => {
          showMyLocation();
        }}
        title="Show My Location"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapsLocation;
