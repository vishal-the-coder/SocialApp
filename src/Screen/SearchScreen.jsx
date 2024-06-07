import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR} from '../Util/Color';
import {useSelector} from 'react-redux';
import {IMAGE, USERS} from '../Util/Constants';
import firestore from '@react-native-firebase/firestore';
import {windowWidth} from '../Util/Dimension';
import UserShowComponent from '../Components/UserShowComponent';

const SearchScreen = () => {
  const selector = useSelector(state => state.user.users);
  const uid = selector.uid;

  const getUsers = async () => {
    let tempUsers = [];
    try {
      await firestore()
        .collection(USERS)
        .where('uid', '!=', uid)
        .get()
        .then(querySnapshot => {
          querySnapshot._docs.map(item => {
            tempUsers.push(item._data);
          });
        });

      return tempUsers;
    } catch (error) {
      console.log("Error while fetch user's data", error);
    }
  };
  return <UserShowComponent getUsers={getUsers} uid={uid} />;
};

export default SearchScreen;

const styles = StyleSheet.create({});
