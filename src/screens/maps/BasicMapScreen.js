import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Mapbox, {Camera, UserLocation} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import pinIcon from '../../assets/pin2.png';

Mapbox.setAccessToken(
  'sk.eyJ1IjoibWlzbjAzIiwiYSI6ImNsczFvNXJyOTBjeG0ybm8zbGRmM3gxNzkifQ.BmmF9FtCpmpMzNBbx-PPeQ',
);

const fullHeight = Dimensions.get('window').height;

const defaultCamera = {
  centerCoordinate: [12.338, 45.4385],
  zoomLevel: 17.4,
};

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const featureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'example',
          message: 'Hello!',
        },
        geometry: {
          type: 'Point',
          coordinates: [12.338, 45.4385],
        },
      },
    ],
  };

  const onPinPress = e => {
    if (selectedFeature) {
      setSelectedFeature(undefined);
      return;
    }

    const feature = e?.features[0];
    setSelectedFeature(feature);
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('latitude, longitude', latitude, longitude);
        setUserLocation({latitude, longitude});
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleRequestPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        if (result === RESULTS.GRANTED) {
          getCurrentPosition();
        } else {
          console.log('location permisson denied!');
        }
      })
      .catch(error => {
        console.log('request permission error', error);
      });
  };

  const requestLocationPermissions = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('result', result);
      if (result === RESULTS.DENIED) {
        console.log('denied', result);
        handleRequestPermission();
      } else if (result === RESULTS.GRANTED) {
        console.log('granted');
        getCurrentPosition();
      }
    } catch (error) {
      console.log('check permisson', error);
      handleRequestPermission();
    }
  };

  useEffect(() => {
    console.log('maps here!');
    requestLocationPermissions();
  }, []);

  return (
    <View style={styles.styles}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} tintColor={'red'}>
          {userLocation && (
            <Camera
              zoomLevel={9}
              followUserLocation={true}
              followUserMode="compass"
              centerCoordinate={[userLocation.latitude, userLocation.longitude]}
            />
          )}

          <UserLocation />
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default App;

const CustomCalloutView = ({message}) => {
  return (
    <View style={styles.calloutContainerStyle}>
      <Text style={styles.customCalloutText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    height: fullHeight,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  mapPinLayer: {
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
    iconSize: 1.0,
    iconImage: 'exampleIcon',
  },
});
