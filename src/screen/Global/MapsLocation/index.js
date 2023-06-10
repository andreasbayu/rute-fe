import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
const MapsLocation = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: -7.80553,
          longitude: 110.35936,
          latitudeDelta: 0.021,
          longitudeDelta: 0.041,
        }}>
        <Polyline
          key={String(Date.now())}
          coordinates={[].concat(...JSON.parse(route?.params.directions))}
          strokeColor="#0000FF" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={3}
        />
        <Marker
          coordinate={{
            latitude: Number.parseFloat(route.koordinat.latitude),
            longitude: Number.parseFloat(route.koordinat.longitude),
          }}
          title={route.namaPenerima}
          description={route.alamat}
        />
        {/* {route.params?.barang.map(value => (
          <Marker
            key={value.id}
            coordinate={{
              latitude: Number.parseFloat(value.koordinat.latitude),
              longitude: Number.parseFloat(value.koordinat.longitude),
            }}
            title={value.namaPenerima}
            description={value.alamat}
          />
        ))} */}
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
