import { PermissionsAndroid } from "react-native";

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'SocialApp Camera Permission',
        message:
          'SocialApp needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      },
    );
    if (granted) {
      openCamera();
    } else {
      console.log('Camera permission denied');
    }
  } catch (error) {
    console.warn('Error while requets camera permission : ', error);
  }
};
