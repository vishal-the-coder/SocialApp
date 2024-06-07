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
import {useSelector} from 'react-redux';
import {
  IMAGE_VIEW_SCREEN,
  POSTS,
  USER_IMAGE_VIEW_SCREEN,
} from '../Util/Constants';
import {windowWidth} from '../Util/Dimension';
import {useIsFocused} from '@react-navigation/native';
import getUserData from '../Util/GetUserDataFB';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLOR} from '../Util/Color';
import {ActivityIndicator} from 'react-native-paper';

const numColumns = 3;
const size = (windowWidth - (windowWidth / 30) * 2) / numColumns;

const ImagesViewComponent = ({navigation, imageData}) => {
  const [myImages, setMyImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();

  const fetchImages = async () => {
    // try {
    //   const imageData = await firestore()
    //     .collection(POSTS)
    //     .where('uid', '==', selector.uid)
    //     .get();
    //   imageData._docs.forEach(image => imageData.push(image._data));
    // } catch (error) {
    //   console.log('Error while fetch image data im image component: ', error);
    // }
    const fetchUserData = async () => {
      for (const post of imageData) {
        post.user = await getUserData(post.uid);
      }
    };
    await fetchUserData();
    imageData.sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    // console.log("Temp data from imageViewComponent ::: ",imageData);
    setMyImages(imageData);
    setLoader(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(USER_IMAGE_VIEW_SCREEN, {item, item})
        }
        onLongPress={() => navigation.navigate(IMAGE_VIEW_SCREEN, {item: item})}
        style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setLoader(true);
    fetchImages();
  }, [navigation, isFocused]);

  return (
    <>
      {myImages.length > 0 ? (
        <FlatList
          data={myImages}
          renderItem={({item}) => renderItem({navigation, item})}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.container}>
          {!loader ? (
            <>
              <MaterialIcons name="camera-alt" color={COLOR.GRAY} size={56} />
              <Text style={styles.message}>No Posts Yet</Text>
            </>
          ) : (
            <ActivityIndicator color={COLOR.MAIN} size={'medium'} />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 1,
    height: size,
    width: size,
  },
  image: {
    height: size,
    width: size,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: COLOR.GRAY,
  },
});

export default ImagesViewComponent;
