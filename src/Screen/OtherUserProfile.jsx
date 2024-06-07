import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLOR} from '../Util/Color';
import getUserData from '../Util/GetUserDataFB';
import UserShowComponent from '../Components/UserShowComponent';
import UserProfileComponent from '../Components/UserProfileComponent';

const OtherUserProfile = ({navigation, route}) => {
  const {uid, username, followerList, followUser, initialFollowStatus} =
    route.params;
  console.log('This is user data from previous screen :: ', uid, username);
  useEffect(() => {
    navigation.setOptions({
      title: username,
      headerTitleStyle: {
        headerTintColor: COLOR.MAIN,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <UserProfileComponent
        navigation={navigation}
        uid={uid}
        followerList={followerList}
        followUser={followUser}
        initialFollowStatus={initialFollowStatus}
      />
    </View>
  );
};

export default OtherUserProfile;

const styles = StyleSheet.create({
  container: {flex: 1},
});
