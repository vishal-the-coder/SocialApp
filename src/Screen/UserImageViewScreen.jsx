import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PostView from '../Components/PostView';
import {COLOR} from '../Util/Color';
import {POSTS, PROFILE_SCREEN, TAB_SCREEN} from '../Util/Constants';
import {windowHeight, windowWidth} from '../Util/Dimension';
import {useToast} from 'react-native-toast-notifications';
import {ActivityIndicator} from 'react-native-paper';

const UserImageViewScreen = ({navigation, route}) => {
  const {item} = route.params;

  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const deletePost = async item => {
    try {
      setLoader(true);
      await storage()
        .refFromURL(item.image)
        .delete()
        .then(() => console.log('Image deleted From Storage'));
      await firestore()
        .collection(POSTS)
        .doc(item.id)
        .delete()
        .then(() => {
          toast.show('Post Deleted!');
          navigation.navigate(TAB_SCREEN, {screen: PROFILE_SCREEN});
        });
    } catch (error) {
      setLoader(false);
      console.log('Error while delete post ::', error);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      title: item.user.username,
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => deletePost(item)}>
          {loader ? (
            <ActivityIndicator color={COLOR.MINT_GREEN} size={'small'} />
          ) : (
            <MaterialIcons
              name="delete-outline"
              size={28}
              color={COLOR.MINT_GREEN}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <PostView item={item} />
    </>
  );
};

export default UserImageViewScreen;

const styles = StyleSheet.create({
  header: {
    height: windowHeight / 15,
    backgroundColor: COLOR.MAIN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {flexDirection: 'row'},
  headerIcon: {marginHorizontal: windowWidth / 40},
  title: {color: COLOR.MINT_GREEN, fontSize: 20},
});
