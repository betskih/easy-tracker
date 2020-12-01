import {PermissionsAndroid, Text, View} from "react-native";
import React, {useCallback, useEffect} from "react";
import Geolocation from "react-native-geolocation-service";

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Get GPS Permission',
        message: 'Application need to access you location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use GPS');
    } else {
      console.log('GPS permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};


const getGeo = useCallback(() => {
  Geolocation.watchPosition(
    (info) => {
      setCoord(info);
      console.log(info);
    },
    (e) => {
      console.log(e);
    },
    { enableHighAccuracy: true },
  );
}, []);



useEffect(
  () => async () => {
    console.log('check access');
    // await requestLocationPermission();
  },
  [],
);

<Text>{'Coordinates'}</Text>
{coord?.coords && (
  <>
    <Text>{`Точность: ${coord.coords.accuracy}`}</Text>
    <Text>{`Высота над уровнем моря????:${coord.coords.altitude}`}</Text>
    <Text>{`Направление в градусах ${coord.coords.heading}`}</Text>
    <Text>{`Широта: ${coord.coords.latitude}`}</Text>
    <Text>{`Долгота: ${coord.coords.longitude}`}</Text>
    <Text>{`Метров в сек.: ${coord.coords.speed}`}</Text>
  </>
)}
