import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screen/LoginScreen';
import {LOGIN_SCREEN, SIGNUP_SCREEN, SPLASH_SCREEN} from '../Util/Constants';
import SignUpScreen from '../Screen/SignUpScreen';
import SplashScreenComponent from '../Screen/SplashScreenComponent';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreenComponent} />
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
