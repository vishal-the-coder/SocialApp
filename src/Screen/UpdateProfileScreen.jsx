import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {COLOR} from '../Util/Color';
import {
  HOME_SCREEN,
  IMAGE,
  PROFILE_SCREEN,
  TAB_SCREEN,
  USERS,
} from '../Util/Constants';
import {windowHeight, windowWidth} from '../Util/Dimension';
import {userAction} from '../Store/UserSlice';
import {useToast} from 'react-native-toast-notifications';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import uploadImage from '../Util/UploadImage';

const validationSchema = Yup.object().shape({
  phone: Yup.string(),
  bio: Yup.string(),
  displayName: Yup.string(),
  //   displayName: Yup.string().required('Display Name is required'),
});

const UpdateProfileScreen = ({navigation}) => {
  const bottomSheet = useRef();
  const dispatch = useDispatch();
  const toast = useToast();
  const selector = useSelector(state => state.user.users);

  const [phone, setPhone] = useState(selector.phone);
  const [bio, setBio] = useState(selector.bio);
  const [displayName, setDisplayName] = useState(selector.displayName);
  const [avatarImage, setAvatarImage] = useState(selector.avatarImage);
  const [imageData, setImageData] = useState('');
  const [loader, setLoader] = useState(false);

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      bottomSheet.current.close();
      setImageData(image);
      console.log('this is image data from update profile:::', image);
      // console.log('Camera Opened!!');
    } catch (error) {
      console.log('Error while open camera! ::', error);
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      bottomSheet.current.close();
      console.log('This is image data from update profile :::', image);
      setImageData(image);
    } catch (error) {
      console.log('Error while open Gallery! ::', error);
    }
  };
  const handleUpdate = async values => {
    const url = imageData && (await uploadImage(imageData));
    const user = {
      uid: selector.uid,
      displayName: values.displayName.trim(),
      username: selector.username,
      phone: values.phone.trim(),
      bio: values.bio.trim(),
      avatarImage: imageData ? url : selector.avatarImage,
      email: selector.email,
      token: selector.token,
    };
    // console.log(user.avatarImage);
    dispatch(userAction.addLoginUser(user));
    await firestore()
      .collection(USERS)
      .doc(user.uid)
      .update({
        displayName: user.displayName,
        phone: user.phone,
        bio: user.bio,
        avatarImage: user.avatarImage,
      })
      .then(() => {
        toast.show('data updated!');
        navigation.replace(TAB_SCREEN, {screen: PROFILE_SCREEN});
      });
  };

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Formik
        initialValues={{
          phone: phone,
          bio: bio,
          displayName: displayName,
          avatarImage: avatarImage,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          try {
            setLoader(true);
            handleUpdate(values);
          } catch (error) {
            setLoader(false);
            console.log('Error while Update Profile::', error);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {/* <SafeAreaView style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginHorizontal: windowWidth / 40}}>
              <MaterialIcons
                name="chevron-left"
                size={28}
                color={COLOR.MINT_GREEN}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Update Profile</Text>
          </SafeAreaView> */}
            <View style={styles.avatarImageView}>
              <BottomSheet
                hasDraggableIcon
                ref={bottomSheet}
                height={windowHeight / 3}
                draggable={true}
                sheetBackgroundColor={COLOR.WHITE}
                onRequestClose={() => {
                  bottomSheet.current.close();
                }}>
                <View style={styles.modelInside}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.modelInsideButton}
                    onPress={openCamera}>
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color={COLOR.MAIN}
                    />
                    <Text style={styles.modelInsideButtonText}>
                      Open Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.modelInsideButton}
                    onPress={openGallery}>
                    <MaterialIcons name="photo" size={24} color={COLOR.MAIN} />
                    <Text style={styles.modelInsideButtonText}>
                      Select from Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheet>
              <TouchableOpacity
                onPress={() => {
                  bottomSheet.current.show();
                }}
                activeOpacity={0.9}
                style={styles.avatarImageTouch}>
                <Image
                  style={styles.avatarImage}
                  source={
                    imageData
                      ? {uri: imageData.path}
                      : values.avatarImage
                      ? {uri: values.avatarImage}
                      : IMAGE.AVATAR
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <TextInput
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="phone"
                        size={24}
                        color={COLOR.MAIN}
                      />
                    )}
                    onPress={null}
                    disabled
                  />
                }
                label="Phone"
                value={values.phone}
                outlineColor={COLOR.MAIN}
                activeOutlineColor={COLOR.MAIN}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                style={styles.input}
                keyboardType="phone-pad"
                mode="outlined"
                error={touched.phone && !!errors.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <TextInput
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="person"
                        size={24}
                        color={COLOR.MAIN}
                      />
                    )}
                    onPress={null}
                    disabled
                  />
                }
                label="Display Name"
                value={values.displayName}
                outlineColor={COLOR.MAIN}
                activeOutlineColor={COLOR.MAIN}
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                style={styles.input}
                mode="outlined"
                error={touched.displayName && !!errors.displayName}
              />
              {touched.displayName && errors.displayName && (
                <Text style={styles.errorText}>{errors.displayName}</Text>
              )}

              <TextInput
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name="keyboard"
                        size={24}
                        color={COLOR.MAIN}
                      />
                    )}
                    onPress={null}
                    disabled
                  />
                }
                label="Bio"
                value={values.bio}
                outlineColor={COLOR.MAIN}
                activeOutlineColor={COLOR.MAIN}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                style={[styles.input, {height: windowWidth / 4}]}
                contentStyle={{alignItems: 'center'}}
                multiline
                mode="outlined"
                error={touched.bio && !!errors.bio}
              />
              {touched.bio && errors.bio && (
                <Text style={styles.errorText}>{errors.bio}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}>
                {loader ? (
                  <ActivityIndicator color={COLOR.MINT_GREEN} size={'small'} />
                ) : (
                  'Update'
                )}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    height: windowHeight / 15,
    backgroundColor: COLOR.MAIN,
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 16,
    // textAlign: 'center',
  },
  title: {color: COLOR.MINT_GREEN, fontSize: 20},
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: COLOR.MAIN,
  },
  errorText: {
    color: COLOR.RED,
  },
  avatarImageView: {
    paddingTop: 20,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
  },
  avatarImageTouch: {
    borderRadius: 100,
    overflow: 'hidden',
    width: windowWidth / 3,
    height: windowWidth / 3,
    backgroundColor: COLOR.WHITE,
  },
  avatarImage: {
    width: windowWidth / 3,
    height: windowWidth / 3,
  },
  modelInside: {
    marginTop: 30,
  },
  modelInsideButton: {
    backgroundColor: COLOR.MINT_GREEN,
    alignItems: 'center',
    margin: 10,
    padding: 12,
    borderRadius: 10,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  modelInsideButtonText: {
    fontWeight: '600',
    color: COLOR.MAIN,
    marginLeft: 10,
  },
});

export default UpdateProfileScreen;
