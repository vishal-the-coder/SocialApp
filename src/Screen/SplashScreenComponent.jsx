import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {HOME_SCREEN, IMAGE, LOGIN_SCREEN, PROFILE_SCREEN, TAB_SCREEN} from '../Util/Constants';
import {COLOR} from '../Util/Color';

const SplashScreenComponent = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth().currentUser;
        setTimeout(() => {
          SplashScreen.hide();
          user
            ? navigation.replace(TAB_SCREEN)
            : navigation.replace(LOGIN_SCREEN);
        }, 2000);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Image source={IMAGE.LOGO} style={styles.logo} />
      <Text style={styles.text}>Social App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 32,
    color: COLOR.MAIN,
    fontWeight: '900',
  },
});

export default SplashScreenComponent;
