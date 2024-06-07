import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../Util/Dimension';
import {COLOR} from '../Util/Color';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {IMAGE, POSTS, USERS} from '../Util/Constants';
import {useIsFocused} from '@react-navigation/native';
import PostView from '../Components/PostView';
import {ActivityIndicator} from 'react-native-paper';
import getUserData from '../Util/GetUserDataFB';

const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setPostData] = useState([]);
  const isFocused = useIsFocused();
  // let postData = [];
  const onRefresh = () => {
    setRefreshing(true);
    const fetch = async () => {
      setPostData([]);
      await getData();
    };
    fetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Social App',
      headerTitleStyle: {
        fontWeight: '900',
      },
      // headerLeft: () => (
      //   <TouchableOpacity style={styles.icon}>
      //     <MaterialIcons size={28} color={COLOR.MINT_GREEN} name="menu" />
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation]);

  const getData = async () => {
    let tempData = [];

    const fetchUserData = async () => {
      for (const post of tempData) {
        post.user = await getUserData(post.uid);
      }
    };

    await firestore()
      .collection(POSTS)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async documentSnapshot => {
          const data = documentSnapshot.data();

          tempData.push(data);
        });
      });

    await fetchUserData();

    tempData && setPostData([...tempData]);
  };

  useEffect(() => {
    const fetch = async () => {
      setPostData([]);
      await getData();
    };
    fetch();
  }, [navigation]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        !postData.length && {
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      {postData.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({item}) => <PostView item={item} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View>
          <ActivityIndicator color={COLOR.MAIN} size={'medium'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
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
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 400,
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
  },
  viewComments: {
    color: '#999',
  },
});
