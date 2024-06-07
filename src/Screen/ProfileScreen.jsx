import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  Button,
  Card,
  Divider,
} from 'react-native-paper';
import {Auth} from '../Service';
import {screenWidth, windowHeight, windowWidth} from '../Util/Dimension';
import {COLOR} from '../Util/Color';
import {
  IMAGE,
  POSTS,
  UPDATE_PROFILE_SCREEN,
  USERS_LIST_SCREEN,
} from '../Util/Constants';
import ImagesViewComponent from '../Components/ImagesViewComponent';
import {useIsFocused} from '@react-navigation/native';
import getUserData from '../Util/GetUserDataFB';
import UserProfileComponent from '../Components/UserProfileComponent';

const ProfileScreen = ({navigation}) => {
  // const [showContact, setShowContact] = useState(false);
  const selector = useSelector(state => state.user.users);
  // const dispatch = useDispatch();
  // const isFocused = useIsFocused();
  // const [user, setUser] = useState();
  // const [imageData, setImageData] = useState([]);

  // const getUsersImageData = async () => {
  //   let tempData = [];
  //   try {
  //     const querySnapshot = await firestore()
  //       .collection(POSTS)
  //       .where('uid', '==', selector.uid)
  //       .get();
  //     querySnapshot._docs.forEach(image => tempData.push(image._data));

  //     console.log('image data from profile tempdata::: ', tempData);
  //     // setImageData(tempData);
  //     return tempData;
  //   } catch (error) {
  //     console.log('Error while getUsersImageData ::: ', error);
  //   }
  // };
  // const fetch = async () => {
  //   const userImageData = await getUsersImageData();
  //   console.log("TEST :::", userImageData);
  //   setImageData(userImageData);

  //   const data = await getUserData(selector.uid);
  //   setUser(data);

  //   console.log('image data from profile ::: ', imageData);
  // };
  // console.log("TEST 2 :::",imageData)
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: selector.username,
  //     headerTitleStyle: {
  //       fontWeight: '900',
  //     },
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={styles.iconContainer}
  //         onPress={() => {
  //           Auth.signOut(dispatch);
  //         }}>
  //         <MaterialIcons size={28} color={COLOR.MAIN} name="logout" />
  //       </TouchableOpacity>
  //     ),
  //   });
  //   fetch();
  // }, [navigation, isFocused]);

  // useEffect(()=>{console.log("TEST VISHAL")},[imageData])

  return (
    <UserProfileComponent navigation={navigation} uid={selector.uid} selfProfile={true}/>
    // <View style={styles.container}>
    //   <View style={styles.userInfoSection}>
    //     <View style={styles.profileContainer}>
    //       <Avatar.Image
    //         source={user?.avatarImage ? {uri: user.avatarImage} : IMAGE.AVATAR}
    //         size={80}
    //       />
    //       <View style={styles.userDetails}>
    //         <View>
    //           <Text style={styles.count}>
    //             {imageData.length < 10 && '0'}
    //             {imageData.length}
    //           </Text>
    //           <Text style={{fontSize: 12, fontWeight: '400'}}>posts</Text>
    //         </View>
    //         <TouchableOpacity
    //           onPress={() =>
    //             navigation.navigate(USERS_LIST_SCREEN, {
    //               screenName: 'Followers',
    //               uid: selector.uid,
    //               following: false,
    //             })
    //           }>
    //           <Text style={styles.count}>
    //             {user?.followers
    //               ? `${user.followers.length < 10 && '0'}${
    //                   user.followers.length
    //                 }`
    //               : '0'}
    //           </Text>
    //           <Text style={{fontSize: 12, fontWeight: '400'}}>followers</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() =>
    //             navigation.navigate(USERS_LIST_SCREEN, {
    //               screenName: 'Following',
    //               uid: selector.uid,
    //               following: true,
    //             })
    //           }>
    //           <Text style={styles.count}>
    //             {user?.following
    //               ? `${user.following.length < 10 && '0'}${
    //                   user.following.length
    //                 }`
    //               : '0'}
    //           </Text>
    //           <Text style={{fontSize: 12, fontWeight: '400'}}>following</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>

    //   <View style={styles.bio}>
    //     <Title style={styles.title}>{selector.displayName}</Title>
    //     <Text style={styles.info}>
    //       {selector.bio ? selector.bio : 'Please add bio'}
    //     </Text>
    //   </View>
    //   {showContact && (
    //     <>
    //       <Divider bold={true} />
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Email:</Text>
    //         <Text style={styles.info}>{user.email}</Text>
    //       </View>
    //       <Divider bold={true} />
    //       <View style={styles.row}>
    //         <Text style={styles.label}>Phone:</Text>
    //         <Text style={styles.info}>
    //           {user.phone ? user.phone : 'Please add Phone number'}
    //         </Text>
    //       </View>
    //     </>
    //   )}

    //   <View style={styles.buttonView}>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => {
    //         navigation.navigate(UPDATE_PROFILE_SCREEN);
    //       }}>
    //       <Text style={styles.buttonText}>Edit Profile</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => {
    //         setShowContact(!showContact);
    //       }}>
    //       <Text style={styles.buttonText}>
    //         {showContact ? 'Hide' : 'See'} Contact
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <Divider bold={true} />
    //   <View style={styles.imageView}>
    //     <MaterialIcons name="grid-on" size={28} color={COLOR.MAIN} />
    //   </View>
    //   <Divider bold={true} />
    //   <View style={{marginBottom: 5}} />
    //   {imageData.length > 0 && <ImagesViewComponent navigation={navigation} imageData={imageData} />}
      
    // </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: windowWidth / 30,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    padding: windowWidth / 30,
  },
  card: {
    backgroundColor: COLOR.MINT_GREEN,
    marginBottom: 20,
  },
  count: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: windowHeight / 40,
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 10,
    flexDirection: 'row',
    width: (windowWidth * 3) / 4,
    justifyContent: 'space-evenly',
  },
  bio: {margin: 5},
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLOR.DARK_GRAY,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: COLOR.GRAY,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
  label: {
    fontWeight: '600',
    marginRight: 10,
  },
  info: {
    color: COLOR.MEDIUM_GRAY,
  },
  buttonView: {
    flexDirection: 'row',
    width: windowWidth - (windowWidth * 2) / 30,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    padding: 5,
    width: (windowWidth - (windowWidth * 2) / 30) / 2 - 5,
    backgroundColor: COLOR.MINT_GREEN,
    paddingHorizontal: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: COLOR.MAIN,
  },
  imageView: {
    alignItems: 'center',
    margin: 2,
  },
});

export default ProfileScreen;
