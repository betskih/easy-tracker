import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
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
      // console.log('You can use GPS');
    } else {
      // console.log('GPS permission denied');
    }
  } catch (err) {
    // console.warn(err);
  }
};
