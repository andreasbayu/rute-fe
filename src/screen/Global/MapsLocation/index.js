import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
const MapsLocation = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
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
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
export default MapsLocation;
