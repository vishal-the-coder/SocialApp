import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './Navigator';
import AuthNavigator from './AuthNavigator';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {userAction} from '../Store/UserSlice';
import firestore from '@react-native-firebase/firestore';
import { USERS } from '../Util/Constants';

export default AppContainer = () => {
  const [initializing, setIntializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const onAuthStateChange = user => {
    setUser(user);
    if (initializing) setIntializing(false);
  };

  const getData = async uid => {
    const userData = await firestore().collection(USERS).doc(uid).get();
    dispatch(userAction.addLoginUser(userData._data));
  };

  useEffect(() => {
    const initialize = async () => {
      const currentUser = auth().currentUser;
      currentUser && (await getData(currentUser.uid));
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    initialize();
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <Navigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
