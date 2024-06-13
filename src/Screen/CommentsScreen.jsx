import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ActivityIndicator, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {COLOR} from '../Util/Color';
import uuid from 'react-native-uuid';
import getUserData from '../Util/GetUserDataFB';
import {IMAGE, POSTS} from '../Util/Constants';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CommentScreen = ({item}) => {
  const toast = useToast();
  const selector = useSelector(state => state.user.users);
  const [userId, setUserId] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentsList, setCommentsList] = useState();
  const [newComment, setNewComment] = useState('');
  const [loader, setLoader] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(item.comments.likes || 0);
  // const handleLikePress = () => {
  //   setLiked(!liked);
  //   setLikeCount(likeCount + (liked ? -1 : 1));
  // };

  const formattedDate = isoDateString => {
    const date = new Date(isoDateString);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const updatedComments = [];
      try {
        setDataLoader(true);
        for (const comment of item.comments) {
          const user = await getUserData(comment.uid);
          updatedComments.push({...comment, user});
        }
        setDataLoader(false);
        setCommentsList(updatedComments);

      } catch (error) {
        console.log('Error while fetch comment data :: ', error);
      }
    };

    fetchUserData();
  }, [commentUpdated]);
  const postComment = async () => {
    const tempComments = item.comments;
    // console.log('temp comments from comment screen ::: ', tempComments);
    // console.log('comments list ::: ', commentsList);
    const commentObj = {
      id: uuid.v4(),
      uid: userId,
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    tempComments.push(commentObj); // Adding the new comment object to the copied array
    console.log('updated comment array!!::', tempComments);
    try {
      setLoader(true);
      if (newComment.trim().length > 0) {
        await firestore()
          .collection(POSTS)
          .doc(item.id)
          .update({comments: tempComments});
        toast.show('comment post uploaded');
        console.log('Comment Added!');
        setCommentUpdated(!commentUpdated);
        setLoader(false);
      } else {
        toast.show('Comment Invalid');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log('Error while updating comment ::: ', error);
    }
    setNewComment('');
  };

  const RenderItem = ({item}) => {
    return (
      item.user && (
        <View key={item.id} style={styles.commentContainer}>
          <Image
            source={
              item.user.avatarImage
                ? {uri: item.user.avatarImage}
                : IMAGE.AVATAR
            }
            style={styles.userImage}
          />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.date}>{formattedDate(item.createdAt)}</Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
          {/* <View style={styles.likeContainer}>
            <TouchableOpacity
              onPress={() => handleLikePress(item.uid)}
              style={styles.likeButton}>
              <MaterialIcons
                name={liked ? 'favorite' : 'favorite-outline'}
                size={24}
                color={liked ? 'blue' : 'gray'}
              />
            </TouchableOpacity>
            <Text style={styles.likeCount}>{item.likes}</Text>
          </View> */}
        </View>
      )
    );
  };

  useEffect(() => {
    setUserId(selector.uid);
    setUserAvatar(selector.avatarImage);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.commentHeaderView}>
        <Text style={styles.commentHeaderText}>Comments</Text>
      </View>
      <Divider bold={true} />
      <View style={{padding: 2}}></View>
      {dataLoader ? (
        <View style={styles.commentContainer}>
          <ActivityIndicator size="large" color={COLOR.MAIN} />
        </View>
      ) : (
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          data={commentsList}
          keyExtractor={item => item.id}
          renderItem={({item}) => <RenderItem item={item} />}
          ListEmptyComponent={
            <Text style={styles.noComments}>No comments yet</Text>
          }
        />
      )}

      {/* <FlatList
        data={tempDataOfComment}
        keyExtractor={item => item.id}
        renderItem={renderItem2}
        ListEmptyComponent={
          <Text style={styles.noComments}>No comments yet</Text>
        }
      /> */}
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={userAvatar ? {uri: userAvatar} : IMAGE.AVATAR}
        />
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={text => setNewComment(text)}
          placeholder={`Add a comment for ${item.user.username}`}
          // placeholder={`Add a comment for `}
          placeholderTextColor={COLOR.GRAY}
          multiline={true}
        />
        {loader ? (
          <View style={styles.button}>
            <ActivityIndicator size={'small'} color={COLOR.WHITE} />
          </View>
        ) : (
          <TouchableOpacity onPress={postComment} style={styles.button}>
            <Icon name="send" size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLOR.WHITE,
  },
  comment: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  commentText: {
    fontSize: 16,
    color: COLOR.MEDIUM_GRAY,
    textAlign: 'justify',
  },
  commentHeaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentHeaderText: {
    color: COLOR.DARK_GRAY,
    fontSize: 16,
    fontWeight: '400',
  },
  noComments: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLOR.MINT_GREEN,
    borderRadius: 8,
    elevation: 2,
  },
  image: {height: 30, width: 30, borderRadius: 100},
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    color: COLOR.DARK_GRAY,
  },
  button: {
    padding: 8,
    backgroundColor: COLOR.MAIN,

    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 10,
    color: COLOR.DARK_GRAY,
  },
  date: {
    color: COLOR.MEDIUM_GRAY,
    fontSize: 12,
  },
  likeContainer: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    marginRight: 5,
  },
  likeCount: {
    color: 'gray',
  },
});

export default CommentScreen;
