import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR} from '../Util/Color';
import {IMAGE, OTHER_USER_PROFILE, USERS} from '../Util/Constants';
import {windowWidth} from '../Util/Dimension';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import GetFollowStatus from '../Util/GetFollowStatus';

const UserShowComponent = ({getUsers, uid}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.user.users);
  const [usersList, setUsersList] = useState([]);
  const [onFollowClick, setOnFollowClick] = useState(false);
  const [noPost, setNoPost] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setNoPost(false);
      try {
        const users = await getUsers();
        setUsersList(users);
        users.length === 0 && setNoPost(true);
      } catch (error) {
        console.log(
          'Error while fetching data in userShowComponent :: ',
          error,
        );
      }
    };
    fetch();
  }, [onFollowClick]);
  // console.log('user data from component::: ', usersList);

  //   const getUsers = async () => {
  //     let tempUsers = [];
  //     try {
  //       await firestore()
  //         .collection(USERS)
  //         .where('uid', '!=', uid)
  //         .get()
  //         .then(querySnapshot => {
  //           querySnapshot._docs.map(item => {
  //             tempUsers.push(item._data);
  //           });
  //         });
  //       setUsersList(tempUsers);
  //     } catch (error) {
  //       console.log("Error while fetch user's data", error);
  //     }
  //   };

  const followUser = async item => {
    let tempFollowers = item.followers;
    let tempFollowing = [];

    // following logic
    await firestore()
      .collection(USERS)
      .doc(uid)
      .get()
      .then(querySnapshot => {
        tempFollowing = querySnapshot.data().following;
      });
    if (tempFollowing.length === 0) {
      tempFollowing.push(item.uid);
    } else {
      let isFollowing = tempFollowing.includes(item.uid);
      if (isFollowing) {
        let index = tempFollowing.indexOf(item.uid);
        tempFollowing.splice(index, 1);
      } else {
        tempFollowing.push(item.uid);
      }
    }
    try {
      await firestore().collection(USERS).doc(uid).update({
        following: tempFollowing,
      });
    } catch (error) {
      console.log('error while updating following data ::: ', error);
    }

    // follower logic
    if (tempFollowers.length === 0) {
      tempFollowers.push(uid);
    } else {
      if (tempFollowers.includes(uid)) {
        let index = tempFollowers.indexOf(uid);
        tempFollowers.splice(index, 1);
      } else {
        tempFollowers.push(uid);
      }
    }
    try {
      await firestore().collection(USERS).doc(item.uid).update({
        followers: tempFollowers,
      });
    } catch (error) {
      console.log('error while updating follower data ::: ', error);
    }
    // console.log('temp following data::: ', tempFollowing);
    // console.log('temp followers data::: ', tempFollowers);
    setOnFollowClick(!onFollowClick);
    getUsers();
  };

  const getFollowStatus = followers => {
    let status = false;
    if (followers.length > 0 && followers.includes(uid)) {
      status = true;
    }
    return status;
  };

  const renderItem = ({item}) => {
    const followStatus = GetFollowStatus(item.followers, selector.uid);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(OTHER_USER_PROFILE, {
            uid: item.uid,
            username: item.username,
            followerList: item.followers,
            followUser: followUser,
            initialFollowStatus: followStatus,
          });
        }}
        style={styles.viewComponent}>
        <Image
          source={item.avatarImage ? {uri: item.avatarImage} : IMAGE.AVATAR}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.displayName}>{item.displayName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
        {item.uid !== selector.uid && (
          <TouchableOpacity
            style={[
              styles.followButton,
              followStatus && styles.followingButton,
            ]}
            onPress={() => followUser(item)}>
            <Text
              style={[
                styles.followButtonText,
                {
                  color: followStatus ? COLOR.MAIN : COLOR.MINT_GREEN,
                },
              ]}>
              {followStatus ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        !usersList.length && {alignItems: 'center', justifyContent: 'center'},
      ]}>
      {usersList.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={usersList}
          key={item => item.uid}
          renderItem={renderItem}
        />
      ) : !noPost ? (
        <View>
          <ActivityIndicator color={COLOR.MAIN} size={'medium'} />
        </View>
      ) : (
        <View>
          <Text style={{color: COLOR.MAIN, fontWeight: '700'}}>
            No Users Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserShowComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  viewComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.DARK_GRAY,
  },
  username: {
    fontSize: 14,
    color: COLOR.GRAY,
  },
  text: {color: COLOR.DARK_GRAY},
  followButton: {
    width: windowWidth / 4.5,
    paddingVertical: 5,
    borderColor: COLOR.MAIN,
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: COLOR.MAIN,
    borderRadius: 5,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: COLOR.WHITE,
  },
  followButtonText: {
    fontWeight: 'bold',
  },
});
