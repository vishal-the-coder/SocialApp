import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLOR} from '../Util/Color';
import getUserData from '../Util/GetUserDataFB';
import UserShowComponent from '../Components/UserShowComponent';

const UsersListScreen = ({navigation, route}) => {
  const {screenName, uid, following} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: screenName,
      headerTitleStyle: {
        headerTintColor: COLOR.MAIN,
      },
    });
  }, []);

  const getUsers = async () => {
    const tempUsers = [];
    const user = await getUserData(uid);
    const listToIterate = following ? user.following : user.followers;

    for (const querySnapshot of listToIterate) {
      console.log(querySnapshot);
      const tempUser = await getUserData(querySnapshot);
      console.log(tempUser);
      tempUsers.push(tempUser);
    }
    console.log('this is temp user :: ', tempUsers);
    return tempUsers;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <UserShowComponent getUsers={getUsers} uid={uid} />
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
