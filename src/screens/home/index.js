import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

Mapbox.setAccessToken(
  'sk.eyJ1IjoibWlzbjAzIiwiYSI6ImNsczFvNXJyOTBjeG0ybm8zbGRmM3gxNzkifQ.BmmF9FtCpmpMzNBbx-PPeQ',
);

const fullHeight = Dimensions.get('window').height;

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

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
    requestLocationPermissions();
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          {userLocation && (
            <Mapbox.PointAnnotation
              coordinate={[
                userLocation.longitude,
                userLocation.latitude,
              ]}></Mapbox.PointAnnotation>
          )}
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default App;

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
});
