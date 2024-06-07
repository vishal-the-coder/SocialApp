import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ADD_SCREEN,
  CHAT_SCREEN,
  COMMENTS_SCREEN,
  HOME_SCREEN,
  IMAGE_VIEW_SCREEN,
  OTHER_USER_PROFILE,
  PROFILE_SCREEN,
  SEARCH_SCREEN,
  SPLASH_SCREEN,
  TAB_SCREEN,
  UPDATE_PROFILE_SCREEN,
  USER_IMAGE_VIEW_SCREEN,
  USERS_LIST_SCREEN,
} from '../Util/Constants';
import {COLOR} from '../Util/Color';
import HomeScreen from '../Screen/HomeScreen';
import ChatScreen from '../Screen/ChatScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import SearchScreen from '../Screen/SearchScreen';
import AddImageScreen from '../Screen/AddImageScreen';
import UpdateProfileScreen from '../Screen/UpdateProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreenComponent from '../Screen/SplashScreenComponent';
import ImageViewScreen from '../Screen/ImageViewScreen';
import UserImageViewScreen from '../Screen/UserImageViewScreen';
import CommentsScreen from '../Screen/CommentsScreen';
import {windowWidth} from '../Util/Dimension';
import UsersListScreen from '../Screen/UsersListScreen';
import OtherUserProfile from '../Screen/OtherUserProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Navigator = () => {
  // useEffect(()=>{
  //   StatusBar.setBarStyle('default');
  //   StatusBar.setBackgroundColor('transparent')
  //   StatusBar.setTranslucent(false)
  // },[])
  return (
    // <>
    //   <StatusBar
    //     barStyle="default"
    //     backgroundColor="transparent"
    //     translucent={false}
    //   />
    <Stack.Navigator
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{
        cardStyle: {backgroundColor: COLOR.WHITE},
        headerStyle: {
          backgroundColor: COLOR.WHITE,
          shadowColor: COLOR.BLACK,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.9,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}>
      <Stack.Screen
        name={TAB_SCREEN}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreenComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={UPDATE_PROFILE_SCREEN}
        component={UpdateProfileScreen}
        options={{
          headerTintColor: COLOR.WHITE,
          headerStyle: {backgroundColor: COLOR.MAIN},
          shadowColor: COLOR.BLACK,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <Stack.Screen
        name={USER_IMAGE_VIEW_SCREEN}
        component={UserImageViewScreen}
        options={{
          headerTintColor: COLOR.WHITE,
          headerStyle: {backgroundColor: COLOR.MAIN},
          shadowColor: COLOR.BLACK,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <Stack.Screen
        name={USERS_LIST_SCREEN}
        component={UsersListScreen}
        options={{
          headerTintColor: COLOR.WHITE,
          headerStyle: {backgroundColor: COLOR.MAIN},
          shadowColor: COLOR.BLACK,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <Stack.Screen
        name={OTHER_USER_PROFILE}
        component={OtherUserProfile}
        options={{
          headerTintColor: COLOR.WHITE,
          headerStyle: {backgroundColor: COLOR.MAIN},
          shadowColor: COLOR.BLACK,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <Stack.Screen name={COMMENTS_SCREEN} component={CommentsScreen} />
      <Stack.Screen name={IMAGE_VIEW_SCREEN} component={ImageViewScreen} />
    </Stack.Navigator>
    // </>
  );
};
const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={HOME_SCREEN}
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          // tabBarActiveBackgroundColor: COLOR.MAIN,
          // tabBarInactiveBackgroundColor: COLOR.MAIN,
          headerTintColor: COLOR.MAIN,
          tabBarStyle: {
            height: windowWidth / 7,
            shadowColor: COLOR.BLACK,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.9,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerStyle: {
            backgroundColor: COLOR.WHITE,
            shadowColor: COLOR.BLACK,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.9,
            shadowRadius: 3.84,
            elevation: 5,
          },
          tabBarIcon: ({focused}) => {
            let iconName;
            let style;
            let color = focused ? COLOR.MAIN : COLOR.MEDIUM_GRAY;
            let backgroundColor = focused ? COLOR.LIGHT_GRAY : COLOR.WHITE;

            if (route.name === HOME_SCREEN) {
              iconName = 'home';
            } else if (route.name === SEARCH_SCREEN) {
              iconName = 'search';
            } else if (route.name === ADD_SCREEN) {
              iconName = 'add-circle';
            } else if (route.name === CHAT_SCREEN) {
              iconName = 'chat';
            } else if (route.name === PROFILE_SCREEN) {
              iconName = 'person';
            }
            return (
              <View
                style={{
                  backgroundColor: backgroundColor,
                  borderRadius: 100,
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                }}>
                <MaterialIcons
                  name={iconName}
                  style={style}
                  size={28}
                  color={color}
                />
              </View>
            );
          },
        })}>
        <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Tab.Screen name={SEARCH_SCREEN} component={SearchScreen} />
        <Tab.Screen name={ADD_SCREEN} component={AddImageScreen} />
        <Tab.Screen name={CHAT_SCREEN} component={ChatScreen} />
        <Tab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({});

export default Navigator;
