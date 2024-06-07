import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import React, {useMemo, useRef, useState} from 'react';
import {COLOR} from '../Util/Color';
import {COMMENTS_SCREEN, IMAGE, POSTS} from '../Util/Constants';
import {useSelector} from 'react-redux';
import DoubleClick from 'react-native-double-tap';
import PhotoZoom from 'react-native-photo-zoom';
import ZoomImage from './ZoomImage';
import Pinchable from 'react-native-pinchable';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import {
  screenHeight,
  screenWidth,
  windowHeight,
  windowWidth,
} from '../Util/Dimension';
import {useNavigation} from '@react-navigation/native';
import CommentScreen from '../Screen/CommentsScreen';

const PostView = ({item}) => {
  const bottomSheet = useRef();
  const userId = useSelector(state => state.user.users.uid);
  const [onLikeClick, setOnLikeClick] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

  const setDraggable = draggable => {
    setIsDraggable(draggable);
    if (bottomSheet.current) {
      bottomSheet.current.setDraggable(draggable);
    }
  };

  const getLikeStatus = likes => {
    return likes.includes(userId);
  };
  const onLike = async item => {
    const tempLikes = item.likes;
    if (tempLikes.length > 0) {
      tempLikes.map(data => {
        if (data === userId) {
          const index = tempLikes.indexOf(data);
          if (index > -1) {
            tempLikes.splice(index, 1);
          }
        } else {
          tempLikes.push(userId);
        }
      });
    } else {
      tempLikes.push(userId);
    }
    try {
      await firestore()
        .collection(POSTS)
        .doc(item.id)
        .update({likes: tempLikes});
      console.log('Like Updated!');
    } catch (error) {
      console.log('Error while updating like data ::: ', error);
    }
    setOnLikeClick(!onLikeClick);
  };

  const formattedDate = isoDateString => {
    const date = new Date(isoDateString);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image
          source={
            item.user.avatarImage ? {uri: item.user.avatarImage} : IMAGE.AVATAR
          }
          style={{
            height: 25,
            width: 25,
            borderWidth: 1,
            borderRadius: 20,
          }}
        />
        <Text style={styles.username}>{item.user.displayName}</Text>
      </View>

      {/* Image View */}
      <Pinchable>
        <Image source={{uri: item.image}} style={styles.postImage} />
      </Pinchable>

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              onLike(item);
            }}>
            <MaterialIcons
              name={getLikeStatus(item.likes) ? 'favorite' : 'favorite-outline'}
              color={getLikeStatus(item.likes) ? COLOR.RED : COLOR.DARK_GRAY}
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
          <MaterialIcons
            name="comment"
            color={COLOR.DARK_GRAY}
            size={25}
            style={styles.icon}
          />
          <MaterialIcons
            name="send"
            color={COLOR.DARK_GRAY}
            size={25}
            style={styles.icon}
          />
        </View>
        <Text style={styles.likes}>{item.likes.length} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{item.user.username} </Text>
          {item.caption}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate(COMMENTS_SCREEN);
            bottomSheet.current.show();
          }}>
          <Text style={styles.viewComments}>
            View all {item.comments.length} comments
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 12, color: COLOR.GRAY}}>
          {formattedDate(item.createdAt)}
        </Text>
      </View>
      <SafeAreaView>
        <BottomSheet
          hasDraggableIcon
          draggable={false}
          ref={bottomSheet}
          height={windowWidth * 1.25}
          sheetBackgroundColor={COLOR.WHITE}
          onPress={() => {
            bottomSheet.current.close();
          }}
          onRequestClose={() => {
            bottomSheet.current.close();
          }}>
          <CommentScreen item={item} />
        </BottomSheet>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postContainer: {
    marginBottom: 20,
    // backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.LIGHT_GRAY,
  },
  username: {
    color: COLOR.DARKER_GRAY,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: windowWidth,
    height: 400,
    resizeMode: 'contain',
  },
  postFooter: {
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  likes: {
    color: COLOR.DARK_GRAY,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
    color: COLOR.DARK_GRAY,
  },
  viewComments: {
    color: '#999',
  },
});
