import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ADD_SCREEN,
  CHAT_SCREEN,
  COMMENTS_SCREEN,
  HOME_SCREEN,
  IMAGE,
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
import {useSelector} from 'react-redux';
import getUserData from '../Util/GetUserDataFB';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Navigator = () => {
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
  const selector = useSelector(state => state.user.users);
  const [userImage, setUserImage] = useState('');
  const fetch = async () => {
    const user = await getUserData(selector.uid);
    setUserImage(user.avatarImage);
  };
  useEffect(() => {
    fetch();
    //   StatusBar.setBarStyle('default');
    //   StatusBar.setBackgroundColor('transparent')
    //   StatusBar.setTranslucent(false)
  }, []);
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
            let borderColor = focused ? COLOR.MAIN : COLOR.WHITE;

            if (route.name === HOME_SCREEN) {
              iconName = 'home';
            } else if (route.name === SEARCH_SCREEN) {
              iconName = 'search';
            } else if (route.name === ADD_SCREEN) {
              iconName = 'add-circle';
            } else if (route.name === CHAT_SCREEN) {
              iconName = 'chat';
            }
            return (
              <View
                style={{
                  backgroundColor: backgroundColor,
                  borderRadius: 100,
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                }}>
                {route.name === PROFILE_SCREEN ? (
                  <View
                    style={{
                      borderColor: borderColor,
                      borderWidth: 2,
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}>
                    <Image
                      style={{
                        margin: 1,
                        borderRadius: 100,
                        width: windowWidth / 14,
                        height: windowWidth / 14,
                      }}
                      source={
                        userImage
                          ? {
                              uri: userImage,
                            }
                          : IMAGE.AVATAR
                      }
                    />
                  </View>
                ) : (
                  <MaterialIcons
                    name={iconName}
                    style={style}
                    size={32}
                    color={color}
                  />
                )}
              </View>
            );
          },
        })}>
        <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Tab.Screen name={SEARCH_SCREEN} component={SearchScreen} />
        <Tab.Screen name={ADD_SCREEN} component={AddImageScreen} />
        {/* <Tab.Screen name={CHAT_SCREEN} component={ChatScreen} /> */}
        <Tab.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({});

export default Navigator;
