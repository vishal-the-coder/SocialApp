import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {COLOR} from '../Util/Color';
import {windowHeight, windowWidth} from '../Util/Dimension';
import {
  getFcmToken,
  HOME_SCREEN,
  POSTS,
  TAB_SCREEN,
  TOKENS,
  USERS,
} from '../Util/Constants';
import axios from 'axios';

const AddImageScreen = ({navigation}) => {
  const selector = useSelector(state => state.user.users);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Post',
    });
  }, [navigation]);
  const toast = useToast();
  const [imageData, setImageData] = useState(null);
  const [caption, setCaption] = useState('');
  const [loader, setLoader] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setToken(getFcmToken());
      // await getUserData(selector.uid);
    };
    fetch();
  }, []);

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImageData(image);
      setShowUpload(true);
    } catch (error) {
      console.log('Error while open camera! ::', error);
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImageData(image);
      setShowUpload(true);
    } catch (error) {
      console.log('Error while open Gallery! ::', error);
    }
  };

  const uploadImage = async () => {
    const imageId = uuid.v4();
    setLoader(true);
    const image = imageData.path.split(/\.(jpg|jpeg|png)$/i)[0].split('/');
    const imageName = image[image.length - 1];
    try {
      const reference = storage().ref(
        `${imageName}${imageId}${
          imageData.path.endsWith('.png')
            ? '.png'
            : imageData.path.endsWith('.jpeg')
            ? '.jpeg'
            : '.jpg'
        }`,
      );

      const pathToFile = imageData.path;
      await reference.putFile(pathToFile);
      const url = await reference.getDownloadURL();
      // console.log('Image download URL:: ', url);
      // console.log('this is user from add Image::', user);
      const postData = {
        id: imageId,
        uid: selector.uid,
        image: url,
        likes: [],
        comments: [],
        caption: caption,
        createdAt: new Date().toISOString(),
        // user:{}
        // user:user
      };
      // console.log('this is post Data::', postData);
      await firestore().collection(POSTS).doc(postData.id).set(postData);
      // await firestore()
      //   .collection(POSTS)
      //   .get()
      //   .then(item => {
      //     // console.log('Total posts: ', item.size);
      //     // item.forEach(data => {
      //     //   console.log('user ID ::', data.id, data.data());
      //     // });
      //   });
      setLoader(false);
      setShowUpload(false);
      toast.show('Post uploaded!');
      setImageData(null);
      setCaption('');
      navigation.navigate(TAB_SCREEN, {screen: HOME_SCREEN});
    } catch (error) {
      console.log('Error while uploading image :: ', error.message);
      setLoader(false);
    }
  };

  // const getAllTokens = async () => {
  //   let tempTokens = [];
  //   await firestore()
  //     .collection(TOKENS)
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(documentSnapshot => {
  //         sendNotifications(documentSnapshot.data().token);
  //       });
  //       sendNotifications(tempTokens);
  //     });
  // };

  // const sendNotifications = async token => {
  //   let data = JSON.stringify({
  //     data: {},
  //     notification: {
  //       body: 'click to open post',
  //       title: 'New Post Added',
  //     },
  //     to: token,
  //   });

  //   let config = {
  //     method: 'post',
  //     url: 'https://fcm.googleapis.com/fcm/send',
  //     headers: {
  //       Authorization: 'key=server_key',
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(response => console.log(JSON.stringify(response.data)))
  //     .catch(error => console.log('Error while send nofication ', error));
  // };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imagePreview,
          {borderWidth: imageData ? 0 : 1.5},
          !imageData && {justifyContent: 'center', alignItems: 'center'},
        ]}>
        {imageData ? (
          <>
            <Image
              source={{uri: imageData.path}}
              style={{
                borderRadius: 10,
                margin: windowHeight / 40,
                height: windowWidth / 5,
                width: windowWidth / 5,
              }}
            />
            <TextInput
              placeholder="type caption here.."
              placeholderTextColor={COLOR.MEDIUM_GRAY}
              value={caption}
              onChangeText={text => setCaption(text)}
              style={styles.imageCaption}
              multiline
              numberOfLines={10}
            />
          </>
        ) : (
          <Text style={styles.selectImageText}>Select Image</Text>
        )}
      </View>
      {!imageData && (
        <View style={styles.buttonView}>
          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={openCamera}>
            <MaterialIcons
              name="camera-alt"
              size={24}
              color={COLOR.MINT_GREEN}
            />
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            mode="contained"
            style={styles.button}
            onPress={openGallery}>
            <MaterialIcons name="image" size={24} color={COLOR.MINT_GREEN} />
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      {showUpload && (
        <TouchableOpacity
          mode="contained"
          style={styles.uploadButton}
          onPress={uploadImage}>
          {loader ? (
            <>
              <ActivityIndicator
                style={styles.loader}
                color={COLOR.MINT_GREEN}
              />
              <Text style={styles.buttonText}>Uploading...</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="upload" size={24} color={COLOR.MINT_GREEN} />
              <Text style={styles.buttonText}> Upload</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagePreview: {
    flexDirection: 'row',
    width: windowWidth / 1.1,
    height: windowHeight / 4,
    backgroundColor: COLOR.LIGHT_GRAY,
    borderColor: COLOR.MAIN,
    margin: windowWidth / 20,
    borderRadius: 10,
  },
  imageCaption: {
    color: COLOR.DARK_GRAY,
    textAlign: 'left',
    height: windowHeight / 4.4,
    width: windowWidth / 1.7,
    marginVertical: windowHeight / 90,
    marginRight: windowHeight / 90,
  },
  selectImageText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.DARK_GRAY,
  },
  buttonView: {
    width: windowWidth / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: windowWidth / 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLOR.MAIN,
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: COLOR.MINT_GREEN,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.MAIN,
    borderRadius: 10,
    height: windowHeight / 20,
    width: windowWidth / 1.4,
  },
  loader: {
    marginRight: windowWidth / 40,
  },
});
